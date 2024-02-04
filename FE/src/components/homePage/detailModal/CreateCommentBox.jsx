import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useRef, useState } from 'react';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
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
        const res = await axios.post(`/api/feeds/${feedId}/comments`, {
          content: input,
        });
        console.log('댓글 생성 결과 : ', res);
        const commentId = res.data;
        try {
          const res = await axios.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          console.log('단일 조회 : ', res);
          setCommentList((prev) => [res.data, ...prev]);
        } catch (error) {
          console.log('댓글 단일 조회 중 에러 발생 : ', error);
        }
      } else if (option === BUTTON_OPTIONS[1].name) {
        const res = await axios.post(`/api/comments/${commentId}/replies`, {
          content: input,
        });
        console.log('답글 생성 결과 : ', res);
        const replyId = res.data;
        try {
          const res = await axios.get(
            `/api/comments/${commentId}/replies/${replyId}`
          );
          console.log('답글 단일 조회 : ', res);
          setReplyList((prev) => [res.data, ...prev]);
        } catch (error) {
          console.log('답글 생성 중 에러 발생 : ', error);
        }
      } else if (option === BUTTON_OPTIONS[2].name) {
        const res = await axios.patch(
          `/api/feeds/${feedId}/comments/${commentId}`,
          { content: input }
        );
        console.log('댓글 수정 결과 : ', res);
        try {
          const res = await axios.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          const newCommentList = commentList.filter(
            (comment) => comment.id !== commentId
          );
          setCommentList([res.data, ...newCommentList]);
        } catch (error) {
          console.log('댓글 단일 조회 중 에러 발생 : ', error);
        }
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
    setInput('');
    setPlaceholderText(BUTTON_OPTIONS[0].text);
  };

  // 바깥을 클릭했을 때 댓글 달기로 변경
  // useEffect(() => {
  //   document.addEventListener('mousedown', changeOptionWithClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', changeOptionWithClickOutside);
  //   };
  // });

  // const changeOptionWithClickOutside = (e) => {
  //   if (!inputRef.current.contains(e.target)) {
  //     setOption(BUTTON_OPTIONS[0].name);
  //     setPlaceholderText(BUTTON_OPTIONS[0].text);
  //   }
  // };

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
