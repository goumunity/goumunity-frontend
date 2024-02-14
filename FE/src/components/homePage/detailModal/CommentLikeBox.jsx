import instance from '@/utils/instance';
import { useEffect, useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../../common/Option';

function CommentLikeBox({ likeCount, commentId, ilikeThat }) {
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [isCommentLike, setIsCommentLike] = useState(ilikeThat);
  console.log(`${commentId}번 comment의 isCommentLike: ${isCommentLike}, ilikeThat: ${ilikeThat}`)

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await instance.post(`/api/comments/${commentId}/like`);
      setIsCommentLike(true);
      // setIsLiked(true);
      
      // setComment((prev) => ({...prev, ilikeThat: ilikeThat}))
      setCommentLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('댓글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await instance.delete(`/api/comments/${commentId}/unlike`);
      setIsCommentLike(false);
      // setIsLiked(false);
      setCommentLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('에러 발생 : ', error);
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
