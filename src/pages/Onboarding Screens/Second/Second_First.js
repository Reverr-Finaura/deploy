import React, { useState } from 'react'
import styles from "./Second.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/searching error.svg"
import Second_Second from './Second_Second'
import Third_First from '../Third/Third_First'
import ScreenStatusInd2 from '../Screen StatusIndicator 2/ScreenStatusInd2'

const Second_First = () => {
    const[isClick,setIsClick]=useState(false)
    const[isSkip,setIsSkip]=useState(false)

    
  return (
    <>
    {!isSkip&&<>
    {!isClick&&<section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    <ScreenStatusInd2 pageNo={1}/>
    </div>
    <div className={styles.dataCont}>
        <div className={styles.left}>
            <h1>What are you looking for? </h1>
            <div className={styles.buttonCnt}>
            <button className={styles.skipBtn} onClick={()=>setIsSkip(true)}>Skip</button>
            <button className={styles.nextBtn} onClick={()=>setIsClick(true)}>Next</button>
            </div>
        </div>
        <div className={styles.right}>
            <img src={img} alt="img" />
        </div>
    </div>
   </section>}
   {
    isClick&&<>
        <Second_Second/>
    </>
   }</>}
   {
    isSkip&&<>
        <Third_First/>
    </>
   }
   </>
  )
}

export default Second_First