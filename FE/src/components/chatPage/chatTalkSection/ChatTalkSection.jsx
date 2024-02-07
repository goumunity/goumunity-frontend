import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatTalkRoom from './ChatTalkRoom';
import ChatRoom from './ChatTalkRoom';
import Main from '../../../pages/Main';

function ChatTalkSection({ id }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/chat/talk/${id}`);

        setChatData(res.data.chatMyItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      채팅방 내부입니다
      {id}
      {/* <ChatTalkRoom /> */}
      <Main/>
    </div>
  );
}

export default ChatTalkSection;
