import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';

function CommentLikeBox({ likeCount, commentId }) {
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [isCommentLike, setIsCommentLike] = useState(false);

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await axios.post(`/api/comments/${commentId}/like`);
      setIsCommentLike(true);
      setCommentLikeCount((prev) => prev + 1);
      console.log('댓글 좋아요 했을 때 결과 : ', res);
    } catch (error) {
      console.log('댓글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await axios.delete(`/api/comments/${commentId}/unlike`);
      setIsCommentLike(false);
      setCommentLikeCount((prev) => prev - 1);
      console.log('댓글 좋아요 취소 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };
  return (
    <div>
      {isCommentLike ? (
        <Option
          text={commentLikeCount}
          src={unLikeIcon}
          onClick={handleClickCreateCommentLike}
        />
      ) : (
        <Option
          text={commentLikeCount}
          src={likeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      )}
    </div>
  );
}

export default CommentLikeBox;
