import Button from '../components/common/Button';
import CustomModal from '../components/common/CustomModal';
import JoinModal1 from '../components/landingPage/joinModal1/JoinModal1';
import LoginModal from '../components/landingPage/loginModal/LoginModal';
import JoinModal2 from '../components/landingPage/joinModal2/JoinModal2';
import JoinModal3 from '../components/landingPage/joinModal3/JoinModal3';
import beggar from '@/assets/images/beggar.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';

function LandingPage() {
  const params = useParams();

  const navigate = useNavigate();

  // 모달 닫기(랜딩 페이지로 이동)
  const handleClickCloseModal = () => {
    navigate('/landing');
  };

  return (
    <div className='img-bg w-full flex flex-col justify-between relative pr-64 my-10'>
      <div>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '10px',
            zIndex: '1000',
          }}
        >
          {/* <img
            className='mt-4'
            src={geo}
            alt='거뮤니티 로고'
            style={{
              width: '200px', // 원하는 크기로 조정
              height: 'auto',
              display: 'block',
            }}
          /> */}
        </div>

        <div className='font-daeam text-4xl flex items-center justify-center mb-10'>
          같은 거지들 끼리 절약 정보를 공유하세요{' '}
        </div>
        {params.joinId === '1' && (
          <CustomModal onClick={handleClickCloseModal}>
            <JoinModal1 />
          </CustomModal>
        )}
        {params.joinId === '2' && (
          <CustomModal onClick={handleClickCloseModal}>
            <JoinModal2 />
          </CustomModal>
        )}
        {params.joinId === '3' && (
          <CustomModal onClick={handleClickCloseModal}>
            <JoinModal3 />
          </CustomModal>
        )}

        {params.joinId === '4' && (
          <CustomModal onClick={handleClickCloseModal}>
            <LoginModal />
          </CustomModal>
        )}
        <div>
          <img
            className='mt-4'
            src={beggar}
            alt='3beggars'
            style={{
              width: '70vw',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>
        <div className='font-her text-3xl flex items-center justify-center my-4'>
          {' '}
          지는유, 똑똑한 그지가 될거에유
        </div>
      </div>

      <div className='flex justify-center gap-10'>
        <Link to='/landing/join/4'>
          <Button text='로그인' />
        </Link>
        <Link to='/landing/join/1'>
          <Button text='회원가입' />
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
