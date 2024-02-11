import CloseButton from '@/components/common/CloseButton';
import { useState } from 'react';
import ProfileImage from '../../common/ProfileImage';
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
import { Link, useNavigate } from 'react-router-dom';
import ModalBackground from '../../common/ModalBackground';
import CategoryBox from './CategoryBox';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import instance from '@/utils/instance.js';

const REGION_OPTIONS = [
  { id: 1, name: '광진구' },
  { id: 2, name: '중랑구' },
  { id: 3, name: '동작구' },
];

const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function CreateFeedModal({ onClose, setFeedList }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [price, handleChangePrice] = useNumInput('');
  const [afterPrice, handleChangeAfterPrice] = useNumInput('');
  const [isSlide, setIsSlide] = useState(false);
  const [feedCategory, setFeedCategory] = useState('INFO');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [content, handleChangeContent] = useInput('', setErrorMessage);
  const [region, handleChangeRegion] = useInput('', setErrorMessage);

  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const [fileList, setFileList] = useState([]);

  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide);
  };

  const navigate = useNavigate();

  const handleClickCreatePost = async () => {
    if (content === '') {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }

    if (region === '') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }

    if (feedCategory === '') {
      setErrorMessage('카테고리를 선택해주세요.');
      return;
    }

    const data = {
      content,
      feedCategory,
      price,
      afterPrice,
      regionId: region,
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const formData = new FormData();
    if (fileList.length > 0) {
      for (const image of fileList) {
        formData.append('images', image);
      }
    }

    // for (const image of imageSrcList) {
    //   formData.append('images', image);
    // }

    formData.append('data', blob);
    try {
      setIsLoading(true);
      const res = await instance.post('/api/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const feedId = res.data;
      try {
        const res = await instance.get(`/api/feeds/${feedId}`);
        setFeedList((prev) => [
          {
            afterPrice: res.data.afterPrice,
            commentCount: res.data.commentCount,
            content: res.data.content,
            createdAt: res.data.createdAt,
            feedCategory: res.data.feedCategory,
            feedId: res.data.feedId,
            gungu: res.data.region.gungu,
            ilikeThat: false,
            images: res.data.images,
            imgSrc: res.data.user.imgSrc,
            likeCount: 0,
            nickname: res.data.user.nickname,
            price: res.data.price,
            regionId: res.data.region.regionId,
            si: res.data.region.si,
            updatedAt: res.data.updatedAt,
            isScrapped: false,
          },
          ...prev,
        ]);
        console.log('게시글 단일 조회 결과 : ', res.data);
      } catch (error) {
        console.log('게시글 단일 조회 중 에러 발생 : ', error);
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
                새 게시글
              </h1>
              <button
                className='absolute right-5 top-5 font-daeam cursor-pointer'
                onClick={handleClickCreatePost}
              >
                게시
              </button>
            </div>

            <CategoryBox
              feedCategory={feedCategory}
              setFeedCategory={setFeedCategory}
            />

            <div className='flex justify-between items-center p-2'>
              <div className='flex items-center gap-2'>
                <Link to={`/profile/${currentUser.nickname}`}>
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
                  >
                    {currentUser.imgSrc ? (
                      <img
                        className={`w-full h-full cursor-pointer`}
                        src={currentUser.imgSrc}
                      />
                    ) : (
                      <img
                        className={`w-full h-full cursor-pointer`}
                        src={defaultMaleIcon}
                      />
                    )}
                  </div>
                </Link>
                {/* <ProfileImage size={10} profileImage={currentUser.imgSrc} /> */}
                <span className='font-daeam'>{currentUser.nickname}</span>
              </div>
              {/* <SelectBox onChange={(e) => handleChangeRegion(e.target.value)} /> */}
              <SelectBox
                color='bright'
                onChange={(e) => handleChangeRegion(e)}
              />
            </div>

            <ContentBox
              content={content}
              handleChangeContent={handleChangeContent}
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

            {feedCategory === FEED_CATEGORY_OPTIONS[0].name ? (
              <div className='flex justify-center'>
                <input
                  className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
                  type='text'
                  placeholder='정가'
                  value={addCommas(price)}
                  onChange={handleChangePrice}
                />
                <input
                  className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
                  type='text'
                  placeholder='할인가'
                  value={addCommas(afterPrice)}
                  onChange={handleChangeAfterPrice}
                />
              </div>
            ) : null}
          </div>
          <ImageSection
            isSlide={isSlide}
            setFileList={setFileList}
            fileList={fileList}
          />
        </div>
      </div>
      <ModalBackground />
    </div>
  );
}

export default CreateFeedModal;
