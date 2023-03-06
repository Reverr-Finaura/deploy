import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import styles from "./CheckSlideCard.module.css"

const CheckSlideCard = ({limit,idx,setSubSlidesBegin,setIdx,data}) => {


    const handlePrev=(id)=>{
        if(idx===1){setSubSlidesBegin(false);return}
        setIdx((prev)=>{return prev-1})
        }
        
        const handleNext=()=>{
          setIdx((prev)=>{return prev+1})
        }

  return (
    <section className={styles.outerCont}>
    <section className={styles.innerCont}>
    <div className={styles.slideNoCont}>{idx}/{limit}</div>
      <h1 className={styles.title}>{data.title}</h1>
     
      {data.detail.map((info)=>{
        return <><p key={info} className={styles.info}>{info}</p></>
      })}
      <h1 className={styles.subHeading}>{data?.subHeading}</h1>
      {data.img&&<img className={styles.image} src={data.img} alt="" />}
      <div className={styles.btnCont}>
      <button onClick={()=>handlePrev(data.id)} className={styles.prevBtn}>Prev <span className={styles.iconn}><IoIosArrowForward/></span></button>
      {idx!==limit&&<button onClick={()=>handleNext()} className={styles.nextBtn}>Next <span className={styles.icon}><IoIosArrowForward/></span></button>}
      </div>
    </section>
  </section>
  )
}

export default CheckSlideCard