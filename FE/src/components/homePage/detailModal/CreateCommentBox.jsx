import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useState } from 'react';

function CreateCommentBox({ setCommentList, inputRef, feedId, option, setOption, commentId, comment, handleChangeComment }) {
  const [reply, handleChangeReply] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (option) {
      const res = await axios.post(`/api/feeds/${feedId}/comments`, {
        content: comment,
      });
      console.log('댓글 생성 결과 : ', res);
    } else {
      const res = await axios.post(`/api/comments/${commentId}/replies`, {
        content: comment,
      });
      console.log('답글 생성 결과 : ', res);

    }
      // setCommentList((prev) => {
      //   console.log('이전 댓글들: ', prev)
      // })
      // setCommentList((prev) => [...prev, res.data]);
    } catch (error) {
      console.log('댓글 생성 과정에서 에러 발생 : ', error);
    }
    setIsLoading(false);
    setOption(true)
    // setComments((prev) => {
    //   return {...prev}
    // })
  };

  // const requestComment = async (commentId) => {
  //   try {
  //     const res = await axios.get(`/api/feeds/${feedId}`)
  //   }
  // }

  // 모달 열리면 인풋에 자동 포커스
  useEffect(function focusInputBox() {
    inputRef.current.focus();
  });

  return (
    <form
      onSubmit={handleSubmitCreateComment}
      className='flex justify-between items-center px-1'
    >
      <input
        ref={inputRef}
        onChange={handleChangeComment}
        value={comment}
        // value={inputRef.current.value || input}
        className='p-2 bg-bright w-4/5 focus:outline-none text-lg placeholder:font-her font-dove'
        type='text'
        placeholder='댓글 좀 달아줘...'
      />
      <Button text='등록' isActive={!isLoading} className='' />
    </form>
  );
}

export default CreateCommentBox;
