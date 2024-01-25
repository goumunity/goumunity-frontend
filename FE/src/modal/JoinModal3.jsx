import { useState } from 'react';
import UserInput from '../components/common/UserInput';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import CheckBox from '../components/common/CheckBox';
import { authActions } from '../store/auth';
import SelectBox from '../components/common/SelectBox';
import axios from 'axios';
function JoinModal3() {

  const SERVER_URL = 'api/users';

  const CATEGORY_OPTIONS = {
    universityStudent: '대학생',
    youngProfessional: '사회초년생',
    employee: '회사원',
    jobSeeker: '취업준비생',
  };

  const joinData = useSelector((state) => state.auth.joinData);

  const [userInputs, setUserInputs] = useState({
    category: '',
    region: '',
    monthBudget: '',
  });

  const [isEdited, setIsEdited] = useState({
    category: false,
    region: false,
    monthBudget: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const monthBudgetIsInvalid =
    isEdited.monthBudget && isNaN(userInputs.monthBudget);

  // input에서 focus를 다른 곳에 두었을 때 수정되었음을 표시
  const handleBlurFocusOffInput = (id) => {
    setIsEdited((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // 회원가입
  const handleSubmitJoin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (userInputs.category === '') {
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
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const updatedData = {
      ...joinData,
      userCategory: userInputs.category,
      region: userInputs.region,
      monthBudget: userInputs.monthBudget,
    };

    try {
      const res = axios.post(`${SERVER_URL}/join`, updatedData)
      console.log(res)

      
    } catch (error) {
      console.error('api 요청 중 오류 발생 : ', error);
      return;
    }
    dispatch(authActions.updateJoinData(updatedData));
    dispatch(modalActions.closeModal());
  };

  //
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

  const dispatch = useDispatch();

  const handleClickPrevious = () => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openJoinModal2());
  };

  return (
    <>
      <h1 className='font-daeam text-5xl my-5'>회원가입</h1>

      {/* <p className="my-4 font-her text-2xl">
        같은 거지들과 절약 정보를 공유하세요
      </p> */}
      <form onSubmit={handleSubmitJoin} className='px-2 my-5'>
        <div className='flex flex-col mb-5 '>
          <label className='text-left text-2xl font-her'>*신분</label>
          <div className='flex gap-20 text-center justify-center my-3'>
            <CheckBox
              text={CATEGORY_OPTIONS.universityStudent}
              isChecked={
                userInputs.category === CATEGORY_OPTIONS.universityStudent
              }
              onClick={() =>
                handleChangeInputs(
                  'category',
                  CATEGORY_OPTIONS.universityStudent
                )
              }
            />
            <CheckBox
              text={CATEGORY_OPTIONS.youngProfessional}
              isChecked={
                userInputs.category === CATEGORY_OPTIONS.youngProfessional
              }
              onClick={() =>
                handleChangeInputs(
                  'category',
                  CATEGORY_OPTIONS.youngProfessional
                )
              }
            />
          </div>
          <div className='flex gap-20 text-center justify-center'>
            <CheckBox
              text={CATEGORY_OPTIONS.employee}
              isChecked={userInputs.category === CATEGORY_OPTIONS.employee}
              onClick={() =>
                handleChangeInputs('category', CATEGORY_OPTIONS.employee)
              }
            />
            <CheckBox
              text={CATEGORY_OPTIONS.jobSeeker}
              isChecked={userInputs.category === CATEGORY_OPTIONS.jobSeeker}
              onClick={() =>
                handleChangeInputs('category', CATEGORY_OPTIONS.jobSeeker)
              }
            />
          </div>
        </div>
        <div className='flex flex-col mb-5 '>
          <label className='text-left text-2xl font-her'>*지역</label>
          <div className='flex gap-20 text-center justify-center'>
            <SelectBox onChange={(e) =>
                handleChangeInputs('region', e.target.value)
              }/>
            <SelectBox onChange={(e) =>
                handleChangeInputs('region', e.target.value)
              }/>
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
          <Button text='이전단계' onClick={handleClickPrevious} />
          <Button text='완료' type='submit' />
        </div>
      </form>
    </>
  );
}

export default JoinModal3;
