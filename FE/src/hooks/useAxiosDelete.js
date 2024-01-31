import axios from 'axios';
import { useState } from 'react';

async function useAxiosDelete(url, category, currentUserId, userId) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (currentUserId !== userId) {
    setErrorMessage('삭제 권한이 없습니다.');
    return;
  }

  try {
    setIsLoading(true);
    const res = await axios.get(url);
    console.log(`${category} 삭제 결과 : ${res}`);
  } catch (error) {
    console.log(`${category} 삭제 중 에러 발생 : ${error}`);
  }
  setIsLoading(false);

  return [isLoading, errorMessage];
}

export default useAxiosDelete;
