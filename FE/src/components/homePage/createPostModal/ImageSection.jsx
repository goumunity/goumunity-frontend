import { useState } from 'react';
import { imageUpload } from '../../../utils/upload';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
function ImageSection({ isSlide, setImageSrcList, imageSrcList }) {
  const [imageList, setImageList] = useState('');

  const categorySectionClassName = isSlide
    ? 'opacity-100 w-96'
    : 'opacity-0 w-0';

  const handleChangeUploadProfileImg = (e) => {
    setImageSrcList(imageUpload(e.target, setImageList));
    console.log('결과 : ', imageSrcList);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      className={`flex flex-col bg-bright transition-width delay-700 duration-300  ${categorySectionClassName}`}
    >
      <label htmlFor='image'>
        <img src={defaultMaleIcon} alt='' />
      </label>

      <div className='flex justify-center items-center'>
        {imageList ? (
          <Slider className='h-4/5 w-4/5' {...settings}>
            {imageList.map((image, idx) => {
              return (
                <div key={idx} className='flex justify-center items-center w-1/3 h-1/3'>
                  <img
                    key={idx}
                    className='w-full h-full bg-black'
                    src={image}
                    alt=''
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div>이미지를 등록해주세요.</div>
        )}
      </div>
      <input
        id='image'
        type='file'
        multiple
        accept='image/*'
        className='hidden'
        onChange={handleChangeUploadProfileImg}
      />
    </div>
  );
}

export default ImageSection;
