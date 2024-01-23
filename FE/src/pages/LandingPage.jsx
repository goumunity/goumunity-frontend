import React from 'react';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import CustomModal from '../components/common/CustomModal';
import JoinModal1 from '../modal/JoinModal1';
import LoginModal from '../modal/LoginModal';
import JoinModal2 from '../modal/JoinModal2';
import JoinModal3 from '../modal/JoinModal3';
import beggar from '@/public/img/beggar.jpg';
import geo from '../public/img/geo1.png';

function LandingPage() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);

  const dispatch = useDispatch();

  const handleClickChangeOptionJoin1 = () => {
    dispatch(modalActions.sopenJoinModal1());
  };

  const handleClickChangeOptionLogin = () => {
    dispatch(modalActions.openLoginModal());
  };

  return (
    <div className='img-bg w-full min-h-screen flex flex-col justify-between relative'>
      <div>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '10px',
            zIndex: '1000',
          }}
        >
          <img
            className='mt-4'
            src={geo}
            alt='거뮤니티 로고'
            style={{
              width: '200px', // 원하는 크기로 조정
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        <div className='text-2xl  mb-4'>LandingPage</div>
        <div className='font-daeam text-5xl flex items-center justify-center mb-10'>
          같은 거지들 끼리 절약 정보를 공유하세요{' '}
        </div>
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
        <div className='font-her text-3xl flex items-center justify-center mt-4'>
          {' '}
          지는유, 똑똑한 그지가 될거에유
        </div>
      </div>

      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 space-x-10'>
        <Button text='로그인' onClick={handleClickChangeOptionLogin} />
        <Button text='회원가입' onClick={handleClickChangeOptionJoin1} />
      </div>
    </div>
  );
}

export default LandingPage;
