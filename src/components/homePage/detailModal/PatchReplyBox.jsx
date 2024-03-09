import { useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import instance from "@/utils/instance.js";
import Button from '../../common/Button';
import Swal from 'sweetalert2';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function PatchReplyBox({
  // setIsReplyOpen,
  setReplyList,
  replyList,
  commentId,
  setIsPatchReplyOpen,
  replyId,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [reply, handleChangeReply, setReply] = useInput('', setErrorMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSubmitPatchReply = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await instance.patch(
        `/api/comments/${commentId}/replies/${replyId}`,
        { content: reply }
      );
      try {
        const res = await instance.get(
          `/api/comments/${commentId}/replies/${replyId}`
        );
        const newReplyList = replyList.filter(
          (reply) => reply.replyId !== replyId
        );
        setReplyList([res.data, ...newReplyList]);
        setReply('');
        setIsPatchReplyOpen(false);
      } catch (error) {
        
      }
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
    setIsLoading(false);
  };

  return (
    <form
      className='flex items-center border border-gray gap-3 p-1 rounded-md'
      onSubmit={handleSubmitPatchReply}
    >
      <input
        className='w-36 border-gray-100 bg-bright placeholder:font-her outline-none'
        type='text'
        placeholder='답글 수정중...'
        onChange={handleChangeReply}
        value={reply}
      />
      {/* <button className='font-daeam text-xs'>등록</button> */}
      <Button text='등록' size={12}/>
    </form>
  );
}

export default PatchReplyBox;
