import React, { useState } from 'react'
import styles from "./EquityAndEverythingg.module.css"
import data from "../../../assets/New Courses Data/EquityAndEverything"
import {IoIosArrowForward} from "react-icons/io"
import ChooseModuleCard from '../Courses Card/Choose Module Card/ChooseModuleCard'


const EquityAndEverythingg = () => {
  const[isSlideBegin,setIsSlideBegin]=useState(false)
  return (
    <>
    {!isSlideBegin&&
   <section className={styles.outerCont}>
   <div className={styles.innerCont}>
   <div className={styles.cont}>
    <h1 className={styles.title}>{data[0]?.courseName} </h1>
    <img className={styles.img} src={data[0]?.image} alt="img" />
    </div>
    <button onClick={()=>setIsSlideBegin(true)} className={styles.nextBtn}>Next <span className={styles.icon}><IoIosArrowForward/></span></button>
    </div>
   </section>
    }
    {isSlideBegin&&<section><ChooseModuleCard setIsSlideBegin={setIsSlideBegin} data={data[0]}/></section>}
    
   </>
  )
}

export default EquityAndEverythingg