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

const ProfileHeader = ({ info, isPrivate }) => {
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
  const currentUser = useSelector((state) => state.auth.currentUser);

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
      console.log(res);
      dispatch(authActions.logout());
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/landing');
    } catch (error) {
      console.log('에러 발생 : ', error);
      return;
    }
  };

  useEffect(() => {
    setImgSrc(info.imgSrc);
  }, []);



  return (
    <>
      <div className='justify-self-start font-daeam'>
        <div className='text-2xl'>나의 정보</div>
      </div>
      <hr className='border-1 border-gray-200'></hr>
      <div className='justify-center w-full flex flex-row p-20'>
        <div className='me-16 w-32'>
          <ProfileImageSection
            size='36'
            src={info.imgSrc || defaultMaleIcon}
            isPrivate={isPrivate}
          />
        
        </div>

        {detail !== 'detail' ? (
          <>
            {isPrivate && (
              <div className='w-2/5 flex flex-col text-xl ms-16 mt-4'>
                <div className='text-3xl'>
                  {currentUser.nickname}님 환영합니다!
                </div>
                <div>{regionMapper[info.regionId - 52]}</div>
                <div>{currentUser.age}살</div>
              </div>
            )}
            {!isPrivate && (
              <div className='w-2/5 flex flex-col text-xl ms-16 mt-4'>
                <div className='text-3xl'>{info.nickname}님의 프로필</div>
              </div>
            )}

            {isPrivate && (
              <div className='w-1/5 flex flex-col justify-around'>
                <Link to='/myprofile/detail'>
                  <Button2to1 text='수정' size='8'></Button2to1>
                </Link>
                <Button2to1
                  text='회원 탈퇴'
                  size='8'
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
export default ProfileHeader;
