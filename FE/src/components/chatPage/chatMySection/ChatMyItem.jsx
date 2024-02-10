import {useEffect, useState} from 'react';
import axios from 'axios';
import geo from '@/assets/images/logo.png';
import {useNavigate} from 'react-router-dom';
import CloseButton from '../../common/CloseButton';
import instance from "@/utils/instance.js";

function ChatMyItem(props) {
  const navigate = useNavigate();
  const {
    handleClickMySection, chatData, setChatData, value, index
    , handleJoinChatRoom
  } = props;
  const [isHovered, setIsHovered] = useState(false);


  //api 연결
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await instance.get('/fake/chatMyList');
        const res = await instance.get(
            `/api/users/my/chat-rooms?page=0&size=100&time=${new Date().getTime()}`
        );

        setChatData(res.data.contents);
        // setChatData(res.data.chatMyItemList);
        console.log(chatData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chatData) {
    return <div>Loading...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  //버튼 클릭 이벤트에 URL 이동 로직
  const handleClickOpenSpecificRoom = (chatRoomId) => {
    if (props.isLoaded === false) {
      navigate('/chat');
    } else {
      navigate(`/chat/talk/${chatRoomId}`);
    }
  };

  const handleButtonClick = (chatRoomId) => {
    handleClickMySection();
    handleClickOpenSpecificRoom(chatRoomId);
  };

  //채팅방 삭제
  const handleRemoveChat = () => {
    setChatData();
    async () => await instance.delete(`/api/chat-rooms/${chatRoomId}`);
    const handleRemoveChat = async () => {
      const inConfirm = window.confirm('정말로 방에서 나가시겠습니까?');
      if (!inConfirm) return;
      // onRemove();

      try {
        const res = await axios.delete(
            `/temp/api/chat-rooms/${value.chatRoomId}`
        );
        const newChatMyData = chatData.filter(
            (val) => val.chatRoomId !== value.chatRoomId
        );
        setChatData(newChatMyData);
        // setChatData((prev) => prev - 1);
      } catch (error) {
        console.error('api 요청 중 오류 발생: ', error);
        if (error.response.status === 404) {
          setErrorMessage('존재하지 않는 거지방입니다.');
        }
        if (error.response.status === 403) {
          console.log(error + '권한이 없습니다.');
        }
        if (error.response.status === 409) {
          console.log(error + '방장은 나갈 수 없습니다.');
        }
      }
    };

    // const onRemove = (target) => {
    //   console.log(target);
    //   const nextArr = arr.filter((elem) => elem.idx !== target.idx);
    //   setArr(nextArr);
    // };

    return (
        <div>
          <div>
            <button
                type='button'
                key={value.idx}
                className='hover:rotate-12  hover:bg-orange-200'
                onClick={() => {
                  handleButtonClick(value.chatRoomId);
                  handleJoinChatRoom(value.chatRoomId);
                }}
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
              <div
                  className='flex'
                  key={index}
                  // onClick={() => {
                  //   setId(value.chatRoomId);
                  // }}
              >
                <div className='w-1/4 mt-3'>
              <span>
                <img src={geo} style={{width: '40px'}} alt='채팅방 사진'/>
                {isHovered && <CloseButton onClick={handleRemoveChat}/>}
              </span>
                </div>
                <div className='w-3/4 h-30'>
                  <div>
                <span className='font-bold text-responsive text-2xl'>
                  <div className='flex justify-end  w-full'></div>
                  {value.title}
                </span>
                    <span> 👤{value.currentUserCount}</span>
                    <span> 💬{value.unreadMessageCount}</span>
                  </div>
                  <div className='mt-1'></div>
                  <div>
                    <ul
                        className='flex text-responsive font-her'
                        style={{flexWrap: 'wrap'}}
                    >
                      {value.hashtags.map((name, hashtagsIndex) => (
                          <li
                              className='pr-2'
                              key={hashtagsIndex}
                          >{`#${value.hashtags[hashtagsIndex].name}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
    );
  }
}
export default ChatMyItem;
