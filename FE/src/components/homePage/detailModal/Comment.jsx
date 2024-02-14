import Option from '../../common/Option';
import ProfileImage from '../../common/ProfileImage';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useEffect, useState } from 'react';
import { calculateDate, formatDate } from '../../../utils/formatting';
import ReplySection from './ReplySection';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentLikeBox from './CommentLikeBox';
import NicknameBox from '../../common/NicknameBox';
import CreateReplyBox from './CreateReplyBox';
import instance from '@/utils/instance.js';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function Comment({
  comment,
  inputRef,
  option,
  setOption,
  setCommentId,
  setReplyId,
  commentList,
  setCommentList,
  placeholderText,
  setPlaceholderText,
  setCommentCnt,
}) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isCreateReplyOpen, setIsCreateReplyOpen] = useState(false);
  const [replyList, setReplyList] = useState([]);
  
  const {
    content,
    createdAt,
    feedId,
    id,
    ilikeThat,
    likeCount,
    replyCount,
    updatedAt,
    user,
  } = comment;
  
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [isCommentLiked, setIsCommentLiked] = useState(ilikeThat);
  const [commentReplyCount, setCommentReplyCount] = useState(replyCount);
  
  useEffect(() => {
    setCommentLikeCount(likeCount)
    setIsCommentLiked(ilikeThat)
    setCommentReplyCount(replyCount)
  }, [id])
  
  // const { age, email, gender, id, imgSrc, monthBudget, nickname, regionId, userCategory } = user

  const daysAgo = updatedAt
    ? calculateDate(updatedAt)
    : calculateDate(createdAt);

  // 답글 달기칸 열기
  const handleClickOpenCreateReply = () => {
    inputRef.current.focus();
    setIsCreateReplyOpen(!isCreateReplyOpen);
    setCommentId(id);
  };

  const handleClickToggleIsReplyOpen = () => {
    if (commentReplyCount === 0) return;
    setIsReplyOpen(!isReplyOpen);
  };

  const handleClickDeleteComment = async () => {
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    try {
      const res = await instance.delete(`/api/feeds/${feedId}/comments/${id}`);
      const newCommentList = commentList.filter((comment) => comment.id !== id);
      console.log('삭제 후 commentList:',newCommentList)
      setCommentList(newCommentList);
      setCommentCnt((prev) => prev - 1);
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };

  // 댓글 수정 시
  const handleClickChangePatchComment = async () => {
    inputRef.current.focus();
    setOption(BUTTON_OPTIONS[2].name);
    setCommentId(id);
    setPlaceholderText(BUTTON_OPTIONS[2].text);
  };

  const handleClickCreateCommentLike = async () => {
    try {
      const res = await instance.post(`/api/comments/${id}/like`);
      setIsCommentLiked(true);
      setCommentLikeCount((prev) => prev + 1);

      setCommentList(commentList.map(comment => {
        if (comment.id === id) {
          return { ...comment, likeCount: comment.likeCount + 1, ilikeThat: true };
        }
        return comment;
      }));
    } catch (error) {
      console.log('댓글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteCommentLike = async () => {
    try {
      const res = await instance.delete(`/api/comments/${id}/unlike`);
      setIsCommentLiked(false);
      // setIsLiked(false);
      setCommentLikeCount((prev) => prev - 1);

      setCommentList(commentList.map(comment => {
        if (comment.id === id) {
          return { ...comment, likeCount: comment.likeCount -1 , ilikeThat: false };
        }
        return comment;
      }));
    } catch (error) {
      console.log('에러 발생 : ', error);
    }
  };


  return (
    <div className='flex py-1 gap-2 w-full'>
      <Link to={`/profile/${user.nickname}`}>
        <div
          className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
        >
          {user.imgSrc ? (
            <img className={`w-full h-full cursor-pointer`} src={user.imgSrc} />
          ) : (
            <img
              className={`w-full h-full cursor-pointer`}
              src={defaultMaleIcon}
            />
          )}
        </div>
      </Link>
      <div>
        <NicknameBox nickname={user.nickname} daysAgo={daysAgo} fontSize='sm' />
        <p className='text-md leading-4 my-1'>{content}</p>
        <div className='flex gap-2 items-center my-1 font-daeam text-xs'>
        <div>
      {isCommentLiked ? (
      // {ilikeThat ? (
        <Option
          text={commentLikeCount}
          // text={likeCount}
          size={3}
          src={unLikeIcon}
          onClick={handleClickDeleteCommentLike}
        />
      ) : (
        <Option
          text={commentLikeCount}
          // text={likeCount}
          size={3}
          src={likeIcon}
          onClick={handleClickCreateCommentLike}
        />
      )}
    </div>
          {/* <CommentLikeBox
            // likeCount={likeCount}
            likeCount={likeCount}
            commentId={id}
            // setCommentLikeCount={setCommentLikeCount}
            // ilikeThat={ilikeThat}
            // setIsLiked={setIsLiked}
            ilikeThat={ilikeThat}
            // comment={comment}
            // setComment={setComment}
          /> */}
          <Option
            text={commentReplyCount}
            size={3}
            src={commentIcon}
            onClick={handleClickToggleIsReplyOpen}
            // onClick={handleClickToggleLike}
          />
          <span className='cursor-pointer' onClick={handleClickOpenCreateReply}>
            답글 달기
          </span>

          {user.id === currentUser.id && (
            <span className='cursor-pointer' onClick={handleClickDeleteComment}>
              삭제
            </span>
          )}
          {user.id === currentUser.id && (
            <span
              className='cursor-pointer'
              onClick={handleClickChangePatchComment}
            >
              수정
            </span>
          )}
        </div>
        {isCreateReplyOpen && (
          <CreateReplyBox
            setCommentReplyCount={setCommentReplyCount}
            setIsReplyOpen={setIsReplyOpen}
            setIsCreateReplyOpen={setIsCreateReplyOpen}
            replyList={replyList}
            setReplyList={setReplyList}
            commentId={id}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        )}
        {commentReplyCount !== 0 && (
          <div
            className='my-2 font-dove text-sm cursor-pointer'
            onClick={handleClickToggleIsReplyOpen}
          >
            - 답글 {isReplyOpen ? '숨기기' : `${commentReplyCount}개 보기`}
          </div>
        )}
        {isReplyOpen && (
          <ReplySection
            commentId={id}
            setOption={setOption}
            setReplyId={setReplyId}
            setCommentReplyCount={setCommentReplyCount}
            replyList={replyList}
            setReplyList={setReplyList}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
