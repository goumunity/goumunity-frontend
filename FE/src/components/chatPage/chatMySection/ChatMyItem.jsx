import React, { useState, useEffect } from 'react';
import axios from 'axios';
import geo from '@/assets/images/logo.png';
import useAxiosGet from '../../../hooks/useAxiosGet';
import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';

function ChatMyItem(props) {
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const { handleClickMySection } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/fake/chatMyList');

        setChatData(res.data.chatMyItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chatData) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  const handleClickOpenSpecificRoom = (chatRoomId) => {
    navigate(`/chat/talk/${chatRoomId}`);
  };

  return (
    <>
      {chatData.map((value, index) => {
        return (
          <>
            <button onClick={() => handleClickMySection(value.chatRoomId)}>
              <div className='flex' key={index}>
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
                <div></div>
              </div>
            </button>
          </>
        );
      })}
    </>
  );
}
export default ChatMyItem;
