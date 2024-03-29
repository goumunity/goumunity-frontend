import axios from 'axios';
import { useEffect, useState } from 'react';
import instance from "@/utils/instance.js";

function useAxiosGet(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  
  useEffect(
    function requestData() {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await instance.get(url);
          setValue(res.data);
        } catch (error) {
          setErrorMessage(error);
        }
        setIsLoading(false);
      };
      fetchData();
    },
    [url]
  );

  return [value, isLoading, errorMessage, setErrorMessage];
}

export default useAxiosGet;
