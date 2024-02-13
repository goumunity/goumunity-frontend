import { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { NavLink, useNavigate,Link, useParams } from 'react-router-dom';
import CloseButton from './CloseButton';
import { useDispatch, useSelector } from 'react-redux';
// import { authActions } from '../../store/auth';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import chat from '@/assets/images/chat.png';
import homeIcon from '@/assets/svgs/homeIcon.svg';
import NavBarItem from './NavBarItem';
import defaultMaleIcon from '@/assets/svgs/defaultMaleIcon.svg';
import NavBarBackGround from '../../assets/svgs/navBack2.svg';
import NavProfileBg from '../../assets/svgs/profilebg.svg';
import PoorMark from '../../utils/AuthenticatedPoor';
import './NavHover.css';
import instance from '@/utils/instance.js';
import PoorMarkBlack from '../../utils/AuthenticatedPoorBlack';
const MobileNavBar = () => {
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
    console.log(currentUser);
  
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
        const res = await instance.get('/api/users/logout');
      } catch (error) {
        console.log('에러 발생 : ', error);
        return;
      }
      dispatch(authActions.logout());
      navigate('/landing');
    };
  
  
      const handleClickDeleteUser = async () => {
          // 사용자가 확인을 누르면 알림창을 띄우고, 그렇지 않으면 아무 동작도 하지 않음
          if (!isConfirm) return;
          // 여기에 실제 회원 탈퇴 처리 로직을 추가할 수 있음
  
          try {
              const res = await instance.delete('/api/users/my');
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
      <nav className={`flex flex-row fixed bg-bg`} style={{ width: '100%', height: '75px', zIndex:'1'}}>
  
        
        <img className='m-2 rounded-full border-black border-2' src={currentUser.imgSrc}  style={ {width: '60px', height:'60px'}}/>
        <div className='flex-col flex justify-center items-center ms-2'>
        <div className='flex self-start text-lg font-daeam'>
            {currentUser.nickname}님

            {isAuth && 
            
            <button onClick={handleClickLogout}>
              <div className='hover:text-gray-500'>
              <i className="fa-solid fa-right-from-bracket ms-2"></i>
              </div>
              </button>}
        </div>
        <ul className='flex flex-row gap-3'>
          
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
  
          {/* <NavBarItem imgSrc={chat} link='/' text='거지글'/> */}
          <li>
          <Link to="/myprofile">
                <i className="fa-solid fa-user ms-1 me-2 hover:text-gray-500"></i>
              </Link>
          </li>
          <NavBarItem imgSrc='comments' link='/' text=''/>
          {/* <NavBarItem imgSrc={homeIcon} link='/chat' text='거지방' /> */}
          <NavBarItem imgSrc='house' link='/chat' text='' />
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
                <div className='hover:text-gray-500'>
                  <i className='fa-solid fa-comment fa-sm ms-1 me-2'></i>
                </div>
                
              </NavLink>
            )}
          </li>
          
          {/* <li>
            {isAuth && <button onClick={handleClickDeleteUser}>회원탈퇴</button>}
          </li> */}
        </ul>
        </div>
        {/* <div onClick={handleClickToggleMenu}>로고</div> */}
        
      </nav>
    );
}

export default MobileNavBar;