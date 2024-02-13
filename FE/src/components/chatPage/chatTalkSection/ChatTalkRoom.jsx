import React, {useCallback, useEffect, useRef, useState} from "react";

import {useSelector} from 'react-redux';
import ChatMessage from "@/components/chatPage/chatTalkSection/ChatMessage.jsx";
import instance from "@/utils/instance.js";
import {imageUpload} from "@/utils/upload.js";
import handleError from "@/utils/error.js";

function ChatTalkRoom({ userId, chatRoomId,setMessages, onMessageSend, messages }) {
  const [msg, setMsg] = useState('');
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [searchTime, setSearchTime] = useState(new Date().getTime());
  const [profileImage, setProfileImage] = useState('');
  const [resultImage, setResultImage] = useState(null);



  const messagesContainerRef = useRef(null);
  const lastMessageRef = useRef();
  const fileUploader = useRef();

  const onMessageChanged = (e) => {
    setMsg(e.target.value);
  };
  useEffect(() => {
    setMsg('');
  }, [chatRoomId]);

  //메세지 쌓이면 스크롤바가 가장 맨 아래에 오도록 함
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(msg === '') return;
      onMessageSend(e.target.value, 'MESSAGE');
      setMsg('');
    }
  };
  const handleSendButtonClicked = () => {
    if(msg === '' && profileImage==='') return;
    if (profileImage) {
      onMessageSend(profileImage, 'IMAGE');
      setProfileImage('');
    } else {
      onMessageSend(msg, 'MESSAGE');
    }
    setMsg('');
  }
  const lastChatRoomRef = useCallback(
      (node) => {
        if (isLoading) return;
        if (lastMessageRef.current) lastMessageRef.current.disconnect();
        lastMessageRef.current = new IntersectionObserver((entries) => {
          console.log('entries[0].isIntersecting : ', entries[0].isIntersecting);
          if (entries[0].isIntersecting && hasNext) {
            setPageNum((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) lastMessageRef.current.observe(node);
      },
      [isLoading, hasNext]
  );
  const fetchChatRoomData = async () => {
    try{
      setIsLoading(true)
      const res = await instance.get(`/api/chat-room/${chatRoomId}/messages?page=${pageNum}&size=10&time=${searchTime}`);
      setHasNext(res.data.hasNext);
      setMessages(prev => [...res.data.contents.reverse(), ...prev]);
    }catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchChatRoomData();
  }, [pageNum]);

  const handleChangeUploadProfileImg = async (e) => {

    const uploadFile = imageUpload(e.target, setProfileImage);
    console.log(uploadFile);
    let formData = new FormData();
    formData.append('image', uploadFile[0]);
    try{
      const res = await instance.post(`/api/common/images`, formData);
      setProfileImage(res.data.imageSource);
    }catch (e) {
      handleError(e);
    }
  };

  return (
    <>
      {/*<div className={'h-screen'}>*/}
      {/*<div className='flex space-x-5 '></div>*/}
      <div className='flex flex-col h-96'>
        <div
          ref={messagesContainerRef}
          className=' flex  flex-col scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll items-center  justify-center'
        >
          <div className='w-full flex flex-col'>
            <div ref={lastChatRoomRef}></div>
            {messages?.map((m, index) => {
              return (
                  <>
                    <div className='mt-3 mb-3'>
                      <ChatMessage message={m} index={index} currentUser={currentUser} />
                    </div>
                  </>
              );
            })}
          </div>
        </div>
      </div>
      <div className='border flex justify-between items-center pb-0 grow-0'>
        <input style={{display : "none"}}
               ref={fileUploader}
               type={"file"}
               accept={'image/**'}
               onChange={handleChangeUploadProfileImg}
        />
        <i onClick={() => fileUploader.current.click()} className='fa-solid fa-circle-plus fa-xl hover:cursor-pointer ml-10'></i>
        {profileImage ?
            <div className={'w-4/5   font-her p-4 border-entrance border-r border'}>
              <img src={profileImage} className={'object-contain rounded w-1/5'}/>
            </div>
            :
            <input
                className='w-4/5  font-her p-4 border-entrance border-r border'
                placeholder='메세지를 입력해주세요...'
                type={'text'}
                value={msg}
                onChange={(e) => onMessageChanged(e)}
                onKeyDown={handleOnKeyPress}
            />
        }
        <span className='mr-10'>
          <button
              type={'button'}
              onClick={handleSendButtonClicked}
          >
            <i className="fa-solid fa-location-arrow fa-xl hover:cursor-pointer"></i>
            {/*입력*/}
          </button>
        </span>
      </div>
    </>
  );
}

export default ChatTalkRoom;
