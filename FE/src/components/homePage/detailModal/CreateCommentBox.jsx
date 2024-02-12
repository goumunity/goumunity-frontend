import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useRef, useState } from 'react';
import instance from "@/utils/instance.js";

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function CreateCommentBox({
  setCommentList,
  inputRef,
  feedId,
  option,
  setOption,
  commentId,
  comment,
  handleChangeComment,
  replyId,
  commentList,
  placeholderText,
  setPlaceholderText,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [input, handleChangeInput, setInput] = useInput('', setErrorMessage);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (option === BUTTON_OPTIONS[0].name) {
        const res = await instance.post(`/api/feeds/${feedId}/comments`, {
          content: input,
        });
        console.log('댓글 생성 결과 : ', res);
        const commentId = res.data;
        try {
          const res = await instance.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          console.log('단일 조회 : ', res);
          setCommentList((prev) => [res.data, ...prev]);
        } catch (error) {
          console.log('댓글 단일 조회 중 에러 발생 : ', error);
        }
      } else if (option === BUTTON_OPTIONS[2].name) {
        const res = await instance.patch(
          `/api/feeds/${feedId}/comments/${commentId}`,
          { content: input }
        );
        console.log('댓글 수정 결과 : ', res);
        try {
          const res = await instance.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          const newCommentList = commentList.filter(
            (comment) => comment.id !== commentId
          );
          setCommentList([res.data, ...newCommentList]);
        } catch (error) {
          console.log('댓글 단일 조회 중 에러 발생 : ', error);
        }
      }
    } catch (error) {
      console.log('댓글 답글 에러 발생 : ', error);
    }
    setIsLoading(false);
    setOption(BUTTON_OPTIONS[0].name);
    setInput('');
    setPlaceholderText(BUTTON_OPTIONS[0].text);
  };

  // 모달 열리면 인풋에 자동 포커스
  useEffect(function focusInputBox() {
    inputRef.current.focus();
  });

  // useEffect(() => {
  //   if (option === BUTTON_OPTIONS[0].name) setInput('');
  //   else if (option === BUTTON_OPTIONS[2].name) console.log(comment)
  // }, [option])

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
        placeholder={placeholderText}
        // placeholder='댓글 좀 달아줘...'
      />
      <Button
        text='등록'
        isActive={!isLoading && input.length !== 0}
        className=''
      />
    </form>
  );
}

export default CreateCommentBox;
