import axios from 'axios';
import { useEffect, useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../common/Option';
import instance from "@/utils/instance.js";
import Swal from 'sweetalert2';

function FeedLikeBox({ likeCount, feedId, ilikeThat, setFeedList, feedList }) {
  const [feedLikeCount, setFeedLikeCount] = useState(likeCount);
  const [isFeedLike, setIsFeedLike] = useState(ilikeThat);
  
  const handleClickCreateFeedLike = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/like`);

      setIsFeedLike(true);
      setFeedLikeCount((prev) => prev + 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, likeCount: feed.likeCount + 1, ilikeThat: true };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteFeedLike = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unlike`);
      setIsFeedLike(false);
      setFeedLikeCount((prev) => prev - 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, likeCount: feed.likeCount - 1, ilikeThat: false };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  // useEffect(() => {
  //   setFeedLikeCount(likeCount)
  //   setIsFeedLike(ilikeThat)
  // }, [feedId])

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
