import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
