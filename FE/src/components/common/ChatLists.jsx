import React from 'react';
import geo from '@/public/img/geo1.png';

function Chats() {
  return (
    <div className='flex'>
      <div className='w-1/4 mt-3'>
        <span>
          <img src={geo} alt='프로필 사진' />
        </span>
      </div>
      <div className='w-3/4'>
        <div>
          <span className='font-bold text-2xl'>Newjeans</span>
        </div>
        <div className='mt-1'></div>
        <div>
          <ul className='flex'>
            <li>#01</li>
            <li>#02</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chats;
