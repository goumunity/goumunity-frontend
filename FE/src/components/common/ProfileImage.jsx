import React, { useState } from 'react';

function ProfileImage() {

  const [profileImage, setProfileImage] = useState('');

  // 이미지 업로드
  const handleChangeUploadProfileImg = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };
  return (
    <>
      <img
        className='rounded-full w-20 h-20'
        src={profileImage}
        alt='https://media.istockphoto.com/id/1449169527/ko/%EC%82%AC%EC%A7%84/%ED%9D%91%EB%B0%B1%EC%9D%98-%EC%95%BC%EA%B5%AC-%EA%B7%B8%EB%9F%B0-%EC%A7%80-%EB%B0%B0%EB%84%88.jpg?s=2048x2048&w=is&k=20&c=VSflJ1JBDo4nAIHORt6-gegxpKsDeqLqrBz81zx0TT8='
      />
      <label
        htmlFor='profileImg'
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-heart' viewBox='0 0 16 16'%3E%3Cpath d='M8 14s6-3.5 6-7a5 5 0 0 0-10 0c0 3.5 6 7 6 7z'/%3E%3C/svg%3E")`,
        }}
        className='absolute top-12 left-50 w-5 h-5 cursor-pointer'
      ></label>
      <input
        type='file'
        accept='image/*'
        id='profileImg'
        onChange={handleChangeUploadProfileImg}
        className='hidden'
      />
    </>
  );
}

export default ProfileImage;
