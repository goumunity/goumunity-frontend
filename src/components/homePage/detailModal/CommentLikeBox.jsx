import instance from '@/utils/instance';
import { useEffect, useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';
import Swal from 'sweetalert2';

function CommentLikeBox({ likeCount, commentId, ilikeThat }) {
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [isCommentLike, setIsCommentLike] = useState(ilikeThat);

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await instance.post(`/api/comments/${commentId}/like`);
      setIsCommentLike(true);
      // setIsLiked(true);
      
      // setComment((prev) => ({...prev, ilikeThat: ilikeThat}))
      setCommentLikeCount((prev) => prev + 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await instance.delete(`/api/comments/${commentId}/unlike`);
      setIsCommentLike(false);
      // setIsLiked(false);
      setCommentLikeCount((prev) => prev - 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  // useEffect(() => {
  //   setCommentLikeCount(likeCount)
  //   setIsCommentLike(ilikeThat)
  // }, [commentId])
  return (
    <div>
      {isCommentLike ? (
      // {ilikeThat ? (
        <Option
          text={commentLikeCount}
          // text={likeCount}
          size={3}
          src={unLikeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      ) : (
        <Option
          text={commentLikeCount}
          // text={likeCount}
          size={3}
          src={likeIcon}
          onClick={handleClickCreateCommentLike}
        />
      )}
    </div>
  );
}

export default CommentLikeBox;
