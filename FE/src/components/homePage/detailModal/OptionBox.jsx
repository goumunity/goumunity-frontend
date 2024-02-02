import Option from '../../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';
import axios from 'axios';
import { formatDate } from '../../../utils/formatting';

function OptionBox({ createdAt, updatedAt, likeCount, feedId }) {
  const [isLike, setIsLike] = useState(false);
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

  return (
    <div className='border-y border-gray p-2'>
      <div className='flex'>
        {isLike ? (
          <Option src={unLikeIcon} onClick={handleClickDeleteLike} />
        ) : (
          <Option src={likeIcon} onClick={handleClickCreateLike} />
        )}
        <Option src={commentIcon} />
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-daeam'>거추 {feedLikeCount}개</span>
        <span className='font-her'>{feedDate}</span>
      </div>
    </div>
  );
}

export default OptionBox;
