import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Comment({ comment, inputRef, option, setOption, setCommentId }) {
  const [isCommentLike, setIsCommentLike] = useState(false);

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);
  
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
    setOption(false);
    setCommentId(commentId)
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
      console.log('댓글 좋아요 취소 했을 때 결과 : ', res);
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

  // 댓글 삭제
  const handleClickDeleteComment = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?')
    if (isConfirm) return;

    try {
      const res = await axios.delete(
        `/api/feeds/${feedId}/comments/${commentId}`
      );
      console.log('댓글 삭제 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  // 댓글 수정
  const handleClickPatchComment = async () => {
    try {
      const res = await axios.patch(`/api/feeds/${feedId}/comments/${commentId}`, {content: comment});
    } catch (error) {
      console.log('댓글 수정 중 에러 발생 : ', error);
    }
  }

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

          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickDeleteComment}>
              삭제
            </span>
          )}
          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickPatchComment}>
              수정
            </span>
          )}
        </div>
        {replyCount !== 0 && (
          <div
            className='text-center font-dove text-sm cursor-pointer'
            onClick={handleClickToggleIsReplyOpen}
          >
            - 답글 {isReplyOpen ? '숨기기' : `${replyCount}개 보기`} -
          </div>
        )}
        {isReplyOpen && <ReplySection commentId={commentId} />}
      </div>
    </div>
  );
}

export default Comment;
