import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatMyItem from './ChatMyItem';
import ChatRoomModal from '../../modal/ChatRoomModal';

function ChatMySection() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);
  const [chatRoomModal, setChatRoomModal] = useState(false);

  const dispatch = useDispatch();

  const handleClickCreateChatRoom = () => {
    dispatch(modalActions.openCreatChatModal());
  };

  return (
    <div>
      <span></span>
      <div className='divide-y  divide-entrance'>
        <div className='font-daeam text-4xl text-center mb-4 text-responsive'>
          나의 거지챗
        </div>
        <ChatMyItem />
        <div>
          <div className='flex flex-col items-center'>
            <button
              className='font-her text-2xl text-center text-white px-4 py-2 bg-blue-500 rounded-md'
              onClick={handleClickCreateChatRoom}
            >
              <div className='mx-auto rounded-full bg-gray-500 text-gray-800'>
                ...
              </div>
              +채팅방 개설하기
            </button>
            {isModalOpen && modalOption === 'createChat' && (
              <CustomModal>
                <ChatRoomModal />
              </CustomModal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMySection;
