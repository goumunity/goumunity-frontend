import React from "react";

function ChatMessage({message, index, currentUser}) {

    //현재시각
    const formatCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';

        // 시간을 12시간 형식으로 변경
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        // 분을 두 자리로 표시
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes}${ampm}`;
    };

    const isNotice = () => {
        return message.chatType === 'ENTER' || message.chatType === 'EXIT';
    }

    const noticeMessage = () => {
        const msg = message.chatType === 'ENTER' ? '입장하셨습니다.' : '나가셨습니다.';
        const content = `${message.nickname ? message.nickname : '알수없음 ' }님이 ${msg}`;
        return <>
            <div className='flex justify-center'>
                <span className='border rounded-2xl bg-grey-200 p-1 pl-2 pr-3 text-neutral-800 text-sm'>{content}</span>
            </div>
        </>
    }
    const myMessage = () => {
        return <>
            <div className='flex justify-end pr-2'>
                      <span className='flex items-end text-xs text-gray-500 ml-2 pt-3 pr-2'>
                        {formatCurrentTime()}
                      </span>
                {messageBody()}
            </div>
        </>
    }

    const messageBody = () => {
        if(message.chatType === 'MESSAGE') {
         return    <span
                    className='flex justify-end border rounded-2xl bg-blue-200 p-1 pl-2 pr-3 w-1/5  text-neutral-800 text-sm'>
                        {message.content}
                      </span>
        } else {
            return <span
                className='flex justify-end border rounded-2xl bg-blue-200 p-1 pl-2 pr-3 w-1/5  text-neutral-800 text-sm'>
                        <img src={message.content}/>
                      </span>
        }
    }

    const otherMessage = () => {
        return <div className='pl-2'>
            <div className='flex justify-start flex-col text-sm'>
                <div className={'flex items-center mb-3'}>
                <img className={'rounded-full object-contain mr-1'} style={{width: 40, height: 40}}
                         src={message?.profileImageSrc}/> <span>{message.nickname.replace(/#.*/, '')}</span>
                </div>
                <div className='flex items-center'>
                    {messageBody()}
                    <span className='text-xs text-gray-500 ml-2 flex items-end '>{formatCurrentTime()}</span>
                </div>
            </div>
        </div>
    }

    const userMessage = () => {
        return message.userId === currentUser.id ? myMessage() : otherMessage();
    }
    return (
        <>
            <div key={index} className={'font-daeam'}>
                {isNotice() ? noticeMessage() : userMessage()}
            </div>
        </>
    )
}

export default ChatMessage;