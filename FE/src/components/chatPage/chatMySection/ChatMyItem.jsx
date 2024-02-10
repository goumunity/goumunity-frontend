import {useEffect, useState} from 'react';
import axios from 'axios';
import geo from '@/assets/images/logo.png';
import {useNavigate} from 'react-router-dom';
import CloseButton from '../../common/CloseButton';
import instance from "@/utils/instance.js";

function ChatMyItem(props) {
  const navigate = useNavigate();
  const {
    handleClickMySection, value, index
    , handleJoinChatRoom
  } = props;
  const [isHovered, setIsHovered] = useState(false);

  //버튼 클릭 이벤트에 URL 이동 로직
  const handleClickOpenSpecificRoom = (chatRoomId) => {
    if (props.isLoaded === false) {
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
        <div>
          <div>
            <button
                type='button'
                key={value.idx}
                className='  hover:bg-orange-200'
                onClick={() => {
                  handleButtonClick(value.chatRoomId);
                  handleJoinChatRoom(value.chatRoomId);
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
              <div
                  className='flex'
                  key={index}
                  // onClick={() => {
                  //   setId(value.chatRoomId);
                  // }}
              >
                <div className='w-1/4 mt-3'>
              <span>
                <img src={geo} style={{width: '40px'}} alt='채팅방 사진'/>
              </span>
                </div>
                <div className='w-3/4 h-30'>
                  <div>
                <span className='font-bold text-responsive text-2xl'>
                  <div className='flex justify-end  w-full'></div>
                  {value.title}
                </span>
                    <span> 👤{value.currentUserCount}</span>
                    <span> 💬{value.unreadMessageCount}</span>
                  </div>
                  <div className='mt-1'></div>
                  <div>
                    <ul
                        className='flex text-responsive font-her'
                        style={{flexWrap: 'wrap'}}
                    >
                      {value.hashtags?.map((name, hashtagsIndex) => (
                          <li
                              className='pr-2'
                              key={hashtagsIndex}
                          >{`#${value.hashtags[hashtagsIndex].name}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
    );

}
export default ChatMyItem;
