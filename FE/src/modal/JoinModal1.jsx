import { useState } from 'react';
import { isEmail, isEqual, validatePassword } from '../utils/validation';
import UserInput from '../components/common/UserInput';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import '@/styles.css';
import EmailConfirmButton from '../components/JoinModal1/EmailConfirmButton';
import { useNavigate } from 'react-router-dom';

function JoinModal1() {
  const joinData = useSelector((state) => state.auth.joinData);

  const [errorMessage, setErrorMessage] = useState('');

  const [userInputs, setUserInputs] = useState({
    email: joinData?.email || '',
    emailConfirm: joinData?.emailConfirm || '',
    password: joinData?.password || '',
    passwordConfirm: joinData?.passwordConfirm || '',
  });

  const [isEdited, setIsEdited] = useState({
    email: false,
    emailConfirm: false,
    password: false,
    passwordConfirm: false,
  });

  const [isEmailConfirmValid, setIsEmailConfirmValid] = useState(false)

  // 이메일에는 @ 포함되어야 함
  const emailIsInvalid = isEdited.email && !isEmail(userInputs.email);

  // 인증코드는 6자리 숫자
  const emailConfirmIsInvalid =
    isEdited.emailConfirm &&
    (isNaN(userInputs.emailConfirm) ||
      !isEqual(userInputs.emailConfirm.trim().length, 6));

  const passwordIsInvalid =
    isEdited.password && !validatePassword(userInputs.password);

  // 비밀번호와 비밀번호 확인이 같아야 함
  const passwordConfirmIsInvalid =
    isEdited.passwordConfirm &&
    !isEqual(userInputs.password, userInputs.passwordConfirm);

  // input에서 focus를 다른 곳에 두었을 때 수정되었음을 표시
  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // 모달 창 이동을 위해
  const navigate = useNavigate();

  // 사용자의 입력 감지
  const handleChangeInputs = (id, value) => {
    // 인증번호를 6자 이상못쓰게

    if (id === 'emailConfirm' && value.trim().length > 6) {
      return;
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

  // 전역 joinData의 update함수와 전역 modal의 close 함수를 쓰기 위해
  const dispatch = useDispatch();

  // 회원가입 2페이지로 이동
  const handleSubmitNext = (e) => {
    e.preventDefault();
    // setErrorMessage('');
    if (userInputs.email === '') {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    if (userInputs.emailConfirm === '') {
      setErrorMessage('인증번호를 입력해주세요.');
      return;
    }
    if (userInputs.password === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    if (userInputs.passwordConfirm === '') {
      setErrorMessage('비밀번호를 다시 확인해주세요.');
      return;
    }
    if (!isEmailConfirmValid) {
      setErrorMessage('인증번호를 다시 확인해주세요.')
      return;
    }
    // 유효성 검사 중 하나라도 통과못하면 다음페이지로 못 가게
    if (
      emailIsInvalid ||
      emailConfirmIsInvalid ||
      passwordIsInvalid ||
      passwordConfirmIsInvalid
    ) {
      return;
    }

    const data = { email: userInputs.email, password: userInputs.password };
    dispatch(authActions.updateJoinData(data));
    console.log(joinData);
    navigate('/landing/join/2')
  };

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>
      <form onSubmit={handleSubmitNext} className='px-2'>
        <UserInput
          label='이메일'
          id='email'
          type='email'
          name='email'
          isFirst={true}
          value={userInputs.email}
          onBlur={() => {
            handleBlurFocusOffInput('email');
          }}
          onChange={(e) => handleChangeInputs('email', e.target.value)}
          error={emailIsInvalid && '이메일에 "@" 기호가 포함되어야 합니다.'}
        />
        <div className='flex justify-between'>
          <UserInput
            label='이메일 인증번호'
            id='emailConfirm'
            type='text'
            name='emailConfirm'
            value={userInputs.emailConfirm}
            onBlur={() => {
              handleBlurFocusOffInput('emailConfirm');
            }}
            onChange={(e) => handleChangeInputs('emailConfirm', e.target.value)}
            error={emailConfirmIsInvalid && '인증코드는 6자리 숫자여야 합니다.'}
          />
          <EmailConfirmButton
            emailConfirm={userInputs.emailConfirm}
            setErrorMessage={setErrorMessage}
            email={userInputs.email}
            emailIsInvalid={emailIsInvalid}
            emailConfirmIsInvalid={emailConfirmIsInvalid}
            isEmailConfirmValid={isEmailConfirmValid}
            setIsEmailConfirmValid={setIsEmailConfirmValid}
          />
        </div>
        <UserInput
          label='비밀번호'
          id='password'
          type='password'
          name='password'
          value={userInputs.password}
          onBlur={() => {
            handleBlurFocusOffInput('password');
          }}
          onChange={(e) => handleChangeInputs('password', e.target.value)}
          error={
            passwordIsInvalid &&
            '비밀번호는 8~20자 · 최소 1개의 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.'
          }
        />
        <UserInput
          label='비밀번호 확인'
          id='passwordConfirm'
          type='password'
          name='passwordConfirm'
          value={userInputs.passwordConfirm}
          onBlur={() => {
            handleBlurFocusOffInput('passwordConfirm');
          }}
          onChange={(e) =>
            handleChangeInputs('passwordConfirm', e.target.value)
          }
          error={passwordConfirmIsInvalid && '비밀번호가 일치하지 않습니다.'}
        />
        <div className='text-center font-dove text-red-600 text-xl h-2 mb-3'>
          {errorMessage}
        </div>
        <div className='flex  justify-center gap-5 absolute bottom-7 w-full'>
          {/* <Button text='다음단계' type='submit' onClick={handleClickNext}/> */}
          <Button text='다음단계' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal1;
