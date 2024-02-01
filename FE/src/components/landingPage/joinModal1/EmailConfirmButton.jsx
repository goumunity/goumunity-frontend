import { useState } from 'react';
import Button from '../../common/Button';
import axios from 'axios';

function EmailConfirmButton({
  emailConfirm,
  setErrorMessage,
  email,
  emailIsInvalid,
  emailConfirmIsInvalid,
  isEmailConfirmValid,
  setIsEmailConfirmValid,
}) {
  const [isEmailConfirmSended, setIsEmailConfirmSended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  // 인증번호 발송
  const handleClickSendEmailConfirm = async () => {
    setErrorMessage('')
    if (email === '') {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    } 
    if (emailIsInvalid) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get('/api/users/email/verification', {
        params: { email, },
      });

      if (res.statusText !== 'OK') {
        console.log( res );
        throw new Error('데이터 요청 실패');
      }
      
      setIsEmailConfirmSended(true);

    } catch (error) {
      console.log('에러 발생 : ', error);
    }
    setIsLoading(false);
  };

  // 인증번호 확인
  const handleClickCheckEmailConfirm = async () => {
    setErrorMessage('')
    if (emailConfirm === '') {
      setErrorMessage('인증번호를 입력해주세요.');
      return;
    }
    if (emailConfirmIsInvalid) {
      return;
    }

    try {
      setIsLoading(true)
      const res = await axios.post(`/api/users/email/verification`, {
        code: emailConfirm,
        email: email,
      });

      // if (res.statusText !== 'OK') {
      //   console.log( res );
      //   throw new Error('데이터 요청 실패');
      // }

      console.log('인증번호 확인 결과 : ', res.data);
      if (res.data === false) {
        setErrorMessage('인증번호가 일치하지 않습니다.');
      } else {
        setIsEmailConfirmValid(true);
      }
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
    }
    setIsLoading(false)
  };

  return (
    <>
      {!isEmailConfirmSended && !isLoading && <Button text='인증번호 발송' onClick={handleClickSendEmailConfirm} />}
      {!isEmailConfirmSended && isLoading && <Button text='인증번호 발송중' isActive={false} />}
      {isEmailConfirmSended && !isEmailConfirmValid && !isLoading && <Button text='인증번호 확인' onClick={handleClickCheckEmailConfirm} />}
      {isEmailConfirmSended && !isEmailConfirmValid && isLoading && <Button text='인증번호 확인중' />}
      {isEmailConfirmSended && isEmailConfirmValid && <Button text='인증완료' isActive={false}/>}
    </>
  );
}

export default EmailConfirmButton;
