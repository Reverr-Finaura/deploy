import React, { useState } from 'react'
import ScreenStatusInd2 from '../Screen StatusIndicator 2/ScreenStatusInd2'
import styles from "./Third.module.css"
import Third_Second from './Third_Second'
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Q and A about loan.svg"
import Fourth_First from '../Fourth/Fourth_First'

const Third_First = () => {
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
          <h1>What is your Industry &<br/>Sectors of Interest?</h1>
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
      <Third_Second/>
  </>
 }</>}
 {
  isSkip&&<>
      <Fourth_First/>
  </>
 }
 </>
)
}

export default Third_First