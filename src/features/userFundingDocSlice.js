import { createSlice } from "@reduxjs/toolkit";

const initialState={}

const userFundingDocSlice=createSlice({
    name:"userDoc",
    initialState,
reducers:{
    setUserFundingDoc:(state,action)=>{
 return action.payload
    },
    removeUserFundingDoc:(state,action)=>{
return{}
    }
}
})
export const {setUserFundingDoc,removeUserFundingDoc}=userFundingDocSlice.actions
export default userFundingDocSlice.reducer