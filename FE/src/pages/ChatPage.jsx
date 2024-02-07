import {useEffect, useRef, useState} from 'react';
import background from '@/assets/images/background.png';
import ChatMySection from '../components/chatPage/chatMySection/ChatMySection';
import ChatTalkSection from '../components/chatPage/chatTalkSection/ChatTalkSection';
import ChatRecommendedSection from '../components/chatPage/chatRecommendedSection/ChatRecommendedSection';
import * as StompJs from "@stomp/stompjs";
import axios from "axios";

function ChatPage() {
    const [isLoaded, setIsLoaded] = useState(true);
    const [chatRoomId, setChatRoomId] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleClickMySection = () => {
        setIsLoaded(!isLoaded);
    };

    const client = useRef({});
    const room = useRef(null);


    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'wss://i10a408.p.ssafy.io/temp/goumunity-chat',
            // brokerURL: 'ws://localhost:8080/goumunity-chat',
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

    const onMessageSend = (message) => {
        console.log(message)
        client.current.publish({
            destination: `/ws/messages/${chatRoomId}`,
            body: JSON.stringify({content: message, chatType: 'MESSAGE'}),
        });
    };

    useEffect(() => {
        connect();
        return () => disconnect();
    }, []);

    const onNewRoomClicked = (id) => {
        axios
            .post(`http://localhost:8080/join/${id}`, null, {withCredentials: true})
            .then((res) => console.log(res));
    };

    const onJoinedRoomClicked = (id) => {
        if (room.current !== null) room.current.unsubscribe();
        console.log(id)
        setChatRoomId(id);
        subscribe(id);
        setMessages([]);
    };

    return (
        <div className='flex w-full h-full'>
            <div className='w-1/6 bg-yellow'>
                <ChatMySection
                    handleJoinChatRoom={onJoinedRoomClicked}
                    handleClickMySection={handleClickMySection}
                    isLoaded={isLoaded}
                />
            </div>
            <div
                className='w-5/6'
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                }}
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
