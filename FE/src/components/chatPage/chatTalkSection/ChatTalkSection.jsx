import React, {useEffect, useState} from 'react';
import ChatTalkRoom from './ChatTalkRoom';
import instance from '@/utils/instance.js';
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import handleError from "@/utils/error.js";
import CustomModal from "@/components/common/CustomModal.jsx";
import ChatRoomCreateModal from "@/components/chatPage/chatRoomModal/ChatRoomCreateModal.jsx";
import {modalActions} from "@/store/modal.js";
import ChatRoomDetailModal from "@/components/chatPage/chatRoomModal/ChatRoomDetailModal.jsx";

function ChatTalkSection({id, onMessageSend, messages, setIsSearchMode}) {
    // const [initSize, setInitSize] = useState({widthSize: 467, heigthSize: 800});

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
    }, [id]);

    const onCloseButtonClicked = async () => {
        await instance.patch(`/api/chat-rooms/${id}/disconnect`);
        setIsSearchMode(true);
    }

    const onExitButtonClicked = () => {
        Swal.fire(
            {
                title: "나가시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "네",
                cancelButtonText: `아니요`,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
            }
        ).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/api/chat-rooms/${id}`)
                    .catch(error => {
                        handleError(error)
                    })
            }
        });
    }

    const onSettingButtonClicked = () => {
        dispatch(modalActions.openChatRoomDetailModal());
    }

    return (
        <div>
                <div className='flex items-center justify-between p-3 border-b-2 relative'>
                    <div>
                        {selectedChatRoom?.title}
                    </div>
                    <div className='flex justify-between items-center  pr-3 '>
                        <i className="fa-solid fa-gear pr-3 hover:cursor-pointer" onClick={onSettingButtonClicked}/>
                        <i className='fa-solid fa-xmark pr-3 hover:cursor-pointer' onClick={onCloseButtonClicked}/>
                    </div>
                </div>

            <ChatTalkRoom
                chatRoomId={id}
                onMessageSend={onMessageSend}
                messages={messages}
            />

            {isModalOpen && modalOption === 'detailChat' && (
                <CustomModal initSize={{widthSize:467, heightSize:650}}>
                    <ChatRoomDetailModal setIsSearchMode={setIsSearchMode} selectedChatRoom={selectedChatRoom} setSelectedChatRoom={setSelectedChatRoom}/>
                </CustomModal>
            )}
        </div>
    );
}

export default ChatTalkSection;