import React from 'react'
import styles from "./ScreenStatusInd2.module.css"

const ScreenStatusInd2 = ({pageNo}) => {
  return (
    <section className={styles.outer}>
    <div className={(pageNo===1||pageNo===2||pageNo===3)?styles.opt:styles.nonOpt}></div>
    <div className={(pageNo===2||pageNo===3)?styles.opt:styles.nonOpt}></div>
</section>
  )
}

export default ScreenStatusInd2