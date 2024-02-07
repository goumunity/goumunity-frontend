import Button from '../components/common/Button';
import CustomModal from '../components/common/CustomModal';
import JoinModal1 from '../components/landingPage/joinModal1/JoinModal1';
import LoginModal from '../components/landingPage/loginModal/LoginModal';
import JoinModal2 from '../components/landingPage/joinModal2/JoinModal2';
import JoinModal3 from '../components/landingPage/joinModal3/JoinModal3';
import beggar from '@/assets/images/beggar.jpg';
import geo from '@/assets/images/logo.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

function NewLandingPage() {
  const params = useParams();

  const navigate = useNavigate();

  // 모달 닫기(랜딩 페이지로 이동)
  const handleClickCloseModal = () => {
    navigate('/landing');
  };

  return (
    <div className='h-full'>
      <div className='bg-bg'>gdgd</div>
      <div className=''>gdgd</div>
    </div>
  );
}

export default NewLandingPage;
