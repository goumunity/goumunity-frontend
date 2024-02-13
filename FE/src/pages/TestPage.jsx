

import { useState,useEffect } from "react";
import Modal from "../components/common/Modal/Modal";
import { Map } from "react-kakao-maps-sdk";
import ProfileImageSection from "../components/ProfilePage/ProfileImageSection";
import LeftSide from "../components/NewLandingPage/LeftSide";
import ChatRoom from "../components/chatPage/ChatRoom";
import FeedRanking from "../components/homePage/Ranking/FeedRanking";
import MiniNavBar from "../components/common/MiniNavBar";
import MobileNavBar from "../components/common/MobileNavBar";
import MobileDetailModal from "../components/homePage/detailModal/MobileDetailModal";
const TestPage = () => {
  const person = {
    'imageUrl' : '123',
    'url' : '123',
    'name' : 'name',
    'title' : 'title',
    'phone' : 'phone',
  }
  return (
    <>
    {/* <div>
      <span></span>
      <div classNameNameName='divide-y  divide-entrance'>
        <div classNameNameName='font-daeam text-4xl text-center mb-4 text-responsive'>
          나의 거지챗
        </div>
        {chatData.map((value, index) => {
        return (
          <div>
            <button
              key={value.idx}
              // classNameNameName='hover:rotate-12  hover:bg-orange-200'
              onClick={() => {
                handleButtonClick(value.chatRoomId);
              }}
            >
              <div
                classNameNameName='flex'
                key={index}
                onClick={() => {
                  setId(value.chatRoomId);
                }}
              >
                <div classNameNameName='w-1/4 mt-3'>
                  <span>
                    <img alt=""/>
                  </span>
                </div>
                <div classNameNameName='w-3/4 h-30'>
                  <div>
                    <span classNameNameName='font-bold text-responsive text-2xl'>
                      <div classNameNameName='flex justify-end  w-full'>

                      </div>
                      제목
                    </span>
                    <span> 👤{value.currentUserCount}</span>
                    <span> 💬{value.unreadMessageCount}</span>
                  </div>
                  <div classNameNameName='mt-1'></div>
                  <div>
                    <ul
                      classNameNameName='flex text-responsive font-her'
                      style={{ flexWrap: 'wrap' }}
                    >
                      {value.hashtags.map((name, hashtagsIndex) => (
                        <li
                          classNameNameName='pr-2'
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
          <div classNameNameName='flex flex-col items-center'>
            <button
              classNameNameName='font-her text-2xl text-center text-white px-4 py-2 bg-transparent rounded-md'
              onClick={handleClickCreateChatRoom}
            >
              <div classNameNameName='mx-auto rounded-full bg-gray-500 text-black'>
                ...
              </div>
              <span classNameNameName='text-black'>+채팅방 개설하기</span>
            </button>
            {isModalOpen && modalOption === 'createChat' && (
              <CustomModal>
                <ChatRoomModal />
              </CustomModal>
            )}
          </div>
        </div>
      </div>
    </div> */}
      {/* <div className="w-full h-screen bg-bg flex justify-center">
        content
      </div>
       */}
      <MobileDetailModal/>
    </>
  );
};

export default TestPage;
