import { createSlice } from "@reduxjs/toolkit";

const initialState=false

const reDeploySlice=createSlice({
    name:"reDeploy",
    initialState,
reducers:{
    setRedeploy:(state,action)=>{
 return action.payload
    },
}
})
export const {setRedeploy}=reDeploySlice.actions
export default reDeploySlice.reducer