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
import { useState } from 'react';

function DetailModal({ feedId }) {
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
  } = feed;

  // region 객체
  // const { createdAt, gungu, regionId, si, updatedAt } = region

  // user 객체
  // const { age, email, gender, id, imgSrc, monthBudget, nickname, regionId, userCategory } = user

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

  return (
    <>
      {/* <div className='fixed top-0 left-0 bg-back right-0 bottom-0'>
        <Link to='/'>
          <CloseButton
            className='absolute top-5 right-5'
            // onClick={handleClickGoHome}
          />
        </Link> */}
        <div className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-128 bg-bright border border-gray'>
          {feed ? (
            <div className='h-full flex'>
              <div className='flex flex-col w-3/5 px-10 py-8 scroll-auto'>
                <div className='flex items-center gap-3'>
                  <ProfileImage
                    size='8'
                    profileImage={user.imgSrc ? user.imgSrc : ''}
                  />
                  <NicknameBox
                    nickname={user.nickname}
                    daysAgo={daysAgo}
                    fontSize='md'
                  />
                </div>
                <p className='my-4 px-3'>{content}</p>
                {images.length !== 0 && (
                  <Slider
                    className='flex justify-center items-center w-full h-full bg-wheat'
                    {...settings}
                  >
                    {images.map((image, idx) => (
                      <img
                        key={idx}
                        className='h-64'
                        src={image.imgSrc}
                        alt=''
                      />
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

export default DetailModal;

// export async function loader(feedId) {
//     console.log('gdg')
//     const res = await instance.get(`/api/feeds${feedId}`);

//     if (res.statusText !== 'OK') {
//       throw json({ message: '에러 발생' }, { status: 500 });
//     } else {
//       return res.data;
//     }
//   }
