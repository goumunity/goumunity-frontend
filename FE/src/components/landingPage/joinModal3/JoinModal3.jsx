import { useEffect, useState } from 'react';
import UserInput from '../../common/UserInput';
import Button from '../../common/Button';
import { useSelector } from 'react-redux';
import CheckBox from '../../common/CheckBox';
import SelectBox from '../../common/SelectBox';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProfileImage from '../../common/ProfileImage';
import { imageUpload } from '../../../utils/upload';

const USER_CATEGORY_OPTIONS = [
  { id: 1, title: 'COLLEGE_STUDENT', name: '대학생' },
  { id: 2, title: 'NEWCOMER_TO_SOCIETY', name: '사회초년생' },
  { id: 3, title: 'EMPLOYEE', name: '회사원' },
  { id: 4, title: 'JOB_SEEKER', name: '취업준비생' },
];

function JoinModal3() {
  const joinData = useSelector((state) => state.auth.joinData);
  const [profileImage, setProfileImage] = useState('');
  const [resultImage, setResultImage] = useState(null);
  // 이미지 업로드
  const handleChangeUploadProfileImg = (e) => {
    const uploadFile = imageUpload(e.target, setProfileImage);
    setResultImage(uploadFile);
  };
  const file = useSelector((state) => state.auth.file);

  const [userInputs, setUserInputs] = useState({
    userCategory: '',
    monthBudget: '',
  });

  const [isEdited, setIsEdited] = useState({
    userCategory: false,
    monthBudget: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const monthBudgetIsInvalid =
    isEdited.monthBudget && isNaN(userInputs.monthBudget.replace(/,/g, ''));

  // useEffect(() => {
  //   if (joinData.nickname === undefined || joinData.birthDate === undefined || joinData.gender === undefined) {
  //     navigate('/landing/join/2');
  //   } else if (joinData.email === undefined || joinData.password === undefined) {
  //     navigate('/landing/join/1');
  //   }
  // }, []);

  // 모달 창 이동을 위해
  const navigate = useNavigate();

  // input에서 focus를 다른 곳에 두었을 때 수정되었음을 표시
  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // 회원가입
  const handleSubmitJoin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    // if (!joinData) return;
    if (userInputs.userCategory === '') {
      setErrorMessage('신분을 선택해주세요.');
      return;
    }
    if (userInputs.monthBudget === '') {
      setErrorMessage('한달 생활비를 입력해주세요.');
      return;
    }

    const updatedData = {
      ...joinData,
      userCategory: userInputs.userCategory,
      monthBudget: userInputs.monthBudget.replace(/,/g, ''),
    };
    
    const formData = new FormData();

    if (resultImage !== null) {
      for (const image of resultImage) {
        formData.append('image', image);
      }
    }

    const blob = new Blob([JSON.stringify(updatedData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    try {
      const res = await axios.post('/api/users/join', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
    }
    navigate('/landing/join/4');
  };

  const handleChangeInputs = (id, value) => {
    if (id === 'monthBudget') {
      // 숫자와 쉼표 이외의 문자 제거
      const numericValue = value.replace(/[^\d,]/g, '');
      // 쉼표 제거 후 숫자로 변환
      const numberValue = parseFloat(numericValue.replace(/,/g, '')) || 0;
      // 세자리마다 쉼표 추가
      const formattedValue = numberValue.toLocaleString();
      
      setUserInputs((prev) => ({
        ...prev,
        [id]: formattedValue,
      }));
      setIsEdited((prev) => ({
        ...prev,
        [id]: false,
      }));
    } else {
      // 다른 입력값은 그대로 업데이트
      setUserInputs((prev) => ({
        ...prev,
        [id]: value,
      }));
      setIsEdited((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  // const displayMonthBudget = userInputs.monthBudget ? `${userInputs.monthBudget}원` : '';
  
  // 유저 입력 감지
  // const handleChangeInputs = (id, value) => {
  //   // if (id === 'monthBudget' && isNaN(value)) {
  //   //   return;
  //   // }
  //   if (id === 'monthBudget') {
  //     // value = Number(value.replaceAll(',', ''))
  //     // value = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
  //     // const removedCommaValue = Number(value.replaceAll(',', ''))
  //     // value = value.replace(/[^\d,]/g, '');
  //     // value = Number(value.replaceAll(',', ''));
  //     value = value.toLocaleString();
  //   }
  //   setUserInputs((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  //   setIsEdited((prev) => ({
  //     ...prev,
  //     [id]: false,
  //   }));
  // };

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>
      <form onSubmit={handleSubmitJoin} className='px-2 my-5'>
        <div className='flex flex-col mb-5 '>
          <label className='text-left text-2xl font-her'>*프로필 이미지</label>
          <div className='flex justify-center relative text-center m-5'>
            <ProfileImage
              size={12}
              // profileImage={profileImage}
              profileImage={profileImage}
              onChange={handleChangeUploadProfileImg}
            />
          </div>
          <label className='text-left text-2xl font-her'>*신분</label>
          <div className='flex gap-20 text-center justify-center my-3'>
            <CheckBox
              text={USER_CATEGORY_OPTIONS[0].name}
              isChecked={
                userInputs.userCategory === USER_CATEGORY_OPTIONS[0].title
              }
              onClick={() =>
                handleChangeInputs(
                  'userCategory',
                  USER_CATEGORY_OPTIONS[0].title
                )
              }
            />
            <CheckBox
              text={USER_CATEGORY_OPTIONS[1].name}
              isChecked={
                userInputs.userCategory === USER_CATEGORY_OPTIONS[1].title
              }
              onClick={() =>
                handleChangeInputs(
                  'userCategory',
                  USER_CATEGORY_OPTIONS[1].title
                )
              }
            />
          </div>
          <div className='flex gap-20 text-center justify-center'>
            <CheckBox
              text={USER_CATEGORY_OPTIONS[2].name}
              isChecked={
                userInputs.userCategory === USER_CATEGORY_OPTIONS[2].title
              }
              onClick={() =>
                handleChangeInputs(
                  'userCategory',
                  USER_CATEGORY_OPTIONS[2].title
                )
              }
            />
            <CheckBox
              text={USER_CATEGORY_OPTIONS[3].name}
              isChecked={
                userInputs.userCategory === USER_CATEGORY_OPTIONS[3].title
              }
              onClick={() =>
                handleChangeInputs(
                  'userCategory',
                  USER_CATEGORY_OPTIONS[3].title
                )
              }
            />
          </div>
        </div>

        <UserInput
          label='월평균생활비[원]'
          id='monthBudget'
          type='text'
          value={userInputs.monthBudget}
          onBlur={() => {
            handleBlurFocusOffInput('monthBudget');
          }}
          onChange={(e) => handleChangeInputs('monthBudget', e.target.value)}
        />
        <div className='text-center font-dove text-red-600 text-xl h-2 mb-3 w-full'>
          {errorMessage}
        </div>
        <div className='flex gap-5 justify-center absolute bottom-7 w-full'>
          <Link to='/landing/join/2'>
            <Button text='이전단계' />
          </Link>
          <Button text='완료' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal3;
