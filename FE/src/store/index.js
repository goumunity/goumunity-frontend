import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.js";
import modalReducer from "./modal.js";

const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer },
});

export default store;
