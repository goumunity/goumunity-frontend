import ProfileImage from '../common/ProfileImage';
import Button2to1 from '../../components/common/Button2to1';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileImageSection from './ProfileImageSection';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import instance from '../../utils/instance';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import Button from '../common/Button';
import Swal from 'sweetalert2';

const ExternalProfileHeader = ({ info, isPrivate, userId }) => {
  // const tempimgSrc = useSelector(state => state.auth.currentUser.imgSrc);
  const [imgSrc, setImgSrc] = useState('');
  const { detail } = useParams();
  const regionMapper = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const handleProfileUpdate = () => {
  //   dispatch(authActions.updateProfile)
  // }

  // 회원탈퇴
  const handleClickDeleteUser = async () => {
    const isConfirm = confirm('정말로 회원 탈퇴하시겠습니까?');

    // 사용자가 확인을 누르면 알림창을 띄우고, 그렇지 않으면 아무 동작도 하지 않음
    if (!isConfirm) return;
    // 여기에 실제 회원 탈퇴 처리 로직을 추가할 수 있음

    try {
      const res = await instance.delete('/api/users/my');
      dispatch(authActions.logout());
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/landing');
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
      return;
    }
  };

  useEffect(() => {
    setImgSrc(info.imgSrc);
  }, []);

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

  const btnSize = isMobile ? '5' :( isLargeScreen ? '8' : '5' )

  return (
    <>
      <div className='justify-self-start font-daeam'>
        <div className='text-2xl'>나의 정보</div>
      </div>
      <hr className='border-1 border-gray-200'></hr>
      <div className={`w-full flex flex-row ${ isMobile ? 'p-2':'p-20'} ${ isMini ? 'justify-center' : 'justify-center'}`}>
        <div className={ isMobile ? `me-4 w-8` : (isLargeScreen ? `me-16 w-32` : `me-8 w-16`) }>
          <ProfileImageSection
            size= { isMobile ? '5':(isLargeScreen ? '12' : '8' ) }   
            src={info.imgSrc || defaultMaleIcon}
            info={info}
          />
        
        </div>

        {detail !== 'detail' ? (
          <>
            {isPrivate && (
              <div className={`flex flex-col mt-4 ${ isMobile ? 'overflow-x-hidden text-sm ms-9 w-1/4' : 'text-xl ms-16 w-2/5' }`}>
                <div className={ isMobile ? 'text-sm' : ( isLargeScreen ? `text-2xl` : `text-xl` ) }>
                  {info.nickname}님
                </div>
                <div>{regionMapper[info.regionId - 52]}</div>
                <div>{info.age}살</div>
              </div>
            )}
            {!isPrivate && (
              <div className={`${ isMobile ? 'w-1/5':'w-2/5 '} flex flex-col text-xl ms-16 mt-4`}>
                <div className='text-3xl'>{info.nickname}님의 프로필</div>
              </div>
            )}

            {isPrivate && (
              <div className='w-1/5 flex flex-col justify-around'>
                <Link to='/myprofile/detail'>
                  <Button2to1 text='정보 수정' size={btnSize}></Button2to1>
                </Link>
                <Button2to1
                  text='회원 탈퇴'
                  size={btnSize}
                  onClick={handleClickDeleteUser}
                  isNegative={true}
                ></Button2to1>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default ExternalProfileHeader;
