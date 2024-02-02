import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';
import { useParams } from 'react-router-dom';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment' },
  { id: 2, name: 'createReply' },
  { id: 3, name: 'patchComment' },
  { id: 4, name: 'patchReply' },
];

function CommentSection({ feedId, createdAt, updatedAt, likeCount }) {
  const params = useParams();
  const [comment, handleChangeComment] = useInput('');
  const [initialTime] = useState(new Date().getTime());
  const [option, setOption] = useState(true);
  const [commentId, setCommentId] = useState('');
  const [replyId, setReplyId] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const inputRef = useRef();
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

  return (
    <div className='relative border-l border-gray w-1/3'>
      <div className='px-2 w-ful'>
        {commentList?.map((comment, idx) => {
          return (
            <Comment
              key={idx}
              comment={comment}
              inputRef={inputRef}
              option={option}
              setOption={setOption}
              setCommentId={setCommentId}
              replyList={replyList}
              setReplyList={setReplyList}
              setReplyId={setReplyId}
              commentList={commentList}
              setCommentList={setCommentList}
            />
          );
        })}

        <div ref={lastCommentRef} style={{ height: '10px' }}></div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox
          feedId={feedId}
          createdAt={createdAt}
          updatedAt={updatedAt}
          likeCount={likeCount}
        />
        <CreateCommentBox
          setCommentList={setCommentList}
          setReplyList={setReplyList}
          inputRef={inputRef}
          feedId={feedId}
          option={option}
          setOption={setOption}
          commentId={commentId}
          replyId={replyId}
          comment={comment}
          handleChangeComment={handleChangeComment}
        />
      </div>
    </div>
  );
}

export default CommentSection;
