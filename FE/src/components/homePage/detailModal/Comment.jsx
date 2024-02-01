import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentLikeBox from './CommentLikeBox';

const BUTTON_OPTIONS = [{id: 1, name: 'createComment'}, {id: 2, name: 'createReply'},{id: 3, name: 'patchComment'},{id: 4, name: 'patchReply'},]

function Comment({ comment, inputRef, option, setOption, setCommentId, setReplyId, commentList, setCommentList }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
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
  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  // 답글 달기 클릭 시 인풋 창으로 커서 이동
  const handleClickFocusInput = () => {
    inputRef.current.focus();
    inputRef.current.value = `@${user.nickname} `;
    setOption(BUTTON_OPTIONS[1].name);
    setCommentId(commentId)
  };

  const handleClickToggleIsReplyOpen = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  const handleClickDeleteComment = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?')
    if (!isConfirm) return;

    try {
      const res = await axios.delete(
        `/api/feeds/${feedId}/comments/${commentId}`
      );
      console.log('댓글 삭제 했을 때 결과 : ', res);
      const newCommentList = commentList.filter((comment) => comment.commentId !== commentId)
      setCommentList(newCommentList)
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

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
          <CommentLikeBox likeCount={likeCount} commentId={commentId} />
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
        {isReplyOpen && <ReplySection commentId={commentId} setOption={setOption} setReplyId={setReplyId}/>}
      </div>
    </div>
  );
}

export default Comment;
