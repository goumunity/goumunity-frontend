import Option from '../../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';

function OptionBox({isLike, handleClickDeleteLike, handleClickCreateLike}) {

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
      <div>
        <span className='font-daeam'>거추 23만개</span>
        <span className='font-her'>2027-07-31</span>
      </div>
    </div>
  );
}

export default OptionBox;
