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

const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function CreatePostModal({ onClose }) {

  const currentUser = useSelector((state) => state.auth.currentUser)  

  const [content, handleChangeContent] = useInput('');

  const [price, handleChangePrice] = useNumInput('');

  const [afterPrice, handleChangeAfterPrice] = useNumInput('');

  const [isInfo, setIsInfo] = useState(true);

  const [isSlide, setIsSlide] = useState(false);

  const [region, handleChangeRegion] = useInput('');

  const [feedCategory, setFeedCategory] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const [imageSrcList, setImageSrcList] = useState([]);

  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide);
  };

  const navigate = useNavigate();

  const handleClickToggleIsInfo = () => {
    setIsInfo(!isInfo);
    if (isInfo) {
      setFeedCategory(FEED_CATEGORY_OPTIONS[0].name);
    } else {
      setFeedCategory(FEED_CATEGORY_OPTIONS[1].name);
    }
    console.log(isInfo);
  };

  const handleClickCreatePost = async () => {
    const data = {
      content,
      feedCategory: 'FUN',
      price,
      afterPrice,
      regionId: 1,
    };
    console.log(data);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const formData = new FormData();
    for (const image of imageSrcList) {
      formData.append('images', image);
      console.log('순회 결과 : ', image);
    }
    formData.append('data', blob);
    try {
      setIsLoading(true);
      const res = await axios.post('/api/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('gdgd', res)
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
    }
    setIsLoading(false);
    navigate('/')
    // onClose();
  };

  const activeClass = 'underline underline-offset-4 pointer-events-none';

  return (
    <div className=''>
      <div
        className={`absolute top-1/2 left-1/2 flex transition-width duration-700 delay-300 ${modalClassName} -translate-x-1/2 -translate-y-1/2 z-10 `}
      >
        <div
          className={`flex h-128 bg-bright rounded-xl shadow-2xl  overflow-hidden`}
        >
          <div className={`relative ${mainSectionClassName}`}>
            <button
              className='absolute right-5 top-5 font-daeam cursor-pointer'
              onClick={handleClickCreatePost}
            >
              {' '}
              게시
            </button>

            <div className='flex justify-center'>
              <h1 className='font-daeam text-5xl my-2 text-center'>
                새 게시글
              </h1>
            </div>

            <div className='flex items-center'>
              <button
                className={`text-center w-1/2 border border-gray font-dove ${
                  isInfo ? activeClass : ''
                }`}
                onClick={handleClickToggleIsInfo}
              >
                정보글
              </button>
              <button
                className={`text-center w-1/2 border border-gray font-dove ${
                  isInfo ? '' : activeClass
                }`}
                onClick={handleClickToggleIsInfo}
              >
                뻘글
              </button>
            </div>

            <div className='flex justify-between items-center p-2'>
              <div className='flex items-center gap-2'>
                <ProfileImage profileImage={currentUser.imgSrc}/>
                <span className='font-daeam'>
                  {currentUser.nickname}
                </span>
              </div>
              {/* <SelectBox onChange={(e) => handleChangeRegion(e.target.value)} /> */}
              <SelectBox onChange={handleChangeRegion} />
            </div>

            <ContentBox
              content={content}
              handleChangeContent={handleChangeContent}
            />

            <div className='flex gap-2 p-2'>
              <Option
                text='이미지'
                src={imageIcon}
                onClick={handleClickOpenSlide}
              />
            </div>
            {/* </div> */}

            {isInfo ? (
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
            setImageSrcList={setImageSrcList}
            imageSrcList={imageSrcList}
          />
        </div>
      </div>
      {/* {isSlide && <MapModal isSlide={isSlide} />} */}
      <div className='fixed top-0 left-0 bg-back w-full h-full'>
        <Link to='/'>
        <CloseButton className='absolute top-5 right-5'/>
        </Link>
      </div>
    </div>
  );
}

export default CreatePostModal;
