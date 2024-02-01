import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatTalkRoom from './ChatTalkRoom';
import ChatRoom from './ChatTalkRoom';

function ChatTalkSection({ selectedChatRoom }) {
  const params = useParams();
  console.log('params: ' + params);
  console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/chat/talk/${params.talkId}`);

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
      {params.talkId}
      {/* <ChatTalkRoom /> */}
    </div>
  );
}

export default ChatTalkSection;
