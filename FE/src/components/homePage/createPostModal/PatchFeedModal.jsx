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
import instance from "@/utils/instance.js";

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
  
  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const [newImageSrcList, setNewImageSrcList] = useState([]);

  useEffect(() => {
    setNewFeedCategory(feedCategory)
    setNewContent(content)
    setNewAfterPrice(afterPrice)
    setNewPrice(price)
    setNewImageSrcList(images)
    console.log('feed값:',feed)
    console.log('region값:ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',region)
    // setNewRegion(region.gungu)
    
    if (images?.length > 0) {
      setIsSlide(true)
    }
  }, [feed])

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
      const res = await instance.post('/api/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const feedId = res.data
      try {
        const res = await instance.get(`/api/feeds/${feedId}`)
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
                    className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer`}
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
          <ImageSection
            isSlide={isSlide}
            setImageSrcList={setNewImageSrcList}
            originalImageList={images}
          />
        </div>
      </div>
      <ModalBackground />
    </div>
  );
}

export default PatchFeedModal;
