import React, { useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth';

function ChatTalkRoom({ userId, chatRoomId, onMessageSend, messages }) {
  const [msg, setMsg] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);

  const messagesContainerRef = useRef(null);

  const onMessageChanged = (e) => {
    setMsg(e.target.value);
  };

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
    }
  };

  //현재시각
  const formatCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // 시간을 12시간 형식으로 변경
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // 분을 두 자리로 표시
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}${ampm}`;
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>응 여긴 로비야{chatRoomId}</h1>
      <div className='flex space-x-5'></div>
      <div className='flex flex-col h-96'>
        <div
          ref={messagesContainerRef}
          className=' flex  flex-col scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll items-center  justify-center'
        >
          <div className='w-full flex flex-col'>
            {messages?.map((m, index) => {
              return (
                <div key={index}>
                  {m.userId === currentUser.id ? (
                    // <div className='flex justify-end border rounded-2xl bg-blue-200 p-1'>
                    <div className='flex justify-end pr-2'>
                      <span className='text-xs text-gray-500 ml-2 pt-3 pr-2'>
                        {formatCurrentTime()}
                      </span>
                      <span className='flex justify-end border rounded-2xl bg-blue-200 p-1 pl-2 pr-3 w-1/5  text-neutral-800 text-sm'>
                        {m.content}
                      </span>
                    </div>
                  ) : (
                    <div className='pl-2'>
                      <div className='flex justify-start flex-col text-sm'>
                        {m.nickname.replace(/#.*/, '')}
                        <div className='flex items-center'>
                          <span className=' bg-gray-200 border rounded-3xl p-1 pr-2 pl-3 w-1/5 text-neutral-800'>
                            {m.content}
                          </span>
                          <span className='text-xs text-gray-500 ml-2'>
                            {formatCurrentTime()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='border pb-0'>
        <i class='fa-solid fa-circle-plus'></i>
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
            onClick={() => onMessageSend(msg)}
            className='p-4'
          >
            입력
          </button>
        </span>
      </div>
    </>
  );
}

export default ChatTalkRoom;
