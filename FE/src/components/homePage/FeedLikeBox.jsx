import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../common/Option';
import instance from "@/utils/instance.js";

function FeedLikeBox({ likeCount, feedId, ilikeThat }) {
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const [isFeedLike, setIsFeedLike] = useState(ilikeThat);
  
  const handleClickCreateFeedLike = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/like`);

      console.log(res)
      setIsFeedLike(true);
      setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('게시글 좋아요 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteFeedLike = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unlike`);
      setIsFeedLike(false);
      setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('게시글 좋아요 취소 했을 때 에러 발생 : ', error);
    }
  };
  return (
    <div>
      {isFeedLike ? (
        <Option
          text={feedLikeCount}
          size={5}
          src={unLikeIcon}
          onClick={handleClickDeleteFeedLike}
        />
      ) : (
        <Option
          text={feedLikeCount}
          size={5}
          src={likeIcon}
          onClick={handleClickCreateFeedLike}
        />
      )}
    </div>
  );
}

export default FeedLikeBox;
