import React, {useEffect, useState} from 'react';
import ChatTalkRoom from './ChatTalkRoom';
import instance from '@/utils/instance.js';

function ChatTalkSection({ id, onMessageSend, messages, setIsSearchMode }) {

  const [selectedChatRoom, setSelectedChatRoom] = useState(null);


  const fetchChatRoomDetails = async () =>{
    try{
      const res = await instance.get(`/api/chat-rooms/${id}/detail`);
      console.log(res.data)
      setSelectedChatRoom(res.data);
    }catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {

    fetchChatRoomDetails();


  }, [id]);
  const onCloseButtonClicked = async () => {

    await instance.patch(`/api/chat-rooms/${id}/disconnect`);
    setIsSearchMode(true);

  }



  return (
      <div>
      <div className='flex items-center justify-between p-3 border-b-2'>
        <div>
        {selectedChatRoom?.title}
          </div>
        <div className='flex justify-between items-center  pr-3 '>
          <i className='fa-solid fa-bars pr-3 hover:cursor-pointer'/>
          <i className='fa-solid fa-xmark pr-3 hover:cursor-pointer' onClick={onCloseButtonClicked}/>
        </div>
      </div>
        <ChatTalkRoom
            chatRoomId={id}
            onMessageSend={onMessageSend}
            messages={messages}
        />
        <div></div>
      </div>
  );
}

export default ChatTalkSection;