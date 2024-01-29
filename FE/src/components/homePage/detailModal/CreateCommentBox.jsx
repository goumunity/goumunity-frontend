import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useState } from 'react';

function CreateCommentBox({setComments, inputRef}) {
  const [input, handleChangeInput] = useInput('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const res = await axios.post('/fake/comment', { content: input })
      console.log(res)
    } catch (error) {
      console.log('에러 발생 : ', error)
    }
    setIsLoading(false)
    // setComments((prev) => {
    //   return {...prev}
    // })
  }

  // 모달 열리면 인풋에 자동 포커스
  useEffect(function focusInputBox() {
    inputRef.current.focus();
  })

  return (
    <form onSubmit={handleSubmitCreateComment} className='flex justify-between items-center px-1'>
      <input
        ref={inputRef}
        onChange={handleChangeInput}
        value={input}
        // value={inputRef.current.value || input}
        className='p-2 bg-bright w-4/5 focus:outline-none text-lg placeholder:font-her font-dove'
        type='text'
        placeholder='댓글 좀 달아줘...'
      />
      <Button text='댓글' isActive={!isLoading} className=''/>
    </form>
  );
}

export default CreateCommentBox;
