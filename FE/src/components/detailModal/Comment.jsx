import Option from '../common/Option.jsx';
import ProfileImage from '../common/ProfileImage.jsx';
import likeIcon from '../../assets/svgs/likeIcon.svg';
import unLikeIcon from '../../assets/svgs/unLikeIcon.svg';
import commentIcon from '../../assets/svgs/commentIcon.svg';
import { useState } from 'react';

function Comment({ comment }) {

  const [isLike, setIsLike] = useState(false);

  const { id, content, like, user, createdAt } = comment;
  
  return (
    <div className='flex py-4 gap-3'>
      <ProfileImage />
      <div>
        <div>
          <span className='font-daeam'>{id}</span> <span>{content}</span>
        </div>
        <div className='flex gap-2 items-center font-daeam'>
          <span>{createdAt}</span>
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
    </div>
  );
}

export default Comment;
