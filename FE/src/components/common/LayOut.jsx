import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from './NavBar';
import MiniNavBar from './MiniNavBar';
import { useEffect, useState } from 'react';
import MobileNavBar from './MobileNavBar';

function LayOut() {
  const navigation = useNavigation();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1280);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 775 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={`flex bg-bg bg-opacity-10 ${isLargeScreen ? '': 'overflow-x-hidden'}`}>
      { isMobile ? <MobileNavBar/> : ( isLargeScreen ? <NavBar /> : <MiniNavBar /> ) }
      {/* Outlet에 해당하는 컴포넌트(메인 내용)들에 NavBar 만큼의 왼쪽 패딩을 공통적으로 주기 */}
      <main className={`${ isMobile ? 'pt-20' : isLargeScreen ? 'pl-64' : 'pl-32'} w-full bg-bright`}>
        {navigation.state === 'loading' && <div>Loading...</div>}
        <Outlet/>
      </main>
    </div>
  );
}

export default LayOut;
