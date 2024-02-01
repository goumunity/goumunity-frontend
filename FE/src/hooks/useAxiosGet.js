import axios from 'axios';
import { useEffect, useState } from 'react';

function useAxiosGet(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');

  useEffect(function requestData() {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
<<<<<<< HEAD
        // console.log('요청 결과 : ', res);
        setValue(res.data);

=======
        console.log('요청 결과 : ', res);
        setValue(res.data);
>>>>>>> origin/feature/262
      } catch (error) {
        setErrorMessage(error);
      }
      setIsLoading(false);
    };
    fetchData();
<<<<<<< HEAD
  }, [url]);
=======
  }, []);
>>>>>>> origin/feature/262

  return [value, isLoading, errorMessage];
}

export default useAxiosGet;
