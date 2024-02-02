import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReplyLikeBox from './ReplyLikeBox';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment' },
  { id: 2, name: 'createReply' },
  { id: 3, name: 'patchComment' },
  { id: 4, name: 'patchReply' },
];

function Reply({
  reply,
  inputRef,
  option,
  setOption,
  setCommentId,
  setReplyList,
  replyList,
  setReplyId
}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { commentId, content, createdAt, likeCount, replyId, user, updatedAt } =
    reply;
  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  // 답글 달기 클릭 시 인풋 창으로 커서 이동
  const handleClickFocusInput = () => {
    inputRef.current.focus();
    inputRef.current.value = `@${user.nickname} `;
    setOption(BUTTON_OPTIONS[0].name);
    setCommentId(commentId);
  };

  const handleClickDeleteReply = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      const res = await axios.delete(
        `/api/comments/${commentId}/replies/${replyId}`
      );
      const newReplyList = replyList.filter(
        (reply) => reply.replyId !== replyId
      );
      setReplyList(newReplyList);
    } catch (error) {
      console.log('답글 삭제 중 에러 발생 : ', error);
    }
  };

  const handleClickPatchReply = () => {
    setOption(BUTTON_OPTIONS[3].name)
    setReplyId(replyId)
  };
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
          <ReplyLikeBox likeCount={likeCount} replyId={replyId} />
          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickDeleteReply}>
              삭제
            </span>
          )}
          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickPatchReply}>
              수정
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reply;
