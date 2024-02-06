import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../utils/formatting';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FeedLikeBox from './FeedLikeBox';
import NicknameBox from '../common/NicknameBox';

// 댓글, 답글 200자
function Feed({ feed, setFeedList, feedList, ...props }) {
  const {
    afterPrice,
    commentCount,
    content,
    createdAt,
    feedCategory,
    feedId,
    gungu,
    ilikeThat,
    images,
    imgSrc,
    likeCount,
    nickname,
    price,
    regionId,
    si,
    updatedAt,
    isScrapped,
  } = feed;

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const daysAgo = calculateDate(updatedAt);
  const className = isLoading ? 'pointer-events-none opacity-75' : undefined;
  const [isLike, setIsLike] = useState(ilikeThat);

  const handleClickDeleteFeed = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/feeds/${feedId}`);
      console.log('삭제 결과 : ', res);
      const newFeedList = feedList.filter((feed) => feed.feedId !== feedId);
      setFeedList(newFeedList);
    } catch (error) {
      console.log('피드 삭제 중 에러 발생 : ', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='flex flex-col w-post border border-gray px-4 py-3'>
      <div className='relative flex items-center gap-2'>
        <ProfileImage size='8' profileImage={imgSrc ? imgSrc : ''} />
        <NicknameBox nickname={nickname} daysAgo={daysAgo} fontSize='md' />
        {nickname === currentUser.nickname && (
          <div className='flex font-daeam absolute right-1 gap-3'>
            <Link to={`/patch/${feedId}`}>
              <button className={`${className}`}>수정</button>
            </Link>
            <button className={`${className}`} onClick={handleClickDeleteFeed}>
              삭제
            </button>
          </div>
        )}
      </div>

      <p className='my-4 px-2'>{content}</p>

      <Link to={`/${feedId}`}>
        <img className='w-full h-50 rounded' src={images[0]?.imgSrc} alt='' />
      </Link>

      <div className='flex items-center my-1 gap-2'>
        <FeedLikeBox
          ilikeThat={ilikeThat}
          likeCount={likeCount}
          feedId={feedId}
        />
        <Link to={`/${feedId}`}>
          <Option text={commentCount} src={commentIcon} size={5} />
        </Link>
      </div>
    </div>
  );
}

export default Feed;
