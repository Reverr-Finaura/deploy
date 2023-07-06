import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import styles from "./CheckpointCard.module.css"

const CheckpointCard = ({limit,idx,setSubSlidesBegin,setIdx,data}) => {

    const handlePrev=(id)=>{
        if(idx===1){setSubSlidesBegin(false);return}
        setIdx((prev)=>{return prev-1})
        
        }
        
        const handleNext=()=>{
          setIdx((prev)=>{return prev+1})
          
        }

  return (
    <section className={styles.outerCont}>
   <div className={styles.innerCont}>
   <div className={styles.slideNoCont}>{idx}/{limit}</div>
   <div className={styles.cont}>
    <h1 className={styles.title}>{data.title} </h1>
    {data.img&&<img className={styles.img} src={data.img} alt="img" />}
    </div>
    <h1 className={styles.Subtitle}>{data?.name}</h1>
    {data.image&&<img className={styles.image} src={data.image} alt="img" />}
    <div className={styles.btnCont}>
        <button onClick={()=>handlePrev(data.id)} className={styles.prevBtn}>Prev <span className={styles.iconn}><IoIosArrowForward/></span></button>
        {idx!==limit&&<button onClick={()=>handleNext()} className={styles.nextBtn}>Next <span className={styles.icon}><IoIosArrowForward/></span></button>}
        </div>
    </div>
   </section>
  )
}

export default CheckpointCard