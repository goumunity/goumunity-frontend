import ChatRecommendedItem from './ChatRecommendedItem';
import './ChatRecommendedItem.css';
import redBoy from '@/assets/images/redBoy.jpg';
import SearchIcon from '../../common/SearchIcon';
import {useState} from 'react';
import client from "@/utils/client.js";
import axios from "axios";

function ChatRecommendedSection() {
  const [userInput, setUserInput] = useState('');
  const [items, setItems] = useState([]);

  const searched = items.filter(
    (item) =>
      item.title.includes(userInput) ||
      item.hashtags.data.name.includes(userInput)
  );


  const onSearchItem = () => {

      axios.get(`https://i10a408.p.ssafy.io/temp/api/chat-rooms/search?keyword=ㅎ&page=0&size=12&time=${new Date().getTime()}`)
          .then(res => {
              console.log(res.data)
              setItems(res.data.contents)
          })

  }

  console.log('Searched Items:', searched);
  return (
    <div className='cards'>
      <div className='flex font-her justify-center bg-gray-100 p-4'>
        <input
          type='text'
          placeholder='검색어를 입력해봐~'
          className='p-4 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl w-1/3'
          style={{
            borderRadius: '1.3rem 0 0 1.3rem',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />

        <div
          className='p-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl w-20'
          style={{
            borderRadius: '0 1.3rem  1.3rem 0',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
          onClick={onSearchItem}
        >
          <SearchIcon />
        </div>
      </div>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <div className='cards__items'>
            <ChatRecommendedItem
              src={redBoy}
              userInput={userInput}
              setUserInput={setUserInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRecommendedSection;
