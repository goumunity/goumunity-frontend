import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  isLoaded: false,
};

// 슬라이스 생성
const chatRoute = createSlice({
  name: 'mySection',
  initialState,
  reducers: {
    // 액션 생성자 정의
    setIsLoaded: (state) => {
      state.isLoaded = !state.isLoaded;
    },
  },
});

export const { setIsLoaded } = chatRoute.actions;

export default chatRoute.reducer;
