import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reply from './Reply.jsx';
import LoadingImage from '../../common/LoadingImage.jsx';
import instance from "@/utils/instance.js";

function ReplySection({ commentId, setOption, setReplyId, setCommentReplyCount, replyList, setReplyList, commentList, setCommentList }) {
  // const [replyList, setReplyList] = useState([]);
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
        const res = await instance.get(`/api/comments/${commentId}/replies`, {
          params: {
            page,
            size: 10,
            time: initialTime,
          },
        });
        setReplyList(res.data.contents);
        setHasNext(res.data.hasNext);
      } catch (error) {
        
      }
      setIsLoading(false);

    };
    fetchData();
  }, [page]);

  return (
    <>
    {isLoading ? <LoadingImage /> :
      <div className='overflow-y-auto non-scroll'>
        {replyList.map((reply) => {
          return <Reply key={reply.replyId} reply={reply} replyList={replyList} setReplyList={setReplyList} setReplyId={setReplyId} setOption={setOption} setCommentReplyCount={setCommentReplyCount} setCommentList={setCommentList} commentList={commentList}/>;
        })}
      </div>
      }
      <div ref={lastReplyRef} style={{ height: '5px' }}></div>
    </>
  );
}

export default ReplySection;
