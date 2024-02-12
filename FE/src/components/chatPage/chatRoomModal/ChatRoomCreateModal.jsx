import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import SelectBox from '../../common/SelectBox';
import HashTag from '../../common/HashTag';
import ProfileImage from '../../common/ProfileImage';
import CloseButton from '../../common/CloseButton';
import {imageUpload} from '../../../utils/upload';
import Button from '../../common/Button';
import instance from "@/utils/instance.js";
import {modalActions} from "@/store/modal.js";

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
    console.log(uploadFile);
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
      setErrorMessage('방 제목을 입력해줏세요');
      return;
    }
    if (userInputs.capability === '') {
      setErrorMessage('방 최대 인원 수를 입력해주세요');
      return;
    }
    if (userInputs.regionId === '') {
      setErrorMessage('방 지역을 선택해주세요');
      return;
    }
    const data = {
      title: userInputs.title,
      hashtags: arr.map(data => data.value),
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
        console.log(newChatRoom)
        await setMyChatRooms([newChatRoom.data, ...myChatRooms]);
      } catch (error) {
        console.error('api 요청 중 오류 발생 : ', error);
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
    console.log(e);
    if (e.key === 'Enter') {
      console.log(val);
      changeArr(val);
      emptyInput();
      console.log(val);
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
    console.log('nextTag: ' + nextTag);
    const nextValue = {
      idx: index,
      value: nextTag,
    };
    IncreaseIndex();
    const nextArr = arr.concat(nextValue);
    console.log(nextArr);
    setArr(nextArr);
    console.log('now: ' + arr);
  };

  const onRemove = (target) => {
    console.log(target);
    const nextArr = arr.filter((elem) => elem.idx !== target.idx);
    setArr(nextArr);
  };
  const tagArr = arr.map((elem) => (
    <HashTag>
      <CloseButton
        className='absolute top-5 right-5'
        onClick={() => onRemove(elem)}
      />
      <div
        key={elem.idx}
        className='p-1 m-1 text-2xl'
        onDoubleClick={() => onRemove(elem)}
        onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
      >
        {`#${elem.value}`}
      </div>
    </HashTag>
  ));

  //tagArr의 길이가 5 초과하는 경우, 5번째 인덱스 이후의 요소들을 제거

  if (tagArr.length > 5) {
    tagArr.splice(5);
    alert('해시태그는 5개까지만 입력 가능합니다.');
  }

  return (
    <>
      <h1 className='font-daeam text-2xl'>채팅방 개설하기</h1>
      <form >
        <div className='text-start font-her text-2xl'>*채팅방 제목 </div>
        <div className='content-start pb-3'>
          <input
            className='bg-transparent w-full border-b font-her'
            placeholder='방제 입력하기'
            onChange={(e) => handleChangeInputs('title', e.target.value)}
          />
        </div>
        <div className='font-her text-left text-2xl'>*해시태그 설정하기</div>
        <div className='flex'>
          {tagArr}
          <HashTag>
            <div className='flex flex-row'>
              <div>
                <input
                  className='bg-transparent w-20 border-2 text-center'
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyPress}
                  placeholder='#키워드'
                  value={val}
                />
              </div>
            </div>{' '}
          </HashTag>
        </div>
        {/* <button className='font-paci border border-dashed rounded-2xl pr-2 pl-2'></button> */}
        <div className='flex font-her justify-center bg-gray-100 p-2 '>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            지역
          </div>

          <SelectBox
            className='px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center flex-grow'
            widthSize={96}
            onChange={(e) => handleChangeInputs('regionId', e.target.value)}
          />
        </div>
        <div className='flex font-her justify-center bg-gray-100 p-2'>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-2xl w-1/3'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            인원수
          </div>

          <ul className=' px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center'>
            <input
              className='bg-transparent h-full text-center'
              type='number'
              min='1'
              onChange={(e) => handleChangeInputs('capability', e.target.value)}
            />
            <span>명</span>
          </ul>
        </div>

        <div className='border rounded-xl font-her pt-2 pb-2'>
          채팅방 이미지 추가하기
          <div className='flex justify-center relative text-center '>
            <ProfileImage
              size='20'
              profileImage={profileImage}
              onChange={handleChangeUploadProfileImg}
            />
          </div>
        </div>
        <div className='pt-2'>
          <Button text='추가하기' type='button' onClick={handleSubmitChatCreate}/>
        </div>
      </form>
    </>
  );
}

export default ChatRoomCreateModal;
