import { useState } from 'react';
import Button from '../../common/Button';
import axios from 'axios';
import client from '../../../utils/instance';
import instance from "../../../utils/instance";
import Swal from 'sweetalert2';

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
    setErrorMessage('');
    if (email === '') {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    if (emailIsInvalid) {
      return;
    }
    try {
      setIsLoading(true);
      // const res = await instance.get('/api/users/email/verification', {
      const res = await instance.get('/api/users/email/verification', {
        params: { email },
      });

      setIsEmailConfirmSended(true);
      setErrorMessage('인증코드가 발송되었습니다.');
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage('이미 가입한 이메일입니다.');
      }
    }
    setIsLoading(false);
  };

  // 인증번호 확인
  const handleClickCheckEmailConfirm = async () => {
    setErrorMessage('');
    if (emailConfirm === '') {
      setErrorMessage('인증번호를 입력해주세요.');
      return;
    }
    if (emailConfirmIsInvalid) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await instance.post(`/api/users/email/verification`, {
        code: emailConfirm,
        email: email,
      });
  
      if (res.data === false) {
        setErrorMessage('인증번호가 일치하지 않습니다.');
      } else {
        setIsEmailConfirmValid(true);
      }
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isEmailConfirmSended && !isLoading && (
        <Button text='인증번호 발송' onClick={handleClickSendEmailConfirm} />
      )}
      {!isEmailConfirmSended && isLoading && (
        <Button text='인증번호 발송중' isActive={false} />
      )}
      {isEmailConfirmSended && !isEmailConfirmValid && !isLoading && (
        <Button text='인증번호 확인' onClick={handleClickCheckEmailConfirm} />
      )}
      {isEmailConfirmSended && !isEmailConfirmValid && isLoading && (
        <Button text='인증번호 확인중' />
      )}
      {isEmailConfirmSended && isEmailConfirmValid && (
        <Button text='인증완료' isActive={false} />
      )}
    </>
  );
}

export default EmailConfirmButton;
