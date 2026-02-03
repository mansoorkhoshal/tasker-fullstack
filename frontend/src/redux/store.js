import { configureStore } from "@reduxjs/toolkit";
import userReducser from"./features/userSlices"
export const store = configureStore({
  reducer: {
    user:userReducser
  },
});
