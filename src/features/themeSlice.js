import { createSlice } from "@reduxjs/toolkit";

const initialState="light-theme"

const themeSlice=createSlice({
    name:"userDoc",
    initialState,
reducers:{
    setTheme:(state,action)=>{
 return action.payload
    },
    removeTheme:(state,action)=>{
return{}
    }
}
})
export const {setTheme,removeTheme}=themeSlice.actions
export default themeSlice.reducer