import { useState } from 'react';

function useInput(initialInput) {
  
    const [input, setInput] = useState(initialInput);
    
    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }
    return [input, handleChangeInput]
}

export default useInput