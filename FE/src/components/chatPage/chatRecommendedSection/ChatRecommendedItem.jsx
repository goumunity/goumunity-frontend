import instance from '@/utils/instance.js';
import logo from '@/assets/images/logo.png';
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
      console.log(result);
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
    <div className='relative w-72 h-80 flex flex-col items-center border-2 border-black rounded-3xl px-3 py-5 bg-bright'>
      <div className='flex justify-center items-center w-24 h-32 rounded-sm overflow-hidden'>
        <img
          src={item.imgSrc ? item.imgSrc : logo}
          className='w-full h-full border-black border-2'
          alt=''
        />
      </div>

      <div className='flex flex-col w-4/6 m-5'>
        <div className='flex gap-2 items-center'>
          <span
            className={`font-dove justify-start ${
              item.title.length > 10 ? 'text-xl' : 'text-2xl'
            }`}
          >
            {item.title}
          </span>
          <span className='font-her'>{`👤${item.currentUserCount}`}</span>
        </div>
        <div>
          <ul className='flex font-her gap-2 flex-wrap'>
            {/* {item.hashtags?.map((name, hashtagsIndex) => (
              <li
                className='pr-2'
                key={hashtagsIndex}
              >{`#${item.hashtags[hashtagsIndex].name}`}</li>
            ))} */}
            {item.hashtags?.map((hashtag, idx) => (
              <li className='' key={idx}>{`#${hashtag.name}`}</li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className='flex justify-center items-center absolute bottom-5 p-2 rounded-2xl border-2 border-black bg-entrance font-paci text-white'
        onClick={onEnterButtonClicked}
      >
        입장하기
      </div>
    </div>
  );
}

export default ChatRecommendedItem;
