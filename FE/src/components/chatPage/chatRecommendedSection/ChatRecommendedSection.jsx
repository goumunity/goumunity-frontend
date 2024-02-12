import ChatRecommendedItem from './ChatRecommendedItem';
import './ChatRecommendedItem.css';
import SearchIcon from '../../common/SearchIcon';
import { useEffect, useState } from 'react';
import instance from '@/utils/instance.js';

function ChatRecommendedSection({ setMyChatRooms, myChatRooms }) {
  const [userInput, setUserInput] = useState('');
  const [items, setItems] = useState([]);

  const onSearchItem = () => {
    instance
      .get(
        `/api/chat-rooms/search?keyword=${userInput}&page=0&size=12&time=${new Date().getTime()}`
      )
      .then((res) => {
        console.log(res.data);
        setItems(res.data.contents);
      });
  };

  useEffect(() => {
    onSearchItem();
  }, []);

  return (
    <div className='scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll'>
      <div className='cards'>
        <div className='flex font-her justify-center  p-4'>
          <input
            type='text'
            placeholder='검색어를 입력해봐~'
            className='p-4 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-3xl w-1/3'
            style={{
              borderRadius: '1.3rem 0 0 1.3rem',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <div
            className='p-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl w-20
                    hover:cursor-pointer'
            style={{
              borderRadius: '0 1.3rem  1.3rem 0',
              backgroundColor: 'rgba(0,0,0,0)',
            }}
            onClick={onSearchItem}
          >
            <SearchIcon />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-10 p-10'>
          {items.map((item) => (
            <>
              <ChatRecommendedItem
                item={item}
                setMyChatRooms={setMyChatRooms}
                myChatRooms={myChatRooms}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatRecommendedSection;
