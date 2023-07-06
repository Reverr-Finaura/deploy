import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const userDocSlice=createSlice({
    name:"userDoc",
    initialState,
reducers:{
    setUserDoc:(state,action)=>{
 return action.payload
    },
    removeUserDoc:(state,action)=>{
return{}
    }
}
})
export const {setUserDoc,removeUserDoc}=userDocSlice.actions
export default userDocSlice.reducer