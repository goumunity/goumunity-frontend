import { useState } from 'react';
import UserInput from '../../common/UserInput';
import { isEmail, validatePassword } from '../../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth';
import Button from '../../common/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [errorMessage, setErrorMessage] = useState('');

  const [userInputs, setUserInputs] = useState({
    email: '',
    password: '',
  });

  const [isEdited, setIsEdited] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = isEdited.email && !isEmail(userInputs.email);

  const passwordIsInvalid =
    isEdited.password && !validatePassword(userInputs.password);

  // input에서 focus를 다른 곳에 두었을 때 수정되었음을 표시
  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // 로그인 후 메인페이지로 이동하기 위해
  const navigate = useNavigate();

  // auth state의 login 함수를 쓰기 위해
  const dispatch = useDispatch();

  // 로그인
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (userInputs.email === '') {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    if (userInputs.password === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    if (emailIsInvalid || passwordIsInvalid) {
      return;
    }
    try {
      setIsLoading(true);
      // const res = await axios.post('http://localhost:8080/api/users/login', {
      const res = await axios.post('/temp/api/users/login', {
        id: userInputs.email,
        password: userInputs.password,
      }, { withCredentials: true });

      console.log(res)
      dispatch(authActions.login());

      try {
        // const res = await axios.get(`/api/users/${userInputs.email}`);
        const res = await axios.get(
          `http://localhost:8080/api/users/my/chat-rooms?page=0&size=12&time=${new Date().getTime()}`
        );

        dispatch(authActions.createUser(res.data));
      } catch (error) {
        console.log(error);
      }

      navigate('/');
    } catch (error) {
      console.log('에러 발생 : ', error);
      setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
    }
    setIsLoading(false);
  };

  // 사용자의 입력 감지
  const handleChangeInputs = (id, value) => {
    setErrorMessage('');
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
      <h1 className='font-daeam text-5xl my-5'>로그인</h1>
      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitLogin} className='px-2'>
        <UserInput
          isFirst={true}
          label='이메일'
          id='email'
          type='email'
          value={userInputs.email}
          onBlur={() => {
            handleBlurFocusOffInput('email');
          }}
          onChange={(e) => handleChangeInputs('email', e.target.value)}
          error={emailIsInvalid && '이메일에 "@" 기호가 포함되어야 합니다.'}
        />
        <UserInput
          label='비밀번호'
          id='password'
          type='password'
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
        <Button
          text={isLoading ? '로그인 중' : '로그인'}
          isActive={!isLoading}
        />
      </form>
      <div className='my-5 font-dove text-xl underline-offset-auto cursor-pointer underline'>
        비밀번호를 잊어버리셨나요?
      </div>
      <div className='font-dove text-red-600 text-xl m-3'>{errorMessage}</div>
    </>
  );
}

export default LoginModal;
