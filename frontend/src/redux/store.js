import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlices";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
