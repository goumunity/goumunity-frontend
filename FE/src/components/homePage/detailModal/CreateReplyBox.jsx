import { useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';

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
  setCommentReplyCount
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [reply, handleChangeReply, setReply] = useInput('', setErrorMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSubmitCreateReply = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
    const res = await axios.post(`/api/comments/${commentId}/replies`, {
      content: reply,
    });
    const replyId = res.data;
    try {
      const res = await axios.get(
        `/api/comments/${commentId}/replies/${replyId}`
      );
      setReplyList((prev) => [res.data, ...prev]);
      setIsReplyOpen(true);
      setIsCreateReplyOpen(false)
      setCommentReplyCount((prev) => prev + 1)
    } catch (error) {
      console.log('답글 생성 중 에러 발생 : ', error);
    }
  } catch (error) {
    console.log(error)
  }
    // } else if (option === BUTTON_OPTIONS[3].name) {
    //   const res = await axios.patch(
    //     `/api/comments/${commentId}/replies/${replyId}`,
    //     { content: input }
    //   );
    //   console.log('답글 수정 결과 : ', res);
    //   try {
    //     const res = await axios.get(
    //       `/api/comments/${commentId}/replies/${replyId}`
    //     );
    //     const newReplyList = replyList.filter(
    //       (reply) => reply.replyId !== replyId
    //     );
    //     setReplyList([res.data, ...newReplyList]);
    //     setIsReplyOpen(true)
    //   } catch (error) {
    //     console.log('답글 단일 조회 중 에러 발생 : ', error);
    //   }
    // }
    // } catch (error) {
    //   console.log('답글 에러 발생 : ', error);
    setIsLoading(false);
    setReply('');
  };

  return (
    <form className='flex items-center border border-gray gap-3 p-1 rounded-md' onSubmit={handleSubmitCreateReply}>
      <input
        className='border-gray-100 bg-bright placeholder:font-her outline-none'
        type='text'
        placeholder='답글을 입력하세요...'
        onChange={handleChangeReply}
        value={reply}
      />
      <button className='font-daeam text-xs'>등록</button>
    </form>
  );
}

export default CreateReplyBox;
