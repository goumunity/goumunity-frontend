import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';
import LoadingImage from '../../common/LoadingImage';
import instance from "@/utils/instance.js";

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function CommentSection({
  feedId,
  createdAt,
  updatedAt,
  likeCount,
  ilikeThat,
  commentCnt,
  setCommentCnt,
  isScrapped,
}) {
  const [comment, handleChangeComment] = useInput('');
  const [initialTime] = useState(new Date().getTime());
  const [option, setOption] = useState(BUTTON_OPTIONS[0].name);
  const [commentId, setCommentId] = useState('');
  const [replyId, setReplyId] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(
    BUTTON_OPTIONS[0].text
  );
  const inputRef = useRef();
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
        const res = await instance.get(`/api/feeds/${feedId}/comments`, {
          params: {
            page,
            size: 15,
            time: initialTime,
          },
        });
        console.log(res.data);
        setCommentList((prev) => [...res.data.contents, ...prev]);
        setHasNext(res.data.hasNext);
        // setHasNext(true);
      } catch (error) {
        console.log('commentList 요청 중 에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div className='relative border-l border-gray w-2/5'>
      <div className='flex flex-col my-3 px-3 comment-list-height w-full overflow-y-auto non-scroll'>
        {/* <div className='flex flex-col items-center h-full bg-bright'> */}
        {commentList?.map((comment, idx) => (
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
            placeholderText={placeholderText}
            setPlaceholderText={setPlaceholderText}
            setCommentCnt={setCommentCnt}
          />
        ))}
        {isLoading && hasNext && <LoadingImage />}
        <div
          ref={lastCommentRef}
          style={{ height: '5px' }}
        ></div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox
          feedId={feedId}
          createdAt={createdAt}
          updatedAt={updatedAt}
          likeCount={likeCount}
          ilikeThat={ilikeThat}
          setOption={setOption}
          setPlaceholderText={setPlaceholderText}
          inputRef={inputRef}
          commentCnt={commentCnt}
          isScrapped={isScrapped}
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
          commentList={commentList}
          placeholderText={placeholderText}
          setPlaceholderText={setPlaceholderText}
        />
      </div>
    </div>
  );
}

export default CommentSection;
