import React, { useState } from "react";
import UserInput from "../components/common/UserInput";
import { isEmail, validatePassword } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import Button from "../components/common/Button";
function LoginModal() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

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


  // store에 액션을 주기 위함
  const dispatch = useDispatch();

  // 로그인
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log(`로그인 전: ${isAuth}`);
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
      <h1 className="font-daeam text-5xl">로그인</h1>
      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitLogin} className="px-2">
        <UserInput
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
      <div className='font-dove text-red-600 text-xl m-3'>아이디를 확인해주세요.</div>
      <div>비밀번호를 잊어버리셨나요?</div>
    </>
  );
}

export default LoginModal;
