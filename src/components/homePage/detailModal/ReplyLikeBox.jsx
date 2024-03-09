import { useState } from 'react';
import axios from 'axios';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';
import instance from "@/utils/instance.js";
import Swal from 'sweetalert2';

function ReplyLikeBox({ likeCount, replyId, ilikeThat }) {
  const [replyLikeCount, setReplyLikeCount] = useState(likeCount);
  const [isReplyLike, setIsReplyLike] = useState(ilikeThat);

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await instance.post(`/api/replies/${replyId}/like`);
      setIsReplyLike(true);
      setReplyLikeCount((prev) => prev + 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await instance.delete(`/api/replies/${replyId}/unlike`);
      setIsReplyLike(false);
      setReplyLikeCount((prev) => prev - 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <div>
      {isReplyLike ? (
        <Option
          text={replyLikeCount}
          size={3}
          src={unLikeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      ) : (
        <Option
          text={replyLikeCount}
          size={3}
          src={likeIcon}
          onClick={handleClickCreateCommentLike}
        />
      )}
    </div>
  );
}

export default ReplyLikeBox;
