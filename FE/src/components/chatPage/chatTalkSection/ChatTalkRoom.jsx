import {useState} from "react";

function ChatTalkRoom({ userId, chatRoomId, onMessageSend, messages }) {
    const [msg, setMsg] = useState('');

    const onMessageChanged = (e) => {
        setMsg(e.target.value);
    };
    return (
        <>
            <div className='flex space-x-5'></div>
            <div className='flex flex-col justify-center items-center h-screen'>
                {messages?.map((m) => {
                    return (
                        <>
                            <div>
                                {m.nickname} {m.content}
                            </div>
                        </>
                    );
                })}
            </div>
            <div className='border'>
                <i class='fa-solid fa-circle-plus'></i>
                <input
                    className='w-4/5  font-her p-4 border-entrance border-r border'
                    placeholder='메세지를 입력해주세요...'
                    type={'text'}
                    value={msg}
                    onChange={(e) => onMessageChanged(e)}
                />
                <span className='w-full'>
          <button
              type={'button'}
              onClick={() => onMessageSend(msg)}
              className='p-4'
          >
            {' '}
              입력
          </button>
        </span>
            </div>
        </>
    );
}

export default ChatTalkRoom;
