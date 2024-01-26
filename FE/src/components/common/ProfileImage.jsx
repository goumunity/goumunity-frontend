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
