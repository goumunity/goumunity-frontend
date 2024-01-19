import React, { useState } from 'react';
import UserInput from '../components/common/UserInput';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import { authActions } from '../store/auth';
import { isEqual } from '../utils/validation';
import CheckBox from '../components/common/CheckBox';

function JoinModal2() {
  const joinData = useSelector((state) => state.auth.joinData);

  const [isChecked, setIsChecked] = useState(false);
  const [userInputs, setUserInputs] = useState({
    nickname: joinData?.nickname || '',
    birthDate: joinData?.birthDate || '',
  });

  const [isEdited, setIsEdited] = useState({
    nickname: false,
    birthDate: false,
  });

  const nicknameIsInvalid = true;

  const birthDateIsInvalid =
    isEdited.birthDate &&
    (isNaN(userInputs.birthDate) ||
      !isEqual(userInputs.birthDate.trim().length, 8));

  // 체크 및 해제
  const handleClickToggleChecked = () => {
    setIsChecked(!isChecked);
  }

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
    console.log(e.target);
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const updatedData = { ...joinData, ...data };
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
    console.log(birthDateIsInvalid);
    setUserInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsEdited((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  // 회원가입 1페이지(이전 단계)로 가기
  const handleClickPrevious = () => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal1());
  };

  return (
    <>
    <div className='flex justify-center relative bg-bg w-20 h-20'>
          <img
            className='rounded-full w-20 h-20 '
            src='https://media.istockphoto.com/id/1449169527/ko/%EC%82%AC%EC%A7%84/%ED%9D%91%EB%B0%B1%EC%9D%98-%EC%95%BC%EA%B5%AC-%EA%B7%B8%EB%9F%B0-%EC%A7%80-%EB%B0%B0%EB%84%88.jpg?s=2048x2048&w=is&k=20&c=VSflJ1JBDo4nAIHORt6-gegxpKsDeqLqrBz81zx0TT8='
            alt='https://media.istockphoto.com/id/1449169527/ko/%EC%82%AC%EC%A7%84/%ED%9D%91%EB%B0%B1%EC%9D%98-%EC%95%BC%EA%B5%AC-%EA%B7%B8%EB%9F%B0-%EC%A7%80-%EB%B0%B0%EB%84%88.jpg?s=2048x2048&w=is&k=20&c=VSflJ1JBDo4nAIHORt6-gegxpKsDeqLqrBz81zx0TT8='
          />
        
        
        </div>
      <form onSubmit={handleSubmitNext} className='px-2 flexflex-col items-center'>
        
        <UserInput
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
        <div className='flex gap-5 text-center'>
          <CheckBox text='남' onClick={handleClickToggleChecked}><div>남</div></CheckBox>
          <CheckBox text='여'><div>여</div></CheckBox>
        </div>
        <Button text='이전단계' type='button' onClick={handleClickPrevious} />
        <Button text='다음단계' type='submit' />
      </form>
    </>
  );
}

export default JoinModal2;
