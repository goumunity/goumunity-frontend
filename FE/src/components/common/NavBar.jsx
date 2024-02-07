import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import chat from '@/assets/images/chat.png';
import homeIcon from '@/assets/svgs/homeIcon.svg';
import NavBarItem from './NavBarItem';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';

function NavBar() {
  // LandingPage에서는 NavBar를 렌더링하지 않음
  const targetUrl = window.location.pathname;
  switch (targetUrl) {
    case '/landing':
    case '/landing/join/1':
    case '/landing/join/2':
    case '/landing/join/3':
    case '/landing/join/4':
      return;
  }

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const currentUser = useSelector((state) => state.auth.currentUser);

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
    const isConfirm = window.confirm('로그아웃 하시겠습니까?');
    if (!isConfirm) return;

    try {
      const res = await axios.get('/api/users/logout');
    } catch (error) {
      console.log('에러 발생 : ', error);
      return;
    }
    dispatch(authActions.logout());
    navigate('/landing/join/4');
  };

  // 회원탈퇴
  const handleClickDeleteUser = async () => {
    const isConfirm = confirm('정말로 회원 탈퇴하시겠습니까?');

    // 사용자가 확인을 누르면 알림창을 띄우고, 그렇지 않으면 아무 동작도 하지 않음
    if (!isConfirm) return;
    // 여기에 실제 회원 탈퇴 처리 로직을 추가할 수 있음

    try {
      const res = await axios.delete('/api/users/my');
    } catch (error) {
      console.log('에러 발생 : ', error);
      return;
    }
    dispatch(authActions.logout());
    alert('회원 탈퇴가 완료되었습니다.');
    navigate('/landing/join/1');
  };

  const activeClass = 'underline';

  return (
    <nav className='flex justify-center fixed w-64 h-screen bg-bg text-3xl font-daeam p-5'>
      {/* <div onClick={handleClickToggleMenu}>로고</div> */}
      <ul className='flex flex-col gap-3 justify-center items-center'>
        {/* <li>
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
        </li> */}

        <NavBarItem imgSrc={chat} link='/' text='거지글' />
        <NavBarItem imgSrc={homeIcon} link='/chat' text='거지방' />
        {isAuth && (
          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} flex gap-1 items-center`
                  : 'flex gap-1 items-center'
              }
            >
              <div
            className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer`}
          >
            {currentUser.imgSrc ? (
              <img className={`w-full h-full cursor-pointer`} src={currentUser.imgSrc} />
            ) : (
              <img
                className={`w-full h-full cursor-pointer`}
                src={defaultMaleIcon}
              />
            )}
          </div>
              <span>프로필</span>
            </NavLink>
          </li>
        )}
        <li>
          {isAuth && (
            <NavLink
              to='/create/1'
              className={({ isActive }) => (isActive ? activeClass : undefined)}
            >
              <i className='fa-solid fa-comment fa-sm'></i>글쓰기
            </NavLink>
          )}
        </li>
        <li>
          {isAuth && <button onClick={handleClickLogout}>로그아웃</button>}
        </li>
        <li>
          {isAuth && <button onClick={handleClickDeleteUser}>회원탈퇴</button>}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
