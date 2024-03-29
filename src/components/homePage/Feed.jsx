import { useEffect, useState } from 'react';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import { Link } from 'react-router-dom';
import { calculateDate } from '../../utils/formatting';
import { useSelector } from 'react-redux';
import FeedLikeBox from './FeedLikeBox';
import NicknameBox from '../common/NicknameBox';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import instance from '@/utils/instance.js';
import FeedScrapBox from './FeedScrapBox';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import scrapIcon from '@/assets/svgs/scrapIcon.svg';
import unScrapIcon from '@/assets/svgs/unScrapIcon.svg';
import Swal from 'sweetalert2';

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
    email,
  } = feed;
  // console.log('testtttttttt', feed)

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const daysAgo = calculateDate(updatedAt);
  const className = isLoading ? 'pointer-events-none opacity-75' : undefined;
  const [isFeedLiked, setIsFeedLiked] = useState(ilikeThat);
  const [isFeedScrapped, setIsFeedScrapped] = useState(isScrapped);
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const profit = price - afterPrice;

  const handleClickDeleteFeed = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      setIsLoading(true);
      const res = await instance.delete(`/api/feeds/${feedId}`);
      const newFeedList = feedList.filter((feed) => feed.feedId !== feedId);
      setFeedList(newFeedList);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsFeedLiked(ilikeThat);
    setIsFeedScrapped(isScrapped);
    setFeedLikeCount(likeCount);
  }, [feedId]);

  const handleClickCreateFeedLike = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/like`);

      setIsFeedLiked(true);
      setFeedLikeCount((prev) => prev + 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, likeCount: feed.likeCount + 1, ilikeThat: true };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteFeedLike = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unlike`);
      setIsFeedLiked(false);
      setFeedLikeCount((prev) => prev - 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, likeCount: feed.likeCount - 1, ilikeThat: false };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickCreateFeedScrap = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/scrap`);
      setIsFeedScrapped(true);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, isScrapped: true };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteFeedScrap = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unscrap`);
      setIsFeedScrapped(false);
      // setFeedLikeCount((prev) => prev - 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, isScrapped: false };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    // <div className='flex flex-col w-twitter border border-gray-300 px-4 py-3'>
    <div
      className={`flex flex-col border border-grey px-4 py-3 hover:bg-gray-50 ${
        isLargeScreen ? '' : ''
      }`}
      style={{ width: isLargeScreen ? '600px' : '300px' }}
    >
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

        {nickname === currentUser.nickname &&
          (isLargeScreen ? (
            <>
              <div className='flex font-daeam absolute right-1 gap-3'>
                <Link to={`/patch/${feedId}`}>
                  <button className={`${className}`}>수정</button>
                </Link>
                <button
                  className={`${className}`}
                  onClick={handleClickDeleteFeed}
                >
                  삭제
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='relative'>
                <button
                  className='z-100 inline-flex items-center'
                  onClick={toggleMenu}
                >
                  <svg
                    className='fill-current h-4 w-4 ml-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z' />
                  </svg>
                </button>
                {isOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl'>
                    <Link to={`/patch/${feedId}`}>
                      <a
                        href='#'
                        className='z-101 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white'
                      >
                        수정
                      </a>
                    </Link>
                    <a
                      onClick={handleClickDeleteFeed}
                      className='z-101 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white'
                    >
                      삭제
                    </a>
                  </div>
                )}
              </div>
            </>
          ))}
      </div>
      {profit !== 0 && (
        <div className='mt-2 flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <div className='font-dove text-entrance'>원가</div>
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

      <pre className={`my-4 px-2 text-pretty overflow font-daeam`} style={{width: isLargeScreen ? '560px': '280px', overflowWrap : 'break-word'}}>{content}</pre>

      <Link to={`/${feedId}`}>
        <img
          className='w-full max-h-96 rounded'
          src={images[0]?.imgSrc}
          alt=''
        />
      </Link>

      <div className='flex items-center my-1 gap-12'>
        {/* <FeedLikeBox
          ilikeThat={isFeedLiked}
          likeCount={feedLikeCount}
          feedId={feedId}
          feedList={feedList}
          setFeedList={setFeedList}
        /> */}
        <div>
      {isFeedLiked ? (
        <Option
          text={feedLikeCount}
          size={5}
          src={unLikeIcon}
          onClick={handleClickDeleteFeedLike}
        />
      ) : (
        <Option
          text={feedLikeCount}
          size={5}
          src={likeIcon}
          onClick={handleClickCreateFeedLike}
        />
      )}
    </div>
        <Link to={`/${feedId}`}>
          <Option text={commentCount} src={commentIcon} size={5} />
        </Link>
        {/* <FeedScrapBox isFeedScrapped={isFeedScrapped} feedId={feedId} feedList={feedList} setFeedList={setFeedList}/> */}
        <div>
      {isFeedScrapped ? (
        <Option
          text='스크랩 취소'
          size={5}
          src={scrapIcon}
          onClick={handleClickDeleteFeedScrap}
        />
      ) : (
        <Option
          text='스크랩'
          size={5}
          src={unScrapIcon}
          onClick={handleClickCreateFeedScrap}
        />
        // <FontAwesomeIcon icon={faMarker} onClick={handleClickCreateFeedScrap}/>
      )}
    </div>
      </div>
    </div>
  );
}

export default Feed;
