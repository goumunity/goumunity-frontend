import React, {useEffect, useRef, useState} from "react";

import {useSelector} from 'react-redux';
import ChatMessage from "@/components/chatPage/chatTalkSection/ChatMessage.jsx";

function ChatTalkRoom({ userId, chatRoomId, onMessageSend, messages }) {
  const [msg, setMsg] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);

  const messagesContainerRef = useRef(null);

  const onMessageChanged = (e) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    setMsg('');
  }, [chatRoomId]);

  //메세지 쌓이면 스크롤바가 가장 맨 아래에 오도록 함
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onMessageSend(e.target.value);
      setMsg('');
    }
  };
  const handleSendButtonClicked = () => {
    if(msg === '') return;
    onMessageSend(msg);
    setMsg('');
  }



  return (
    <>
      <div className={'h-screen'}>
      <div className='flex space-x-5 '></div>
      <div className='flex flex-col h-96'>
        <div
          ref={messagesContainerRef}
          className=' flex  flex-col scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll items-center  justify-center'
        >
          <div className='w-full flex flex-col'>
            {messages?.map((m, index) => {
              return (
                  <>
                    <div className='mt-3'>
                      <ChatMessage message={m} index={index} currentUser={currentUser} />
                    </div>
                  </>
              );
            })}
          </div>
        </div>
      </div>
      <div className='border pb-0'>
        <i className='fa-solid fa-circle-plus'></i>
        <input
            className='w-4/5  font-her p-4 border-entrance border-r border'
            placeholder='메세지를 입력해주세요...'
            type={'text'}
            value={msg}
            onChange={(e) => onMessageChanged(e)}
            onKeyDown={handleOnKeyPress}
        />
        <span className='w-full'>
          <button
              type={'button'}
              onClick={handleSendButtonClicked}
              className='p-4'
          >
            입력
          </button>
        </span>
      </div>
      </div>
    </>
  );
}

export default ChatTalkRoom;
