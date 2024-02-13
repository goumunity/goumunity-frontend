import React from 'react';
import defaultIcon from '@/assets/svgs/defaultMaleIcon.svg';

function ChatMessage({ message, index, currentUser }) {
  //현재시각
  const formatCurrentTime = () => {
    const now = message?.createdAt ? new Date(message?.createdAt) : new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '오후 ' : '오전 ';

    // 시간을 12시간 형식으로 변경
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // 분을 두 자리로 표시
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${ampm}${formattedHours}:${formattedMinutes}`;
  };

  const isNotice = () => {
    return message.chatType === 'ENTER' || message.chatType === 'EXIT';
  };

  const noticeMessage = () => {
    const msg =
      message.chatType === 'ENTER' ? '입장하셨습니다.' : '나가셨습니다.';
    const content = `${
      message.nickname ? message.nickname : '알수없음 '
    }님이 ${msg}`;
    return (
      <>
        <div className='flex justify-center'>
          <span className='border rounded-2xl bg-grey-200 p-1 pl-2 pr-3 text-neutral-800 text-sm'>
            {content}
          </span>
        </div>
      </>
    );
  };
  const myMessage = () => {
    return (
      <>
        <div className='flex justify-end pr-2'>
          <span className='flex items-end text-xs text-gray-500 ml-2 pt-3 pr-2'>
            {formatCurrentTime()}
          </span>
          {messageBody(true)}
        </div>
      </>
    );
  };

  const messageBody = (isYours) => {
    const bgColor = isYours ? 'bg-blue-200' : 'bg-gray-200';
    if (message.chatType === 'MESSAGE') {
      return (
        <span
          className={`flex justify-end border rounded-2xl ${bgColor} p-2 max-w-80  text-neutral-800 text-sm my-2`}
        >
          {message.content}
        </span>
      );
    } else {
      return (
        <span
          className={`flex justify-end border rounded-2xl ${bgColor} p-2 max-w-80  text-neutral-800 text-sm`}
        >
          <img src={message.content} />
        </span>
      );
    }
  };

  const otherMessage = () => {
    return (
      <div className='flex items-center pl-2 gap-1'>
        <img
          className='self-start w-10 h-10 rounded-full object-contain mr-1 border-2 border-black '
          src={
            message?.profileImageSrc ? message?.profileImageSrc : defaultIcon
          }
        />
        <div className='flex flex-col gap-0'>
          <span>{message.nickname.replace(/#.*/, '')}</span>
          <div className='flex gap-2'>
            <span className=''>{messageBody(false)}</span>
            <span className='text-xs text-gray-500 self-end '>
              {formatCurrentTime()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const userMessage = () => {
    return message.userId === currentUser.id ? myMessage() : otherMessage();
  };
  return (
    <>
      <div key={index} className={'font-daeam'}>
        {isNotice() ? noticeMessage() : userMessage()}
      </div>
    </>
  );
}

export default ChatMessage;
