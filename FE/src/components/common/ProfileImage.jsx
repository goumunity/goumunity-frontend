import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';

function ProfileImage({ size, profileImage, ...props }) {
  return (
    <>
      {/* <div className={`w-6 h-6 rounded-full  border-2 overflow-hidden cursor-pointer`}>
        {profileImage ? (
          <label htmlFor='profileImg' className=''>
            <img
              className={``}
              // src={profileImage}
              src={profileImage}
            />
          </label>
        ) : (
          <label htmlFor='profileImg' className=''>
            <img
              className={``}
              // src={profileImage}
              src={defaultMaleIcon}
            />
          </label>
        )}
        
        <input
          type='file'
          accept='image/*'
          id='profileImg'
          {...props}
          className='hidden'
        />
      </div> */}
      <div className={`rounded-full  border-2 overflow-hidden cursor-pointer`}>
        {profileImage ? (
          <label htmlFor='profileImg' className=''>
            <img
              className={`w-${size}`}
              // src={profileImage}
              src={profileImage}
            />
          </label>
        ) : (
          <label htmlFor='profileImg' className=''>
            <img
              className={`w-${size}`}
              // src={profileImage}
              src={defaultMaleIcon}
            />
          </label>
        )}

        <input
          type='file'
          accept='image/*'
          id='profileImg'
          {...props}
          className='hidden'
        />
      </div>
    </>
  );
}

export default ProfileImage;
