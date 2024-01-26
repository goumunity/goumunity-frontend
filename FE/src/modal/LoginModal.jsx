import { useState } from "react";
import UserInput from "../components/common/UserInput";
import { isEmail, validatePassword } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import Button from "../components/common/Button";
import axios from 'axios';

function LoginModal() {

  const SERVER_URL = 'api/users'

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [errorMessage, setErrorMessage] = useState('');

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
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

  // auth state의 login 함수를 쓰기 위해
  const dispatch = useDispatch();

  // 로그인
  const handleSubmitLogin =  async (e) => {
    e.preventDefault();
    setErrorMessage('')
    console.log(`로그인 전: ${isAuth}`);
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
    const res = await axios.post(`${SERVER_URL}/login`, { email: userInputs.email, password: userInputs.password })
    console.log(res)
    dispatch(authActions.login());
    console.log(`로그인 후: ${isAuth}`);
  };

  // 사용자의 입력 감지
  const handleChangeInputs = (id, value) => {
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
      <h1 className="font-daeam text-5xl my-5">로그인</h1>
      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitLogin} className="px-2">
        <UserInput
          isFirst={true}
          label="이메일"
          id="email"
          type="email"
          value={userInputs.email}
          onBlur={() => {
            handleBlurFocusOffInput("email");
          }}
          onChange={(e) => handleChangeInputs("email", e.target.value)}
          error={emailIsInvalid && '이메일에 "@" 기호가 포함되어야 합니다.'}
        />
        <UserInput
          label="비밀번호"
          id="password"
          type="password"
          value={userInputs.password}
          onBlur={() => {
            handleBlurFocusOffInput("password");
          }}
          onChange={(e) => handleChangeInputs("password", e.target.value)}
          error={
            passwordIsInvalid &&
            "비밀번호는 8~20자 · 최소 1개의 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."
          }
        />
        <Button text='로그인'/>
        {/* <button className="w-full text-white rounded-xl font-daeam bg-button px-2 py-1">
          로그인
        </button> */}
      </form>
      <div className='my-5 font-dove text-xl underline-offset-auto cursor-pointer underline' >비밀번호를 잊어버리셨나요?</div>
      <div className='font-dove text-red-600 text-xl m-3'>{errorMessage}</div>
    </>
  );
}

export default LoginModal;
