import { createSlice } from "@reduxjs/toolkit";

const initialState={
    profileImg:null,
    about:"",
    qualification:"",
    experience:[{designation:"",previousOrCurrentOrganisation:"",yourRole:"",durationOfYears:"",id:new Date().getTime()}],
    whatULookingFor:"",
    industry:"",
    linkedinLink:"",
    twitterLink:"",
    instagramLink:"",
    userType:"Individual"
}

const onboardingSlice=createSlice({
    name:"onboarding",
    initialState,
reducers:{
    setProfileImg:(state,action)=>{
 state.profileImg= action.payload
    },
    setAbout:(state,action)=>{
state.about=action.payload
    },
    setEducation:(state,action)=>{
        state.qualification=action.payload
        },
    setCurrentPosition:(state,action)=>{
        state.experience[0].designation=action.payload
     },
     setCurrentCompany:(state,action)=>{
      state.experience[0].previousOrCurrentOrganisation=action.payload
     },
     setWhatULookingFor:(state,action)=>{
        state.whatULookingFor=action.payload
     },
     setIndustry:(state,action)=>{
        state.industry=action.payload
     },
     setLinkedinLink:(state,action)=>{
        state.linkedinLink=action.payload
     },
     setTwitterLink:(state,action)=>{
        state.twitterLink=action.payload
     },
     setInstagramLink:(state,action)=>{
        state.instagramLink=action.payload
     },
}
})

export const { setProfileImg,  setAbout,  setEducation,  setCurrentPosition,  setCurrentCompany,  setWhatULookingFor,  setIndustry,  setLinkedinLink,  setTwitterLink,  setInstagramLink } = onboardingSlice.actions;
export default onboardingSlice.reducer;