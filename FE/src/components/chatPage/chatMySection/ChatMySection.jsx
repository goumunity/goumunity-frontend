import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../store/modal';
import ChatMyItem from './ChatMyItem';
import ChatRoomCreateModal from '@/components/chatPage/chatRoomModal/ChatRoomCreateModal.jsx';
import CustomModal from '../../common/CustomModal';
import Button from '@/components/common/Button';

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

  if (!myChatRooms) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  const dispatch = useDispatch();
  const handleClickCreateChatRoom = () => {
    dispatch(modalActions.openCreatChatModal());
  };

  return (
    <div className='w-72'>
      <div className='relative'>
        <h1 className='font-daeam text-4xl text-start text-responsive p-5'>
          나의 거지챗
        </h1>
        <button
          className='absolute right-3 top-7 font-daeam cursor-pointer'
          onClick={handleClickCreateChatRoom}
        >
          채팅방 개설
        </button>
      </div>
      <div className='w-72 scroll h-screen overflow-x-hidden overflow-y-scroll '>
        <div className='w-72'>
          {myChatRooms.map((myChatRoom, idx) => {
            return (
              <ChatMyItem
                key={idx}
                handleClickMySection={handleClickMySection}
                isLoaded={isLoaded}
                myChatRoom={myChatRoom}
                handleJoinChatRoom={handleJoinChatRoom}
              ></ChatMyItem>
            );
          })}
        </div>

        {/* <button
                className='font-her text-2xl text-center text-white px-4 py-2 bg-transparent rounded-md'
                onClick={handleClickCreateChatRoom}
              > */}
        {/* <span className='text-black'>+채팅방 개설하기</span> */}
        <div
          ref={refCallback}
          className='rounded-full bg-gray-500 text-white text-center'
        >
          ...
        </div>
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
