import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import modalReducer from "./modal";
import feedReducer from "./feed";
import chatReducer from "./chat";
const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer, feed: feedReducer,chat: chatReducer },
});

export default store;
