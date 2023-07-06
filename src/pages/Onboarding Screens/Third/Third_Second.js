import React, { useState } from 'react'
import ScreenStatusInd2 from '../Screen StatusIndicator 2/ScreenStatusInd2'
import styles from "./Third.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Searching data.svg"
import img1 from "../../../images/Fintech Management.svg"
import img2 from "../../../images/SalesIcon.svg"
import img3 from "../../../images/ProductDevIcon.svg"
import img4 from "../../../images/Legal Documents.svg"
import img5 from "../../../images/ResearchIcon.svg"
import img6 from "../../../images/Charity.svg"
import img7 from "../../../images/marketing.svg"
import img8 from "../../../images/Learning.svg"
import img9 from "../../../images/medTechIcon.svg"
import img10 from "../../../images/Cloud Technology.svg"
import Fourth_First from '../Fourth/Fourth_First'
import {IoIosArrowDown} from "react-icons/io"
import slectedImg from "../../../images/Group 6267336.svg"
import { useDispatch } from 'react-redux'
import {setIndustry} from "../../../features/onboardingSlice"

const data=[
  {id:1,image:img1,name:"Fintech"},
  {id:2,image:img2,name:"Sales"},
  {id:3,image:img3,name:"Product Development"},
  {id:4,image:img4,name:"Legal"},
  {id:5,image:img5,name:"Research"},
  {id:6,image:img6,name:"Fundraising"},
  {id:7,image:img7,name:"Marketing"},
  {id:8,image:img8,name:"Ed-Tech"},
  {id:9,image:img9,name:"Medtech"},
  {id:10,image:img10,name:"Realtech"},
]

const industryData= ["Advertising","Aeronnautics Aerospace & Defense","Agriculture & Allied Industries","AI","Airport Operations","Analytics","Animation","Apparel and Textiles","AR VR (Augmented + Virtual Reality)","Architecture Interior Design","Art & Photography","Automotive","Banking","Biotechnology","BPM","Cement","Chemicals","Computer vision","Construction","Consumer Durables","Dating matrimonial","Design","Edtech","Education","Electronics system design & Manufacturing ","Enterprise software","Engineering & Capital Goods","Events","Fashion","Finance","Fintech","FMCG","Food and beverages","Government","Gems & Jewellery","Green Technology","Healthcare & lifesciences","House-Hold services","Horticulture","Human resources"," Indic languages startups","InTravel and tourism","Internet of things","Insurance","IT Services","Logistics","Manufacturing","Marketing","Media and entertainment","Metals & Mining","Nanotechnology","Natural Sciences","Non-Renewable energy","NGO","NPO",
"Other speciality retailers","Passenger experience","Pets & animals","Pharmaceuticals","professional & Commercial services","Real estate","Renewable energy","Robotics","Rural development","safety","security solutions","Social impact","social network","sports","Technology hardware","Telecommunications & Networking","Toys and games","Transportation & Storage","Travel and tourism","Waste management","Others"]

const Third_Second = () => {
  const[isClick,setIsClick]=useState(false)
  const[industryName,setIndustryName]=useState("")
  const[isOptContClick,setisOptContClick]=useState(false)
  const[optionIndustryName,setoptionIndustryName]=useState("")
  const dispatch=useDispatch()
return (
  <>
      {!isClick&&<section className={styles.outerCont}>
  <div className={styles.top}>
  <img src={logo} alt="logo" />
  <ScreenStatusInd2 pageNo={2}/>
  </div>
  <div className={styles.headingCont}>
 <h1 className={styles.headingg}>What Is Your Industry?</h1>
 </div>
 <div className={styles.lookingForCont}>
  <div className={styles.lookingForLeft}>
  {data.map((dataa)=>{
return <>
  <div onClick={()=>setIndustryName(dataa.name)} className={industryName===dataa.name?styles.selectedOptCont:styles.optCont} key={dataa.id}>
      <img src={dataa.image} alt="img" />
      <p>{dataa.name}</p>
      {industryName===dataa.name&&<img className={styles.slectedImg} src={slectedImg} alt="selectImg" />}
  </div>
</>
  })}
  </div>
  <div className={styles.lookingForRight}>
      <img className={styles.faltuImg} src={img} alt="img" />
  </div>
 </div>
 <div className={styles.dropDownCont}>
  <h3>Didn’t Get What You’re Looking For?</h3>
  <p>Please Select from below</p>
  <div className={styles.container}>
   <div style={{color:optionIndustryName!==""&&"black"}} onClick={()=>setisOptContClick(e=>!e)} className={styles.optionCont}>{optionIndustryName!==""?optionIndustryName:"Select From Here.."} <span><IoIosArrowDown className={styles.downArrow}/></span></div>
   {isOptContClick&&<div className={styles.chooserCont}>
    {industryData.map((opt)=>{
      return <p className={industryName===opt&&styles.selectedOption} onClick={()=>{setoptionIndustryName(opt);setIndustryName(opt);setisOptContClick(false)}} key={opt}>{opt}</p>
    })}
   </div>} 
  </div>
 </div>
 <div className={styles.btnCont}>
      <button onClick={()=>{dispatch(setIndustry(industryName));setIsClick(true)}}>Next</button>
  </div>
 </section>}
 {
  isClick&&<Fourth_First/>
 }
  </>
)
}

export default Third_Second