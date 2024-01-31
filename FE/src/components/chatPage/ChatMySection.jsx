import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal.js';
import ChatMyItem from './ChatMyItem.jsx';
import ChatRoomModal from '../../components/chatPage/chatRoomModal/ChatRoomModal.jsx';
import CustomModal from '../common/CustomModal.jsx';

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
              className='font-her text-2xl text-center text-white px-4 py-2 bg-transparent rounded-md'
              onClick={handleClickCreateChatRoom}
            >
              <div className='mx-auto rounded-full bg-gray-500 text-black'>
                ...
              </div>
              <span className='text-black'>+채팅방 개설하기</span>
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
