import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isModalOpen: false,
  modalOption: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    // 회원가입 1페이지 모달 열기
    openJoinModal1(state) {
      state.isModalOpen = true;
      state.modalOption = "join1";
    },
    
    // 회원가입 2페이지 모달 열기
    openJoinModal2(state) {
      state.isModalOpen = true;
      state.modalOption = "join2";
    },

    // 회원가입 3페이지 모달 열기
    openJoinModal3(state) {
      state.isModalOpen = true;
      state.modalOption = "join3";
    },

    // 로그인 모달 열기
    openLoginModal(state) {
      state.isModalOpen = true;
      state.modalOption = "login";
    },

    // 모달 닫기
    closeModal(state) {
      state.isModalOpen = false;
      state.modalOption = "";
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
