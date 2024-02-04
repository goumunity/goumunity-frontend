
import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../utils/formatting';
import { useSelector } from 'react-redux';
import axios from 'axios';

// 댓글, 답글 200자
function Feed({ feed, setFeedList, feedList, ...props }) {
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
    likeCount,
  } = feed;

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const daysAgo = calculateDate(updatedAt);
  const className = isLoading ? 'pointer-events-none opacity-75' : undefined;
  const [isLike, setIsLike] = useState(false);

  const handleClickToggleLike = () => {
    setIsLike(!isLike);
  };

  // 피드 삭제
  const handleClickDeleteFeed = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?')
    if (!isConfirm) return;

    try {
      setIsLoading(true)
      const res = await axios.delete(`/api/feeds/${feedId}`)
      console.log('삭제 결과 : ', res)
    } catch (error) {
      console.log('피드 삭제 중 에러 발생 : ', error)
    } 
    setIsLoading(false)
    const newFeedList = feedList.filter((feed) => feed.feedId !== feedId)
    setFeedList(newFeedList)
    // navigate('/')
  }

  return (
    <div className='flex flex-col w-post border border-gray px-4 py-2'>
      <div className='flex items-center gap-2'>
        <ProfileImage size='8' profileImage={user.imgSrc ? user.imgSrc : ''}/>
        <div className='flex items-center gap-2 w-4/5'>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className='font-daeam'>{user.nickname}</span>
          <span className='font-her'>{daysAgo}</span>
        </div>
        {user.id === currentUser.id && (
          <button className={`${className} font-daeam`} onClick={handleClickDeleteFeed}>삭제</button>
        )}
      </div>
      <p className='my-4 px-3'>{content}</p>
      <img
        className='w-full h-50 rounded'
        src={images[0].imgSrc}
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
          <Option
            text={likeCount}
            src={likeIcon}
            onClick={handleClickToggleLike}
          />
        )}

        <Link to={`/${feedId}`}>
          <Option text={commentCount} src={commentIcon} />
        </Link>
      </div>
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
    </div>
  );
}

export default Feed;
