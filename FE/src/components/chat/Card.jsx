import React from 'react';
import CardItem from './Carditem';
import './Cards.css';
import redBoy from '@/public/img/redBoy_Ahha.jpg';
import beggars from '@/public/img/beggar.jpg';
import ChatSearchBar from './ChatSearchBar';

function Cards() {
  return (
    <div className='cards'>
      

      <div className='flex justify-center'>
        <ChatSearchBar />
      </div>

      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <CardItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <CardItem
              src={redBoy}
              text='관악구 거지들의 모임'
              label='관악구'
              path='/services'
            />
            <CardItem
              src={redBoy}
              text='우리는 거지가 아닌 부자입니다.'
              label='30대'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={beggars}
              text='돈 모으고 싶으면 어서오슈'
              label='20대'
              path='/beggars'
            />
            <CardItem
              src={beggars}
              text='Global Beggars'
              label='R=VD'
              path='/beggars'
            />
            <CardItem
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

export default Cards;
