import { useState } from 'react';
import UserInput from '../../common/UserInput';
import { useDispatch, useSelector } from 'react-redux';
import hashtagButtonIcon from '@/assets/svgs/hashtagButtonIcon.svg';
import SelectBox from '../../common/SelectBox';
import HashTag from '../../common/HashTag';
import ProfileImage from '../../common/ProfileImage';
import axios from 'axios';

function ChatRoomModal() {
  const [hashtag, setHashtag] = useState(['#20대', '#거지방', '#절약']);
  const [newHashtag, setNewHashtag] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userInputs, setUesrInputs] = useState({
    title: '',
    hashtag: '',
    capability: null,
    regionId: null,
  });

  const [isEdited, setIsEdited] = useState({
    title: false,
    hashtag: false,
    capability: false,
    regionId: false,
  });

  //채팅룸 추가하기
  const handleSubmitChatCreate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (userInputs.userCategory === '') {
      setErrorMessage('신분을 선택해주세요.');
      return;
    }
    if (userInputs.region === '') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }
    if (userInputs.monthBudget === '') {
      setErrorMessage('한달 생활비를 입력해주세요.');
      return;
    }

    // 유저 입력 감지
    const handleChangeInputs = (id, value) => {
      if (id === 'monthBudget' && isNaN(value)) {
        return;
      }
      if (id === 'monthBudget') {
        // value = Number(value.replaceAll(',', ''))
        // value = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        // const removedCommaValue = Number(value.replaceAll(',', ''))
        value = Number(value.replaceAll(',', ''));
        value = value.toLocaleString();
      }

      setUserInputs((prev) => ({
        ...prev,
        [id]: value,
      }));

      setIsEdited((prev) => ({
        ...prev,
        [id]: false,
      }));
    };

    const updatedData = {
      ...joinData,
      userCategory: userInputs.userCategory,
      regionId: Number(userInputs.region),
      monthBudget: Number(userInputs.monthBudget.replace(/,/g, '')),
    };

    const formData = new FormData();

    for (const image of resultImage) {
      formData.append('image', image);
    }

    const blob = new Blob([JSON.stringify(updatedData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    try {
      const res = await axios.post('/api/chat-rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
      if (error.response.status === 409) {
        setErrorMessage('이미 존재하는 채팅방입니다.');
      }
      return;
    }
    navigate('/chat');
  };

  return (
    <>
      <form onSubmit={handleSubmitChatCreate}>
        <h1 className='font-daeam text-2xl'>채팅방 개설하기</h1>
        <UserInput
          label='채팅방 이름'
          id='title'
          type='title'
          value={userInputs.title}
          onBlur={() => {
            handleBlurFoucusOffInput('title');
          }}
          onChange={(e) => handleChangeInputs('title', e.target.value)}
        />
        <div className='font-her text-left text-2xl'>*해시태그 설정하기</div>
        <div className='flex'>
          {hashtag.map((value, index) => {
            return (
              <>
                <HashTag>
                  {value}
                  <span
                    className='w-20 bg-transparent'
                    type='text'
                    value={newHashtag}
                  />
                </HashTag>
              </>
            );
          })}
          <HashTag>
            <input
              className='w-20 bg-transparent'
              placeholder='#입력'
              id='hashtag'
              type='text'
              value={userInputs.hashtag}
              // onChange={(e) => setNewHashtag(e.target.value)}
              onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
            />
          </HashTag>
        </div>
        {/* <button className='font-paci border border-dashed rounded-2xl pr-2 pl-2'></button> */}
        <div className='flex font-her justify-center bg-gray-100 p-2 '>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl'
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
        <div className='flex font-her justify-center bg-gray-100 p-2'>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-2xl w-1/3'
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

        <div className='border rounded-xl font-her pt-2 pb-2'>
          채팅방 이미지 추가하기
          <div className='flex justify-center relative text-center '>
            <ProfileImage
              size='20'
              profileImage={profileImage}
              // onChange={handleChangeUploadProfileImg}
            />
          </div>
        </div>
        <div className='pt-2'>
          <button className='border rounded-xl pr-2 pl-2 bg-orange-100 hover:bg-orange-200'>
            추가하기
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatRoomModal;
