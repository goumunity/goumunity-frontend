import { useState } from 'react';

function useInput(initialInput, setErrorMessage = '') {
  
    const [input, setInput] = useState(initialInput);
    console.log(input)
    const handleChangeInput = (e) => {
        setErrorMessage('')
        setInput(e.target.value)
    }
    return [input, handleChangeInput]
}

export default useInput