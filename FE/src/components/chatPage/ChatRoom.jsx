export default function ChatRoom({
  chatRoomId,
  message,
  setMessage,
  messages,
  sendMessage,
  userId,
}) {
  const createMessage = (m) => {
    if (userId.index === userId) {
      console.log(userId);
      return (
        <>
          <div className='bg-black'>{messageBody(m)}</div>
        </>
      );
    } else {
      console.log(userId.index);
      console.log(userId);
      return (
        <>
          <div className='text-gray-600 '>
            {m.nickname}
            <div className=''>{messageBody(m)}</div>
          </div>
        </>
      );
    }
  };

  const messageBody = (m) => {
    if (m.chatType === 'MESSAGE') {
      // 문자
      return (
        <>
          <div className='bg-gray-200 p-2 rounded mb-2'>
            {m.content}

            <span className='pl-3 text-xs'>
              {JSON.stringify(new Date(m.createdAt).toLocaleString())}
            </span>
          </div>
        </>
      );
    } else {
      // 사진
      return (
        <>
          <div>
            <img
              src={m.message}
              className='max-w-full h-auto'
              alt='사진 메시지'
            />
          </div>
        </>
      );
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>채팅방 ID: {chatRoomId}</h1>

      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleOnKeyPress}
        className='w-full p-2 border border-gray-300 rounded mb-4'
      />
      <button
        onClick={sendMessage}
        className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600'
      >
        전송 SOCKET
      </button>
      {messages.map((m, index) => (
        <div key={index} className='mb-4'>
          {createMessage(m)}
        </div>
      ))}
    </>
  );
}
