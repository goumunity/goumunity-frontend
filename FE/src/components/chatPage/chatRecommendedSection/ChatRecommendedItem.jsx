import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ChatRecommendedItem(props) {
  const [chatData, setChatData] = useState(null);

  //button 클릭 시, 특정 채팅방으로 url 변경
  const navigate = useNavigate();

  //axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/fake/chatRecomNext');
        console.log(res.data.chatRecomItemList);
        setChatData(res.data.chatRecomItemList);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          }
          // (
          //   val.title.includes(props.userInput) ||
          //   val.hashtags.includes(props.userInput)
          // )
          else {
            const hashtagsNames = val.hashtags.map((tag) => tag.name);
            return (
              val.title.includes(props.userInput) ||
              hashtagsNames.includes(props.userInput)
            );
          }
          // console.log(val);
        })
        .map((value, index) => {
          return (
            <>
              <li className='cards__item'>
                <Link className='cards__item__link' to={props.path}>
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
                    <div className='text-gray-800 font-paci text-center rounded-md border-2 hover:border-solid hover:bg-lime-100'>
                      <button onClick={() => navigate(`/chat/talk`)}>
                        입장하기
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            </>
          );
        })}
    </>
  );
}

export default ChatRecommendedItem;
