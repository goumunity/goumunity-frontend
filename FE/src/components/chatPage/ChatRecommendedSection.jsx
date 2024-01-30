import ChatRecommendedItem from './ChatRecommendedItem.jsx';
import './ChatRecommendedItem.css';
import redBoy from '@/assets/images/redBoy.jpg';
import beggars from '@/assets/images/beggar.jpg';
import SearchIcon from '../common/SearchIcon.jsx';

//chatPage

// ChatMySection
// ChatRecommendedSection
// ChatTalkSection

// ChatSearchBox

//Page - Section ( 1. 왼쪽 2. 오른쪽) - Item (ex : ChatRecommendedItem , ChatMyItem )

function ChatRecommendedSection() {
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
        />

        <div
          className='p-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl w-20'
          style={{
            borderRadius: '0 1.3rem  1.3rem 0',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        >
          <SearchIcon />
        </div>
      </div>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <ChatRecommendedItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <ChatRecommendedItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <ChatRecommendedItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <ChatRecommendedItem
              src={redBoy}
              text='우리는 거지가 아닌 부자입니다.'
              label='30대'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <ChatRecommendedItem
              src={beggars}
              text='돈 모으고 싶으면 어서오슈'
              label='20대'
              path='/beggars'
            />
            <ChatRecommendedItem
              src={beggars}
              text='Global Beggars'
              label='R=VD'
              path='/beggars'
            />
            <ChatRecommendedItem
              src={beggars}
              text='돈이 없지 가오가 없냐'
              label='가오없음'
              path='/beggars'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatRecommendedSection;
