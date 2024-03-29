import { useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import instance from '@/utils/instance.js';
import Button from '../../common/Button';
import Swal from 'sweetalert2';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function CreateReplyBox({
  setIsReplyOpen,
  setReplyList,
  replyList,
  commentId,
  setIsCreateReplyOpen,
  setCommentReplyCount,
  setCommentList,
  commentList,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [reply, handleChangeReply, setReply] = useInput('', setErrorMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSubmitCreateReply = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await instance.post(`/api/comments/${commentId}/replies`, {
        content: reply,
      });
      const replyId = res.data;
      try {
        const res = await instance.get(
          `/api/comments/${commentId}/replies/${replyId}`
        );
        // setIsReplyOpen(true);
        setIsCreateReplyOpen(false);
        setCommentReplyCount((prev) => prev + 1);
        setReplyList((prev) => [res.data, ...prev]);
        setCommentList(commentList.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, replyCount: comment.replyCount + 1 };
          }
          return comment;
        }));
      } catch (error) {
        
      }
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }

    setIsLoading(false);
    setReply('');
  };

  return (
    <form
      className='flex items-center border border-gray gap-3 p-1 rounded-md'
      onSubmit={handleSubmitCreateReply}
    >
      <input
        className='border-gray-100 bg-bright placeholder:font-her outline-none'
        type='text'
        placeholder='답글을 입력하세요...'
        onChange={handleChangeReply}
        value={reply}
      />
      {/* <button className='font-daeam text-xs'>등록</button> */}
      <Button text='등록' size={12} />
    </form>
  );
}

export default CreateReplyBox;
