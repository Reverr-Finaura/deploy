import React from "react";
import styles from "./stageTesting.module.css";
const DoneTesting = ({setStage}) => {
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };
  return (
    <div className={styles.stages_done}>
      <div className={styles.result_left}>
        <img src="/images/ResultMan.png" alt="ResultMan" />
      </div>
      <div className={styles.result_right}>
        <h1>And, you’re done!</h1>
        <p>We will review your start-up and get back to you in 24 hours.</p>
        <div className={styles.btn_div}>
          {/* <button className={styles.backbtn}>&lt; Back</button> */}
          <button className={styles.nextbtn} onClick={() => {handleNext()}}>
            {" "}
            See Your Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoneTesting;
