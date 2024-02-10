
import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';

function CommentLikeBox({ likeCount, commentId, ilikeThat }) {
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [isCommentLike, setIsCommentLike] = useState(ilikeThat);

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await instance.post(`/api/comments/${commentId}/like`);
      setIsCommentLike(true);
      setCommentLikeCount((prev) => prev + 1);
      console.log('댓글 좋아요 했을 때 결과 : ', res);
    } catch (error) {
      console.log('댓글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {

      const res = await instance.delete(`/api/comments/${commentId}/unlike`);
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
          size={3}
          src={unLikeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      ) : (
        <Option
          text={commentLikeCount}
          size={3}
          src={likeIcon}
          onClick={handleClickCreateCommentLike}
        />
      )}
    </div>
  );
}

export default CommentLikeBox;
