import React, { useState } from 'react'
import styles from "../OnboardingScreen.module.css"
import ScreenStatusIndicator from '../Screen Status Indicator/ScreenStatusIndicator'
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Data analysis Case Study.svg"
import Second_First from '../Second/Second_First'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import {setEducation, setCurrentPosition,setCurrentCompany} from "../../../features/onboardingSlice"

const First_Third = () => {
    const[isClick,setIsClick]=useState(false)
    const[data,setData]=useState({education:"",currentPos:"",compName:""})
    const dispatch=useDispatch()
const handleChange=(e)=>{
    const{name,value}=e.target
    setData((prev)=>{
        return {...prev,[name]:value}
    })
}

const handleNext=()=>{
    if(data.education===""||data.currentPos===""||data.compName===""){toast.error("Fill Mandatory Fields");return}
    dispatch(setEducation(data.education))
    dispatch(setCurrentPosition(data.currentPos))
    dispatch(setCurrentCompany(data.compName))
    setIsClick(true)
}

  return (
    <>
    <ToastContainer/>
    {!isClick&&<section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    <ScreenStatusIndicator pageNo={3}/>
    </div>
    <div className={styles.headingCont}>
    <h1 className={styles.heading1}>Personal Profile</h1>
    </div>
    <div className={styles.first_third_dataCont}>
        <div className={styles.first_third_dataCont_left}>
        <img className={styles.imageForShow_third} src={img} alt="img" />
            <h2 className={styles.subHeading}>Tell us About your Education*</h2>
        <textarea onChange={handleChange} name="education" rows="3" type="text" placeholder='Enter Details here ' value={data.education}/>
        </div>
        
    </div>
  
            
        
    <div className={styles.aboutCont}>
        <h1>Tell us About your Current Designation</h1>
        <h3 style={{marginTop:"1rem"}}>Current Position*</h3>
        <textarea onChange={handleChange} name="currentPos" rows="3" type="text" placeholder='Enter Details here' value={data.currentPos}/>
        <h3 style={{marginTop:"1rem"}}>Company Name*</h3>
        <textarea onChange={handleChange} name="compName" rows="3" type="text" placeholder='Enter Details here' value={data.compName}/>
    </div>
    <div className={styles.btnCont}>
        <button onClick={handleNext}>Next</button>
    </div>
   </section>}

   {
    isClick&&<>
        <Second_First/>
    </>
   }
   </>
  )
}

export default First_Third