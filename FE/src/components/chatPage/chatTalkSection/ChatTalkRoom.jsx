// import React from 'react';

// function ChatTalkRoom() {
//   const [joinedRoom, setJoinedRoom] = useState([]);
//   const [chatRoomId, setChatRoomId] = useState(0);
//   const [message, setMessage] = useState();
//   const [messages, setMessages] = useState([]);
//   const client = useRef({});
//   const room = useRef(null);

//   const connect = () => {
//     // 연결할 때
//     client.current = new StompJs.Client({
//       brokerURL: 'ws://localhost/kk-stomp-ex',
//       // onConnect: () => subscribe(), // 연결 성공 시 구독하는 로직 실행
//     });
//     client.current.activate(); // 클라이언트 활성화
//   };

//   const disconnect = () => {
//     // 연결이 끊겼을 때
//     client.current.deactivate();
//   };

//   const subscribe = (value) => {
//     room.current = client.current.subscribe(`/topic/${value}`, (chat) => {
//       setMessages((prev) => [...prev, JSON.parse(chat.body)]);
//     });
//   };

//   const onMessageSend = () => {
//     client.current.publish({
//       destination: `/app/hello/${chatRoomId}`,
//       body: JSON.stringify({ message: message }),
//     });
//   };

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, []);

//   return (
//     <div>
//       <h2>나는 지금까지 들어간 채팅방 목록이야</h2>
//       {joinedRoom.map((room) => {
//         return (
//           <>
//             <div key={room.id} onClick={() => onJoinedRoomClicked(room.id)}>
//               <h3>{room.id}</h3>
//               <p>{room.name}</p>
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// }

// export default ChatTalkRoom;
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ChatRoom from '../ChatRoom';
import * as StompJs from '@stomp/stompjs';
import React from 'react';

function ChatTalkRoom({ userId, chatRooms }) {
  const [joinedRoom, setJoinedRoom] = useState([]);
  const [newChatRoom, setnewChatRoom] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(0);
  const [message, setMessage] = useState();

  const [messages, setMessages] = useState([]);

  const client = useRef({});
  const room = useRef(null);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/goumunity-chat',
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = (value) => {
    room.current = client.current.subscribe(`/topic/${value}`, (chat) => {
      console.log(chat.body);
      console.log(chat);
      setMessages((prev) => [...prev, JSON.parse(chat.body)]);
    });
  };

  const onMessageSend = () => {
    client.current.publish({
      destination: `/ws/messages/${chatRoomId}`,
      body: JSON.stringify({ content: message, chatType: 'MESSAGE' }),
    });
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const onNewRoomClicked = (id) => {
    axios
      .post(`http://localhost:8080/join/${id}`, null, { withCredentials: true })
      .then((res) => console.log(res));
  };

  const onJoinedRoomClicked = (id) => {
    if (room.current !== null) room.current.unsubscribe();
    setChatRoomId(id);
    subscribe(id);
    setMessage('');
    getMessages();
  };

  const getMessages = () => {
    axios
      .get(`http://localhost:8080/chat/${chatRoomId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setMessages(res.data.contents);
      });
  };

  const onDeactivatedButtonClicked = () => {
    disconnect();
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>응 여긴 로비야</h1>
      <button
        onClick={onDeactivatedButtonClicked}
        className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600'
      >
        갈께...
      </button>
      <div className='flex space-x-5'>
        <div className='space-y-4'>
          <h2 className='text-xl font-bold'>
            나는 지금까지 들어간 채팅방 목록이야
          </h2>
          {chatRooms?.contents?.map((room) => (
            <div
              key={room.chatRoomId}
              onClick={() => onJoinedRoomClicked(room.chatRoomId)}
              className='cursor-pointer'
            >
              <h3>{room.id}</h3>
              <p>{room.title}</p>
            </div>
          ))}
        </div>
        <div className='space-y-4'>
          {/* <h2 className='text-xl font-bold'>
            나는 들어갈 수 있는 채팅방 목록이야
          </h2> */}
          {/*{newChatRoom.map(room => (*/}
          {/*    <div key={room.id} onClick={() => onNewRoomClicked(room.id)} className="cursor-pointer">*/}
          {/*        <h3>{room.id}</h3>*/}
          {/*        <p>{room.name}</p>*/}
          {/*    </div>*/}
          {/*))}*/}
        </div>
        <div className='space-y-4'>
          <ChatRoom
            userId={userId}
            chatRoomId={chatRoomId}
            messages={messages}
            message={message}
            setMessage={setMessage}
            sendMessage={onMessageSend}
          />
        </div>
      </div>
    </>
  );
}

export default ChatTalkRoom;
