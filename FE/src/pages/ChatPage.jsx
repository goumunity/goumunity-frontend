import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatLists from '../components/chat/ChatLists';
import ChatRoomModal from '../modal/ChatRoomModal';
import CustomModal from '../components/common/CustomModal';
import { modalActions } from '../store/modal';
import Card from '../components/chat/Card';
import background from '@/public/img/background.png';

function ChatPage() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);
  const [chatRoomModal, setChatRoomModal] = useState(false);

  const dispatch = useDispatch();

  const handleClickCreateChatRoom = () => {
    dispatch(modalActions.openCreatChatModal());
  };

  return (
    <div className='flex w-full'>
      <div className='w-1/6 bg-yellow h-full'>
        <span></span>
        <div className='divide-y  divide-entrance'>
          <div className='font-daeam text-4xl text-center mb-4 text-responsive'>
            나의 거지챗
          </div>
          <ChatLists />
          <ChatLists />
          <div>
            <div className='flex flex-col items-center'>
              <button
                className='font-her text-center px-4 py-2 bg-blue-500 text-white rounded-md'
                onClick={handleClickCreateChatRoom}
              >
                <div className='mx-auto rounded-full bg-gray-500 text-gray-800 '>
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
      <div
        className='w-5/6'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
        }}
      >
        <div className=' divide-x divide-entrance'>
          <span></span>
          <div>
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
