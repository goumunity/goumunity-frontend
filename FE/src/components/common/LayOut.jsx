import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function LayOut() {
  // const [isModal, setIsModal] = useState(false);
  // const [modalOption, setModalOption] = useState('');

  // const handleClickChangeOptionJoin = () => {
  //   console.log('join')
  //   setIsModal(true)
  //   setModalOption('join')
  // };

  // const handleClickChangeOptionLogin = () => {
  //   console.log('login')
  //   setIsModal(true)
  //   setModalOption('login')
  // };
  // const closeModal = () => {
  //   setIsModal(false)
  // };
  return (
    <div className="flex bg-bg bg-opacity-10">
      {/* {isModal && modalOption === 'join' && <CustomModal closeJoinModal={closeModal}><JoinModal /></CustomModal>}
      {isModal && modalOption === 'login' && <CustomModal closeJoinModal={closeModal}><LoginModal /></CustomModal>} */}
      <NavBar />
      <Outlet />
      {/* <div onClick={handleClickChangeOptionJoin}>회원가입</div>
      <div onClick={handleClickChangeOptionLogin}>로그인</div> */}
    </div>
  );
}

export default LayOut;
