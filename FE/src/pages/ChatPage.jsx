import {useCallback, useEffect, useRef, useState} from 'react';
import background from '@/assets/images/background.png';
import ChatMySection from '../components/chatPage/chatMySection/ChatMySection';
import ChatTalkSection from '../components/chatPage/chatTalkSection/ChatTalkSection';
import ChatRecommendedSection from '../components/chatPage/chatRecommendedSection/ChatRecommendedSection';
import * as StompJs from "@stomp/stompjs";
import instance from "@/utils/instance.js";

function ChatPage() {
    const [isSearchMode, setIsSearchMode] = useState(true);
    const [chatRoomId, setChatRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [myChatRooms, setMyChatRooms] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef();
    const [searchTime, setSearchTime] = useState(new Date().getTime());

    const handleClickMySection = () => {
        setIsSearchMode(false);
    };

    const client = useRef({});
    const room = useRef(null);
    const logId = useRef();
    const fetchChatRoomData = async () => {
        try{
            setIsLoading(true)
            const res = await instance.get(`/api/users/my/chat-rooms?page=${pageNum}&size=100&time=${searchTime}`);
            setHasNext(res.data.hasNext);
            setMyChatRooms(prev => [...prev, ...res.data.contents]);
        }catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'wss://i10a408.p.ssafy.io/api/goumunity-chat',
            onConnect : resubscribe
        });
        client.current.activate();
    };
    const disconnect = async () => {
        console.log("disconnect!", chatRoomId)
        await logLastAccessTime();
        client.current.deactivate();
    };

    const logLastAccessTime = async () => {
        if(!logId.current)
            return;
        const res = await instance.patch(`/api/chat-rooms/${logId.current}/disconnect`);
    }

    const resubscribe = () => {
        if (chatRoomId !== null) {
            room.current = client.current.subscribe(`/topic/${chatRoomId}`, (chat) => {
                setMessages((prev) => [...prev, JSON.parse(chat.body)]);
            });
        }
    }

    const subscribe = (value) => {
        room.current = client.current.subscribe(`/topic/${value}`, (chat) => {
            setMessages((prev) => [...prev, JSON.parse(chat.body)]);
        });
    };

    const onMessageSend = (message) => {
        console.log(message)
        client.current.publish({
            destination: `/ws/messages/${chatRoomId}`,
            body: JSON.stringify({content: message, chatType: 'MESSAGE'}),
        });
    };
    const onJoinedRoomClicked = (id) => {
        if (room.current !== null) room.current.unsubscribe();
        if(id !== logId.current)
            logLastAccessTime();
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
                console.log('entries[0].isIntersecting : ', entries[0].isIntersecting);
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

    return (
        <div className='flex w-full h-full'>
            <div className='w-1/6 bg-yellow'>
                <ChatMySection
                    refCallback={lastChatRoomRef}
                    myChatRooms={myChatRooms}
                    setMyChatRooms={setMyChatRooms}
                    handleJoinChatRoom={onJoinedRoomClicked}
                    handleClickMySection={handleClickMySection}
                    isLoaded={isSearchMode}
                />
            </div>
            <div
                className='w-5/6'
            >
                <div className=' divide-x divide-entrance'>
                    <span></span>
                    <div>
                        {isSearchMode ? (
                            <ChatRecommendedSection
                                myChatRooms={myChatRooms}
                                setMyChatRooms={setMyChatRooms}
                            />
                        ) : (
                            <ChatTalkSection id={chatRoomId}
                                             onMessageSend={onMessageSend}
                                             messages={messages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
