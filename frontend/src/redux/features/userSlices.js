import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: saved?.user || null,
  token: saved?.token || null,
  isAuthenticate: saved ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticate = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticate = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
