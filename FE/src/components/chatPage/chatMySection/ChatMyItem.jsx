import React, { useState, useEffect } from 'react';
import axios from 'axios';
import geo from '@/assets/images/logo.png';
import useAxiosGet from '../../../hooks/useAxiosGet';
import { useNavigate } from 'react-router-dom';
import CloseButton from '../../common/CloseButton';

function ChatMyItem(props) {
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const { handleClickMySection, setId } = props;

  //api 연결
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get('/fake/chatMyList');
        const res = await axios.get(
          `temp/api/users/my/chat-rooms?page=0&size=100&time=${new Date().getTime()}`
        );

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

  //채팅방 삭제
  const handleRemoveChat = () => {
    setChatData();
    async () => await axios.delete(`/api/chat-rooms/${chatRoomId}`);
  };

  return (
    <>
      {chatData.map((value, index) => {
        return (
          <div>
            <button
              key={value.idx}
              // className='hover:rotate-12  hover:bg-orange-200'
              onClick={() => {
                handleButtonClick(value.chatRoomId);
              }}
            >
              <div
                className='flex'
                key={index}
                onClick={() => {
                  setId(value.chatRoomId);
                }}
              >
                <div className='w-1/4 mt-3'>
                  <span>
                    <img
                      src={geo}
                      style={{ width: '40px' }}
                      alt='채팅방 사진'
                    />
                  </span>
                </div>
                <div className='w-3/4 h-30'>
                  <div>
                    <span className='font-bold text-responsive text-2xl'>
                      <div className='flex justify-end  w-full'>
                        {/* <CloseButton
                          className='top-5 right-5 hover:bg-amber-300'
                          onClick={handleRemoveChat(value.chatRoomId)}
                        /> */}
                      </div>
                      {value.title}
                    </span>
                    <span> 👤{value.currentUserCount}</span>
                    <span> 💬{value.unreadMessageCount}</span>
                  </div>
                  <div className='mt-1'></div>
                  <div>
                    <ul
                      className='flex text-responsive font-her'
                      style={{ flexWrap: 'wrap' }}
                    >
                      {value.hashtags.map((name, hashtagsIndex) => (
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
        );
      })}
    </>
  );
}
export default ChatMyItem;
