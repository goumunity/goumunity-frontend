import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false, joinData: {}, file: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    updateJoinData(state, action) {
      state.joinData = action.payload;
    },
    clearJoinData(state) {
      state.joinData = {}
    },
    updateFile(state, action) {
      state.file = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
