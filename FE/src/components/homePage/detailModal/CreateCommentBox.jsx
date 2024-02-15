import axios from 'axios';
import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';
import { useEffect, useRef, useState } from 'react';
import instance from "@/utils/instance.js";
import Swal from 'sweetalert2';

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
  const [CommentErrorMessage, setCommentErrorMessage] = useState('');
  const [input, handleChangeInput, setInput] = useInput('', setCommentErrorMessage);
  const [isCommentLoading, setisCommentLoading] = useState(false);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    try {
      setisCommentLoading(true);
      if (option === BUTTON_OPTIONS[0].name) {
        const res = await instance.post(`/api/feeds/${feedId}/comments`, {
          content: input,
        });
        const commentId = res.data;
        try {
          const res = await instance.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          setCommentList((prev) => [ ...prev, res.data]);
        } catch (error) {
          
        }
      } else if (option === BUTTON_OPTIONS[2].name) {
        const res = await instance.patch(
          `/api/feeds/${feedId}/comments/${commentId}`,
          { content: input }
        );
        
        try {
          const res = await instance.get(
            `/api/feeds/${feedId}/comments/${commentId}`
          );
          const newCommentList = commentList.filter(
            (comment) => comment.id !== commentId
          );
          setCommentList([res.data, ...newCommentList]);
          
        } catch (error) {
          
        }
      }
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
    setisCommentLoading(false);
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
        isActive={!isCommentLoading && input.length !== 0}
        className=''
      />
    </form>
  );
}

export default CreateCommentBox;
