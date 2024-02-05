import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import modalReducer from "./modal";
import feedReducer from "./feed";

const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer, feed: feedReducer },
});

export default store;
