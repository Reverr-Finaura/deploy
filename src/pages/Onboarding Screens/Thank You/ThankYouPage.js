import React, { useEffect, useState } from 'react'
import styles from "./Thankyou.module.css"
import img from "../../../images/Girl doing online shopping.svg"
import logo from "../../../images/Frame 6267154.png"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ThankYouPage = () => {
  const navigate=useNavigate()
  const onboardingData=useSelector((state)=>state.onboarding)
  const newUserData=useSelector((state)=>state.newUser)
console.log("onboardingData",onboardingData)
console.log("newUserData",newUserData)
let userName;
let userEmail;


useEffect(()=>{
if(newUserData.newUser.newUser){
  console.log("googleNewUser",newUserData)
  userName=newUserData.newUser.newUser.name;
  userEmail=newUserData.newUser.newUser.email
  return
}
console.log("newUserData",newUserData)
userName=newUserData.newUser.displayName;
userEmail=newUserData.newUser.email;
},[newUserData])

const createUserInDataBase=async(email,data)=>{
  if(email){
  try {
    await setDoc(doc(db, "Users", email),{...data})       
    await updateDoc(doc(db,"meta","emailPhone"),{emailPhone:arrayUnion({email:email,phone:data.phone})})
} catch (error) {
  console.log(error.message)
 
}
  }
}
const submitForm=async()=>{
  toast("Processing Your request")

  const newData={...onboardingData,
    name:userName,
    email:userEmail,
    image:onboardingData.profileImg,
    profileImg:onboardingData.profileImg,
    countryCode:onboardingData.countryCode,
    Appointement_request: [],
    saved: [],
    rating: 0,
    gender: "",
    dob: "",
    state: "",
    country: "",
    totalRating: 0,
    notification: [],
    network: [],
    receivedRequests: [],
    sendRequests: [],
    facebookLink: "",
    orders: [],
    reviews: [],
    mentors: [],
    events: [],
    hasGeneralProfile: true,
    hasFundingProfile: "No",
    hasUpgrade:false,
    applyForFundingId: null,
    meeting: {},
  }
  await createUserInDataBase(userEmail,newData)
  navigate("/dashboard")
}

  return (
    <>
  <ToastContainer/>
   <section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    </div>
    <div className={styles.dataCont}>
        <div className={styles.left}>
            <h1>Thank you for filling up !</h1>
            <h3>You are all <span>Good To GO!!</span>👍</h3>
            <button onClick={submitForm}>Get Started</button>
        </div>
        <div className={styles.right}>
            <img src={img} alt="img" />
        </div>
    </div>
   </section>
  
   </>
  )
}

export default ThankYouPage