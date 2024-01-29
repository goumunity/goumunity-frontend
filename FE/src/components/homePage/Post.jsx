import { useState } from 'react';
import ProfileImage from '../common/ProfileImage';
import likeIcon from '@/assets/svgs/likeIcon.svg';
import unLikeIcon from '@/assets/svgs/unLikeIcon.svg';
import commentIcon from '@/assets/svgs/commentIcon.svg';
import Option from '../common/Option';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// 댓글, 답글 200자
function Post({ post, ...props }) {
  
  const navigate = useNavigate();

  const [isLike, setIsLike] = useState(false);

  const handleClickToggleLike = () => {
    setIsLike(!isLike);
  };

  const dispatch = useDispatch();

  const handleClickOpenDetailModal = () => {
    dispatch(modalActions.openDetailModal());
  }

  const handleClickOpenDetail = () => {
    navigate(`/${id}`)
  }

  const {
    id,
    content,
    type,
    price,
    afterPrice,
    profit,
    like,
    user,
    region,
    createdAt,
  } = post;

  return (
    <div className='flex flex-col w-post border border-gray px-4 py-2'>
      <div className='flex items-center gap-5'>
        <ProfileImage size='8' />
        <div>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className='font-daeam'>{user}</span>
          {' * '}
          <span className='font-her'>{createdAt}</span>
        </div>
      </div>
      <p className='my-4 px-3'>
        멀티탭에 와이파이 tv 등 모든 콘센트 몰빵하고(냉장고 세탁기 제외)
        출근할때 멀티탭 선 뽑고 퇴근 후 다시 꼽고 주말동안은 계속 사용 하는데
        관리명세표에 평균 전기료가 다른집보다 전기료 7% 덜썼대 ㄷ ㄷ 왜 진작
        이렇게 안했을까 싶더라 내가 늦게 실천 하는거 일수도 있는데 혹시나 별차이
        없을꺼라고 생각하는 덬도 있을까바 실제 경험해서 적어봤어~~ 요즘 이것
        저것 너무 많이 오르는데 조금이라도 아껴보자~~!!
      </p>
      <img
        className='w-full h-50 rounded'
        src='https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww'
        alt=''
      />
      <div className='flex items-center my-2 gap-2'>
        {isLike ? (
          <Option
            text={like}
            src={unLikeIcon}
            onClick={handleClickToggleLike}
          />
        ) : (
          <Option text={like} src={likeIcon} onClick={handleClickToggleLike} />
        )}

        <Link to={`/${id}`}>
          <Option text={like} src={commentIcon}  />
        </Link>
      </div>
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
    </div>
  );
}

export default Post;
