import { useState } from 'react';

function useInput(initialInput, setErrorMessage = '') {
  
    const [input, setInput] = useState(initialInput);
    const handleChangeInput = (e) => {
        setErrorMessage('')
        setInput(e.target.value)
    }
    return [input, handleChangeInput, setInput]
}

export default useInput