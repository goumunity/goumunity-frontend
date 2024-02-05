import React, { useState, useEffect } from 'react';
import axios from 'axios';
import geo from '@/assets/images/logo.png';
import useAxiosGet from '../../../hooks/useAxiosGet';
import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';

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
          `temp/api/users/my/chat-rooms?page=0&size=1&time=${new Date().getTime()}`
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

  //서버 api 연결
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         '/api/users/my/chat-rooms?page=&size=&time=',
  //         //사용자 아이디에 맞는 채팅방 가져오기
  //         {
  //           params: {
  //             id: 1234,
  //           },
  //         }
  //       );

  //       setChatData(res.data.chatMyItemList);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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

  return (
    <>
      {chatData.map((value, index) => {
        return (
          <>
            {/* <button onClick={() => handleClickMySection(value.chatRoomId)}> */}
            <button
              key={value.idx}
              className='hover:rotate-12  hover:bg-orange-200'
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
