import Option from '../../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import axios from 'axios';
import { formatDate } from '../../../utils/formatting';
import FeedLikeBox from '../FeedLikeBox';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function OptionBox({ commentCnt, createdAt, updatedAt, likeCount, feedId, ilikeThat, setOption, setPlaceholderText, inputRef }) {
  const [isLike, setIsLike] = useState(ilikeThat);
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const feedDate = updatedAt ? formatDate(updatedAt) : formatDate(createdAt)

  const handleClickCreateLike = async () => {
    try {
      const res = await axios.post(`/api/feeds/${feedId}/like`);
      setIsLike(true);
      setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('게시물 좋아요 할 때 에러 발생 : ', error);
    }
  };

  const handleClickDeleteLike = async () => {
    try {
      const res = await axios.delete(`/api/feeds/${feedId}/unlike`);
      setIsLike(false);
      setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('게시물 좋아요 취소할 때에러 발생 : ', error);
    }
  };

  const handleClickChangeCreateComment = () => {
    setPlaceholderText(BUTTON_OPTIONS[0].text)
    setOption(BUTTON_OPTIONS[0].name)
    inputRef.current.focus();
  }

  return (
    <div className='border-y border-gray p-2'>
      <div className='flex'>
        {isLike ? (
          <Option src={unLikeIcon} size={5} onClick={handleClickDeleteLike} />
        ) : (
          <Option src={likeIcon} size={5} onClick={handleClickCreateLike} />
        )}
        {/* <FeedLikeBox likeCount={likeCount} feedId={feedId} ilikeThat={ilikeThat}/> */}
        <Option text={commentCnt} src={commentIcon} size={5} onClick={handleClickChangeCreateComment}/>
      </div>
      <div className='flex items-center gap-2'>
        {/* <span className='font-daeam'>거추 {feedLikeCount}개</span> */}
        <span className='font-daeam'>거추 {feedLikeCount}개</span>
        <span className='font-her'>{feedDate}</span>
      </div>
    </div>
  );
}

export default OptionBox;
