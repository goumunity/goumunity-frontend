import { useCallback, useEffect, useRef, useState } from 'react';
import ChatMySection from '../components/chatPage/chatMySection/ChatMySection';
import ChatTalkSection from '../components/chatPage/chatTalkSection/ChatTalkSection';
import ChatRecommendedSection from '../components/chatPage/chatRecommendedSection/ChatRecommendedSection';
import * as StompJs from '@stomp/stompjs';
import instance from '@/utils/instance.js';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../store/chat';

function ChatPage() {
  const [isSearchMode, setIsSearchMode] = useState(true);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRoomName, setChatRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [myChatRooms, setMyChatRooms] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(new Date().getTime());
  const observerRef = useRef();
  const [hashtags, setHashTags ] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 400);
  const isVisible = useSelector((state) => state.chat.isVisible);
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch( chatActions.init() );
  },[])
  useEffect(() => {
    const handleResize = () => {
      // console.log('width ', window.innerWidth);
      setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 775 );
      setIsMini(window.innerWidth <= 400);
      
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickMySection = () => {
    setIsSearchMode(false);
  };

  const handleSearchMode = () => {
    setIsSearchMode(true);
  };

  const client = useRef({});
  const room = useRef(null);
  const logId = useRef();
  const fetchChatRoomData = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get(
        `/api/users/my/chat-rooms?page=${pageNum}&size=100&time=${searchTime}`
      );
      setHasNext(res.data.hasNext);
      setMyChatRooms((prev) => [...prev, ...res.data.contents]);
    } catch (error) {
    }
    setIsLoading(false);
  };
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'wss://i10a408.p.ssafy.io/api/goumunity-chat',
      // brokerURL: 'ws://localhost:8080/goumunity-chat',
      onConnect: resubscribe,
    });
    client.current.activate();
  };
  const disconnect = async () => {
    await logLastAccessTime();
    client.current.deactivate();
  };

  const logLastAccessTime = async () => {
    if (!logId.current) return;
    const res = await instance.patch(
      `/api/chat-rooms/${logId.current}/disconnect`
    );
  };

  const resubscribe = () => {
    if (chatRoomId !== null) {
      room.current = client.current.subscribe(
        `/topic/${chatRoomId}`,
        (chat) => {
          setMessages((prev) => [...prev, JSON.parse(chat.body)]);
        }
      );
    }
  };

  const subscribe = (value) => {
    room.current = client.current.subscribe(`/topic/${value}`, (chat) => {
      setMessages((prev) => [...prev, JSON.parse(chat.body)]);
    });
  };

  const onMessageSend = (message, chatType) => {
    client.current.publish({
      destination: `/ws/messages/${chatRoomId}`,
      body: JSON.stringify({ content: message, chatType: chatType }),
    });
  };
  const onJoinedRoomClicked = (id) => {
    if (logId.current === id) return;
    if (room.current !== null) room.current.unsubscribe();
    if (id !== logId.current) logLastAccessTime();
    setHashTags(myChatRooms.find((room) => room.chatRoomId === id).hashtags );
    setChatRoomName(myChatRooms.find((room) => room.chatRoomId === id).title);
    setChatRoomId(id);
    subscribe(id);

    logId.current = id;
    setMessages([]);
  };
  useEffect(() => {
    connect();
    return async () => disconnect();
  }, []);

  const lastChatRoomRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPageNum((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNext]
  );
  useEffect(() => {
    fetchChatRoomData();

  }, [pageNum]);

  //외부 스크롤 막음
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  

  

  return (
    <div className={ isMobile ? `flex flex-col w-full h-full` : `flex w-full h-full pl-10`}>
      <ChatMySection
        refCallback={lastChatRoomRef}
        myChatRooms={myChatRooms}
        setMyChatRooms={setMyChatRooms}
        handleJoinChatRoom={onJoinedRoomClicked}
        handleClickMySection={handleClickMySection}
        isLoaded={isSearchMode}
      />
      <div className={ isMobile ? `w-full`:`w-5/6`}>
        <div className=' divide-x divide-entrance'>
          {isSearchMode ? (
            <ChatRecommendedSection
              myChatRooms={myChatRooms}
              setMyChatRooms={setMyChatRooms}
            />
          ) : (
            <ChatTalkSection
              id={chatRoomId}
              chatRoomTitle={chatRoomName}
              onMessageSend={onMessageSend}
              setMessages={setMessages}
              messages={messages}
              setIsSearchMode={setIsSearchMode}
              setMyChatRooms={setMyChatRooms}
              myChatRooms={myChatRooms}
              hashTags={hashtags}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
