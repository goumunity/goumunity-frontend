import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
const MinimumFeed = ( {size, feedId, nickname,createAt, content, deletePost,imgSrc, isPrivate } ) => {
  // const navigate = useNavigate(); 안됨
  // 에러 catch 없애달라고 요청하기.
  const navigate = useNavigate();
  // const func = () => { forceUpdate() };

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 320 );
  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 775 );
      setIsMini( window.innerWidth <= 400 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return(
        <div className="w-full">
<div className={`w-${size}  border border-gray`}>
        <div className='w-full flex flex-col px-4 py-2'>
      <div className='w-full flex gap-2'>
        <div className="w-8 h-8"> 
          <img src={imgSrc} className="rounded-full"/>
        </div>
        <div className={`flex gap-2 w-4/5 ${isMini ? 'flex-col' : ''}`}>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className={`font-daeam ${isMobile ? 'text-sm' : '' }`} >{nickname}</span>
          <span className={ `font-her ${isMobile ? 'text-sm' : '' }`}>{new Date( createAt).toLocaleDateString()}</span>
        </div>

        <Button2to1 text="보기" size={ isMobile ? '4' : '6' } onClick={ () => { deletePost( feedId ) } }></Button2to1>
    </div>
        

      </div>
      <p className={`my-4 px-5 ${isMini ? 'text-md' : ''}`}>{content}</p>

      
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
      </div>
    </div>
    )
}

export default MinimumFeed;
