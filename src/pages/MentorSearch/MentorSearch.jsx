import React from "react";
import styles from "./mentorSearch.module.css";
import Arrow from "../../images/evaArrowIosDownwardFill2.svg";
import ProfileCardTesting from "../Mentors/ProfileCardTesting";
const MentorSearch = () => {
  return (
    <>
      <div className={styles.searchPageWrapper}>
        <div className={styles.title}>
          <p>
            <img src={Arrow} alt="NavigateArrow" />
            Business
          </p>
        </div>
        <div className={styles.searchResultContainer}>
            <ProfileCardTesting />
            <ProfileCardTesting />
            <ProfileCardTesting />
            <ProfileCardTesting />
            <ProfileCardTesting />
        </div>
      </div>
    </>
  );
};

export default MentorSearch;
