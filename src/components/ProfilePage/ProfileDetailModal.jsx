import CloseButton from '@/components/common/CloseButton';
import ProfileImage from '@/components/common/ProfileImage';
import CommentSection from '../../components/homePage/detailModal/CommentSection';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../utils/formatting';
import useAxiosGet from '../../hooks/useAxiosGet';
import Slider from 'react-slick';
import Loading from '../common/Loading';
import NicknameBox from '../common/NicknameBox';
import ModalBackground from '../common/ModalBackground';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '../../utils/instance';
import Swal from 'sweetalert2';

function ProfileDetailModal({ feedId, feedList, setFeedList }) {
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
      navigate('/myprofile');
    }
  };

  const [commentCnt, setCommentCnt] = useState(commentCount);
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
      navigate('/myprofile');
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div
        className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-128 bg-bright border border-gray'
        ref={modalRef}
      >
        {feed ? (
          <div className='h-full flex'>
            <div className='flex flex-col w-3/5 scroll-auto'>
              <div className='relative flex items-center gap-3 px-8 py-5 border-b'>
                <ProfileImage
                  size='8'
                  profileImage={user.imgSrc ? user.imgSrc : ''}
                />
                <NicknameBox
                  nickname={user.nickname}
                  daysAgo={daysAgo}
                  gungu={region.gungu}
                  fontSize='md'
                />
                {user.nickname === currentUser.nickname && (
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
                )}
              </div>
              <p className='my-4 px-10 min-h-40'>{content}</p>
              {images.length !== 0 && (
                <Slider
                  className='flex justify-center items-center w-full h-full px-8 bg-wheat'
                  {...settings}
                >
                  {images.map((image, idx) => (
                    <img key={idx} className='h-64' src={image.imgSrc} alt='' />
                  ))}
                </Slider>
              )}
            </div>
            <CommentSection
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

export default ProfileDetailModal;
