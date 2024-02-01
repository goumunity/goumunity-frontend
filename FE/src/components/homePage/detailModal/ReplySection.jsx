import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import Comment from './Comment.jsx';


function ReplySection({ commentId }) {
  const [replyList, setReplyList] = useState([]);
  const [initialTime] = useState(new Date().getTime());

  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);

  const observerRef = useRef();

  const lastReplyRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        console.log('entries[0].isIntersecting : ', entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observerRef.current.observe(node);
      // console.log(node);
    },
    [isLoading, hasNext]
  );

  // 댓글에 속한 답글들 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/feeds/${commentId}/comments`, {
          params: {
            page,
            size: 3,
            time: initialTime,
          },
        });
        console.log('답글 조회 결과 : ', res);
        setReplyList(res.data.contents);
        setHasNext(res.data.hasNext);
      } catch (error) {
        console.log('replyList 요청 중 에러 발생 : ', error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <>
      {replyList.map((reply) => {
        return <Comment key={reply.replyId} comment={reply} />;
      })}
      <div ref={lastReplyRef} style={{ height: '10px' }}></div>
    </>
  );
}

export default ReplySection;
