import { Link } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useEffect, useState } from 'react';

function ModalBackground({ size }) {
  // 모달 외부 스크롤 없애고 모달을 끌 때 다시 생기게 하기
  const [ isMobile, setIsMobile ] = useState( window.innerWidth <= 775 );

  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      // setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 775 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div className='fixed top-0 left-0 bg-back w-full h-full'>
      <Link to='/'>

        <CloseButton className='absolute top-5 right-5' color='white' size={size} />

      </Link>
    </div>
  );
}

export default ModalBackground;
