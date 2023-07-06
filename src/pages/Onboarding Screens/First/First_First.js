import React, { useState } from 'react'
import styles from "../OnboardingScreen.module.css"
import logo from "../../../images/Frame 6267154.png"
import ScreenStatusIndicator from '../Screen Status Indicator/ScreenStatusIndicator'
import img from "../../../images/Arranging Files.png"
import First_Second from './First_Second'

const First_First = () => {
    const[isClick,setIsClick]=useState(false)
  return (
    <>
   {!isClick&&
   <section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    <ScreenStatusIndicator pageNo={1}/>
    </div>
    <div className={styles.dataCont}>
        <div className={styles.left}>
            <h1>Let’s get your Personal profile done first !!</h1>
            <button onClick={()=>setIsClick(true)}>Next</button>
        </div>
        <div className={styles.right}>
            <img src={img} alt="img" />
        </div>
    </div>
   </section>}
   {isClick&&
    <First_Second/>
}
   </>
  )
}

export default First_First