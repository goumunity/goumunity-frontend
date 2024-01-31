import { useState } from 'react';
import { imageUpload } from '../../../utils/upload';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
function ImageSection({ isSlide, setImageSrcList, imageSrcList }) {
  const [imageList, setImageList] = useState([]);

  const categorySectionClassName = isSlide
    ? 'opacity-100 w-96'
    : 'opacity-0 w-0';

  const handleChangeUploadProfileImg = (e) => {
    setImageSrcList(imageUpload(e.target, setImageList));
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
    <div
      className={` flex flex-col h-full bg-bright transition-width delay-700 duration-300  ${categorySectionClassName}`}
    >
      <div className='relative '>
        <label className='cursor-pointer' htmlFor='image'>
          <span>이미지 등록</span>
        </label>
        <span className='absolute top-0 right-3'>
          gdgd
        </span>
      </div>

      {imageList.length ? (
        <Slider
          className='flex justify-center items-center w-full h-full bg-wheat'
          {...settings}
        >
          {/* <div>gdgd</div> */}
          {imageList.map((image, idx) => (
            <img key={idx} className='h-96' src={image} alt='' />
          ))}
        </Slider>
      ) : (
        <div className='flex justify-center items-center'>이미지를 등록해주세요.</div>
      )}
      {/* {imageList ? (
          <Slider className='h-4/5 w-4/5' {...settings}>
            {imageList.map((image, idx) => {
              console.log(`${idx + 1}번째 이미지 : ${image}`)
              return (
                // <div key={idx} className='flex justify-center items-center w-1/3 h-1/3'>
                  <img
                    key={idx}
                    className='w-full h-full bg-black'
                    src={image}
                    alt=''
                  />
                // </div>
              );
            })}
          </Slider>
        ) : ( */}
      {/* )} */}

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
