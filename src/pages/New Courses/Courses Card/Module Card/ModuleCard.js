import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import SubSlide from '../SubSLides Card/SubSlide'
import styles from "./ModuleCard.module.css"

const ModuleCard = ({data,setIsModuleChoosen}) => {
    const[subSlidesBegin,setSubSlidesBegin]=useState(false)

  const goToChooseModulePage=()=>{
setIsModuleChoosen(false)

  }  
  return (
    <>
    {!subSlidesBegin&&
   <section className={styles.outerCont}>
    <div className={styles.innerCont}>
        <div className={styles.cont}>
            <h1 className={styles.title}>{data?.title}:</h1>
            <img className={styles.img} src={data?.image} alt="" />
        </div>
        <h1 className={styles.subHeading}>{data?.name}</h1>
        <div className={styles.btnCont}>
        <button onClick={()=>goToChooseModulePage()} className={styles.prevBtn}>Prev <span className={styles.iconn}><IoIosArrowForward/></span></button>
        <button onClick={()=>setSubSlidesBegin(true)}  className={styles.nextBtn}>Next <span className={styles.icon}><IoIosArrowForward/></span></button>
        </div>
    </div>
   </section>
    }
    {subSlidesBegin&&<SubSlide data={data.slides} setSubSlidesBegin={setSubSlidesBegin}/>}
    </>
  )
}

export default ModuleCard