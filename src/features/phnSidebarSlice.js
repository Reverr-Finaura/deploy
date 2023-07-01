import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phnSidebar: false,
};

export const phnSidebarSlice = createSlice({
  name: "phnSidebar",
  initialState,
  reducers: {
    phnSidebarVisible: (state) => {
      state.phnSidebar = true;
    },
    phnSidebarInvisible: (state, action) => {
      state.phnSidebar = false;
    },
  },
});

export const { phnSidebarInvisible, phnSidebarVisible } =
  phnSidebarSlice.actions;
export const selectPhnSidebar = (state) => state.phnSidebar.phnSidebar;

export default phnSidebarSlice.reducer;
