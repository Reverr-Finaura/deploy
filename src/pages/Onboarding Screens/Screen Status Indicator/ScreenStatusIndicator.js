import React from 'react'
import styles from "./ScreenStatusIndicator.module.css"

const ScreenStatusIndicator = ({pageNo}) => {
  return (
    <section className={styles.outer}>
        <div className={(pageNo===1||pageNo===2||pageNo===3)?styles.opt:styles.nonOpt}></div>
        <div className={(pageNo===2||pageNo===3)?styles.opt:styles.nonOpt}></div>
        <div className={pageNo===3?styles.opt:styles.nonOpt}></div>
    </section>
  )
}

export default ScreenStatusIndicator