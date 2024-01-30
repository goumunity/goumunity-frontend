import { createSlice } from '@reduxjs/toolkit';

const initialModalState = {
  isModalOpen: false,
  isDetailModalOpen: false,
  isCreatePostModalOpen: false,
  modalOption: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    // 회원가입 1페이지 모달 열기
    openJoinModal1(state) {
      state.isModalOpen = true;
      state.modalOption = 'join1';
    },

    // 회원가입 2페이지 모달 열기
    openJoinModal2(state) {
      state.isModalOpen = true;
      state.modalOption = 'join2';
    },

    // 회원가입 3페이지 모달 열기
    openJoinModal3(state) {
      state.isModalOpen = true;
      state.modalOption = 'join3';
    },

    // 로그인 모달 열기
    openLoginModal(state) {
      state.isModalOpen = true;
      state.modalOption = 'login';
    },

    // 채팅방 개설 모달 열기
    openCreatChatModal(state) {
      state.isModalOpen = true;
      state.modalOption = 'createChat';
    },

    // 모달 닫기
    closeModal(state) {
      state.isModalOpen = false;
      state.modalOption = '';
    },

    // detail 모달 열기
    openDetailModal(state) {
      state.isDetailModalOpen = true;
    },

    // detail 모달 닫기
    closeDetailModal(state) {
      state.isDetailModalOpen = false;
    },

    // createPost 모달 열기
    openCreatePostModal(state) {
      state.isCreatePostModalOpen = true;
    },

    // createPost 모달 닫기
    closeCreatePostModal(state) {
      state.isCreatePostModalOpen = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
