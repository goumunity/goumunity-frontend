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

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

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
      className='flex items-center p-2 w-72 h-20 gap-1'
      onClick={() => {
        handleButtonClick(myChatRoom.chatRoomId);
        handleJoinChatRoom(myChatRoom.chatRoomId);
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          <span className={`font-dove justify-start ${myChatRoom.title.length > 10 ? 'text-sm' : 'text-md'}`}>{myChatRoom.title}</span>
          <span className='font-her'>{`👤${myChatRoom.currentUserCount}`}</span>
        </div>
        <div>
          <ul
            className='flex font-her gap-2 flex-wrap'
          >
            {/* {myChatRoom.hashtags?.map((name, hashtagsIndex) => (
              <li
                className='pr-2'
                key={hashtagsIndex}
              >{`#${myChatRoom.hashtags[hashtagsIndex].name}`}</li>
            ))} */}
            {myChatRoom.hashtags?.map((hashtag, idx) => (
              <li
                className=''
                key={idx}
              >{`#${hashtag.name}`}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='w-1/6 '>
        <div className='flex justify-center items-center w-7 aspect-square rounded-full bg-red-500 font-paci text-white text-xs'>
          {myChatRoom.unReadMessageCount}
        </div>
      </div>
    </div>
  );
}
export default ChatMyItem;
