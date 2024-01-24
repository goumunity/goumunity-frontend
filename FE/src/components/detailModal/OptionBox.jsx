import Option from '../common/Option';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import { useState } from 'react';

function OptionBox() {
  const [isLike, setIsLike] = useState(false);

  const handleClickToggleIsLike = () => {
    setIsLike(!isLike)
  }
  return (
    <div className='border-y border-gray p-2'>
      <div className='flex'>
        {isLike ? <Option src={unLikeIcon} onClick={handleClickToggleIsLike} /> : <Option src={likeIcon} onClick={handleClickToggleIsLike}/>}
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
