import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newUser: null,
};

export const newUserSlice = createSlice({
  name: "newUser",
  initialState,
  reducers: {
    create: (state, action) => {
      state.newUser = action.payload;
    },
    modify: (state, action) => {
      state.newUser = { ...state.newUser, ...action.payload };
    },
    remove: (state, action) => {
      state.newUser = null;
    },
  },
});

export const { create, remove, modify } = newUserSlice.actions;
export const selectNewUser = (state) => state.newUser.newUser;

export default newUserSlice.reducer;
