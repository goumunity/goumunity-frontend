

import { useState,useEffect } from "react";
import Modal from "../components/common/Modal/Modal";
import { Map } from "react-kakao-maps-sdk";
import ProfileImageSection from "../components/ProfilePage/ProfileImageSection";
import LeftSide from "../components/NewLandingPage/LeftSide";
import ChatRoom from "../components/chatPage/ChatRoom";

const TestPage = () => {
  return (
    <>

<h1 className='font-daeam text-2xl'>채팅방 개설하기</h1>
      <form >
        <div className='text-start font-her text-2xl'>*채팅방 제목 </div>
        <div className='content-start pb-3'>
          <input
            className='bg-transparent w-full border-b font-her'
            placeholder='방제 입력하기'
            
          />
        </div>
        {/* <UserInput
          label='채팅방 이름'
          id='title'
          type='title'
          value={userInputs.title}
          onBlur={() => {
            handleBlurFoucusOffInput('title');
          }}
          onChange={(e) => handleChangeInputs('title', e.target.value)}
        /> */}
        <div className='font-her text-left text-2xl'>*해시태그 설정하기</div>
        <div className='flex'>
          {/* {hashtag.map((value, index) => {
            return (
              <>
                <HashTag>
                  {value}
                  <span
                    className='w-20 bg-transparent'
                    type='text'
                    value={newHashtag}
                  />
                </HashTag>
              </>
            );
          })} */}
          {/* <HashTag>
            <input
              className='w-20 bg-transparent'
              placeholder='#입력'
              id='hashtag'
              type='text'
              value={userInputs.hashtag}
              // onChange={(e) => setNewHashtag(e.target.value)}
              onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
            />
          </HashTag> */}


        </div>
        {/* <button className='font-paci border border-dashed rounded-2xl pr-2 pl-2'></button> */}
        <div className='flex font-her justify-center bg-gray-100 p-2 '>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            지역
          </div>

          {/* <SelectBox
            className='px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center flex-grow'
            widthSize={96}
            onChange={(e) => handleChangeInputs('regionId', e.target.value)}
          /> */}
        </div>
        <div className='flex font-her justify-center bg-gray-100 p-2'>
          <div
            type='text'
            className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-2xl w-1/3'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
          >
            인원수
          </div>

          <ul className=' px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center'>
            <input
              className='bg-transparent h-full text-center'
              type='number'
              min='1'

            />
            <span>명</span>
          </ul>
        </div>

        <div className='border rounded-xl font-her pt-2 pb-2'>
          채팅방 이미지 추가하기
          <div className='flex justify-center relative text-center '>
            
          </div>
        </div>
        <div className='pt-2'>
          <button>add</button>
        </div>
      </form>



<h1 className='text-2xl font-bold mb-4'>채팅방 ID: </h1>

<input
  type='text'


  className='w-full p-2 border border-gray-300 rounded mb-4'
/>
<button

  className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600'
>
  전송 SOCKET
</button>

    </>
  );
};

export default TestPage;
