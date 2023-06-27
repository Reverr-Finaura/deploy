import React from "react";
import styles from "./TestingMentor.module.css";
import mentorImage from "../../images/MentorProfileCard.png";
import facebookIcon from "../../images/fbIcon.png";
import instaIcon from "../../images/instaIcon.png";
import linkedinIcon from "../../images/LinkedinIcon.png";
import twitterIcon from "../../images/TwitterIconn.png";
const ProfileCardTesting = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardLeftContent}>
        <div className={styles.leftMainImage}>
          <img src={mentorImage} alt="MentorImage" />
        </div>
        <div className={styles.LeftCardtextContent}>
          <p>Theresa Webb</p>
          <p>Founder, Abstergo</p>
        </div>
        <div className={styles.cardIcon}>
          <img src={facebookIcon} alt="FaceBookIcon" />
          <img src={instaIcon} alt="InstagramIcon" />
          <img src={linkedinIcon} alt="LinkedinIcon" />
          <img src={twitterIcon} alt="TwitterIcon" />
        </div>
      </div>
      <div className={styles.cardRightContent}>
        <div className={styles.rightCardMain}>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatu
          </p>
          <div className={styles.CardProfilekills}>
            <div className={styles.skill}>Self Advisery</div>
            <div className={styles.skill}>Product Management</div>
            <div className={styles.skill}>Self Advisery</div>
            <div className={styles.skill}>Self Advisery</div>
          </div>
          <div className={styles.amountToPay}>
            <div>₹ 1500/30 mins</div>
          </div>
          <div className={styles.schedule}>Schedule a session</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardTesting;
