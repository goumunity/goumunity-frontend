import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import { calculateDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';

function Comment({ comment, inputRef }) {
  const [isLike, setIsLike] = useState(false);

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const { commentId, content, feedId, user, updatedAt } = comment;
  const { nickname, userStatus, imgSrc } = user;
  console.log('comment의 요소 : ', comment);

  const daysAgo = calculateDate(updatedAt);

  // 대댓글 창 열고 닫기
  const handleClickToggleIsReplyOpen = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  // 좋아요 토글
  const handleClickToggleisLike = () => {
    setIsLike(!isLike)
  }

  // 답글 달기 클릭 시 인풋 창으로 커서 이동
  const handleClickFocusInput = () => {
    ref.current.focus();
    ref.current.value = `@${nickname} `;
    
  }

  return (
    <div className='flex py-1 gap-2 w-full'>
      <ProfileImage />
      <div>
        <div className='flex flex-row items-center gap-1 text-sm'>
          <span className='font-daeam'>{nickname}</span>
          <span className='font-her'>{daysAgo}일 전</span>
        </div>
        <p className='text-xs leading-4'>{content}</p>
        <div className='flex gap-2 items-center my-1 font-daeam text-xs'>
          {isLike ? (
            <Option
              text='27개'
              src={unLikeIcon}
                onClick={handleClickToggleisLike}
            />
          ) : (
            <Option
              text='27개'
              src={likeIcon}
                onClick={handleClickToggleisLike}
            />
          )}
          <Option
            text='11개'
            src={commentIcon}
            onClick={handleClickToggleIsReplyOpen}
            // onClick={handleClickToggleLike}
          />
          <span className='cursor-pointer' onClick={handleClickFocusInput}>답글 달기</span>
        </div>
        {isReplyOpen && <ReplySection />}
      </div>
    </div>
  );
}

export default Comment;
