import axios from 'axios';
import { useEffect, useState } from 'react';
import Comment from './Comment.jsx';

function ReplySection() {
  const [replies, setReplies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // 댓글에 대한 답글 불러오기
  useEffect(function requestReplies() {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const res = await axios.get(`/api/feeds/${params.postId}`)
        const res = await axios.get('/fake/replies');
        console.log(res);
        setReplies(res.data.contents);

        console.log('replies : ', replies);
      } catch (error) {
        console.log('에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {replies.map((reply) => {
        return <Comment key={reply.replyId} comment={reply} />;
      })}
      ;
    </>
  );
}

export default ReplySection;
