import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modal';
import ChatMyItem from './ChatMyItem';
import ChatRoomCreateModal from '@/components/chatPage/chatRoomModal/ChatRoomCreateModal.jsx';
import CustomModal from '../../common/CustomModal';
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom/dist';

function ChatMySection({
  refCallback,
  handleClickMySection,
  isLoaded,
  handleJoinChatRoom,
  myChatRooms,
  setMyChatRooms,
}) {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);
  const [chatRoomModal, setChatRoomModal] = useState(false);
  const isVisible = useSelector((state) => state.chat.isVisible);

  if (!myChatRooms) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  const dispatch = useDispatch();
  const handleClickCreateChatRoom = () => {
    dispatch(modalActions.openCreatChatModal());
  };
  // const [ isVisible, setIsVisible ] = useState( true );
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775);
  const [isMini, setIsMini] = useState(window.innerWidth <= 400);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
    console.log('isVisible', isVisible);
  };

  useEffect(() => {
    console.log(isVisible);
    document.getElementById('pos').style.display = isVisible ? '' : 'none';
  }, [isVisible]);
  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile(window.innerWidth <= 775);
      setIsMini(window.innerWidth <= 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobile ? `w-full` : `w-72`}>
      {!isMobile && (
        <div className={`relative flex ${isMobile ? 'justify-center' : ''}`}>
          <h1 className={`font-daeam text-4xl text-start text-responsive p-5`}>
            나의 거지챗
          </h1>
          <div className='self-center'>
            <button
              className='font-daeam cursor-pointer bg-bg border-2 rounded-md hover:bg-gray-100 p-2'
              onClick={handleClickCreateChatRoom}
            >
              <i class='fa-solid fa-plus aspect-square'></i>
            </button>
          </div>
        </div>
      )}

      <div
        id='pos'
        className={
          isMobile
            ? `w-full scroll h-screen overflow-x-hidden overflow-y-scroll pt-4`
            : `w-72 scroll h-screen overflow-x-hidden overflow-y-scroll pt-4`
        }
      >
        <div className={isMobile ? `w-full` : `w-72`}>
          {myChatRooms.map((myChatRoom, idx) => {
            return (
              <ChatMyItem
                key={idx}
                handleClickMySection={handleClickMySection}
                isLoaded={isLoaded}
                myChatRoom={myChatRoom}
                handleJoinChatRoom={handleJoinChatRoom}
                MobileJoinChatRoom={toggleVisible}
              ></ChatMyItem>
            );
          })}
        </div>

        {/* <button
                className='font-her text-2xl text-center text-white px-4 py-2 bg-transparent rounded-md'
                onClick={handleClickCreateChatRoom}
              > */}
        {/* <span className='text-black'>+채팅방 개설하기</span> */}

        {/* </button> */}
      </div>
      {isModalOpen && modalOption === 'createChat' && (
        <CustomModal>
          <ChatRoomCreateModal
            setMyChatRooms={setMyChatRooms}
            myChatRooms={myChatRooms}
          />
        </CustomModal>
      )}
    </div>
  );
}

export default ChatMySection;
