import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    sidebarVisible: (state) => {
      state.sidebar = true;
    },
    sidebarInvisible: (state) => {
      state.sidebar = false;
    },
  },
});

export const { login, logout } = sidebarSlice.actions;
export const selectSidebar = (state) => state.sidebar.sidebar;

export default sidebarSlice.reducer;
