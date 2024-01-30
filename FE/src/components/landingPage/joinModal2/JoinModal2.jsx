import { useState } from 'react';
import UserInput from '../../common/UserInput';
import Button from '../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth';
import { isEqual } from '../../../utils/validation';
import CheckBox from '../../common/CheckBox';
import ProfileImage from '../../common/ProfileImage';
import { calculateAge } from '../../../utils/formatting';
import { Link, useNavigate } from 'react-router-dom';
import NicknameConfirmButton from '@/components/landingPage/joinModal2/NicknameConfirmButton';
import { imageUpload } from '../../../utils/upload';

const GENDER_OPTIONS = [
  { id: 1, content: '남' },
  { id: 2, content: '여' },
];

function JoinModal2() {
  const joinData = useSelector((state) => state.auth.joinData);

  const [profileImageTest, setProfileImageTest] = useState('');
  const [files, setFiles] = useState('');

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

  const [isNicknameValid, setIsNicknameValid] = useState(false);

  // 날짜 형식은 숫자 8자리 검증
  const birthDateIsInvalid =
    isEdited.birthDate &&
    (isNaN(userInputs.birthDate) ||
      !isEqual(userInputs.birthDate.trim().length, 8));

  // 모달 창 이동을 위해
  const navigate = useNavigate();

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
    if (!isNicknameValid) {
      setErrorMessage('사용할 수 없는 닉네임입니다.');
      return;
    }
    if (birthDateIsInvalid) {
      return;
    }

    const age = calculateAge(userInputs.birthDate);
    const updatedData = {
      ...joinData,
      // imgSrc: profileImage,
      nickname: userInputs.nickname,
      age,
      gender: userInputs.gender,
    };
    dispatch(authActions.updateJoinData(updatedData));

    console.log(joinData);
    navigate('/landing/join/3');
  };

  // 사용자 입력 감지 
  const handleChangeInputs = (id, value) => {
    // 생년월일을 8자 넘게 못쓰게
    if (id === 'birthDate' && value.trim().length > 8) {
      return;
    }
    if (id === 'nickname') {
      setIsNicknameValid(false)
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

 

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>
      
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
          />
          <NicknameConfirmButton
            nickname={userInputs.nickname}
            isNicknameValid={isNicknameValid}
            setIsNicknameValid={setIsNicknameValid}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <UserInput
          label='나이'
          id='birthDate'
          type='text'
          name='birthDate'
          value={userInputs.birthDate}
          onBlur={() => {
            handleBlurFocusOffInput('nickname');
          }}
          onChange={(e) => handleChangeInputs('birthDate', e.target.value)}
          // error={nicknameIsInvalid && '이미 사용중인 닉네임입니다.'}
        />

        <div className='flex flex-col mb-2'>
          <label className='text-left text-2xl font-her'>*성별</label>
          <div className='flex gap-20 text-center justify-center'>
            <CheckBox
              text='남'
              isChecked={userInputs.gender === GENDER_OPTIONS[0].id}
              onClick={() => handleChangeInputs('gender', GENDER_OPTIONS[0].id)}
            />
            <CheckBox
              text='여'
              isChecked={userInputs.gender === GENDER_OPTIONS[1].id}
              onClick={() => handleChangeInputs('gender', GENDER_OPTIONS[1].id)}
            />
          </div>
        </div>
        <div className='text-center font-dove text-red-600 text-xl h-2 mb-3'>
          {errorMessage}
        </div>
        <div className='flex gap-5 justify-center absolute bottom-7 w-full'>
          <Link to='/landing/join/1'>
            <Button text='이전단계' type='button' />
          </Link>
          <Button text='다음단계' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal2;
