import { useState } from 'react';
import background from '@/assets/images/background.png';
import ChatMySection from '../components/chatPage/chatMySection/ChatMySection';
import ChatTalkSection from '../components/chatPage/chatTalkSection/ChatTalkSection';

function ChatPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClickMySection = (chatRoomId) => {
    // setIsLoaded(!isLoaded);
    navigate(`/chat/talk/${chatRoomId}`);
  };

  return (
    <div className='flex w-full'>
      <div className='w-1/6 bg-yellow h-screen'>
        <ChatMySection handleClickMySection={handleClickMySection} />
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
            {/* <button onClick={handleClickMySection}>클릭</button> */}
            {isLoaded ? <ChatRecommendedSection /> : <ChatTalkSection />}
            {/* <ChatRecommendedSection /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
