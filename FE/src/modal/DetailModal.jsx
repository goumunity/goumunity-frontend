import { useDispatch } from 'react-redux';
import CloseButton from '../components/common/closeButton';
import { modalActions } from '../store/modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImage from '../components/common/ProfileImage';
import CommentSection from '../components/detailModal/CommentSection';

function DetailModal() {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalActions.closeDetailModal());
  };

  useEffect(function requestPost() {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('fake/post');

        if (res.statusText !== 'OK') {
          throw new Error('데이터 요청 실패');
        }
        setPost(res.data);
      } catch (error) {
        console.error('api 요청 중 오류 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='fixed top-0 left-0 bg-back right-0 bottom-0'>
      <CloseButton className='absolute top-5 right-5' onClick={closeModal} />
      <div className='z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-3/5 bg-bright border border-gray'>
        <div className='h-full flex'>
          <div className='flex flex-col w-2/3 px-10 py-8 scroll-auto'>
            <div className='flex items-center gap-5'>
              <ProfileImage size='8' />
              <div>
                {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
                <span className='font-daeam'>cheryong</span>
                {' * '}
                <span className='font-her'>2일 전</span>
              </div>
            </div>
            <p className='my-4 px-3'>
              멀티탭에 와이파이 tv 등 모든 콘센트 몰빵하고(냉장고 세탁기 제외)
              출근할때 멀티탭 선 뽑고 퇴근 후 다시 꼽고 주말동안은 계속 사용
              하는데 관리명세표에 평균 전기료가 다른집보다 전기료 7% 덜썼대 ㄷ
              ㄷ 왜 진작 이렇게 안했을까 싶더라 내가 늦게 실천 하는거 일수도
              있는데 혹시나 별차이 없을꺼라고 생각하는 덬도 있을까바 실제
              경험해서 적어봤어~~ 요즘 이것 저것 너무 많이 오르는데 조금이라도
              아껴보자~~!!
            </p>
            <img
              className='w-full h-50 rounded'
              src='https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww'
              alt=''
            />
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
