import { useEffect, useState } from 'react';
import Option from '../../common/Option';
import imageIcon from '@/assets/svgs/image.svg';
import mapIcon from '@/assets/svgs/mapIcon.svg';
import walletIcon from '@/assets/svgs/walletIcon.svg';
import useInput from '../../../hooks/useInput';
import '@/styles.css';
import { addCommas } from '../../../utils/formatting';
import useNumInput from '../../../hooks/useNumInput';
import ContentBox from './ContentBox';
import SelectBox from '../../common/SelectBox';
import ImageSection from './ImageSection';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ModalBackground from '../../common/ModalBackground';
import CategoryBox from './CategoryBox';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import instance from '@/utils/instance.js';
import SavingCategorySelectBox from '../../common/SavingCategorySelectBox';
import MobileImageSection from './MobileImageSection.jsx';
import {parsePrice, setFunData} from "@/utils/feeds.js";
import Swal from 'sweetalert2';

const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function CreateFeedModal({ setFeedList }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [price, handleChangePrice] = useNumInput('');
  const [afterPrice, handleChangeAfterPrice] = useNumInput('');
  const [isSlide, setIsSlide] = useState(false);
  const [feedCategory, setFeedCategory] = useState('INFO');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [content, handleChangeContent] = useInput('', setErrorMessage);
  const [region, handleChangeRegion] = useInput('', setErrorMessage);
  const [savingCategory, handleChangeSavingCategory] = useInput(
    '',
    setErrorMessage
  );
  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const [fileList, setFileList] = useState([]);
  const [isRegionSelectBoxOpen, setIsRegionSelectBoxOpen] = useState(false);
  const [isSavingCategorySelectBoxOpen, setIsSavingCategorySelectBoxOpen] =
    useState(false);

  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide);
  };

  const handleClickToggleRegionSelectBox = () => {
    setIsSavingCategorySelectBoxOpen(false);
    setIsRegionSelectBoxOpen(!isRegionSelectBoxOpen);
  };

  const handleClickToggleSavingCategorySelectBox = () => {
    setIsRegionSelectBoxOpen(false);
    setIsSavingCategorySelectBoxOpen(!isSavingCategorySelectBoxOpen);
  };

  const navigate = useNavigate();

  const handleClickCreatePost = async () => {
    if (content === '') {
      setErrorMessage('내용을 입력해주세요.');
      return;
    }
    if (region === '' || region === 'none') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }
    if (feedCategory === 'INFO' && (savingCategory === '' || savingCategory === 'none')) {
      setErrorMessage('절약항목을 선택해주세요.');
      return;
    }


    const parsedPrice = parsePrice(price)
    const parsedAfterPrice = parsePrice(afterPrice);

    if (feedCategory === 'INFO' && (Number.parseInt(parsedPrice)  < Number.parseInt(parsedAfterPrice))) {
      setErrorMessage('할인가가 더 높을 수 없습니다.');
      return;
    }

    const data = {
      content,
      feedCategory,
      price : parsedPrice,
      afterPrice : parsedAfterPrice,
      regionId: region,
      savingCategory,
    };

    setFunData(feedCategory, data)


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
            savingCategory: res.data.savingCategory,
          },
          ...prev,
        ]);
        window.scrollTo(0, 0);
      } catch (error) {
        
      }
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className=''>
      <div
        className={`fixed top-20 left-0 flex duration-700 w-full z-50 h-full`}
      >
        <div
          className={`flex-col w-full h-full pt-2 bg-bright rounded-lg shadow-2xl  overflow-scroll`}
        >
          <div className={`relative flex flex-col w-full h-fit`}>
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
              {/* <SelectBox
                color='bright'
                onChange={(e) => handleChangeRegion(e)}
              /> */}
            </div>

            <ContentBox
              content={content}
              handleChangeContent={handleChangeContent}
            />
            <div className='flex justify-center items-center h-8 font-dove text-red-600'>
              {errorMessage}
            </div>

            <div className='w-full relative flex justify-center gap-1 mb-2'>
              {/* <Option
                  text='지역'
                  size={5}
                  src={mapIcon}
                  onClick={handleClickToggleRegionSelectBox}
                /> */}
              <SelectBox
                title='어디서 아꼈나요?'
                color='bright'
                onChange={(e) => handleChangeRegion(e)}
                widthSize={'1/2'}
              />
              {/*          
                <Option
                  text='관심소비내역'
                  size={5}
                  src={walletIcon}
                  onClick={handleClickToggleSavingCategorySelectBox}
                /> */}
              {feedCategory === 'INFO' && (
                <SavingCategorySelectBox
                  title='절약항목'
                  color='bright'
                  onChange={(e) => handleChangeSavingCategory(e)}
                  widthSize={'1/3'}

                />
              )}
              <Option
                text='이미지'
                size={5}
                src={imageIcon}
                onClick={handleClickOpenSlide}
              />
              {/* <div className='absolute right-5'>
                {isRegionSelectBoxOpen && <SelectBox />}
                {isSavingCategorySelectBoxOpen && <SavingCategorySelectBox />}
              </div> */}
            </div>

            {feedCategory === FEED_CATEGORY_OPTIONS[0].name ? (
              <div className='w-full flex h-12 justify-around'>
                <div className='flex w-2/5'>
                  <span className='flex justify-center items-center w-12 p-1 bg-button text-white font-dove text-sm'>
                    정가
                  </span>
                  <input
                    className='w-full border border-gray text-center font-her bg-bright outline-none'
                    type='text'
                    placeholder='할인 받기 전 가격'
                    value={addCommas(price)}
                    onChange={handleChangePrice}
                  />
                </div>
                <div className='flex w-2/5'>
                  <span className='flex justify-center items-center w-12 p-1 bg-button text-white font-dove text-center text-xs'>
                    할인가
                  </span>
                  <input
                    className='border border-gray w-full text-center font-her bg-bright outline-none'
                    type='text'
                    placeholder='할인 받은 후 가격'
                    value={addCommas(afterPrice)}
                    onChange={handleChangeAfterPrice}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <MobileImageSection
            isSlide={isSlide}
            setFileList={setFileList}
            fileList={fileList}
          />
        </div>
      </div>
      <ModalBackground size={20}/>
    </div>
  );
}

export default CreateFeedModal;