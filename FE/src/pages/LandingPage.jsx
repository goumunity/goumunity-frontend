import React from 'react';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import CustomModal from '../components/common/CustomModal';
import JoinModal1 from '../modal/JoinModal1';
import LoginModal from '../modal/LoginModal';
import JoinModal2 from '../modal/JoinModal2';
import JoinModal3 from '../modal/JoinModal3';
import beggar from '../public/img/beggar.jpg';


function LandingPage() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);

  const dispatch = useDispatch();

  const handleClickChangeOptionJoin1 = () => {
    dispatch(modalActions.openJoinModal1());
  };

  const handleClickChangeOptionLogin = () => {
    dispatch(modalActions.openLoginModal());
  };

  return (
    <div className='w-full min-h-screen flex flex-col justify-between relative'>
      <div>
        <div className='text-2xl font-bold mb-4'>LandingPage</div>
        {isModalOpen && modalOption === 'join1' && (
          <CustomModal>
            <JoinModal1 />
          </CustomModal>
        )}
        {isModalOpen && modalOption === 'join2' && (
          <CustomModal>
            <JoinModal2 />
          </CustomModal>
        )}
        {isModalOpen && modalOption === 'join3' && (
          <CustomModal>
            <JoinModal3 />
          </CustomModal>
        )}
        {isModalOpen && modalOption === 'login' && (
          <CustomModal>
            <LoginModal />
          </CustomModal>
        )}
        <div>
          <img
            src={beggar}
            alt='3beggars'
            style={{width: '70vw', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>
      </div>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 space-x-10'>
        <Button text='로그인' onClick={handleClickChangeOptionLogin} size='8' />
        <Button text='회원가입' onClick={handleClickChangeOptionJoin1} />
      </div>
    </div>
  );
}

export default LandingPage;
