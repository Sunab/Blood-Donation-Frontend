import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import messageReducer from "./messageSlice";
// Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    task: messageReducer,
  },
});

export default store;
