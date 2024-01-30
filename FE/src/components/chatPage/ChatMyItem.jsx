import geo from '@/assets/images/logo.png';

// import { useSelector } from 'react-redux';

function ChatMyItem() {
  // const chatLists = useSelector((state) => {
  //   return state.chatLists;
  // });

  return (
    <div className='flex'>
      <div className='w-1/4 mt-3'>
        <span>
          <img src={geo} alt='프로필 사진' />
        </span>
      </div>
      <div className='w-3/4 h-30'>
        <div>
          <span className='font-bold text-responsive text-2xl'>
            관악구 거지들의 모임
          </span>
        </div>
        <div className='mt-1'></div>
        <div>
          <ul className='flex text-responsive'>
            <li>#01</li>
            <li>#02</li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ChatMyItem;
