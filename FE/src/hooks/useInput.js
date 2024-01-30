import { useState } from 'react';

function useInput(initialInput) {
  
    const [input, setInput] = useState(initialInput);
    
    const handleChangeInput = (e) => {
        setInput(e.target.value)
        console.log('입력 결과 : ', input)
    }
    return [input, handleChangeInput]
}

export default useInput