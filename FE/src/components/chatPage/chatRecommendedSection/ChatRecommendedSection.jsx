import ChatRecommendedItem from './ChatRecommendedItem';
import './ChatRecommendedItem.css';
import SearchIcon from '../../common/SearchIcon';
import {useCallback, useEffect, useRef, useState} from 'react';
import instance from '@/utils/instance.js';
import handleError from "@/utils/error.js";

function ChatRecommendedSection({ setMyChatRooms, myChatRooms }) {
  const [userInput, setUserInput] = useState('');

  const observerRef = useRef();
  const [pageNum, setPageNum] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTime, setSearchTime] = useState(new Date().getTime());
  const size = 12;

  const onSearchItem = async () => {
    console.log(pageNum)
    setIsLoading(true)
    try {
      const res = await instance.get(`/api/chat-rooms/search?keyword=${userInput}&page=${pageNum}&size=${size}&time=${searchTime}`);
      setItems(prev => [...prev, ...res.data.contents]);
      setHasNext(res.data.hasNext)
    } catch (err){
      handleError(err);
    }
    setIsLoading(false)
  };

  const lastChatRoomRef = useCallback(
      (node) => {
        if (isLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNext) {
            setPageNum((prevPageNumber) => prevPageNumber + 1);
          }
        });
        if (node) observerRef.current.observe(node);
      },
      [isLoading, hasNext]
  );


  useEffect(() => {
    onSearchItem();
  }, [pageNum]);

  const searchButtonClicked = async () => {
    setIsLoading(true)
    try {
      setSearchTime(new Date().getTime());
      setPageNum(0);
      const res = await instance.get(`/api/chat-rooms/search?keyword=${userInput}&page=0&size=${size}&time=${new Date().getTime()}`);
      setItems(res.data.contents);
      setHasNext(res.data.hasNext);
    } catch (err){
      handleError(err);
    }
    setIsLoading(false);
  }

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
            onClick={searchButtonClicked}
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
        <div ref={lastChatRoomRef}></div>
      </div>
    </div>
  );
}

export default ChatRecommendedSection;
