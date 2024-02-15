import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import ChatMessage from '@/components/chatPage/chatTalkSection/ChatMessage.jsx';
import instance from '@/utils/instance.js';
import { imageUpload } from '@/utils/upload.js';
import handleError from '@/utils/error.js';
import Swal from 'sweetalert2';

function ChatTalkRoom({
  userId,
  chatRoomId,
  setMessages,
  onMessageSend,
  messages,
}) {
  const [msg, setMsg] = useState('');
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [searchTime, setSearchTime] = useState(new Date().getTime());
  const [profileImage, setProfileImage] = useState('');
  const [tempImage, setTempImage] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775);
  const [isMini, setIsMini] = useState(window.innerWidth <= 400);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const currentUser = useSelector((state) => state.auth.currentUser);

  const messagesContainerRef = useRef(null);
  const lastMessageRef = useRef();
  const fileUploader = useRef();

  const onMessageChanged = (e) => {
    setMsg(e.target.value);
  };
  useEffect(() => {
    setMsg('');
    setMessages([]);
    setHasNext(true);
    setPageNum(-1);
    setSearchTime(new Date().getTime());
    setProfileImage('');
  }, [chatRoomId]);

  //메세지 쌓이면 스크롤바가 가장 맨 아래에 오도록 함
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (msg === '') return;
      onMessageSend(e.target.value, 'MESSAGE');
      setMsg('');
    }
  };
  const handleSendButtonClicked = () => {
    if (msg === '' && profileImage === '') return;
    if (profileImage) {
      onMessageSend(profileImage, 'IMAGE');
    } else {
      onMessageSend(msg, 'MESSAGE');
    }
    setProfileImage('');
    setMsg('');
  };
  const lastChatRoomRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (lastMessageRef.current) lastMessageRef.current.disconnect();
      lastMessageRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPageNum((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) lastMessageRef.current.observe(node);
    },
    [isLoading, hasNext]
  );
  const fetchChatRoomData = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get(
        `/api/chat-room/${chatRoomId}/messages?page=${pageNum}&size=10&time=${searchTime}`
      );
      setHasNext(res.data.hasNext);
      setMessages((prev) => [...res.data.contents.reverse(), ...prev]);
    } catch (error) {
    
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChatRoomData();
  }, [pageNum]);

  const handleChangeUploadProfileImg = async (event) => {
    const uploadFile = imageUpload(event.target, setTempImage);
    let formData = new FormData();
    formData.append('image', uploadFile[0]);
    try {
      const res = await instance.post(`/api/common/images`, formData);
      setProfileImage(res.data.imageSource);
    } catch (e) {
      handleError(e);
    }
    event.target.value = '';
  };

  const handleImageDeleteButtonClicked = () => {
    setProfileImage('');
  };

  return (
    <>
      <div
        className='flex flex-col'
        style={{ height: isMobile ? '600px' : '82vh' }}
      >
        <div
          className={` flex  flex-col scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll items-center  justify-center}`}
          style={{ height: isMobile ? '600px' : '' }}
        >
          <div
            className='w-full flex flex-col overflow-y-scroll'
            ref={messagesContainerRef}
          >
            <div ref={lastChatRoomRef} className='h-10'></div>
            {messages?.map((m, index) => {
              return (
                <div className='mt-3 mb-3'>
                  <ChatMessage
                    message={m}
                    index={index}
                    currentUser={currentUser}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={'border'} style={{ height: isMobile ? '' : '10vh' }}>
        {profileImage ? (
          <div className={'w-20 rounded p-1  flex'}>
            <img src={profileImage} className={'object-contain rounded'} />
            <i
              className='ml-1 fa-regular fa-circle-xmark hover:cursor-pointer hover:text-red-500'
              onClick={handleImageDeleteButtonClicked}
            />
          </div>
        ) : (
          ''
        )}
        <div className='flex border justify-between items-center pb-0 grow-0 '>
          <input
            style={{ display: 'none' }}
            ref={fileUploader}
            type={'file'}
            accept={'image/**'}
            onChange={handleChangeUploadProfileImg}
          />
          <div className={'flex-grow flex justify-center h-full'}>
            <i
              onClick={() => fileUploader.current.click()}
              className='fa-solid fa-circle-plus fa-xl hover:cursor-pointer '
            ></i>
          </div>

          <input
            className='w-4/5  font-medium p-4 border-entrance border-r border'
            placeholder='메세지를 입력해주세요...'
            type={'text'}
            value={!profileImage ? msg : ''}
            readOnly={profileImage}
            onChange={(e) => onMessageChanged(e)}
            onKeyDown={handleOnKeyPress}
          />

          <div className={`flex-grow flex justify-center `}>
            <button
              type={'button'}
              className={'h-full'}
              onClick={handleSendButtonClicked}
            >
              <i
                className={`fa-solid fa-location-arrow fa-xl hover:cursor-pointer `}
              ></i>
              {/*입력*/}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatTalkRoom;
