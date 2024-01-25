import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';
import Card from '../components/chatPage/CardRecommendedSection';
import background from '@/public/img/background.png';
import ChatMySection from '../components/chatPage/ChatMySection';

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
        <ChatMySection />
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
