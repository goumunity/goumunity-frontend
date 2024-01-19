import React, { useState } from "react";
import { isEmail, isEqual, validatePassword } from "../utils/validation";
import UserInput from "../components/common/UserInput";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import { authActions } from "../store/auth";
function JoinModal1() {

  const joinData = useSelector((state) => state.auth.joinData);

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

  // 이메일에는 @ 포함되어야 함
  const emailIsInvalid = isEdited.email && !isEmail(userInputs.email);

  // 인증코드는 6자리 숫자
  const emailConfirmIsInvalid =
    isEdited.emailConfirm && (isNaN(userInputs.emailConfirm) ||
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

  // 사용자의 입력 감지
  const handleChangeInputs = (id, value) => {
    // 인증번호를 6자 이상못쓰게
    if (id === 'emailConfirm' && value.length > 6) {
      return
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

  // 
  const dispatch = useDispatch();
  
  // 회원가입 2페이지로 이동
  const handleSubmitNext = (e) => {
    e.preventDefault();
    // 유효성 검사 중 하나라도 통과못하면 다음페이지로 못 가게
    if (emailIsInvalid || emailConfirmIsInvalid || passwordIsInvalid || passwordConfirmIsInvalid) {
      return;
    }
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
    // e.target.reset();
    dispatch(authActions.updateJoinData(data))
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal2());
  }

  return (
    <>
      <h1 className="font-daeam text-5xl">회원가입</h1>
      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitNext} className="px-2">
        <UserInput
          label="이메일"
          id="email"
          type="email"
          name="email"
          value={userInputs.email}
          onBlur={() => {
            handleBlurFocusOffInput("email");
          }}
          onChange={(e) => handleChangeInputs("email", e.target.value)}
          error={emailIsInvalid && '이메일에 "@" 기호가 포함되어야 합니다.'}
        />
        <div className='flex justify-between'>
          <UserInput
            label="이메일 인증번호"
            id="emailConfirm"
            type="text"
            name="emailConfirm"
            value={userInputs.emailConfirm}
            onBlur={() => {
              handleBlurFocusOffInput("emailConfirm");
            }}
            onChange={(e) => handleChangeInputs("emailConfirm", e.target.value)}
            error={emailConfirmIsInvalid && "인증코드는 6자리 숫자여야 합니다."}
          />
          <Button text="인증번호 발송" />
        </div>
        <UserInput
          label="비밀번호"
          id="password"
          type="password"
          name="password"
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
        <UserInput
          label="비밀번호 확인"
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          value={userInputs.passwordConfirm}
          onBlur={() => {
            handleBlurFocusOffInput("passwordConfirm");
          }}
          onChange={(e) =>
            handleChangeInputs("passwordConfirm", e.target.value)
          }
          error={passwordConfirmIsInvalid && "비밀번호가 일치하지 않습니다."}
        />
        {/* <Button text='다음단계' type='submit' onClick={handleClickNext}/> */}
        <Button text='다음단계' type='submit' />
      </form>
    </>
  );
}

export default JoinModal1;
