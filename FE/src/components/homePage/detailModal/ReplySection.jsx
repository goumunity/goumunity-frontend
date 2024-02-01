import axios from 'axios';
import { useEffect, useState } from 'react';
import Comment from './Comment.jsx';

function ReplySection() {
  const [replyList, setReplyList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // 댓글에 대한 답글 불러오기
  useEffect(function requestReplyList() {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const res = await axios.get(`/api/feeds/${params.postId}`)
        const res = await axios.get('/fake/replies');
        console.log(res);
        setReplyList(res.data.contents);

        console.log('replies : ', replyList);
      } catch (error) {
        console.log('에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {replyList.map((reply) => {
        return <Comment key={reply.replyId} comment={reply} />;
      })}
    </>
  );
}

export default ReplySection;
