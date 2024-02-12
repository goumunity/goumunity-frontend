import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatTalkRoom from './ChatTalkRoom';
import ChatRoom from './ChatTalkRoom';
import Main from '../../../pages/Main';
import instance from '@/utils/instance.js';

function ChatTalkSection({ id, onMessageSend, messages, myChatRooms }) {
  // const { myChatRooms } = props;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/api/chat/talk/${id}`);

        console.log(res.data);
        setChatData(res.data.chatMyItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // const fetchData = async () => {
    //   try {
    //     const res = await cli.get(`/chat/talk/${id}`);
    //
    //     setChatData(res.data.chatMyItemList);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    //
    // fetchData();
  }, []);

  // console.log(myChatRooms);

  return (
    <div>
      <span className='flex flex-row justify-between p-3 border-b-2'>
        {myChatRooms.title}
        <span className='flex justify-end pr-3 '>
          <i class='fa-solid fa-bars pr-3'></i>
          <i class='fa-solid fa-magnifying-glass pr-3'></i>
          <i class='fa-solid fa-xmark pr-3'></i>
        </span>
      </span>
      <ChatTalkRoom
        chatRoomId={id}
        onMessageSend={onMessageSend}
        messages={messages}
      />
      <div></div>
      {/*<Main/>*/}
    </div>
  );
}

export default ChatTalkSection;
