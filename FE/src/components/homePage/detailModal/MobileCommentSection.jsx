import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';
import LoadingImage from '../../common/LoadingImage';
import instance from "@/utils/instance.js";
import MobileOptionBox from './MobileOptionBox';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import scrapIcon from '@/assets/svgs/scrapIcon.svg';
import unScrapIcon from '@/assets/svgs/unScrapIcon.svg';
import { formatDate } from '../../../utils/formatting';
import Option from '../../common/Option';
import MobileCreateCommentBox from './MobileCreateCommentBox';
const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function MobileCommentSection({
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const [placeholderText, setPlaceholderText] = useState(
    BUTTON_OPTIONS[0].text
  );
  const inputRef = useRef();
  const observerRef = useRef();
  console.log('여긴있나:', commentCnt)

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

  
  const [isLike, setIsLike] = useState(ilikeThat);
  const [isScrap, setIsScrap] = useState(isScrapped);
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const [commentCount, setCommentCount] = useState(commentCnt);
  const feedDate = updatedAt ? formatDate(updatedAt) : formatDate(createdAt)
  const handleClickCreateLike = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/like`);
      setIsLike(true);
      setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('게시물 좋아요 할 때 에러 발생 : ', error);
    }
  };

  const handleClickDeleteLike = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unlike`);
      setIsLike(false);
      setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('게시물 좋아요 취소할 때에러 발생 : ', error);
    }
  };

  const handleClickCreateScrap = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/scrap`);
      setIsScrap(true);
      // setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('게시물 스크랩 할 때 에러 발생 : ', error);
    }
  };

  const handleClickDeleteScrap = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unscrap`);
      setIsScrap(false);
      // setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('게시물 스크랩 취소할 때에러 발생 : ', error);
    }
  };

  const handleClickChangeCreateComment = () => {
    setPlaceholderText(BUTTON_OPTIONS[0].text)
    setOption(BUTTON_OPTIONS[0].name)
    inputRef.current.focus();
  }

  return (
    <div className='h-full border-gray' style={{height:'180px'}}>
      <div className='flex flex-col my-3 px-3 comment-list-height w-full overflow-y-auto'>
        {/* <div className='flex flex-col items-center h-full bg-bright'> */}
        {commentList?.map((comment, idx) => (
          <Comment
            key={idx}
            comment={comment}
            inputRef={inputRef}
            option={option}
            setOption={setOption}
            setCommentId={setCommentId}
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
      <div className='w-full h-full' style={{ height:'180px'}}>
      <div className='w-full'>
      <div className='flex'>
        <div className='w-1/3 flex justify-start'>
          {isLike ? (
            <Option text='거추 취소' src={unLikeIcon} size={5} onClick={handleClickDeleteLike} />
          ) : (
            <Option text='거추' src={likeIcon} size={5} onClick={handleClickCreateLike} />
          )}
        </div>
        {/* <FeedLikeBox likeCount={likeCount} feedId={feedId} ilikeThat={ilikeThat}/> */}
        <div className='w-1/3 flex justify-start'>
          <Option text={commentCount} src={commentIcon} size={5} onClick={handleClickChangeCreateComment}/>
        </div>
        <div className='w-1/3 flex justify-start'>
          {isScrap ? (
            <Option text='스크랩취소' src={scrapIcon} size={5} onClick={handleClickDeleteScrap} />
          ) : (
            <Option text='스크랩' src={unScrapIcon} size={5} onClick={handleClickCreateScrap} />
          )}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {/* <span className='font-daeam'>거추 {feedLikeCount}개</span> */}
        <span className='font-daeam'>거추 {feedLikeCount}개</span>
        <span className='font-her'>{feedDate}</span>
      </div>
    </div>
    
        <MobileCreateCommentBox
          setCommentList={setCommentList}
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

export default MobileCommentSection;
