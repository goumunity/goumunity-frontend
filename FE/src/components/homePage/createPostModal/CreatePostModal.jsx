
import CloseButton from '@/components/common/CloseButton.jsx';
import { useState } from 'react';
import ProfileImage from '../../common/ProfileImage.jsx';
import Option from '../../common/Option.jsx';
import imageIcon from '@/assets/svgs/image.svg';
import mapIcon from '@/assets/svgs/map.svg';

import useInput from '../../../hooks/useInput.js';

import '@/styles.css';

const MAX_CONTENT_LENGTH = 500;

function CreatePostModal({onClose}) {
  const [input, handleChangeInput] = useInput('');

  const [isInfo, setIsInfo] = useState(true);

  const [isSlide, setIsSlide] = useState(false);

  // const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2';
  const modalClassName = isSlide ? 'w-128' : 'w-96';
  const mainSectionClassName = isSlide ? 'w-96' : 'w-96';
  const categorySectionClassName = isSlide
    ? 'opacity-100 w-96'
    : 'opacity-0 w-0';

  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide);
  };

  const handleClickToggleIsInfo = () => {
    setIsInfo(!isInfo);
  };

  return (
    <div className=''>
      <div
        className={`absolute top-1/2 left-1/2 flex transition-width duration-700 delay-300 ${modalClassName} -translate-x-1/2 -translate-y-1/2 z-10 `}
      >
        <div
          className={`bg-bright rounded-xl shadow-2xl ${mainSectionClassName} overflow-hidden `}
        >
          {/* <div>
            <button onClick={handleClickOpenSlide}>슬라이드</button>
          </div> */}
          <h1 className='font-daeam text-5xl my-2 text-center'>
            새 게시글 만들기
          </h1>

          <div className='flex items-center'>
            <button
              className='text-center w-1/2 border border-gray font-dove'
              onClick={handleClickToggleIsInfo}
            >
              정보글
            </button>
            <button
              className='text-center w-1/2 border border-gray font-dove'
              onClick={handleClickToggleIsInfo}
            >
              뻘글
            </button>
          </div>

          <div>
            <div className='flex justify-between items-center p-2'>
              <div className='flex items-center gap-2'>
                <ProfileImage />
                <span className='font-daeam'>청룡</span>
              </div>
              <span className='font-daeam'>관악구</span>
            </div>

            <div className='flex flex-col p-2'>
              <textarea
                className='px-2 h-44 bg-bright placeholder:font-her outline-none'
                type='text'
                placeholder='문구를 입력하세요...'
                onChange={handleChangeInput}
                value={input}
                maxLength={MAX_CONTENT_LENGTH}
              />
              <span className='text-right font-her'>
                {input.length}/{MAX_CONTENT_LENGTH}
              </span>
            </div>

            {/* <div className='flex p-2 justify-between'> */}
            <div className='flex gap-2 p-2'>
              <Option text='이미지' src={imageIcon} />
              {/* <Option
                  text='카테고리'
                  src={categoryIcon}
                  onClick={handleClickOpenSlide}
                /> */}
              {isInfo && (
                <Option
                  text='위치'
                  src={mapIcon}
                  onClick={handleClickOpenSlide}
                />
              )}
            </div>
            {/* </div> */}
          </div>
          {isInfo ? <div className='flex justify-center'>
            <input
              className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
              type='text'
              placeholder='정가'
            />
            <input
              className='border border-gray w-1/2 text-center font-her bg-bright outline-none'
              type='text'
              placeholder='할인가'
            />
          </div> : null}
          
        </div>

        <div
          className={`bg-bg transition-width delay-700 duration-300  ${categorySectionClassName} `}
        >
          gdgd
        </div>
      </div>
      {/* {isSlide && <MapModal isSlide={isSlide} />} */}
      <div className='fixed top-0 left-0 bg-back w-full h-full'>
        <CloseButton
          className='absolute top-5 right-5'
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default CreatePostModal;
