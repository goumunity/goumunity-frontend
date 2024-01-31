// import React from 'react'

// function ChatTalkSection() {
//   return (
//     <div>
//       채팅방 내부

//     </div>
//   )
// }

// export default ChatTalkSection

import React from 'react';

function ChatTalkSection({ selectedChatRoom }) {
  return (
    <div>
      {/* 선택된 채팅방이 있는지 확인하고 해당 채팅방의 내용을 렌더링 */}
      {selectedChatRoom ? (
        <div>
          {/* 선택된 채팅방의 내용 */}
          <p>{`${selectedChatRoom}번 채팅방 내용`}</p>
        </div>
      ) : (
        <p>채팅방을 선택하여 내용을 확인하세요</p>
      )}
    </div>
  );
}

export default ChatTalkSection;
