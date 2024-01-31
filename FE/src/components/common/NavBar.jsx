import { useState } from 'react';
import { Form, NavLink, useNavigate } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

function NavBar() {
  // LandingPage에서는 NavBar를 렌더링하지 않음
  if (window.location.pathname === '/landing') {
    return null;
  }

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // 로그아웃 후 로그인 모달로 이동하기 위해
  const navigate = useNavigate();

  // 로그아웃에 관한 액션을 주기 위해
  const dispatch = useDispatch();

  const handleClickToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 로그아웃 후 로그인 모달로 이동
  const handleClickLogout = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      console.log('로그아웃 결과: ', res);
    } catch (error) {
      console.log('에러 발생 : ', error);
      return;
    }
    dispatch(authActions.logout());
    navigate('/landing/join/4');
  };

  const activeClass = 'underline';

  return (
    <nav className='fixed w-64 h-screen bg-bg text-3xl font-daeam p-5'>
      <div onClick={handleClickToggleMenu}>로고</div>
      <ul>
        <li>
          {/* 현재 접속중인 페이지 표시를 할 수 있는 태그 */}
          <NavLink
            to='/landing'
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            랜딩
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? activeClass : undefined)}
            end
          >
            <div>
              <CloseButton />
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} `}>Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClass : undefined)}
            to='/chat'
          >
            거지방
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/profile'
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            프로필
          </NavLink>
        </li>
        {isAuth && <button onClick={handleClickLogout}>로그아웃</button>}
      </ul>
    </nav>
  );
}

export default NavBar;
