import React, { useState } from 'react'
import styles from "./GoogleSignUpInfoPage.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Arranging Files.png"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import {setPhone,setPassword} from "../../../features/onboardingSlice"

const GoogleSignupInfoPage = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const[mob,setMob]=useState("")
const [pass,setPass]=useState("")
const [confirmPass,setConfirmPass]=useState("")
const handleNext=()=>{
    if(mob===""||pass===""||confirmPass===""){ toast.error("Fill All Fields");return}
    if(pass!==confirmPass){toast.error("Password don not match");return}
    if(pass.length<6){toast.error("Password must contian minimum 6 letters");return}
    dispatch(setPhone(mob));
    dispatch(setPassword(pass))
navigate("/OnboardingScreen")
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
            <h1>Let’s get general info first !!</h1>
            <textarea onChange={(e)=>setMob(e.target.value)} rows="3" type="text" placeholder='Phone Number ' value={mob} />
            <input onChange={(e)=>setPass(e.target.value)} type="password" placeholder='Create Your Password ' value={pass} />
            <input onChange={(e)=>setConfirmPass(e.target.value)} type="password" placeholder='Confirm Your Password ' value={confirmPass} />
            <button onClick={handleNext}>Next</button>
        </div>
        <div className={styles.right}>
            <img src={img} alt="img" />
        </div>
    </div>
   </section>
   </>
  )
}

export default GoogleSignupInfoPage