import Option from '../../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useEffect, useState } from 'react';
import { formatDate } from '../../../utils/formatting';
import FeedLikeBox from '../FeedLikeBox';
import instance from "@/utils/instance.js";
import scrapIcon from '@/assets/svgs/scrapIcon.svg';
import unScrapIcon from '@/assets/svgs/unScrapIcon.svg';
import Swal from 'sweetalert2';

const BUTTON_OPTIONS = [
  { id: 1, name: 'createComment', text: '댓글 좀 달아줘...' },
  { id: 2, name: 'createReply', text: '답글 쓰는 중...' },
  { id: 3, name: 'patchComment', text: '댓글 수정 중...' },
  { id: 4, name: 'patchReply', text: '답글 수정 중...' },
];

function MobileOptionBox({ commentCnt, createdAt, updatedAt, likeCount, feedId, ilikeThat, setOption, setPlaceholderText, inputRef, isScrapped }) {
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
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteLike = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unlike`);
      setIsLike(false);
      setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickCreateScrap = async () => {
    try {
      const res = await instance.post(`/api/feeds/${feedId}/scrap`);
      setIsScrap(true);
      // setFeedLikeCount((prev) => prev + 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickDeleteScrap = async () => {
    try {
      const res = await instance.delete(`/api/feeds/${feedId}/unscrap`);
      setIsScrap(false);
      // setFeedLikeCount((prev) => prev - 1);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
  };

  const handleClickChangeCreateComment = () => {
    setPlaceholderText(BUTTON_OPTIONS[0].text)
    setOption(BUTTON_OPTIONS[0].name)
    inputRef.current.focus();
  }

  // useEffect(() => {
  //   setCommentCount()
  // }, [commentCount])
  return (
    <div className='h-full'>
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
  );
}

export default MobileOptionBox;
