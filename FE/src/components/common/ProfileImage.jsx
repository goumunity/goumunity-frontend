import React from 'react';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';

function ProfileImage({ size, profileImage, ...props }) {
  
  return (
    <>
      {profileImage ? (
        <label htmlFor='profileImg' className='cursor-pointer'>
          <img
            className={`rounded-full w-${size} h-${size} border-2`}
            // src={profileImage}
            src={profileImage}
          />
        </label>
      ) : (
        <label htmlFor='profileImg' className='cursor-pointer'>
          <img
            className={`rounded-full w-${size} h-${size} border-2`}
            // src={profileImage}
            src={defaultMaleIcon}
          />
        </label>
      )}
      {/* <label
        htmlFor='profileImg'
        className='absolute top-1/2 left-1/2 translate-x-5 translate-y-4 cursor-pointer z-50'
      >
        <svg
          width='25'
          height='25'
          viewBox='0 0 42 39'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22 35.1579H3.2C2.53726 35.1579 2 34.6631 2 34.0526V3.10526C2 2.49484 2.53726 2 3.2 2H36.8C37.4628 2 38 2.49484 38 3.10526V20.4211'
            stroke='black'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2 25.9475L16 20.4211L27 25.0264'
            stroke='black'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M28 14.8948C25.7908 14.8948 24 13.2453 24 11.2106C24 9.17584 25.7908 7.52637 28 7.52637C30.2092 7.52637 32 9.17584 32 11.2106C32 13.2453 30.2092 14.8948 28 14.8948Z'
            stroke='black'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M28 31.4738H34M34 31.4738H40M34 31.4738V25.9475M34 31.4738V37.0001'
            stroke='black'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </label> */}
      <input
        type='file'
        accept='image/*'
        id='profileImg'
        {...props}
        className='hidden'
      />
    </>
  );
}

export default ProfileImage;
