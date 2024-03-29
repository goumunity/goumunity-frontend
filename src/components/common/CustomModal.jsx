import {useEffect, useRef, useState} from 'react';
import CloseButton from './CloseButton';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
import { authActions } from '../../store/auth';

function CustomModal({ children, onClick , initSize}) {
  const [initialSize, setInitialSize] = useState( { widthSize: 467, heightSize: 575 });
  const modalRef = useRef();

  // 전역 modal state의 close함수, joinData의 초기화를 위해
  const dispatch = useDispatch();

  // x눌렀을 때 모달 닫으면서 joinData 초기화
  const handleClickCloseModal = () => {
    dispatch(modalActions.closeModal());
    dispatch(authActions.clearJoinData());
    onClick();
  };

  // const initialSize = initSize ? initSize :  { widthSize: 467, heigthSize: 575 };

  useEffect(() => {
    if (initSize) {
      setInitialSize(initSize)
    }
  }, [initSize]);

  const widthSize = '800';
  const heigthSize = '575';
  const widthSize2 = '800';
  const heigthSize2 = '575';

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 468 );
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1200);
      setIsMobile( window.innerWidth <= 775 );
      setIsMini( window.innerWidth <= 468 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const w = isMini ? '320px' : initialSize.widthSize;
  return (
    <div className='fixed top-0 left-0 bg-back right-0 bottom-0 z-20'>
      <svg
        className='z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg transition duration-300 '
        width={ w }
        height={`${initialSize.heightSize}px`}
        viewBox={`0 0 ${w} ${initialSize.heightSize}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        ref={modalRef}
      >
        <rect
          width={`${widthSize}`}
          height={`${initialSize.heightSize}`}
          transform='translate(1 1)'
          fill='url(#paint0_linear_216_378)'
        />
        <path
          d='M466 569.766L3.48375 572.604M464.658 572.648L3.59173 572.778M2.86638 6.53682C0.0313426 210.417 0.0616307 392.467 5.51553 572.843M4.35146 6.43414C166.921 1.30094 332.638 0.784455 463.848 2.65624L4.35146 6.43414ZM460.988 1C469.225 171.309 462.962 344.182 465.631 575L460.988 1Z'
          stroke='black'
          strokeWidth='0.880362'
        />
        <defs>
          <linearGradient
            id='paint0_linear_216_378'
            x1='232.5'
            y1='0'
            x2='232.5'
            // y2='574'
            y2={`${initialSize.heightSize}`}
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#FFFBF0' />
            <stop offset='0.26' stopColor='#FFFBF0' stopOpacity='0.94' />
            <stop offset='1' stopColor='#FFFBF0' stopOpacity='0' />
          </linearGradient>
        </defs>
        <foreignObject className={`${ isMini ? '': 'w-full' } h-full px-8 py-10 flex flex-col justify-center items-center text-center`} style={{width:isMini?'320px': ''}}>
          {/* <CloseButton onClick={closeJoinModal} /> */}
          <CloseButton onClick={handleClickCloseModal} className='absolute top-5 right-5'/>
          {children}
        </foreignObject>
      </svg>
    </div>
  );
}

export default CustomModal;
