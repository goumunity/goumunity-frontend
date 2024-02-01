import { configureStore, createSlice } from '@reduxjs/toolkit';

let chatSlice = createSlice({
  name: 'chatLoaded',
  initialState: true,
});

let indexSlice = createSlice({
  name: 'chatIndex',
  initialState: null,
});

export default configureStore({
  reducer: {
    chatSlice: chatSlice.reducer,
    indexSlice: indexSlice.reducer,
  },
});
