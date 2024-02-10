import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {modalActions} from '../../../store/modal';
import ChatMyItem from './ChatMyItem';
import ChatRoomModal from '@/components/chatPage/chatRoomModal/ChatRoomModal';
import CustomModal from '../../common/CustomModal';
import axios from 'axios';
import instance from "@/utils/instance.js";

function ChatMySection(props) {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);
  const [chatRoomModal, setChatRoomModal] = useState(false);
  const [chatData, setChatData] = useState(null);

  //api 연결
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/api/users/my/chat-rooms?page=0&size=100&time=${new Date().getTime()}`);
        setChatData(res.data.contents);
        // setChatData(res.data.chatMyItemList);
        console.log(chatData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chatData) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  //props 수지
  const { handleClickMySection, isLoaded,  handleJoinChatRoom } = props;

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
        <div className='scroll overflow-x-hidden overflow-y-scroll divide-y divide-entrance'>
          {chatData.map((value, index) => {
            return (
              <div>
                <ChatMyItem
                  handleClickMySection={handleClickMySection}
                  isLoaded={isLoaded}
                  chatData={chatData}
                  setChatData={setChatData}
                  value={value}
                  index={index}
                  handleJoinChatRoom={handleJoinChatRoom}
                ></ChatMyItem>
              </div>
            );
          })}
        </div>
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
