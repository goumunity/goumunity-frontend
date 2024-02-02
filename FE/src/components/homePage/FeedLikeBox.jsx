import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../common/Option';

function FeedLikeBox({ likeCount, feedId, ilikeThat }) {
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const [isFeedLike, setIsFeedLike] = useState(ilikeThat);

  const handleClickCreateFeedLike = async () => {
    try {
      
      const res = await axios.post(`/api/feeds/${feedId}/like`);
      setIsFeedLike(true);
      setFeedLikeCount((prev) => prev + 1);
      console.log('게시글 좋아요 했을 때 결과 : ', res);
    } catch (error) {
      console.log('게시글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteFeedLike = async () => {
    try {
      const res = await axios.delete(`/api/feeds/${feedId}/unlike`);
      setIsFeedLike(false);
      setFeedLikeCount((prev) => prev - 1);
      console.log('게시글 좋아요 취소 했을 때 결과 : ', res);
    } catch (error) {
      console.log('게시글 좋아요 취소 했을 때 에러 발생 : ', error);
    }
  };
  return (
    <div>
      {isFeedLike ? (
        <Option
          text={feedLikeCount}
          src={unLikeIcon}
          onClick={handleClickDeleteFeedLike}
        />
      ) : (
        <Option
          text={feedLikeCount}
          src={likeIcon}
          onClick={handleClickCreateFeedLike}
        />
      )}
    </div>
  );
}

export default FeedLikeBox;
