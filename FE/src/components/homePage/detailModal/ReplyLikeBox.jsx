import { useState } from 'react';
import axios from 'axios';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';

function ReplyLikeBox({ likeCount, replyId }) {
  const [replyLikeCount, setReplyLikeCount] = useState(likeCount);
  const [isReplyLike, setIsReplyLike] = useState(false);

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await axios.post(`/api/replies/${replyId}/like`);
      setIsReplyLike(true);
      setReplyLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('답글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await axios.delete(`/api/replies/${replyId}/unlike`);
      setIsReplyLike(false);
      setReplyLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('답글 좋아요 취소 중 에러 발생 : ', error);
    }
  };
  return (
    <div>
      {isReplyLike ? (
        <Option
          text={replyLikeCount}
          src={unLikeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      ) : (
        <Option
          text={replyLikeCount}
          src={likeIcon}
          onClick={handleClickCreateCommentLike}
        />
      )}
    </div>
  );
}

export default ReplyLikeBox;
