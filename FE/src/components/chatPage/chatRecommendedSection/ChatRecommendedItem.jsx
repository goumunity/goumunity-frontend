import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ChatRecommendedItem(props) {
  const [chatData, setChatData] = useState(null);

  const [chatMyData, setChatMyData] = useState('');

  useEffect(() => {
    const trying = async () => {
      try {
        const res = await axios.get('/fake/chatMyList');
        console.log(res);
        setChatMyData(res.data.chatMyItemList);
        console.log(chatMyData);
      } catch (error) {
        console.log('뭐가 안되나?: ' + error);
      }
    };
    trying();
  }, []);

  //나의 거지챗 리스트 추가하기
  const handleAddMyChat = (e) => {
    // console.log(e);
    // console.log(e.type);
    if (e.type === 'click') {
      addMyChatList();
    }
  };

  let clickData = '';
  const handleClickData = (value) => {
    clickData = value;
    // console.log(clickData);
  };

  const addMyChatList = () => {
    const nextValue = {
      title: clickData.title,
      // chatRoomId: chatMyData.chatRoomdId[chatMyData.chatRoomdId.length - 1] + 1,
      chatRoomId: 3,
      imgSrc: 'chatData.imgSrc',
      hashtags: clickData.hashtags.map((elem) => elem),
      currentUserCount: clickData.currentUserCount,
      unreadMessageCount: 0,
    };
    console.log(nextValue);
    console.log(chatData);
    const nextArr = chatMyData.concat(nextValue);
    console.log(nextArr);
    setChatMyData(nextArr);
  };

  //axios fake-server 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/fake/chatRecomNext');

        setChatData(res.data.chatRecomItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //axios 입장하기 버튼 클릭 시, 나의 거지챗 list 추가
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.post('/fake/chatMyList');
        const res = await axios.post(`/api/chat-rooms/${clickData.chatRoomId}`);
      } catch (error) {
        if (error.response.status === 404) {
          console.log(error + '존재하지 않는 거지방입니다.');
        }
        if (error.response.status === 409) {
          console.log(error + '이미 참여하고 있는 거지방입니다.');
        }
      }
    };

    fetchData();
  }, []);

  if (!chatData) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }
  return (
    <>
      {chatData
        .filter((val) => {
          if (props.userInput == '') {
            return val;
          } else if (val.title.includes(props.userInput)) {
            return val;
          }
        })
        .map((value, index) => {
          return (
            <>
              <li className='cards__item'>
                <div className='cards__item__link' to={props.path}>
                  <figure className='cards__item__pic-wrap'>
                    <img
                      className='cards__item__img'
                      alt='Travel Image'
                      src={props.src}
                    />
                  </figure>
                  <div className='cards__item__info '>
                    <h5 className='font-daeam cards__item__text'>
                      {value.title}
                    </h5>
                    {value.hashtags.map((hashtag, hashIndex) => {
                      return (
                        <span
                          key={hashIndex}
                          className='font-her text-1xl pr-2'
                        >{`#${hashtag.name}`}</span>
                      );
                    })}
                    <div className='text-gray-800 font-paci text-center rounded-md border-2 hover:border-solid '>
                      <button
                        onClick={handleAddMyChat}
                        onChange={handleClickData(value)}
                      >
                        입장하기
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </>
          );
        })}
    </>
  );
}

export default ChatRecommendedItem;
