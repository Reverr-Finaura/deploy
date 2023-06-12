import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import newUserReducer from "../features/newUserSlice";
import animationReducer from "../features/animationSlice";
import sidebarReducer from "../features/sidebarSlice";
import phnSidebarReducer from "../features/phnSidebarSlice";
import chatReducer from "../features/chatSlice";
import chatSliceReducer from "../features/chatSlice_latest";
import reDeploySliceReducer from "../features/reDeploySlice";
import userDocReducer from "../features/userDocSlice"
import userFundingDocReducer from "../features/userFundingDocSlice"
import themeSliceReducer from "../features/themeSlice"
import onboardingSliceReducer from "../features/onboardingSlice"
import countryCodeReducer from "../features/countryCodeSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: newUserReducer,
    animation: animationReducer,
    sidebar: sidebarReducer,
    phnSidebar: phnSidebarReducer,
    chat: chatReducer,
    chatLatest: chatSliceReducer,
    deploy: reDeploySliceReducer,
    userDoc:userDocReducer,
    userFundingDoc:userFundingDocReducer,
    themeColor:themeSliceReducer,
    onboarding:onboardingSliceReducer,
    countryCode:countryCodeReducer
  },
});
