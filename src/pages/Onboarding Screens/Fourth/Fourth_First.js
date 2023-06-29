import React, { useState } from 'react'
import styles from "./Fourth.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Say hello to new people.svg"
import ThankYouPage from '../Thank You/ThankYouPage'
import linkedin from "../../../images/Linkedin.svg"
import insta from "../../../images/instagram.svg"
import twiiter from "../../../images/Twitter.svg"
import { useDispatch } from 'react-redux'
import {setLinkedinLink,setTwitterLink,setInstagramLink} from "../../../features/onboardingSlice"

const Fourth_First = () => {
  const[isClick,setIsClick]=useState(false)
  const[isSkip,setIsSkip]=useState(false)
  const [data,setData]=useState({linkedin:"",twitter:"",insta:""})
  const dispatch=useDispatch()

const handleChange=(e)=>{
  const{name,value}=e.target
  setData((prev)=>{
    return{...prev,[name]:value}
  })
}


const handleNext=()=>{
dispatch(setLinkedinLink(data.linkedin))
dispatch(setTwitterLink(data.twitter))
dispatch(setInstagramLink(data.insta))
  setIsClick(true)
}
return (
  <>
  {!isSkip&&<>
  {!isClick&&<section className={styles.outerCont}>
  <div className={styles.top}>
  <img src={logo} alt="logo" />
  {/* <ScreenStatusInd2 pageNo={1}/> */}
  </div>
  <div className={styles.headingCont}>
  <h1>Your Social Media Handles </h1>
  </div>
  <div className={styles.dataCont}>
      <div className={styles.left}>
          <div className={styles.socialMediaCont}>
            <div className={styles.linkedinCont}>
            <img src={linkedin} alt="icon" /> 
            <input onChange={handleChange} value={data.linkedin} name="linkedin" className={styles.inp} type="text" placeholder='@username/url' />           
            </div>
            <div className={styles.twitterCont}>
              <img src={twiiter} alt="icon" />
              <input onChange={handleChange} value={data.twitter} name="twitter" className={styles.inp} type="text" placeholder='@username/url' />
            </div>
            <div className={styles.instaCont}>
              <img src={insta} alt="icon" />
              <input onChange={handleChange} value={data.insta} name="insta" className={styles.inp} type="text" placeholder='@username/url' />
            </div>
          </div>
      </div>
      <div className={styles.right}>
          <img src={img} alt="img" />
      </div>
  </div>
  <div className={styles.buttonCnt}>
          <button className={styles.skipBtn} onClick={()=>setIsSkip(true)}>Skip</button>
          <button className={styles.nextBtn} onClick={handleNext}>Done</button>
          </div>
 </section>}
 {
  isClick&&<>
      <ThankYouPage/>
  </>
 }</>}
 {
  isSkip&&<>
      <ThankYouPage/>
  </>
 }
 </>
)
}

export default Fourth_First