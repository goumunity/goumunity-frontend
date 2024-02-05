import { Link } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useEffect } from 'react';

function ModalBackground() {
  // 모달 외부 스크롤 없애고 모달을 끌 때 다시 생기게 하기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div className='fixed top-0 left-0 bg-back w-full h-full'>
      <Link to='/'>
        <CloseButton className='absolute top-5 right-5' />
      </Link>
    </div>
  );
}

export default ModalBackground;
