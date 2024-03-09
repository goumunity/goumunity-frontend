import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../common/Option';
import instance from "@/utils/instance.js";
import scrapIcon from '@/assets/svgs/scrapIcon.svg';
import unScrapIcon from '@/assets/svgs/unScrapIcon.svg';
import Swal from 'sweetalert2';

function FeedScrapBox({ feedId, isFeedScrapped, setFeedList, feedList }) {
  const [isFeedScrap, setIsFeedScrap] = useState(isFeedScrapped);
  
  const handleClickCreateFeedScrap = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/scrap`);
      setIsFeedScrap(true);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, isScrapped: true };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteFeedScrap = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unscrap`);
      setIsFeedScrap(false);
      // setFeedLikeCount((prev) => prev - 1);
      setFeedList(feedList.map(feed => {
        if (feed.feedId === feedId) {
          return { ...feed, isScrapped: false };
        }
        return feed;
      }));
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <div>
      {isFeedScrap ? (
        <Option
          text='스크랩 취소'
          size={5}
          src={scrapIcon}
          onClick={handleClickDeleteFeedScrap}
        />
      ) : (
        <Option
          text='스크랩'
          size={5}
          src={unScrapIcon}
          onClick={handleClickCreateFeedScrap}
        />
        // <FontAwesomeIcon icon={faMarker} onClick={handleClickCreateFeedScrap}/>
      )}
    </div>
  );
}

export default FeedScrapBox;
