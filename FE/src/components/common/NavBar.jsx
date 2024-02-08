import { useState } from 'react';
import { NavLink, useNavigate,Link } from 'react-router-dom';
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
  //redux에 정의된 함수를 사용하기 위해 필요함.
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

  

  const activeClass = 'underline';

  return (
    <nav className='flex flex-col justify-center fixed w-64 h-screen bg-bg text-3xl font-daeam p-5'>
      <div id="NavProfile" className='profile font-dove p-4 w-full flex flex-col justify-center items-center mb-10 bg-yellow'>
        <img class='w-full' src={currentUser.imgSrc} />
        <div class="w-full flex flex-row justify-between mt-5 p-1">
          <div className="text-3xl">{currentUser.nickname}</div>
          <div className="rounded-full w-10 aspect-square flex justify-center items-center cursor-pointer">
            <Link to="/profile">
              <i class="fa-solid fa-user fa-xs"></i>
            </Link>
          </div>
        </div>
      </div>
      {/* <div onClick={handleClickToggleMenu}>로고</div> */}
      <ul className='flex flex-col gap-3 ms-4'>
        
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
        {/*isAuth && (*/
          // <li>
          //   {/* Link는 어딘가로 빠짐, NavLink는 클릭 시 css를 주기 위해 하는 것인데,  */}
          //   <NavLink
          //     to='/profile'
          //     className={({ isActive }) =>
          //       isActive
          //         ? `${activeClass} flex gap-1 items-center`
          //         : 'flex gap-1 items-center'
          //     }
          //   >
          //     <div
          //   className={`w-8 h-8 rounded-full border-2 border-black overflow-hidden cursor-pointer`}
          // >
          //   {currentUser.imgSrc ? (
          //     <img className={`w-full h-full cursor-pointer`} src={currentUser.imgSrc} />
          //   ) : (
          //     <img
          //       className={`w-full h-full cursor-pointer`}
          //       src={defaultMaleIcon}
          //     />
          //   )}
          // </div>
          //     <span>프로필</span>
          //   </NavLink>
          // </li>
        // )
      }
        
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
          {isAuth && 
          
          <button onClick={handleClickLogout}><i class="fa-solid fa-right-from-bracket"></i> 로그아웃</button>}
        </li>
        {/* <li>
          {isAuth && <button onClick={handleClickDeleteUser}>회원탈퇴</button>}
        </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
