import React from 'react';

function ChatTalkRoom() {
  const [joinedRoom, setJoinedRoom] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(0);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const client = useRef({});
  const room = useRef(null);

  const connect = () => {
    // 연결할 때
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost/kk-stomp-ex',
      // onConnect: () => subscribe(), // 연결 성공 시 구독하는 로직 실행
    });
    client.current.activate(); // 클라이언트 활성화
  };

  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
  };

  const subscribe = (value) => {
    room.current = client.current.subscribe(`/topic/${value}`, (chat) => {
      setMessages((prev) => [...prev, JSON.parse(chat.body)]);
    });
  };

  const onMessageSend = () => {
    client.current.publish({
      destination: `/app/hello/${chatRoomId}`,
      body: JSON.stringify({ message: message }),
    });
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div>
      <h2>나는 지금까지 들어간 채팅방 목록이야</h2>
      {joinedRoom.map((room) => {
        return (
          <>
            <div key={room.id} onClick={() => onJoinedRoomClicked(room.id)}>
              <h3>{room.id}</h3>
              <p>{room.name}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ChatTalkRoom;
