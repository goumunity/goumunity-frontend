import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../utils/formatting';

// 댓글, 답글 200자
function Post({ post, ...props }) {
  
  const {
    feedId,
    content,
    commentCount,
    feedCategory,
    price,
    afterPrice,
    profit,
    images,
    user,
    region,
    createdAt,
    updatedAt,
    likeCount
  } = post;

  const { nickname, imgSrc } = user;

  const daysAgo = calculateDate(updatedAt)

  const [isLike, setIsLike] = useState(false);

  const handleClickToggleLike = () => {
    setIsLike(!isLike);
  };

  return (
    <div className='flex flex-col w-post border border-gray px-4 py-2'>
      <div className='flex items-center gap-2'>
        <ProfileImage size='8' />
        <div className='flex items-center gap-2'>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className='font-daeam'>{nickname}</span>
          <span className='font-her'>{daysAgo}</span>
        </div>
      </div>
      <p className='my-4 px-3'>
        {content}
      </p>
      <img
        className='w-full h-50 rounded'
        src='https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww'
        alt=''
      />
      <div className='flex items-center my-2 gap-2'>
        {isLike ? (
          <Option
            text={likeCount}
            src={unLikeIcon}
            onClick={handleClickToggleLike}
          />
        ) : (
          <Option text={likeCount} src={likeIcon} onClick={handleClickToggleLike} />
        )}

        <Link to={`/${feedId}`}>
          <Option text={commentCount} src={commentIcon}  />
        </Link>
      </div>
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
    </div>
  );
}

export default Post;
