import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';

function ProfileImage({ size, profileImage, ...props }) {
  return (
    <>
      <div
        className={`w-${size} h-${size} rounded-full border-2 overflow-hidden cursor-pointer`}
      >
        {profileImage ? (
          <label htmlFor='profileImg' className=''>
            <img
              // className={`w-${size} h-${size} cursor-pointer`}
              className={`w-${size} h-${size} cursor-pointer`}
              // src={profileImage}
              src={profileImage}
            />
          </label>
        ) : (
          <label htmlFor='profileImg' className=''>
            <img
              className={`w-${size} h-${size} cursor-pointer`}
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
