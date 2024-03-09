import { createSlice } from "@reduxjs/toolkit";

const initialchatState = {
  isVisible: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialchatState,
  reducers: {
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
    init(state){
      state.isVisible = true;
    }

  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
