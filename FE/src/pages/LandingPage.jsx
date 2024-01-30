import Button from "../components/common/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal.js";
import CustomModal from "../components/common/CustomModal.jsx";
import JoinModal1 from "../modal/JoinModal1.jsx";
import LoginModal from "../modal/LoginModal.jsx";
import JoinModal2 from '../modal/JoinModal2.jsx';
import JoinModal3 from "../modal/JoinModal3.jsx";

function LandingPage() {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalOption = useSelector((state) => state.modal.modalOption);

  const dispatch = useDispatch();

  const handleClickChangeOptionJoin1 = () => {
    dispatch(modalActions.openJoinModal1());
  };

  const handleClickChangeOptionLogin = () => {
    dispatch(modalActions.openLoginModal());
  };

  return (
    <div className='pl-64'>
      <div>LandingPage</div>
      {/* {isModalOpen && modalOption === 'join' && <CustomModal closeJoinModal={closeModal}><JoinModal /></CustomModal>} */}
      {isModalOpen && modalOption === "join1" && (
        <CustomModal>
          <JoinModal1 />
        </CustomModal>
      )}
      {isModalOpen && modalOption === "join2" && (
        <CustomModal>
          <JoinModal2 />
        </CustomModal>
      )}
      {isModalOpen && modalOption === "join3" && (
        <CustomModal>
          <JoinModal3 />
        </CustomModal>
      )}
      {isModalOpen && modalOption === "login" && (
        <CustomModal>
          <LoginModal />
        </CustomModal>
      )}
      <Button text="로그인" onClick={handleClickChangeOptionLogin} />
      <Button text="회원가입" onClick={handleClickChangeOptionJoin1} />
    </div>
  );
}

export default LandingPage;
