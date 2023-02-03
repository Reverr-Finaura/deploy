import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    showChat: (state) => {
      state.chat = !state.chat;
    },
  },
});

export const { showChat } = chatSlice.actions;
export const selectChat = (state) => state.chat.chat;

export default chatSlice.reducer;
