import React, {useState} from 'react';

function ChatTalkRoom({userId, chatRoomId, onMessageSend, messages}) {

    const [msg, setMsg] = useState('');

    const onMessageChanged = (e) => {
        setMsg(e.target.value);
    }
    return (
        <>
            <h1 className='text-3xl font-bold mb-4'>응 여긴 로비야{chatRoomId}</h1>
            <div className='flex space-x-5'>
                <input type={"text"} value={msg} onChange={(e) => onMessageChanged(e)}/>
                <button type={"button"} onClick={() => onMessageSend(msg)}> 메세지 전송</button>
            </div>
            <div>
                {messages?.map(m => {
                    return <>
                        <div>{m.nickname} {m.content}</div>
                    </>
                })}
            </div>
        </>
    );
}

export default ChatTalkRoom;
