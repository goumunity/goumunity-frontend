import { useState } from 'react';
import Button from '../../common/Button';
import axios from 'axios';

function NicknameConfirmButton({ nickname, setErrorMessage, isNicknameValid, setIsNicknameValid }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickCheckDuplicated = async () => {
    setErrorMessage('')
    if (nickname === '') {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get('/api/users/nickname/validation', {
        params: {
          nickname,
        },
      });
      console.log( res.statusText );
      // if (res.statusText !== 'OK') {
      //   throw new Error('데이터 요청 실패');
      // }

      if (res.data.exist === true) {
        setErrorMessage('이미 존재하는 닉네임입니다.');
      } else {
        setIsNicknameValid(true)
      }
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
    }
    setIsLoading(false)
  };
  return (
    <>
    {!isNicknameValid && !isLoading && (
        <Button
          text='중복확인'
          type='button'
          onClick={handleClickCheckDuplicated}
        />
      )}
      {!isNicknameValid && isLoading && (
        <Button
          text='중복확인중'
          isActive={false}
          type='button'
        />
      )}
      {isNicknameValid && <Button
          text='사용가능'
          isActive={false}
          type='button'
        />}
    </>
  );
}

export default NicknameConfirmButton;
