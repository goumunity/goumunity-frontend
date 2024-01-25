import { useState } from 'react';
import UserInput from '../components/common/UserInput';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import { authActions } from '../store/auth';
import { isEqual } from '../utils/validation';
import CheckBox from '../components/common/CheckBox';
import ProfileImage from '../components/common/ProfileImage';
import axios from 'axios';

function JoinModal2() {
  const SERVER_URL = 'api/users';

  const joinData = useSelector((state) => state.auth.joinData);

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

  const [userInputs, setUserInputs] = useState({
    nickname: joinData?.nickname || '',
    birthDate: joinData?.birthDate || '',
    gender: joinData?.gender || '',
  });

  const [isEdited, setIsEdited] = useState({
    nickname: false,
    birthDate: false,
    gender: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  let nicknameIsInvalid = false

  // 날짜 형식은 숫자 8자리 검증
  const birthDateIsInvalid =
    isEdited.birthDate &&
    (isNaN(userInputs.birthDate) ||
      !isEqual(userInputs.birthDate.trim().length, 8));

  // input에서 focus를 다른 곳에 두었을 때 수정되었음을 표시
  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // reducer 조작을 위한 dispatch 함수 생성
  const dispatch = useDispatch();

  // 회원가입 3페이지(다음 단계)로 가기
  const handleSubmitNext = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (userInputs.nickname === '') {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }
    if (userInputs.birthDate === '') {
      setErrorMessage('생년월일을 입력해주세요.');
      return;
    }
    if (userInputs.gender === '') {
      setErrorMessage('성별을 선택해주세요.');
      return;
    }
    if (birthDateIsInvalid) {
      return;
    }
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const updatedData = { ...joinData, ...data, gender: userInputs.gender };
    console.log(updatedData);
    // e.target.reset();
    dispatch(authActions.updateJoinData(updatedData));
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal3());
  };

  // 사용자 입력 감지
  const handleChangeInputs = (id, value) => {
    // 생년월일을 8자 넘게 못쓰게
    if (id === 'birthDate' && value.trim().length > 8) {
      return;
    }
    // if (id === 'birthDate' && value.trim().length > 8) {
    //   console.log('gdgd')
    //   return;
    // }
    // if (id === 'birthDate' && value.trim().length === 8) {
    // }
    setUserInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsEdited((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const handleClickCheckDuplicated = async () => {
    if (userInputs.nickname === '') {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }
    
    try {
      const res = await axios.get(`${SERVER_URL}/nickname/validation`, {params:{
        nickname: userInputs.nickname,
        }
      });

      if (res.statusText !== 'OK') {
        throw new Error('데이터 요청 실패');
      }

      console.log('닉네임 중복 확인 결과 : ', res.data)
      if (res.data.exist === true) {
        setErrorMessage('인증번호가 틀렸습니다.')
      } else {
        setErrorMessage('닉네임 인증 완료')
      }

    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
    }
  };

  // 회원가입 1페이지(이전 단계)로 가기
  const handleClickPrevious = () => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal1());
  };

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>

      <div className='flex justify-center relative text-center m-5'>
        <ProfileImage size='20' profileImage={profileImage} onChange={handleChangeUploadProfileImg} />
      </div>
      <form
        onSubmit={handleSubmitNext}
        className='px-2 flexflex-col items-center'
      >
        <div className='flex justify-between'>
          <UserInput
            isFirst={true}
            label='닉네임'
            id='nickname'
            type='text'
            name='nickname'
            value={userInputs.nickname}
            onBlur={() => {
              handleBlurFocusOffInput('nickname');
            }}
            onChange={(e) => handleChangeInputs('nickname', e.target.value)}
            error={nicknameIsInvalid && '이미 사용중인 닉네임입니다.'}
          />
          <Button
            text='중복확인'
            type='button'
            onClick={handleClickCheckDuplicated}
          />
        </div>
        <UserInput
          label='생년월일'
          id='birthDate'
          type='text'
          name='birthDate'
          value={userInputs.birthDate}
          onBlur={() => {
            handleBlurFocusOffInput('birthDate');
          }}
          onChange={(e) => handleChangeInputs('birthDate', e.target.value)}
          error={
            birthDateIsInvalid && '생년월일은 YYYYMMDD 형식으로 입력해주세요.'
          }
        />
        <div className='flex flex-col mb-2'>
          <label className='text-left text-2xl font-her'>*성별</label>
          <div className='flex gap-20 text-center justify-center'>
            <CheckBox
              text='남'
              isChecked={userInputs.gender === '남'}
              onClick={() => handleChangeInputs('gender', '남')}
            />
            <CheckBox
              text='여'
              isChecked={userInputs.gender === '여'}
              onClick={() => handleChangeInputs('gender', '여')}
            />
          </div>
        </div>
        <div className='text-center font-dove text-red-600 text-xl h-2 mb-3'>
          {errorMessage}
        </div>
        <div className='flex gap-5 justify-center absolute bottom-7 w-full'>
          <Button text='이전단계' type='button' onClick={handleClickPrevious} />
          <Button text='다음단계' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal2;
