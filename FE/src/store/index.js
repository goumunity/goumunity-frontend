import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import modalReducer from "./modal";
import feedReducer from "./feed";
import chatReducer from "./chat";


import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from "redux-persist";
import authSlice from './auth'
import chatSlice from './chat'
import feedSlice from './feed'
import loginSlice from './login'
import modalSlice from './modal'

const persistConfig = {
  key: "root",
    storage : storageSession, // 로컬 스토리지에 저장
  whitelist: ['auth', 'chat', 'feed', 'login', 'modal'],
};

const reducers = combineReducers({
      auth: authSlice,
      chat: chatSlice,
      feed: feedSlice,
      login: loginSlice,
      modal: modalSlice,
  });
  
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

// const store = configureStore({
//   reducer: { auth: authReducer, modal: modalReducer, feed: feedReducer,chat: chatReducer },
// });

export default store;
