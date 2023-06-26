import React from "react";
import eye from "../../../images/eye.svg";
import people from "../../../images/people.svg";
import setting from "../../../images/setting.svg";
import edit from "../../../images/edit.svg";
import styles from "./ProfileSummary.module.css";

const ProfileSummary = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            src={require("../../../images/userIcon.png")}
            className={styles.profileImage}
            alt="Profile"
          />
          <div className={styles.userDetails}>
            <text className={styles.nameText}>Jatin Khurana</text>
            <text className={styles.positionText}>CEO @Reverr</text>
          </div>
        </div>
        <button
          className={styles.settingsButton}
          onClick={() => console.log("settings clicked")}
        >
          <img src={setting} alt="setting" />
        </button>
      </div>

      <div className={styles.viewConnectionRow}>
        <div className={styles.view}>
          <img className={styles.viewImage} src={eye} alt="eye" />
          <text className={styles.viewText}>4130 views</text>
        </div>
        <div className={styles.connection}>
          <img className={styles.connectionImage} src={people} alt="eye" />
          <text className={styles.connectionText}>259 connections</text>
        </div>
      </div>

      <div className={styles.space}>
        <text className={styles.spaceText}>SPACES</text>
        <img className={styles.spaceImage} src={edit} alt="eye" />
      </div>

      <div className={styles.spacesRow}>
        <div className={styles.spacesRowDiv}>
          <text className={styles.spacesRowText}>Fin Tech</text>
        </div>
        <div className={styles.spacesRowDiv}>
          <text className={styles.spacesRowText}>Visual Design</text>
        </div>
      </div>

      <div className={styles.progressbar}>
        <div style={{ width: "30%" }}></div>
        <text>2 out of 5 steps completed</text>
      </div>

      <div className={styles.complete_profile}>
        <button onClick={() => console.log("complete not clicked")}>
          Complete your profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
