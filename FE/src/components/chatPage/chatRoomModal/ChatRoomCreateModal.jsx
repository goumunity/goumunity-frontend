import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../../common/SelectBox';
import HashTag from '../../common/HashTag';
import ProfileImage from '../../common/ProfileImage';
import CloseButton from '../../common/CloseButton';
import { imageUpload } from '../../../utils/upload';
import Button from '../../common/Button';
import instance from '@/utils/instance.js';
import { modalActions } from '@/store/modal.js';
import Swal from 'sweetalert2';
import {showErrorToast, Toast} from "@/utils/toast.js";

function ChatRoomCreateModal({setMyChatRooms, myChatRooms}) {
  const [profileImage, setProfileImage] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userInputs, setUesrInputs] = useState({
    title: '',
    hashtags: [],
    capability: null,
    regionId: null,
  });

  const [isEdited, setIsEdited] = useState({
    title: false,
    hashtags: false,
    capability: false,
    regionId: false,
  });

  // 이미지 업로드
  const handleChangeUploadProfileImg = (e) => {
    const uploadFile = imageUpload(e.target, setProfileImage);
    setResultImage(uploadFile);
  };
  const file = useSelector((state) => state.auth.file);
  //--------------------------------------------------------------

  const updatedData = {
    title: userInputs.title,
    hashtags: [],
    capability: Number(userInputs.capability),
    regionId: Number(userInputs.regionId),
  };

  //채팅룸 추가하기
  const handleSubmitChatCreate = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (userInputs.title === '') {
      showErrorToast('방 제목을 입력해주세요')
      return;
    }
    if (userInputs.capability === null) {
      showErrorToast('방 최대 인원 수를 입력해주세요')
      return;
    }
      if (userInputs.capability <= 0) {
        showErrorToast('방 최대 인원 수를 자연수로 입력해주세요')
          return;
      }
    
    if (userInputs.regionId === null) {
      showErrorToast('지역을 선택해주세요')
      return;
    }
    const data = {
      title: userInputs.title,
      hashtags: arr.map((data) => data.value),
      capability: userInputs.capability,
      regionId: userInputs.regionId,
    };

    //image 업로드
    const formData = new FormData();

    for (const image of resultImage || []) {
      formData.append('image', image);
    }

    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    formData.append('data', blob);
    //-------axios 연결-------
    const fetchData = async () => {
      try {
        const res = await instance.post('/api/chat-rooms', formData);
        const newChatRoom = await instance.get(`/api/chat-rooms/${res.data}`);
        await setMyChatRooms([newChatRoom.data, ...myChatRooms]);
      } catch (error) {

        if (error.response.status === 409) {
          setErrorMessage('이미 존재하는 채팅방입니다.');
        }
        return;
      }
    };

    await fetchData();
    dispatch(modalActions.closeModal());
  };

  // 유저 입력 감지
  const handleChangeInputs = (id, value) => {
    if (id === 'capability' && isNaN(value)) {
      return;
    }
    setUesrInputs((prev) => ({
      ...prev,
      [id]: value,
    }));

    setIsEdited((prev) => ({
      ...prev,
      [id]: false,
    }));
  };
  // --------------------------------------------
  const [val, setVal] = useState('');
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (val.length > 10) {
        showErrorToast('해시태그는 10글자 이하로 입력해주세요.')
        return;
      }
      if (arr.length > 5) {
        showErrorToast('해시태그는 5개까지만 입력 가능합니다.')
        emptyInput();
        return;
      }
      changeArr(val);
      emptyInput();
    }
  };

  const [index, setIndex] = useState(0);

  const emptyInput = () => {
    setVal('');
  };

  const handleOnChange = (e) => {
    setVal(e.target.value);
  };
  const IncreaseIndex = () => {
    setIndex(index + 1);
  };

  //------------------------------------------------------------------

  const [arr, setArr] = useState([]);

  const changeArr = (nextTag) => {
    const nextValue = {
      idx: index,
      value: nextTag,
    };
    IncreaseIndex();
    const nextArr = arr.concat(nextValue);
    setArr(nextArr);
  };

  const onRemove = (target) => {
    const nextArr = arr.filter((elem) => elem.idx !== target.idx);
    setArr(nextArr);
  };
  const tagArr = arr.map((elem) => (
    <>

      <div
        key={elem.idx}
        className={`flex text-sm justify-center items-center w-fit bg-bg`}
        onDoubleClick={() => onRemove(elem)}
        onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
      >
        <div className='h-5 overflow-hidden flex justify-center'>{`#${elem.value}`}</div>

        <CloseButton
        size='8'
        // className='absolute top-5 right-5'
        onClick={() => onRemove(elem)}
      />
      </div>
    </>
  ));

  //tagArr의 길이가 5 초과하는 경우, 5번째 인덱스 이후의 요소들을 제거

  if (tagArr.length > 5) {
    tagArr.splice(5);
  }
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 320 );
  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      setIsLargeScreen(window.innerWidth > 1200);
      setIsMobile( window.innerWidth <= 775 );
      setIsMini( window.innerWidth <= 500 );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col font-daeam text-xl'>
      <h1 className='text-3xl'>채팅방 개설하기</h1>
      <form className='w-full h-fit'>
        <div className='flex justify-start text-start'>
          <div className="w-full">
            <label for="customInput" className="block text-sm text-gray-600 ps-1">방 제목</label>
              <div className={`flex justify-center`}>
                <input
                            type="text"
                            id="customInput"
                            // name="title"
                            className="mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="방 제목을 입력해주세요."
                            onChange={(e) => handleChangeInputs('title', e.target.value)}
                />



              </div>
            </div>
        </div>

        <div className='flex justify-start text-start mt-5'>
          <div className="w-full flex-col">
            <label for="customInput" className="block text-sm font-medium text-gray-600 ps-1">해시 태그</label>
              <div className={`flex justify-center`}>
                <input

                            id="customInput"
                            className="mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyPress}
                            placeholder='#키워드'
                            value={val}

                />



              </div>
            </div>
        </div>
        <div className='w-full flex gap-1 mt-5 text-sm'>
        {tagArr}
        </div>

        {/* <button className='font-paci border border-dashed rounded-2xl pr-2 pl-2'></button> */}
        <div className='flex flex-col justify-start text-start'>
        <label for="regionSelection" className="block text-sm font-medium text-gray-600 ps-1">지역 및 제한 인원</label>
          <div className='flex flex-row gap-2'>
          <SelectBox
            id='regionSelection'
            className='w-2/5 me-1 mt-1 p-2 text-gray-400 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300'
            onChange={(e) => handleChangeInputs('regionId', e.target.value)}
          />

          <input

            id="customInput"
            className="w-2/5 mt-1 p-2 text-end block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
            type='number'
            min='1'
            placeholder='제한 인원'
            onChange={(e) => handleChangeInputs('capability', e.target.value)}

          />




          <input type='text' disabled={true} value={'명'} className='w-1/5 mt-1 border-bg rounded-lg'/>
          </div>

        </div>

        <div className='flex justify-center text-start mt-5'>
          <div className="w-full flex-col">
            <label for="customInput" className="block text-sm font-medium text-gray-600 ps-1">배경 이미지</label>
              <div className={`w-full flex flex-col items-center justify-center gap-1`}>

            <ProfileImage
              size='32'
              profileImage={profileImage}
              onChange={handleChangeUploadProfileImg}

            />
            <div className='w-full'>
            <Button
            size='full'
            className='mt-5'
            text='추가하기'
            type='button'
            onClick={handleSubmitChatCreate}
          />
            </div>


              </div>






        </div>




        </div>


      </form>
    </div>
  );
}

export default ChatRoomCreateModal;
