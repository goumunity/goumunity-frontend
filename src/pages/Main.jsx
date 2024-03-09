import { useEffect, useState } from "react";
import Login from "../components/chatPage/Login.jsx";
import Lobby from "../components/chatPage/Lobby.jsx";
import ChatTalkRoom from "../components/chatPage/chatTalkSection/ChatTalkRoom.jsx";

import { useDispatch, useSelector } from "react-redux";
import login, { loginActions } from "../store/login.js";

export default function Main() {
  // const [userId, setUserId] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [chatRooms, setChatRooms] = useState([]);

  const dispatch = useDispatch();

  return (
    <>
      <h1>해윙</h1>
      {/* {isLoggedIn ? ( */}
      {dispatch(loginActions.IsLogin) ? (
        <ChatTalkRoom
        // chatRooms={chatRooms} userId={userId}
        />
      ) : (
        <Login
        // setChatRooms={setChatRooms}
        // setUserId={setUserId}
        // isLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}
