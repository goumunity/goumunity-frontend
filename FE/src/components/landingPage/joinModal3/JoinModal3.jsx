import { useState } from 'react';
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
  { id: 1, title: 'JOB_SEEKER', name: '대학생' },
  { id: 2, title: 'JOB_SEEKE', name: '사회초년생' },
  { id: 3, title: 'JOB_SEEK', name: '회사원' },
  { id: 4, title: 'JOB_SEE', name: '취업준비생' },
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
    region: '',
    monthBudget: '',
  });

  const [isEdited, setIsEdited] = useState({
    userCategory: false,
    region: false,
    monthBudget: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const monthBudgetIsInvalid =
    isEdited.monthBudget && isNaN(userInputs.monthBudget);

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
    if (userInputs.userCategory === '') {
      setErrorMessage('신분을 선택해주세요.');
      return;
    }
    if (userInputs.region === '') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }
    if (userInputs.monthBudget === '') {
      setErrorMessage('한달 생활비를 입력해주세요.');
      return;
    }

    const updatedData = {
      ...joinData,
      userCategory: userInputs.userCategory,
      regionId: Number(userInputs.region),
      monthBudget: Number(userInputs.monthBudget.replace(/,/g, '')),
    };

    const formData = new FormData();

    for (const image of resultImage) {
      formData.append('image', image);
    }

    const blob = new Blob([JSON.stringify(updatedData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    try {
      const res = await axios.post('https://i10a408.p.ssafy.io/temp/api/users/join', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
      if (error.response.status === 409) {
        setErrorMessage('이미 가입된 이메일입니다.');
      }
      return;
    }
    navigate('/landing/join/4');
  };

  // 유저 입력 감지
  const handleChangeInputs = (id, value) => {
    if (id === 'monthBudget' && isNaN(value)) {
      return;
    }
    if (id === 'monthBudget') {
      // value = Number(value.replaceAll(',', ''))
      // value = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
      // const removedCommaValue = Number(value.replaceAll(',', ''))
      value = Number(value.replaceAll(',', ''));
      value = value.toLocaleString();
    }
    setUserInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
    setIsEdited((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>
      <form onSubmit={handleSubmitJoin} className='px-2 my-5'>
        <div className='flex flex-col mb-5 '>
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
          <div className='flex justify-center relative text-center m-5'>
            <ProfileImage
              size={6}
              // profileImage={profileImage}
              profileImage={profileImage}
              onChange={handleChangeUploadProfileImg}
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
        <div className='flex flex-col mb-5 '>
          <label className='text-left text-2xl font-her'>*지역</label>
          <div className='flex gap-20 text-center justify-center'>
            <SelectBox
            color='yellow'
            option='시'
              onChange={(e) => handleChangeInputs('region', e.target.value)}
            />
            <SelectBox
            color='yellow'
            option='구'
              onChange={(e) => handleChangeInputs('region', e.target.value)}
            />
          </div>
        </div>
        <UserInput
          label='월평균생활비'
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
