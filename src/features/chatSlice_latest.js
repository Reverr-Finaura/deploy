import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  selectedUserData: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    },
  },
});

export const { updateSelectedUser, updateSelectedUserData } = chatSlice.actions;

export default chatSlice.reducer;
