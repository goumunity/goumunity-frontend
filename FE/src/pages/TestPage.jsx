import { useState } from "react";
import Modal from "../components/common/Modal/Modal";
const TestPage = () => {
    
    const [val, setVal] = useState('');
    const handleOnKeyPress = (e) => {
        
        if( e.key === 'Enter'){
            console.log( val );
            changeArr(e.target.value);
        }
    }   

    const handleOnChange = (e) => {
        setVal( e.target.value );

    }

    //------------------------------------------------------------------

    const [ arr, setArr ] = useState([]);
    const changeArr = (nextTag) => {
        const nextArr = arr.concat(nextTag);
        setArr( nextArr );
        setVal('');
    }
    const onRemove = ( tag ) => {
        const nextArr = arr.filter( elem => elem !== tag );
        setArr( nextArr );
    }
    const tagArr = arr.map( elem => <div className="p-1 border-2 m-1 text-2xl" onDoubleClick={ () => onRemove(elem) }>{elem}</div>);

    

    return (
        <>
        <div className="flex flex-row border-2">
            {tagArr}
            <input onChange={handleOnChange} onKeyDown={handleOnKeyPress} placeholder="value 입력"/>
        </div>
        </>
    )
}

export default TestPage;