import { useState } from 'react';
import UserInput from '../../common/UserInput';
import { useDispatch, useSelector } from 'react-redux';
import hashtagButtonIcon from '@/assets/svgs/hashtagButtonIcon.svg';
import SelectBox from '../../common/SelectBox';
import HashTag from '../../common/HashTag';
import ProfileImage from '../../common/ProfileImage';

function ChatRoomModal() {
  const [hashtag, setHashtag] = useState(['#20대', '#거지방', '#절약']);

  const [profileImage, setProfileImage] = useState('');

  //Enter 누르면 hashtag 하나 더 생성
  const handleOnKeyDownCreateHashtag = (e) => {
    if (e.key === 'Enter') {
      handleCreateHashtag(e.target.value);
    }
  };

  const handleClickAppendHashtag = (e) => {
    hashtag.append(e.target.value);
  };
  // 해시태그 추가하기
  const handleCreateHashtag = (e, value) => {
    hashtag.append(e.target.value);
    setHashtag((prevHashtags) => [...prevHashtags, value]);
  };

  // //hashtag 추가하기
  // const handleCreateHashtag = () => {
  //   const originHashtag = {};
  //   setHashtag((newHashtag) => [...newHashtag, originHashtag]);
  // };

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

  const [userInputs, setUesrInputs] = useState({
    title: '',
  });

  const [iisEdited, setIsEdited] = useState({
    title: '',
  });

  const handleBlurFoucusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  //채팅방 만들기
  const handleSubmitChatCreate = async (e) => {};

  //사용자 입력감지
  const handleChangeInputs = (id, value) => {
    setUesrInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsEdited((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  return (
    <div>
      <h1 className='font-daeam text-2xl'>채팅방 개설하기</h1>
      <form onSubmit={handleSubmitChatCreate} className='px-2'>
        <UserInput
          label='제목'
          id='title'
          type='title'
          value={userInputs.title}
          onBlur={() => {
            handleBlurFoucusOffInput('title');
          }}
          onChange={(e) => handleChangeInputs('title', e.target.value)}
        />

        <div className='flex'>
          <HashTag>
            <input
              className='w-20 bg-transparent'
              placeholder='#입력'
              type='text'
              onClick={handleClickAppendHashtag}
              onKeyDown={handleOnKeyDownCreateHashtag}
            />
          </HashTag>
          <HashTag>
            <input
              className='w-20 bg-transparent'
              placeholder='#입력'
              type='text'
              onClick={handleClickAppendHashtag}
              onKeyDown={handleOnKeyDownCreateHashtag}
            />
          </HashTag>
        </div>

        {/* <button className='font-paci border border-dashed rounded-2xl pr-2 pl-2'></button> */}
        <div className='flex font-her justify-center bg-gray-100 p-4 '>
          <div
            type='text'
            className='p-4 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            지역
          </div>

          <SelectBox
            className='px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center flex-grow'
            widthSize={96}
          />
        </div>

        <div className='flex font-her justify-center bg-gray-100 p-4'>
          <div
            type='text'
            className='p-4 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-2xl w-1/3'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            인원수
          </div>

          <ul className=' px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center'>
            <input
              className='bg-transparent h-full text-center'
              type='number'
              min='1'
            />
            <span>명</span>
          </ul>
        </div>
      </form>

      <div className='border rounded-xl font-her pt-4'>
        채팅방 이미지 추가하기
        <div className='flex justify-center relative text-center m-5'>
          <ProfileImage
            size='20'
            profileImage={profileImage}
            onChange={handleChangeUploadProfileImg}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatRoomModal;
