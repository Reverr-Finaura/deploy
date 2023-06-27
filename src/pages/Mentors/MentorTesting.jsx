import React from "react";
import styles from "./TestingMentor.module.css";
import FinanceImg from "../../images/FinanceImg.png";
import ProfileCardTesting from "./ProfileCardTesting";

const MentorTesting = () => {
  return (
    <div className={styles.mentor}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            Find the best <span>Mentors</span>
          </div>
          <div>
            <input type="text" placeholder="Search a mentor..." />
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <p>Featured Mentors</p>
          <div className={styles.slider}>
            <ProfileCardTesting />
          </div>
        </div>

        {/* ---------------Category Content------------------ */}
        <div className={styles.categoryWrapper}>
          <p>
            Browse by <span>Categories</span>
          </p>
          <div className={styles.categoryContainer}>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
            <div className={styles.categoryCard}>
              <img src={FinanceImg} alt="Categorycard" />
              <p>Finance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorTesting;
