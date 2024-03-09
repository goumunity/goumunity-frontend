import { useState } from 'react';

function useNumInput(initialInput) {
  
    const [input, setInput] = useState(initialInput);
    
    const handleChangeInput = (e) => {

        setInput(e.target.value.replace(/[^0-9]/g, ""))
    }
    return [input, handleChangeInput, setInput]
}

export default useNumInput