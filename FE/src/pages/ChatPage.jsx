import React from 'react';
import ChatLists from '../components/common/ChatLists';

function ChatPage() {
  return (
    <div className='flex'>
      <div className='w-1/6 bg-yellow h-full'>
        <span>Left</span>
        <div class='divide-y divide-entrance'>
          <div className='font-bold text-2xl text-center mb-4'>나의 거지챗</div>
          <ChatLists />
          <ChatLists />
        </div>
      </div>
      <div className='w-3/4 bg-yellow '>
        <span>right</span>
      </div>
    </div>
  );
}

export default ChatPage;
