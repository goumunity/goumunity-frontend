import NavBar from '../components/common/NavBar.jsx';
import beggar from '../assets/images/beggar.jpg';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {

  const error = useRouteError();
  console.log(error)
  return (
    <>
      <NavBar />
      <div className='flex flex-col justify-center items-center gap-8 pl-64 h-screen'>
        <img className='w-1/2' src={beggar} alt='' />
        <div className='font-daeam'>페이지가 존재하지 않습니다...</div>
        <Link className='underline font-daeam cursor-pointer' to='/'>
          메인페이지로 돌아가기
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
