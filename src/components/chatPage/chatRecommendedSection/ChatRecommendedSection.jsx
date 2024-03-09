import ChatRecommendedItem from './ChatRecommendedItem';
import SearchIcon from '../../common/SearchIcon';
import { useCallback, useEffect, useRef, useState } from 'react';
import instance from '@/utils/instance.js';
import handleError from '@/utils/error.js';
import { useHref } from 'react-router-dom';

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
    setIsLoading(true);
    try {
      const res = await instance.get(
        `/api/chat-rooms/search?keyword=${userInput}&page=${pageNum}&size=${size}&time=${searchTime}`
      );
      setItems((prev) => [...prev, ...res.data.contents]);
      setHasNext(res.data.hasNext);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
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
    setIsLoading(true);
    try {
      setSearchTime(new Date().getTime());
      setPageNum(0);
      const res = await instance.get(
        `/api/chat-rooms/search?keyword=${userInput}&page=0&size=${size}&time=${new Date().getTime()}`
      );
      setItems(res.data.contents);
      setHasNext(res.data.hasNext);
    } catch (err) {
      handleError(err);
    }
    setIsLoading(false);
  };
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1600);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 775 );
  const [isMini, setIsMini] = useState(window.innerWidth <= 400);
  // const [chatRecommendClassName, setChatRecommendClassName] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1280);
      setIsMobile( window.innerWidth <= 775 );
      setIsMini(window.innerWidth <= 400);
      
    };

    

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='scroll h-screen overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-300-y-scroll'>
      <div className='flex justify-center'>
        <div className='flex font-her justify-center border border-gray-300 w-96 h-16 rounded-md overflow-hidden m-8'>
          <input
            type='text'
            placeholder='원하는 채팅방을 찾아봐~'
            className='border border-gray-300 p-2 bg-transparent focus:outline-none focus:border-gray-500 text-xl w-4/5'
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <div
            className='flex justify-center items-center w-1/5 p-4 border border-gray-300 focus:outline-none bg-button focus:border-gray-500 cursor-pointer'
            onClick={searchButtonClicked}
          >
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className='grid chat4:grid-cols-4 chat3:grid-cols-3 chat2:grid-cols-2 place-content-center gap-10 px-10 pb-10'>
      {/* <div className='flex flex-wrap justify-center text-left gap-10 px-10 pb-10'> */}
        {items.map((item, idx) => (
          <ChatRecommendedItem
            key={idx}
            item={item}
            setMyChatRooms={setMyChatRooms}
            myChatRooms={myChatRooms}
          />
        ))}
      </div>
      <div ref={lastChatRoomRef}></div>
    </div>
  );
}

export default ChatRecommendedSection;
