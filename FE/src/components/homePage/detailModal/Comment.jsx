import Option from '../../common/Option.jsx';
import ProfileImage from '../../common/ProfileImage.jsx';
import likeIcon from '../../../assets/svgs/likeIcon.svg';
import unLikeIcon from '../../../assets/svgs/unLikeIcon.svg';
import commentIcon from '../../../assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import axios from 'axios';

function Comment({ comment, inputRef }) {
  const [isCommentLike, setIsCommentLike] = useState(false);

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const {
    commentId,
    content,
    createdAt,
    feedId,
    likeCount,
    replyCount,
    user,
    updatedAt,
  } = comment;

  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);

  // 좋아요 토글
  const handleClickToggleisCommentLike = () => {
    setIsCommentLike(!isCommentLike);
  };

  // 답글 달기 클릭 시 인풋 창으로 커서 이동
  const handleClickFocusInput = () => {
    inputRef.current.focus();
    inputRef.current.value = `@${user.nickname} `;
  };

  // 댓글 좋아요
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

  // 댓글 좋아요 취소
  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await axios.delete(`/api/comments/${commentId}/unlike`);
      setIsCommentLike(false);
      setCommentLikeCount((prev) => prev - 1);
      console.log('댓글 아요 취소 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  // 답글 창 여닫기
  const handleClickToggleIsReplyOpen = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  return (
    <div className='flex py-1 gap-2 w-full'>
      <ProfileImage profileImage={user.imgSrc} />
      <div>
        <div className='flex flex-row items-center gap-1 text-sm'>
          <span className='font-daeam'>{user.nickname}</span>
          <span className='font-her'>{daysAgo}</span>
        </div>
        <p className='text-xs leading-4'>{content}</p>
        <div className='flex gap-2 items-center my-1 font-daeam text-xs'>
          {isCommentLike ? (
            <Option
              text={likeCount}
              src={unLikeIcon}
              onClick={handleClickDeleteCommentLike}
            />
          ) : (
            <Option
              text={likeCount}
              src={likeIcon}
              onClick={handleClickCreateCommentLike}
            />
          )}
          <Option
            text={replyCount}
            src={commentIcon}
            onClick={handleClickToggleIsReplyOpen}
            // onClick={handleClickToggleLike}
          />
          <span className='cursor-pointer' onClick={handleClickFocusInput}>
            답글 달기
          </span>
        </div>
        {replyCount !== 1 && (
          <div
            className='text-center font-dove text-sm'
            onClick={handleClickToggleIsReplyOpen}
          >
            - 답글 {isReplyOpen ? '숨기기' : `${replyCount}개 보기`} -
          </div>
        )}
        {isReplyOpen && <ReplySection />}
      </div>
    </div>
  );
}

export default Comment;
