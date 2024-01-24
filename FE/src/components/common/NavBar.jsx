import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CloseButton from './closeButton';
import { useSelector } from 'react-redux';
import { Container } from 'postcss';

function NavBar() {
  // LandingPage에서는 NavBar를 렌더링하지 않음
  if (window.location.pathname === '/landing') {
    return null;
  }

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleClickToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='w-80 h-screen bg-bg text-3xl font-daeam p-5'>
      <div onClick={handleClickToggleMenu}>로고</div>

      <ul>
        <li>
          <Link to='/landing'>랜딩</Link>
        </li>
        <li>
          <Link to='/' className='flex'>
            <div>
              <CloseButton />
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} `}>Home</div>
          </Link>
        </li>
        <li>
          <Link to='/chat'>거지방</Link>
        </li>
        <li>
          <Link to='/join'>회원가입</Link>
        </li>
        <li>
          <Link to='/profile'>프로필</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
