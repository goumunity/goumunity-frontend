

import { useState,useEffect } from "react";
import Modal from "../components/common/Modal/Modal";
import { Map } from "react-kakao-maps-sdk";
import ProfileImageSection from "../components/ProfilePage/ProfileImageSection";
import LeftSide from "../components/NewLandingPage/LeftSide";
import ChatRoom from "../components/chatPage/ChatRoom";

const TestPage = () => {
  return (
    <>
    <div>
      <span></span>
      <div className='divide-y  divide-entrance'>
        <div className='font-daeam text-4xl text-center mb-4 text-responsive'>
          나의 거지챗
        </div>
        {chatData.map((value, index) => {
        return (
          <div>
            <button
              key={value.idx}
              // className='hover:rotate-12  hover:bg-orange-200'
              onClick={() => {
                handleButtonClick(value.chatRoomId);
              }}
            >
              <div
                className='flex'
                key={index}
                onClick={() => {
                  setId(value.chatRoomId);
                }}
              >
                <div className='w-1/4 mt-3'>
                  <span>
                    <img alt=""/>
                  </span>
                </div>
                <div className='w-3/4 h-30'>
                  <div>
                    <span className='font-bold text-responsive text-2xl'>
                      <div className='flex justify-end  w-full'>
                        {/* <CloseButton
                          className='top-5 right-5 hover:bg-amber-300'
                          onClick={handleRemoveChat(value.chatRoomId)}
                        /> */}
                      </div>
                      제목
                    </span>
                    <span> 👤{value.currentUserCount}</span>
                    <span> 💬{value.unreadMessageCount}</span>
                  </div>
                  <div className='mt-1'></div>
                  <div>
                    <ul
                      className='flex text-responsive font-her'
                      style={{ flexWrap: 'wrap' }}
                    >
                      {value.hashtags.map((name, hashtagsIndex) => (
                        <li
                          className='pr-2'
                          key={hashtagsIndex}
                        >{`#${value.hashtags[hashtagsIndex].name}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </button>
          </div>
        );
      })}
        <div>
          <div className='flex flex-col items-center'>
            <button
              className='font-her text-2xl text-center text-white px-4 py-2 bg-transparent rounded-md'
              onClick={handleClickCreateChatRoom}
            >
              <div className='mx-auto rounded-full bg-gray-500 text-black'>
                ...
              </div>
              <span className='text-black'>+채팅방 개설하기</span>
            </button>
            {isModalOpen && modalOption === 'createChat' && (
              <CustomModal>
                <ChatRoomModal />
              </CustomModal>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TestPage;
