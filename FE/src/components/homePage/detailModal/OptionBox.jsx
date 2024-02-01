import Option from '../../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { formatDate } from '../../../utils/formatting';

function OptionBox({
  isLike,
  handleClickDeleteLike,
  handleClickCreateLike,
  updatedAt,
  likeCount,
}) {

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
        <span className='font-daeam'>거추 {likeCount}개</span>
        <span className='font-her'>{formatDate(updatedAt)}</span>
      </div>
    </div>
  );
}

export default OptionBox;
