import axios from 'axios';
import { useState } from 'react';
import instance from "@/utils/instance.js";

async function useAxiosDelete(url, category, currentUserId, userId) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (currentUserId !== userId) {
    setErrorMessage('삭제 권한이 없습니다.');
    return;
  }

  try {
    setIsLoading(true);
    const res = await instance.get(url);
  } catch (error) {
  }
  setIsLoading(false);

  return [isLoading, errorMessage];
}

export default useAxiosDelete;
