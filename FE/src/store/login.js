import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  id: "",
  password: "",
  userId: null,
  isLoggedIn: false,
  chatRooms: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    IsLogin(state, action) {
      state.id = action.payload;
      state.password = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setChatRooms(state, action) {
      state.chatRooms = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
