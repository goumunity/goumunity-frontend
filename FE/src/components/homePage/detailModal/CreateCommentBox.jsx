import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useState } from 'react';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment' },
  { id: 2, name: 'createReply' },
  { id: 3, name: 'patchComment' },
  { id: 4, name: 'patchReply' },
];

function CreateCommentBox({
  setCommentList,
  setReplyList,
  inputRef,
  feedId,
  option,
  setOption,
  commentId,
  comment,
  handleChangeComment,
  replyId
}) {
  const [input, handleChangeInput] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (option === BUTTON_OPTIONS[0].name) {
        const res = await axios.post(`/api/feeds/${feedId}/comments`, {
          content: input,
        });
        console.log('댓글 생성 결과 : ', res);
      } else if (option === BUTTON_OPTIONS[1].name) {
        const res = await axios.post(`/api/comments/${commentId}/replies`, {
          content: input,
        });
        console.log('답글 생성 결과 : ', res);
      } else if (option === BUTTON_OPTIONS[3].name) {
        const res = await axios.put(
          `/api/comments/${commentId}/replies/${replyId}`,
          { content: input }
        );
        console.log('답글 수정 결과 : ', res);
      }
    } catch (error) {
      console.log('댓글 답글 에러 발생 : ', error);
    }
    setIsLoading(false);
    setOption(BUTTON_OPTIONS[0].name);
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
        onChange={handleChangeInput}
        value={input}
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
