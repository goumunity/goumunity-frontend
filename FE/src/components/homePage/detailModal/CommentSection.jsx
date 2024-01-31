import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';
import { useParams } from 'react-router-dom';

function CommentSection() {
  const params = useParams();
  const [page, setPage] = useState(0);

  const observerRef = useRef();

  const observer = (node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
      }
    });
    node && observerRef.current.observe(node);
  };

  const [commentList, setCommentList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

  const [isLike, setIsLike] = useState(true);

  // 게시글에 속한 댓글들 불러오기
  useEffect(function requestCommentList() {
    const fetchData = async () => {
      // setIsLoading(true);
      try {
        const time = new Date().getTime();
        const res = await axios.get(`/api/feeds/${params.postId}/comments`, { params: {
          page: 0, size: 3, time,
        }});
        // console.log('댓글 조회 결과 : ', res)
        setCommentList(res.data.contents);
      } catch (error) {
        console.log('처음 댓글을 불러올 때 에러 발생 : ', error);
      }
      // setIsLoading(false);
    };
    fetchData();
  }, []);

  // 게시글 좋아요
  const handleClickCreateLike = async () => {
    try {
      console.log(params.postId);
      const res = await axios.post(`/api/feeds/${params.postId}/like`);
      setIsLike(true);
      console.log('좋아요 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  // 게시글 좋아요 취소
  const handleClickDeleteLike = async () => {
    try {
      console.log(params.postId);
      const res = await axios.delete(`/api/feeds/${params.postId}/unlike`);
      setIsLike(false);
      console.log('좋아요 취소 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  return (
    <div className='relative border-l border-gray w-1/3'>
      <div className='px-2 w-ful'>
        {/* {commentList.length ? (
          commentList?.map((comment, idx) => {
            return <Comment key={idx} comment={comment} inputRef={inputRef} />;
          })
        ) : (
          <div>댓글이 없습니다.</div>
        )} */}
     
          {commentList?.map((comment, idx) => {
            return <Comment key={idx} comment={comment} inputRef={inputRef} />;
          })}
       
        <div ref={observer} style={{ height: '10px' }}></div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox
          isLike={isLike}
          handleClickCreateLike={handleClickCreateLike}
          handleClickDeleteLike={handleClickDeleteLike}
        />
        <CreateCommentBox setCommentList={setCommentList} inputRef={inputRef} />
      </div>
    </div>
  );
}

export default CommentSection;
