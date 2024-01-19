import React, { useState } from "react";
import UserInput from "../components/common/UserInput";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal";
import { authActions } from "../store/auth";
function JoinModal2() {
  const joinData = useSelector((state) => state.auth.joinData);

  const [userInputs, setUserInputs] = useState({
    nickname: joinData?.nickname || '',

    birthDate: "",


  });

  const [isEdited, setIsEdited] = useState({
    nickname: false,
    gender: false,
  });

  const nicknameIsInvalid = true;
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
    console.log(e.target)
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const updatedData = {...joinData, ...data}
    console.log(updatedData)
    // e.target.reset();
    dispatch(authActions.updateJoinData(updatedData))
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal3());
  }

  //
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

  // 회원가입 1페이지(이전 단계)로 가기
  const handleClickPrevious = () => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal1());
  }

  return (
    <>

      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitNext} className="px-2">
        <UserInput
          label="닉네임"
          id="nickname"
          type="text"
          name="nickname"
          value={userInputs.nickname}
          onBlur={() => {
            handleBlurFocusOffInput("nickname");
          }}
          onChange={(e) => handleChangeInputs("nickname", e.target.value)}
          error={nicknameIsInvalid && '이미 사용중인 닉네임입니다.'}
        />

        <UserInput
          label="나이"
          id="age"
          type="text"
          name="age"
          value={userInputs.nickname}
          onBlur={() => {
            handleBlurFocusOffInput("nickname");
          }}
          onChange={(e) => handleChangeInputs("nickname", e.target.value)}
          error={nicknameIsInvalid && '이미 사용중인 닉네임입니다.'}
        />

        
        <Button text='이전단계' type='button' onClick={handleClickPrevious}/>
        <Button text='다음단계' type='submit' />
      </form>
    </>
  );
}

export default JoinModal2;
