import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';

function Comment({ comment }) {
  const [isLike, setIsLike] = useState(false);

  const { id, content, like, user, createdAt } = comment;

  return (
    <div className='flex flex-col py-1 gap-2'>
      <div className='flex gap-2'>
        <ProfileImage />
        <span className='font-daeam'>{id}</span>
        <span className='font-her'>2일 전</span>
      </div>
        <p className='text-xs leading-4'>{content}</p>
        <div className='flex gap-2 items-center font-daeam text-xs'>
          {isLike ? (
            <Option
              text={like}
              src={unLikeIcon}
              //   onClick={handleClickToggleLike}
            />
          ) : (
            <Option
              text={like}
              src={likeIcon}
              //   onClick={handleClickToggleLike}
            />
          )}
          <Option
            text='11개'
            src={commentIcon}
            // onClick={handleClickToggleLike}
          />
        </div>
    </div>
  );
}

export default Comment;
