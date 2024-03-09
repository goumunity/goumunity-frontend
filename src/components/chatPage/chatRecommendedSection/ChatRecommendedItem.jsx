import instance from '@/utils/instance.js';
import logo from '@/assets/images/browser-logo.png';
import Swal from 'sweetalert2';
import handleError from '@/utils/error.js';

function ChatRecommendedItem({ item, setMyChatRooms, myChatRooms }) {
  // item = { capability, chatRoomId, currentUserCount, title, imgSrc, hashTags }
  // hashtags = [{name, sequence}, ]
  const onEnterButtonClicked = () => {
    Swal.fire({
      title: `${item.title}에 입장 하시겠습니까?`,
      confirmButtonText: '네',
      showCancelButton: true,
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .post(`/api/chat-rooms/${item.chatRoomId}`)
          .then(() => {
            instance.get(`/api/chat-rooms/${item.chatRoomId}`).then((res) => {
              setMyChatRooms([res.data, ...myChatRooms]);
            });
          })
          .catch((error) => {
            handleError(error);
          });
      }
    });
  };

  return (
    <div className='relative w-64 h-96 flex flex-col items-center border-2 border-black rounded-3xl px-3 py-5 bg-bright hover:bg-gray-100'>
      <div className='flex justify-center items-center w-full h-44 rounded-sm overflow-hidden'>
        <img
          src={item.imgSrc ? item.imgSrc : logo}
          className='w-full h-full border-black border-2 rounded-3xl'
          alt=''
        />
      </div>

      <div className='flex flex-col w-full m-2'>
        <div className='flex gap-2 items-center my-2'>
          <span
            className={`font-dove justify-start ${
              item.title.length > 10 ? 'text-lg' : 'text-xl'
            }`}
          >
            {item.title}
          </span>
          <span className='font-her'>{`👤${item.currentUserCount}/${item.capability}`}</span>
        </div>

        <ul className='flex font-her gap-3 flex-wrap w-full'>
          {item.hashtags?.map((hashtag, idx) => (
            <li className='' key={idx}>{`#${hashtag.name}`}</li>
          ))}
        </ul>
      </div>

      <div
        className='flex justify-center items-center w-52 absolute bottom-5 p-1 rounded-2xl border-2 border-black bg-entrance font-dove text-white text-lg cursor-pointer'
        onClick={onEnterButtonClicked}
      >
        입장하기
      </div>
    </div>
  );
}

export default ChatRecommendedItem;
