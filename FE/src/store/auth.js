import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false, joinData: {}
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
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
