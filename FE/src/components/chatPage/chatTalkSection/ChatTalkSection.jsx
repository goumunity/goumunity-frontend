import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ChatTalkSection({ selectedChatRoom }) {
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/fake/chatTalk/${params.talkId}`);

        setChatData(res.data.chatMyItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* 선택된 채팅방이 있는지 확인하고 해당 채팅방의 내용을 렌더링 */}
      {selectedChatRoom ? (
        <div>
          {/* 선택된 채팅방의 내용 */}
          <p>{`${params.chatRoomId}번 채팅방 내용`}</p>
        </div>
      ) : (
        <p>채팅방을 선택하여 내용을 확인하세요</p>
      )}
    </div>
  );
}

export default ChatTalkSection;
