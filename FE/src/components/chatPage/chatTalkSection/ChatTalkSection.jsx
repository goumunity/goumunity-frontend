import React, {useCallback, useEffect, useState} from 'react';
import ChatTalkRoom from './ChatTalkRoom';
import instance from '@/utils/instance.js';
import {useDispatch, useSelector} from "react-redux";
import CustomModal from "@/components/common/CustomModal.jsx";
import {modalActions} from "@/store/modal.js";
import ChatRoomDetailModal from "@/components/chatPage/chatRoomModal/ChatRoomDetailModal.jsx";

function ChatTalkSection({id, chatRoomTitle, onMessageSend,setMessages, messages, myChatRooms, setIsSearchMode, setMyChatRooms}) {

    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const modalOption = useSelector((state) => state.modal.modalOption);
    const dispatch = useDispatch();


    const [selectedChatRoom, setSelectedChatRoom] = useState(null);


    const fetchChatRoomDetails = async () => {
        try {
            const res = await instance.get(`/api/chat-rooms/${id}/detail`);
            console.log(res.data)
            setSelectedChatRoom(res.data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchChatRoomDetails();
    }, [id, myChatRooms]);

    const onCloseButtonClicked = async () => {
        await instance.patch(`/api/chat-rooms/${id}/disconnect`);
        setIsSearchMode(true);
    }


    const onSettingButtonClicked = () => {
        dispatch(modalActions.openChatRoomDetailModal());
    }


    return (
        <div>
            <div className='flex items-center justify-between p-3 border-b-2 relative'>
                <div>
                    {/*{selectedChatRoom?.title}*/}
                    {chatRoomTitle}
                </div>
                <div className='flex justify-between items-center  pr-3 '>
                    <i className="fa-solid fa-gear pr-3 hover:cursor-pointer" onClick={onSettingButtonClicked}/>
                    <i className='fa-solid fa-xmark pr-3 hover:cursor-pointer' onClick={onCloseButtonClicked}/>
                </div>
            </div>
            <ChatTalkRoom
                setMessages={setMessages}
                chatRoomId={id}
                onMessageSend={onMessageSend}
                messages={messages}
            />
            {isModalOpen && modalOption === 'detailChat' && (
                <CustomModal>
                    <ChatRoomDetailModal
                        myChatRooms={myChatRooms}
                        setMyChatRooms={setMyChatRooms}
                        setIsSearchMode={setIsSearchMode}
                        selectedChatRoom={selectedChatRoom}
                        setSelectedChatRoom={setSelectedChatRoom}/>
                </CustomModal>
            )}
        </div>
    );
}

export default ChatTalkSection;