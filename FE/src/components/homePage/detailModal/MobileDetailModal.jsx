import CloseButton from '../../common/CloseButton';
import ProfileImage from '../../common/ProfileImage';
import CommentSection from './CommentSection';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../../utils/formatting';
import useAxiosGet from '../../../hooks/useAxiosGet';
import Slider from 'react-slick';
import Loading from '../../common/Loading';
import NicknameBox from '../../common/NicknameBox';
import ModalBackground from '../../common/ModalBackground';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '../../../utils/instance';
import MobileCommentSection from './MobileCommentSection';
// import DropdownMenu from './DropDownMenu';

function MobileDetailModal({ feedId, feedList, setFeedList }) {
  const [feed, isLoading, errorMessage] = useAxiosGet(`/api/feeds/${feedId}`);

  const {
    afterPrice,
    commentCount,
    content,
    createdAt,
    feedCategory,
    ilikeThat,
    images,
    likeCount,
    price,
    region,
    updatedAt,
    user,
    isScrapped,
  } = feed;
  console.log('gdgd', feed);

  const modalRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();

  // region 객체
  // const { createdAt, gungu, regionId, si, updatedAt } = region

  // user 객체
  // const { age, email, gender, id, imgSrc, monthBudget, nickname, regionId, userCategory } = user

  useEffect(() => {
    // component가 생성 시 mousedown 이벤트에 clickOutside 함수 추가
    document.addEventListener('mousedown', closeModalWithClickOutside);

    return () => {
      // component가 해제 시 mousedown 이벤트에서 clickOutside 함수 제거
      document.removeEventListener('mousedown', closeModalWithClickOutside);
    };
  });

  const closeModalWithClickOutside = (e) => {
    if (!modalRef.current.contains(e.target)) {
      navigate('/');
    }
  };

  // const [commentCnt, setCommentCnt] = useState(commentCount);
  const [commentCnt, setCommentCnt] = useState(0);

  useEffect(() => {
    setCommentCnt(commentCount)
  }, [feed])

  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const className = isLoading ? 'pointer-events-none opacity-75' : undefined;
  const profit = price - afterPrice;

  const handleClickDeleteFeed = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      const res = await instance.delete(`/api/feeds/${feedId}`);
      // feed.feedId와 feedId는 타입이 다르므로 !== 를 하면 안됨
      const newFeedList = feedList.filter((feed) => feed.feedId != feedId);
      setFeedList(newFeedList);
      navigate('/');
    } catch (error) {
      console.log('피드 삭제 중 에러 발생 : ', error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  // useEffect()

  return (
    <>
      <div
        className='z-50 fixed h-screen w-full bg-bright border border-gray overflow-scroll'
        ref={modalRef}
      >
        {feed ? (
          <div className='h-full flex-col'>
            <div className='flex flex-col w-full mb-10'>
              <div className='flex items-center justify-between gap-1 p-5 border-b'>
                <div className='flex'>
                <ProfileImage
                  size='8'
                  profileImage={user.imgSrc ? user.imgSrc : ''}
                />

                <div className={`flex flex-row items-center gap-2 mx-1 text-sm`}>
                    <span className='font-daeam'>{user.nickname}</span>
                    <span className='font-her' style={{fontSize:'10px'}}>{daysAgo}</span>
                    <span className='font-her' style={{fontSize:'10px'}}>{region.gungu}</span>
                </div>

                {user.nickname === currentUser.nickname && (
                    <div className="relative">
                    <button
                      className="z-100 inline-flex items-center"
                      onClick={toggleMenu}
                    >
                      <svg
                        className="fill-current h-4 w-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                        <Link to={`/patch/${feedId}`}>
                        <a
                          href="#"
                          className="z-101 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                        >
                          수정
                        </a>
                        </Link>
                        <a
                          onClick={handleClickDeleteFeed}
                          className="z-101 block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                        >
                          삭제
                        </a>
                      </div>
                    )}
                  </div>
                )}
                </div>
                
                <CloseButton onClick={ () => { navigate('/')}}/>
              </div>
              
              <p className='min-h-20 p-2'>{content}</p>
              {images.length !== 0 && (
                <Slider
                  className='flex justify-center items-center w-full h-full bg-wheat'
                  {...settings}
                >
                  {images.map((image, idx) => (
                    <img key={idx} className='h-64' src={image.imgSrc} alt='' />
                  ))}
                </Slider>
              )} 
            </div>
            <MobileCommentSection
              feedId={feedId}
              createdAt={createdAt}
              updatedAt={updatedAt}
              likeCount={likeCount}
              ilikeThat={ilikeThat}
              commentCnt={commentCnt}
              setCommentCnt={setCommentCnt}
              isScrapped={isScrapped}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <ModalBackground />
      {/* </div> */}
    </>
  );
}

export default MobileDetailModal;
