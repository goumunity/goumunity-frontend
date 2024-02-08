import { useEffect, useState } from 'react';
import Option from '../../common/Option';
import imageIcon from '@/assets/svgs/image.svg';
import useInput from '../../../hooks/useInput';
import '@/styles.css';
import { addCommas } from '../../../utils/formatting';
import useNumInput from '../../../hooks/useNumInput';
import ContentBox from './ContentBox';
import SelectBox from '../../common/SelectBox';
import axios from 'axios';
import ImageSection from './ImageSection';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ModalBackground from '../../common/ModalBackground';
import CategoryBox from './CategoryBox';
import useAxiosGet from '../../../hooks/useAxiosGet';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import { imageUpload } from '../../../utils/upload';
import Slider from 'react-slick';
import CloseButton from '../../common/CloseButton';

const REGION_OPTIONS = [
  { id: 1, name: '광진구' },
  { id: 2, name: '중랑구' },
  { id: 3, name: '동작구' },
];

const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function PatchFeedModal({ onClose, setFeedList }) {
  const params = useParams();
  const [feed, isFeedLoading] = useAxiosGet(`/api/feeds/${params.patchId}`);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    afterPrice,
    content,
    createdAt,
    feedCategory,
    images,
    price,
    region,
    updatedAt,
    user,
  } = feed;
  console.log(feed)
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [newPrice, handleChangeNewPrice, setNewPrice] = useNumInput('');
  const [newAfterPrice, handleChangeNewAfterPrice, setNewAfterPrice] = useNumInput('');
  const [isSlide, setIsSlide] = useState(true);
  const [newFeedCategory, setNewFeedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  const [newContent, handleChangeNewContent, setNewContent] = useInput('', setErrorMessage);
  const [newRegion, handleChangeNewRegion, setNewRegion] = useInput('', setErrorMessage );
  const [imageList, setImageList] = useState([]);
  
  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const [newImageSrcList, setNewImageSrcList] = useState([]);

  useEffect(() => {
    setNewFeedCategory(feedCategory)
    setNewContent(content)
    setNewAfterPrice(afterPrice)
    setNewPrice(price)
    setImageList(images)
    console.log('feed값:',feed)
    console.log('region값:ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',region)
    // setNewRegion(region.gungu)
    
    if (images?.length > 0) {
      setIsSlide(true)
    }
  }, [feed])

  useEffect(() => {
    setNewImageSrcList()
  }, [imageList])

  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide);
  };

  const navigate = useNavigate();

  const handleClickPatchFeed = async () => {
    if (newContent === '') {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }

    if (newRegion === '') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }

    if (newFeedCategory === '') {
      setErrorMessage('카테고리를 선택해주세요.');
      return;
    }

    // 
    const data = {
      content: newContent,
      feedCategory: newFeedCategory,
      price: newPrice,
      afterPrice: newAfterPrice,
      regionId: newRegion,
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const formData = new FormData();
    for (const image of newImageSrcList) {
      formData.append('images', image);
    }
    formData.append('data', blob);
    try {
      setIsLoading(true);
      const res = await axios.post('/api/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const feedId = res.data
      try {
        const res = await axios.get(`/api/feeds/${feedId}`)
          console.log('단일 조회 : ', res)
          setFeedList((prev) => [res.data, ...prev])
        console.log('게시글 단일 조회 결과 : ', res.data)
      } catch (error) {
        console.log('게시글 단일 조회 중 에러 발생 : ', error)
      }

    } catch (error) {
      console.error('게시글 생성 중 오류 발생 : ', error);
    }
    setIsLoading(false);
    navigate('/');
  };

  const categorySectionClassName = isSlide ? 'visible w-96' : 'hidden w-0';

  

  const handleChangeUploadProfileImg = (e) => {
    setNewImageSrcList(imageUpload(e.target, setImageList));

  };

  const handleClickDeleteImage = (target) => {
    let newImageList = imageList.filter((image) => {
      return image !== target;
    });
    // if (newImageList === undefined) {
    //   newImageList = []
    // }
    setImageList(newImageList);
    // setNewImageSrcList(imageList)
    console.log('삭제 후:', imageList)
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // customPaging: (i) => <button style={{ width: '30px', height: '30px' }}>{i + 1}</button>,
  };

  return (
    <div className=''>
      <div
        className={`fixed top-1/2 left-1/2 flex transition-width duration-700 delay-300 ${modalClassName} -translate-x-1/2 -translate-y-1/2 z-10 `}
      >
        <div
          className={`flex h-128 bg-bright rounded-xl shadow-2xl  overflow-hidden`}
        >
          <div className={`relative ${mainSectionClassName}`}>
            <div className='flex justify-center'>
              <h1 className='font-daeam text-5xl my-2 text-center'>
                게시글 수정
              </h1>
              <button
                className='absolute right-5 top-5 font-daeam cursor-pointer'
                onClick={handleClickPatchFeed}
              >
                게시
              </button>
            </div>

            <CategoryBox
              feedCategory={newFeedCategory}
              setFeedCategory={setNewFeedCategory}
            />

            <div className='flex justify-between items-center p-2'>
              <div className='flex items-center gap-2'>
              <Link to={`/profile/${user?.nickname}`}>
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
                  >
                    {user?.imgSrc ? (
                      <img
                        className={`w-full h-full cursor-pointer`}
                        src={user?.imgSrc}
                      />
                    ) : (
                      <img
                        className={`w-full h-full cursor-pointer`}
                        src={defaultMaleIcon}
                      />
                    )}
                  </div>
                </Link>
                <span className='font-daeam'>{user?.nickname}</span>
              </div>
              {/* <SelectBox onChange={(e) => handleChangeRegion(e.target.value)} /> */}
              
              <SelectBox
                color='bright'
                onChange={(e) => handleChangeNewRegion(e)}
                defaultValue={region?.gungu}
              />
            </div>

            <ContentBox
              content={newContent}
              handleChangeContent={handleChangeNewContent}
            />
            <div className='h-2 text-center font-dove text-red-600'>
              {errorMessage}
            </div>
            <div className='flex gap-2 p-2'>
              <Option
                text='이미지'
                size={5}
                src={imageIcon}
                onClick={handleClickOpenSlide}
              />
            </div>
            {/* </div> */}

            {feedCategory === FEED_CATEGORY_OPTIONS[0].name ? (
              <div className='flex justify-center'>
                <input
                  className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
                  type='text'
                  placeholder='정가'
                  value={addCommas(Number(newPrice))}
                  onChange={handleChangeNewPrice}
                />
                <input
                  className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
                  type='text'
                  placeholder='할인가'
                  value={addCommas(Number(newAfterPrice))}
                  onChange={handleChangeNewAfterPrice}
                />
              </div>
            ) : null}
          </div>
          <div
      className={`flex justify-center items-center bg-bright border-gray border-l transition-width delay-700 duration-300  ${categorySectionClassName}`}
    >
      {imageList.length > 0 ? (
        // <div>gdgd</div>
        <Slider
          className='flex items-center justify-center w-full h-full'
          {...settings}
        >
          {imageList.map((image, idx) => {
            console.log(image)
            return (
              <div
                key={idx}
                className='flex items-center justify-center w-full h-96'
              >
                <img
                  className='w-full h-96'
                  src={image.imgSrc || image}
                  alt=''
                />
                <CloseButton
                  className='absolute right-5 top-5'
                  onClick={() => handleClickDeleteImage(image)}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className='flex flex-col justify-center items-center gap-5 w-full h-full'>
          <svg
            aria-label='이미지나 동영상과 같은 미디어를 나타내는 아이콘'
            className='x1lliihq x1n2onr6 x5n08af'
            fill='currentColor'
            height='77'
            role='img'
            viewBox='0 0 97.6 77.3'
            width='96'
          >
            <path
              d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
              fill='currentColor'
            ></path>
            <path
              d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
              fill='currentColor'
            ></path>
            <path
              d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
              fill='currentColor'
            ></path>
          </svg>

          <span className='font-her'>
            영수증, 할인정보에 관한 <br />
            사진을 등록해주세요.
          </span>
          <label className='cursor-pointer' htmlFor='image'>
            <div className='font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1'>
              사진 등록
            </div>
            <input
              id='image'
              type='file'
              multiple
              accept='image/*'
              className='hidden'
              onChange={handleChangeUploadProfileImg}
            />
          </label>
        </div>
      )}
    </div>
        </div>
      </div>
      <ModalBackground />
    </div>
  );
}

export default PatchFeedModal;
