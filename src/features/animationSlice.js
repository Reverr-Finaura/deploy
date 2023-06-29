import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animation: null,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    forward: (state) => {
      state.animation = "animate__fadeInRight";
    },
    backward: (state) => {
      state.animation = "animate__fadeInLeft";
    },
  },
});

export const { forward, backward } = animationSlice.actions;
export const selectAnimation = (state) => state.animation.animation;

export default animationSlice.reducer;
