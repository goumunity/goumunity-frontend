import React, {useCallback, useEffect, useState} from 'react';
import ChatTalkRoom from './ChatTalkRoom';
import instance from '@/utils/instance.js';
import {useDispatch, useSelector} from "react-redux";
import CustomModal from "@/components/common/CustomModal.jsx";
import {modalActions} from "@/store/modal.js";
import ChatRoomDetailModal from "@/components/chatPage/chatRoomModal/ChatRoomDetailModal.jsx";
import { chatActions } from '../../../store/chat';

function ChatTalkSection({id, chatRoomTitle, onMessageSend,setMessages, messages, myChatRooms, setIsSearchMode, setMyChatRooms, hashTags}) {

    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const modalOption = useSelector((state) => state.modal.modalOption);
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.chat.isVisible);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 400);
  const toggleVisible = () => {
    setIsVisible( !isVisible );
    console.log( 'isVisible', isVisible );
  }

  useEffect(() => {

    document.getElementById('pos').style.display = isVisible ? '' : 'none';

  },[isVisible])
  
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
        if( isMobile ){
            dispatch( chatActions.toggle() );
        }
    }


    const onSettingButtonClicked = () => {
        dispatch(modalActions.openChatRoomDetailModal());
    }

    const tags = hashTags.map( el => <div className='h-full text-center self-center m-1 text-lg bg-bg border-2 rounded-md p-1'>#{el.name}</div>)


    return (
        <div>
            {/* <div className='flex items-center justify-between p-3 border-b-2 relative'> */}
            <div className='flex items-center justify-between border-b-2 p-3 relative' style={{ height: isMobile ? '' : '10vh'}}>
                <div className='flex flex-row font-daeam'>
                    {/*{selectedChatRoom?.title}*/}
                    <div className="text-3xl  text-center self-center m-1 me-2">{chatRoomTitle}</div>
                    
                    {
                        isMobile ? undefined : tags
                    }
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