import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

function ChatMyItem({
  handleClickMySection,
  myChatRoom,
  handleJoinChatRoom,
  isLoaded,
}) {
  // myChatroom = { chatRoomId, currentUserCount, hashtags, imgSrc, title, unReadMessageCount }

  // hashtags = [ { name, sequence }, {} ]
  const [isEntered, setIsEntered] = useState(false);
  const navigate = useNavigate();

  //버튼 클릭 이벤트에 URL 이동 로직
  const handleClickOpenSpecificRoom = (chatRoomId) => {
    if (isLoaded === false) {
      navigate('/chat');
    } else {
      navigate(`/chat/talk/${chatRoomId}`);
    }
  };

  const handleButtonClick = (chatRoomId) => {
    handleClickMySection();
    handleClickOpenSpecificRoom(chatRoomId);
  };

  return (
    <div
      className={`flex items-center p-2 w-72 h-20 gap-1 hover:bg-gray-100 ${isEntered && 'bg-gray-100'}`} 
      onClick={() => {
        handleButtonClick(myChatRoom.chatRoomId);
        handleJoinChatRoom(myChatRoom.chatRoomId);
      }}
    >
      <div className='flex justify-center items-center w-1/6 rounded-full'>
        <img
          src={myChatRoom.imgSrc ? myChatRoom.imgSrc : logo}
          className='w-10 aspect-square rounded-full border-black border-2'
          alt=''
        />
      </div>

      <div className='flex flex-col w-4/6'>
        <div className='flex gap-2 items-center'>
          <span
            className={`font-dove justify-start ${
              myChatRoom.title.length > 10 ? 'text-sm' : 'text-md'
            }`}
          >
            {myChatRoom.title}
          </span>
          <span className='font-her'>{`👤${myChatRoom.currentUserCount}`}</span>
        </div>

        <ul className='flex h-5 font-her gap-2 overflow-hidden'>
          {myChatRoom.hashtags?.map((hashtag, idx) => (
            <li className='' key={idx}>{`#${hashtag.name}`}</li>
          ))}
        </ul>
      </div>

      <div className='w-1/6 '>
        {myChatRoom.unReadMessageCount !== 0 && (
          <div className='flex justify-center items-center w-7 aspect-square rounded-full bg-red-500 font-paci text-white text-xs'>
            {myChatRoom.unReadMessageCount}
          </div>
        )}
      </div>
    </div>
  );
}
export default ChatMyItem;
