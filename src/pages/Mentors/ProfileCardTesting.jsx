import React from "react";
import styles from "./TestingMentor.module.css";
import facebookIcon from "../../images/fbIcon.png";
import instaIcon from "../../images/instaIcon.png";
import linkedinIcon from "../../images/LinkedinIcon.png";
import twitterIcon from "../../images/TwitterIconn.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultDP from "../../images/Defaultdp.png"

const ProfileCardTesting = ({ mentor }) => {
  const navigate = useNavigate();
  const userDoc = useSelector((state) => state.userDoc);
  const emailToId = (email) => {
    var id = "";
    for (var i = 0; i < email.length; i++) {
      if (email[i] === "@") break;
      id += email[i];
    }
    return id;
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardLeftContent}>
        <div className={styles.leftMainImage}>
          <img
            src={
              mentor?.image
                ? mentor.image
                : {DefaultDP}
            }
            alt="MentorImage"
          />
        </div>
        <div className={styles.LeftCardtextContent}>
          <p>{mentor?.name}</p>
          <p>{mentor?.designation}</p>
        </div>
        <div className={styles.cardIcon}>
          <img src={facebookIcon} alt="FaceBookIcon" />
          <img src={instaIcon} alt="InstagramIcon" />
          <img
            src={linkedinIcon}
            alt="LinkedinIcon"
            onClick={() => {
              if (mentor.linkedin) {
                window.open(mentor.linkedin, "_blank");
              }
            }}
          />
          <img src={twitterIcon} alt="TwitterIcon" />
        </div>
      </div>
      <div className={styles.cardRightContent}>
        <div className={styles.rightCardMain}>
          <p>{mentor?.about.slice(0, 125)}...</p>
          <div className={styles.CardProfilekills}>
            {mentor?.domain?.slice(0, 2).map((item,idx) => {
              return <div key={idx} className={styles.skill}>{item}</div>;
            })}
          </div>
          <div className={styles.amountToPay}>
            <div>
              ₹{" "}
              {mentor?.plans[0] / 2 <= 5
                ? mentor?.plans[0] / 2
                : mentor?.plans[0] / 2 <= 500
                ? 500
                : mentor?.plans[0] / 2 > 500 && mentor?.plans[0] / 2 <= 750
                ? 750
                : mentor?.plans[0] / 2 > 750 && mentor?.plans[0] / 2 <= 1000
                ? 1000
                : mentor?.plans[0] / 2 > 1000 && mentor?.plans[0] / 2 <= 1500
                ? 1500
                : mentor?.plans[0] / 2 + 50}{" "}
              /30 mins
            </div>
          </div>
          <div
            className={styles.schedule}
            onClick={() => {
              navigate(
                `/schedule/${emailToId(mentor.email)}/${emailToId(userDoc.email)}`
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Schedule a session
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardTesting;
