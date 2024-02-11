import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReplyLikeBox from './ReplyLikeBox';
import PatchReplyBox from './PatchReplyBox';
import instance from "@/utils/instance.js";

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
  setReplyId,
  setCommentReplyCount
}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { commentId, content, createdAt, ilikeThat, likeCount, replyId, user, updatedAt } =
    reply;
  // user 객체
  // const { age, email, gender, id, imgSrc, monthBudget, nickname, regionId, userCategory } = user
  const [isPatchReplyOpen, setIsPatchReplyOpen] = useState(false);
  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  const handleClickDeleteReply = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      const res = await instance.delete(
        `/api/comments/${commentId}/replies/${replyId}`
      );
      const newReplyList = replyList.filter(
        (reply) => reply.replyId !== replyId
      );
      setReplyList(newReplyList);
      setCommentReplyCount((prev) => prev - 1)
    } catch (error) {
      console.log('답글 삭제 중 에러 발생 : ', error);
    }
  };

  const handleClickTogglePatchReply = () => {
    setIsPatchReplyOpen(!isPatchReplyOpen);
  }

  return (
    <div className='flex py-1 gap-2 w-full'>
      <Link to={`/profile/${user.nickname}`}>
        <div
          className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
        >
          {user.imgSrc ? (
            <img className={`w-full h-full cursor-pointer`} src={user.imgSrc} />
          ) : (
            <img
              className={`w-full h-full cursor-pointer`}
              src={defaultMaleIcon}
            />
          )}
        </div>
      </Link>
      <div>
        <div className='flex flex-row items-center gap-1 text-sm'>
          <span className='font-daeam'>{user.nickname}</span>
          <span className='font-her'>{daysAgo}</span>
        </div>
        <p className='text-xs leading-4'>{content}</p>
        <div className='flex gap-2 items-center my-1 font-daeam text-xs'>
          <ReplyLikeBox likeCount={likeCount} replyId={replyId} ilikeThat={ilikeThat} />
          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickDeleteReply}>
              삭제
            </span>
          )}
          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickTogglePatchReply}>
              수정
            </span>
          )}
        </div>
        {isPatchReplyOpen && <PatchReplyBox setReplyList={setReplyList} replyList={replyList} replyId={reply.replyId} commentId={commentId} setIsPatchReplyOpen={setIsPatchReplyOpen} />}
      </div>
    </div>
  );
}

export default Reply;
