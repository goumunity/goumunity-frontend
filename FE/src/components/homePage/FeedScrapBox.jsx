import axios from 'axios';
import { useState } from 'react';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import Option from '../common/Option';
import instance from "@/utils/instance.js";
import scrapIcon from '@/assets/svgs/scrapIcon.svg';
import unScrapIcon from '@/assets/svgs/unScrapIcon.svg';

function FeedScrapBox({ feedId, isScrapped }) {
  // const [feedScrapCount, setFeedScrapCount] = useState(likeCount);
  const [isFeedScrap, setIsFeedScrap] = useState(isScrapped);
  
  const handleClickCreateFeedScrap = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/scrap`);

      console.log(res)
      setIsFeedScrap(true);
      // setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log('게시글 스크랩 중 에러 발생 : ', error);
    }
  };

  const handleClickDeleteFeedScrap = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unscrap`);
      setIsFeedScrap(false);
      // setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      console.log('게시글 스크랩 취소 했을 때 에러 발생 : ', error);
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