import React, { useState } from 'react'
import styles from "./Second.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Concept of unemployed woman searching for job in startup company.svg"
import img1 from "../../../images/Conversation.svg"
import img2 from "../../../images/Group.svg"
import img3 from "../../../images/Layer 2.svg"
import img4 from "../../../images/Potential.svg"
import img5 from "../../../images/Engineering Settings.svg"
import img6 from "../../../images/Job Change People.svg"
import img7 from "../../../images/Investor.svg"
import img8 from "../../../images/networkkkk.svg"
import img9 from "../../../images/Co Founder.svg"
import img10 from "../../../images/GroupLast.svg"
import Third_First from '../Third/Third_First'
import ScreenStatusInd2 from '../Screen StatusIndicator 2/ScreenStatusInd2'
import slectedImg from "../../../images/Group 6267336.svg"
import { useDispatch } from 'react-redux'
import {setWhatULookingFor} from "../../../features/onboardingSlice"
const data=[
    {id:1,image:img1,name:"Mentorship"},
    {id:2,image:img2,name:"Find Mentors"},
    {id:3,image:img3,name:"Career Change"},
    {id:4,image:img4,name:"Mentor Others"},
    {id:5,image:img5,name:"Get Inspired"},
    {id:6,image:img6,name:"New Job"},
    {id:7,image:img7,name:"Find Investors"},
    {id:8,image:img8,name:"Networking"},
    {id:9,image:img9,name:"Find CO-Founder"},
    {id:10,image:img10,name:"Grow Business"},
]

const Second_Second = () => {
    const dispatch=useDispatch()
    const[isClick,setIsClick]=useState(false)
    const[lookingForName,setlookingForName]=useState("")


const handleNext=()=>{
    dispatch(setWhatULookingFor(lookingForName))
    setIsClick(true)
}

  return (
    <>
        {!isClick&&<section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    <ScreenStatusInd2 pageNo={2}/>
    </div>
    <div className={styles.headingCont}>
   <h1 className={styles.headingg}>What are You Looking For? </h1>
   </div>
   <div className={styles.lookingForCont}>
    <div className={styles.lookingForLeft}>
    {data.map((dataa)=>{
return <>
    <div onClick={()=>setlookingForName(dataa.name)} className={lookingForName===dataa.name?styles.selectedOptCont:styles.optCont} key={dataa.id}>
        <img src={dataa.image} alt="img" />
        <p>{dataa.name}</p>
        {lookingForName===dataa.name&&<img className={styles.slectedImg} src={slectedImg} alt="selectImg" />}
    </div>
</>
    })}
    </div>
    <div className={styles.lookingForRight}>
        <img className={styles.faltuImg} src={img} alt="img" />
    </div>
   </div>
   <div className={styles.btnCont}>
        <button onClick={handleNext}>Next</button>
    </div>
   </section>}
   {
    isClick&&<Third_First/>
   }
    </>
  )
}

export default Second_Second