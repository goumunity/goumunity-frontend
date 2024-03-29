import Button from '../components/common/Button';
import CustomModal from '../components/common/CustomModal';
import JoinModal1 from '../components/landingPage/joinModal1/JoinModal1';
import LoginModal from '../components/landingPage/loginModal/LoginModal';
import JoinModal2 from '../components/landingPage/joinModal2/JoinModal2';
import JoinModal3 from '../components/landingPage/joinModal3/JoinModal3';
import beggar from '@/assets/images/beggar.jpg';
import geo from '@/assets/images/logo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LeftSide from '../components/NewLandingPage/LeftSide';
import RightSide from '../components/NewLandingPage/RightSide';
import { useEffect, useState } from 'react';
function NewLandingPage() {
  const params = useParams();
  const [ isMobile, setIsMobile ] = useState( window.innerWidth <= 420 );
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      // setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 600 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  // 모달 닫기(랜딩 페이지로 이동)
  const handleClickCloseModal = () => {
    navigate('/landing');
  };

  return (
    <div className='flex flex-row h-screen'>
      { !isMobile && <LeftSide/>}
      <RightSide />
    </div>
  );
}

export default NewLandingPage;
