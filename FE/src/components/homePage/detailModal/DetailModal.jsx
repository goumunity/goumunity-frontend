import CloseButton from '../../common/CloseButton';
import ProfileImage from '../../common/ProfileImage';
import CommentSection from './CommentSection';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { calculateDate } from '../../../utils/formatting';
import useAxiosGet from '../../../hooks/useAxiosGet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

function DetailModal() {
  const params = useParams();
  // const feed = useLoaderData(params.feedId);
  // const [feed, setFeed] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [post, isLoading, errorMessage] = useAxiosGet(`/api/feeds/${params.postId}`);
  const [feed, isLoading, errorMessage] = useAxiosGet(
    `/api/feeds/${params.feedId}`
  );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //     const res = await axios.get(`/api/feeds/${params.feedId}`)
  //     console.log('feed 상세 요청 결과 : ', res)
  //     setFeed(res.data)
  //   } catch (error) {
  //     console.log('feed 상세 요청 실패 : ', error)
  //   }
  //   }
  //   fetchData();
  // }, [])
  const navigate = useNavigate();

  // 모달 닫기(홈으로 가기)
  const handleClickGoHome = () => {
    navigate('/');
  };

  const {
    afterPrice,
    commentCount,
    content,
    createdAt,
    images,
    likeCount,
    price,
    region,
    updatedAt,
    user,
  } = feed;
  const daysAgo = calculateDate(updatedAt);
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
      {feed ? (
        <div className='fixed top-0 left-0 bg-back right-0 bottom-0'>
          <CloseButton
            className='absolute top-5 right-5'
            onClick={handleClickGoHome}
          />
          <div className='z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-128 bg-bright border border-gray'>
            <div className='h-full flex'>
              <div className='flex flex-col w-2/3 px-10 py-8 scroll-auto'>
                <div className='flex items-center gap-5'>
                  <ProfileImage
                    size='8'
                    profileImage={user.imgSrc ? user.imgSrc : ''}
                  />
                  <div>
                    {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
                    <span className='font-daeam'>{user.nickname}</span>
                    {' * '}
                    <span className='font-her'>{daysAgo}</span>
                  </div>
                </div>
                <p className='my-4 px-3'>{content}</p>
                {images.length ? (
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
                ) : (
                  <div className='flex justify-center items-center'>
                    이미지를 등록해주세요.
                  </div>
                )}
              </div>
              <CommentSection
                feedId={params.feedId}
                updatedAt={updatedAt}
                likeCount={likeCount}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>gdgd</div>
      )}
    </>
  );
}

export default DetailModal;

// export async function loader(feedId) {
//     console.log('gdg')
//     const res = await axios.get(`/api/feeds${feedId}`);

//     if (res.statusText !== 'OK') {
//       throw json({ message: '에러 발생' }, { status: 500 });
//     } else {
//       return res.data;
//     }
//   }
