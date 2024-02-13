import {useEffect, useState} from 'react';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import {Link} from 'react-router-dom';
import {calculateDate} from '../../utils/formatting';
import {useSelector} from 'react-redux';
import FeedLikeBox from './FeedLikeBox';
import NicknameBox from '../common/NicknameBox';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import instance from "@/utils/instance.js";
import FeedScrapBox from './FeedScrapBox';

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
    email
  } = feed;
  console.log('testtttttttt', feed)

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const daysAgo = calculateDate(updatedAt);
  const className = isLoading ? 'pointer-events-none opacity-75' : undefined;
  const [isLike, setIsLike] = useState(ilikeThat);
  const profit = price - afterPrice;

  const handleClickDeleteFeed = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const res = await instance.delete(`/api/feeds/${feedId}`);
      console.log('삭제 결과 : ', res);
      const newFeedList = feedList.filter((feed) => feed.feedId !== feedId);
      setFeedList(newFeedList);
    } catch (error) {
      console.log('피드 삭제 중 에러 발생 : ', error);
    }
    setIsLoading(false);
  };

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1280);

  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      setIsLargeScreen(window.innerWidth > 880);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // <div className='flex flex-col w-twitter border border-gray-300 px-4 py-3'>
    <div className={`flex flex-col border border-grey px-4 py-3 hover:bg-gray-50 ${isLargeScreen ? '' : ''}`} style={{width: isLargeScreen ? '600px': '300px'}}>
      <div className='relative flex items-center gap-2'>
        <Link to={`/profile/${email}`}>
          <div
            className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
          >
            {imgSrc ? (
              <img className={`w-full h-full cursor-pointer`} src={imgSrc} />
            ) : (
              <img
                className={`w-full h-full cursor-pointer`}
                src={defaultMaleIcon}
              />
            )}
          </div>
        </Link>
        {/* <ProfileImage size='8' profileImage={imgSrc ? imgSrc : ''} /> */}
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
      {profit !== 0 && (
        <div className='mt-2 flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <div className='font-dove text-entrance'>
              원가
            </div>
            <span className='font-her'>{price}원</span>
          </div>

          <div className='flex items-center gap-1'>
            <div className='font-dove text-entrance'>할인가</div>
            <span className='font-her'>{afterPrice}원</span>
          </div>
          
          <div className='flex items-center gap-1'>
            <div className='font-dove text-red-400'>절약내역</div>
            <span className='font-her'>{profit}원</span>
          </div>

        </div>
      )}
      <p className={`my-4 px-2 overflow-x-hidden`} style={{width: isLargeScreen ? '560px': '280px'}}>{content}</p>

      <Link to={`/${feedId}`}>
        <img className='w-full max-h-96 rounded' src={images[0]?.imgSrc} alt='' />
      </Link>

      <div className='flex items-center my-1 gap-12'>
        <FeedLikeBox
          ilikeThat={ilikeThat}
          likeCount={likeCount}
          feedId={feedId}
        />
        <Link to={`/${feedId}`}>
          <Option text={commentCount} src={commentIcon} size={5} />
        </Link>
        <FeedScrapBox
          isScrapped={isScrapped}
          feedId={feedId}
        />
      </div>
    </div>
  );
}

export default Feed;
