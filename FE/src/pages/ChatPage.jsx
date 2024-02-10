import {useEffect, useRef, useState} from 'react';
import background from '@/assets/images/background.png';
import ChatMySection from '../components/chatPage/chatMySection/ChatMySection';
import ChatTalkSection from '../components/chatPage/chatTalkSection/ChatTalkSection';
import ChatRecommendedSection from '../components/chatPage/chatRecommendedSection/ChatRecommendedSection';
import * as StompJs from "@stomp/stompjs";
import instance from "@/utils/instance.js";

function ChatPage() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [chatRoomId, setChatRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [myChatRooms, setMyChatRooms] = useState([]);

    const handleClickMySection = () => {
        setIsLoaded(false);
    };

    const client = useRef({});
    const room = useRef(null);
    const fetchChatRoomData = async () => {
        try{
            const res = await instance.get(`/api/users/my/chat-rooms?page=0&size=100&time=${new Date().getTime()}`);
            setMyChatRooms(res.data.contents);
        }catch (error) {
            console.error(error)
        }
    }
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'wss://i10a408.p.ssafy.io/api/goumunity-chat',
            onConnect : resubscribe
        });
        client.current.activate();
    };
    const disconnect = () => {
        client.current.deactivate();
    };

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

    useEffect(() => {
        // connect();
        fetchChatRoomData();
        // return () => disconnect();
    }, []);
    const onJoinedRoomClicked = (id) => {
        if (room.current !== null) room.current.unsubscribe();
        setChatRoomId(id);
        subscribe(id);
        setMessages([]);
    };

    return (
        <div className='flex w-full h-full'>
            <div className='w-1/6 bg-yellow'>
                <ChatMySection
                    myChatRooms={myChatRooms}
                    handleJoinChatRoom={onJoinedRoomClicked}
                    handleClickMySection={handleClickMySection}
                    isLoaded={isLoaded}
                />
            </div>
            <div
                className='w-5/6'
            >
                <div className=' divide-x divide-entrance'>
                    <span></span>
                    <div>
                        {isLoaded ? (
                            <ChatRecommendedSection/>
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
