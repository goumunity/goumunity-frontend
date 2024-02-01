import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';
import { useParams } from 'react-router-dom';

function CommentSection({ feedId, updatedAt, likeCount }) {
  const params = useParams();
  const [initialTime] = useState(new Date().getTime());

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
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const inputRef = useRef();

  const [isLike, setIsLike] = useState(false);

  const observerRef = useRef();

  const lastCommentRef = useCallback(
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

  // 게시글에 속한 댓글들 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/feeds/${feedId}/comments`, {
          params: {
            page,
            size: 3,
            time: initialTime,
          },
        });
        console.log('댓글 조회 결과 : ', res);
        setCommentList(res.data.contents);
        setHasNext(res.data.hasNext);
      } catch (error) {
        console.log('commentList 요청 중 에러 발생 : ', error);
      }
    };
    fetchData();
  }, [page]);

  // 게시글 좋아요
  const handleClickCreateLike = async () => {
    try {
      const res = await axios.post(`/api/feeds/${feedId}/like`);
      setIsLike(true);
      console.log('좋아요 했을 때 결과 : ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  // 게시글 좋아요 취소
  const handleClickDeleteLike = async () => {
    try {
      const res = await axios.delete(`/api/feeds/${feedId}/unlike`);
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

        <div ref={lastCommentRef} style={{ height: '10px' }}></div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox
          isLike={isLike}
          handleClickCreateLike={handleClickCreateLike}
          handleClickDeleteLike={handleClickDeleteLike}
          updatedAt={updatedAt}
          likeCount={likeCount}
        />
        <CreateCommentBox
          setCommentList={setCommentList}
          inputRef={inputRef}
          feedId={feedId}
        />
      </div>
    </div>
  );
}

export default CommentSection;
