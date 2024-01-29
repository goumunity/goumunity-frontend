import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from './NavBar';

function LayOut() {
  const navigation = useNavigation();

  return (
    <div className='flex bg-bg bg-opacity-10'>
      <NavBar />
      {/* Outlet에 해당하는 컴포넌트(메인 내용)들에 NavBar 만큼의 왼쪽 패딩을 공통적으로 주기 */}
      <main className='pl-64 w-full'>
        {navigation.state === 'loading' && <div>Loading...</div>}
        <Outlet />
      </main>
    </div>
  );
}

export default LayOut;
