import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import styles from "./QuestionCard.module.css"
const QuestionCard = ({limit,idx,setSubSlidesBegin,setIdx,data}) => {
  const[isAnswerCalled,setIsAnswerCalled]=useState(false)

  const handlePrev=(id)=>{
    if(idx===1){setSubSlidesBegin(false);return}
    setIdx((prev)=>{return prev-1})
    setIsAnswerCalled(false)
    }
    
    const handleNext=()=>{
      setIdx((prev)=>{return prev+1})
      setIsAnswerCalled(false)
    }
  return (
    <>
      <section className={styles.outerCont}>
        <div className={styles.innerCont}>
        <div className={styles.slideNoCont}>{idx}/{limit}</div>
        <h1 className={styles.title}>
        {data.title}
        </h1>
        <h3 className={styles.question}>{data.question}</h3>
        <ol className={styles.optCont}>
        {data.options.map((opt)=>{
          return <>
<li className={styles.opt}>{opt}</li>
          </>
        })}
        </ol>
        {!isAnswerCalled&&<p onClick={()=>setIsAnswerCalled(true)} className={styles.viewOption}>View Answer</p>}
        {isAnswerCalled&&<p className={styles.answer}>ANS : {data.answer}</p>}
        <div className={styles.btnCont}>
        <button onClick={()=>handlePrev(data.id)} className={styles.prevBtn}>Prev <span className={styles.iconn}><IoIosArrowForward/></span></button>
        {idx!==limit&&<button onClick={()=>handleNext()} className={styles.nextBtn}>Next <span className={styles.icon}><IoIosArrowForward/></span></button>}
        </div>
        </div>
      </section>
    </>
  )
}

export default QuestionCard