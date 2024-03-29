import { useEffect, useState } from 'react';
import UserInput from '../../common/UserInput';
import Button from '../../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth';
import { isEqual } from '../../../utils/validation';
import CheckBox from '../../common/CheckBox';
import { calculateAge } from '../../../utils/formatting';
import { Link, useNavigate } from 'react-router-dom';
import SelectBox from '../../common/SelectBox';
import instance from "@/utils/instance.js";
import SavingCategorySelectBox from '../../common/SavingCategorySelectBox';
import Swal from 'sweetalert2';

const GENDER_OPTIONS = [
  { id: 1, content: 'MALE' },
  { id: 2, content: 'FEMALE' },
];

function JoinModal2() {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const joinData = useSelector((state) => state.auth.joinData);
  const [userInputs, setUserInputs] = useState({
    birthDate: joinData?.birthDate || '',
    gender: joinData?.gender || '',
    region: joinData?.regionId || '',
    savingCategory: joinData?.savingCategory || '',
  });
  const [isEdited, setIsEdited] = useState({
    birthDate: false,
    gender: false,
    region: false,
    savingCategory: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  // 날짜 형식은 숫자 8자리 검증
  const birthDateIsInvalid =
    isEdited.birthDate &&
    (isNaN(userInputs.birthDate) ||
      !isEqual(userInputs.birthDate.trim().length, 8));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await instance.get('/api/nicknames');
        setNickname(res.data);
      } catch (error) {
        Swal.fire("잠시 후 다시 시도해주세요.");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleClickGetNickname = async () => {
    try {
      setIsLoading(true)
      const res = await instance.get('/api/nicknames');
      setNickname(res.data);
    } catch (error) {
      Swal.fire("잠시 후 다시 시도해주세요.");
    }
    setIsLoading(false)
  };

  const dispatch = useDispatch();

  const handleSubmitNext = (e) => {
    e.preventDefault();
    setErrorMessage('');
   
    if (userInputs.birthDate === '') {
      setErrorMessage('생년월일을 입력해주세요.');
      return;
    }
    if (userInputs.gender === '') {
      setErrorMessage('성별을 선택해주세요.');
      return;
    }
    if (userInputs.savingCategory === '' || userInputs.savingCategory === 'none') {
      setErrorMessage('관심소비내역을 선택해주세요.');
      return;
    }
    if (userInputs.region === '' || userInputs.region === 'none') {
      setErrorMessage('지역을 선택해주세요.');
      return;
    }
    
    if (birthDateIsInvalid) {
      return;
    }

    const age = calculateAge(userInputs.birthDate);
    const updatedData = {
      ...joinData,
      savingCategory: userInputs.savingCategory,
      nickname,
      age,
      regionId: userInputs.region,
      gender: userInputs.gender,
    };

    dispatch(authActions.updateJoinData(updatedData));
    navigate('/landing/join/3');
  };

  // 사용자 입력 감지
  const handleChangeInputs = (id, value) => {
    // 생년월일을 8자 넘게 못쓰게
    if (id === 'birthDate' && value.trim().length > 8) {
      return;
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
      <form
        onSubmit={handleSubmitNext}
        className='px-2 flexflex-col items-center'
      >
        <div className='flex justify-between'>
          <div className='flex flex-col mb-3'>
            <label className='text-left text-2xl font-her'>*닉네임</label>
            <span className='border-b border-black my-2 bg-transparent font-daeam text-xl'>
              {nickname}
            </span>
          </div>
          {isLoading ? (
            <Button text='다시 받기' type='button' isActive={false} />
          ) : (
            <Button
              text='다시 받기'
              type='button'
              onClick={handleClickGetNickname}
            />
          )}
        </div>
        <UserInput
          label='생년월일[8자]'
          id='birthDate'
          type='text'
          name='birthDate'
          value={userInputs.birthDate}
          onBlur={() => {
            handleBlurFocusOffInput('birthDate');
          }}
          onChange={(e) => handleChangeInputs('birthDate', e.target.value)}
          // error={birthDateIsInvalid && 'YYYYMMDD 형식으로 입력해주세요.'}
          error={birthDateIsInvalid && '연월일(YYYYMMDD)로 입력해주세요.'}
        />

        <div className='flex flex-col mb-2'>
          <label className='text-left text-2xl font-her'>*성별</label>
          <div className='flex gap-20 text-center justify-center'>
            <CheckBox
              text='남'
              isChecked={userInputs.gender === GENDER_OPTIONS[0].content}
              onClick={() =>
                handleChangeInputs('gender', GENDER_OPTIONS[0].content)
              }
            />
            <CheckBox
              text='여'
              isChecked={userInputs.gender === GENDER_OPTIONS[1].content}
              onClick={() =>
                handleChangeInputs('gender', GENDER_OPTIONS[1].content)
              }
            />
          </div>
        </div>
        <div className='flex items-center gap-16'>

          <div className='flex flex-col mb-5 '>
            <label className='text-left text-xl font-her'>*관심절약분야</label>
            <div className='flex gap-20 text-center justify-center'>
              <SavingCategorySelectBox
              title='관심절약분야'
                color='yellow'
                onChange={(e) => handleChangeInputs('savingCategory', e.target.value)}
              />
            </div>
          </div>

          <div className='flex flex-col mb-5 '>
            <label className='text-left text-2xl font-her'>*지역</label>
            <div className='flex gap-20 text-center justify-center'>
              <SelectBox
                color='yellow'
                onChange={(e) => handleChangeInputs('region', e.target.value)}
              />
            </div>
          </div>

        </div>
        <div className='text-center font-dove text-red-600 text-xl h-2 mb-3'>
          {errorMessage}
        </div>
        <div className='flex gap-5 justify-center absolute bottom-7 right-1 w-full'>
          <Link to='/landing/join/1'>
            <Button text='이전단계' type='button' />
          </Link>
          <Button text='다음단계' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal2;
