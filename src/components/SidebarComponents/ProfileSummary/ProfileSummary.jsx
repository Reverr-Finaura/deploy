import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import eye from "../../../images/eye.svg";
import people from "../../../images/people.svg";
import setting from "../../../images/setting.svg";
import edit from "../../../images/edit.svg";
import styles from "./ProfileSummary.module.css";

const ProfileSummary = () => {
  const [profileCompletionProgress, setProfileCompletionProgress] = useState(0);
  const userDoc = useSelector((state) => state.userDoc);
  const navigate = useNavigate();

  // const spaces = useSelector((state) => state);
  // console.log("this is spaces");
  // console.log(spaces);

  // CHECK FOR USER PROFILE PROGRESS BAR
  useEffect(() => {
    function checkForUserProfileProgress() {
      let aboutPerc = 8.33;
      let countryPerc = 8.33;
      let desgPerc = 8.33;
      let dobPerc = 8.33;
      let educationPerc = 8.33;
      let experiencePerc = 8.33;
      let socialLinkPerc = 8.33;
      let genderPerc = 8.33;
      let imagePerc = 8.33;
      let industryPerc = 8.33;
      let statePerc = 8.33;
      let namePerc = 8.33;
      let percentComplete = 0;

      if (userDoc?.about?.length !== 0) {
        percentComplete += aboutPerc;
      }

      if (userDoc?.country?.length !== 0) {
        percentComplete += countryPerc;
      }
      if (userDoc?.designation?.length !== 0) {
        percentComplete += desgPerc;
      }

      if (userDoc?.dob?.length !== 0) {
        percentComplete += dobPerc;
      }

      if (userDoc?.education?.length !== 0) {
        percentComplete += educationPerc;
      }

      if (userDoc?.experience?.length !== 0) {
        percentComplete += experiencePerc;
      }

      if (
        userDoc?.facebookLink?.length !== 0 ||
        userDoc?.instagramLink?.length !== 0 ||
        userDoc?.linkedinLink?.length !== 0 ||
        userDoc?.twitterLink?.length !== 0
      ) {
        percentComplete += socialLinkPerc;
      }

      if (userDoc?.gender?.length !== 0) {
        percentComplete += genderPerc;
      }

      if (userDoc?.image?.length !== 0) {
        percentComplete += imagePerc;
      }

      if (userDoc?.industry?.length !== 0) {
        percentComplete += industryPerc;
      }

      if (userDoc?.name?.length !== 0) {
        percentComplete += namePerc;
      }

      if (userDoc?.state?.length !== 0) {
        percentComplete += statePerc;
      }

      setProfileCompletionProgress(Math.ceil(percentComplete));
    }
    checkForUserProfileProgress();
  }, [userDoc]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            src={
              userDoc?.image
                ? userDoc.image
                : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
            }
            className={styles.profileImage}
            alt="img"
          />
          <div className={styles.userDetails}>
            <text className={styles.nameText}>{userDoc?.name}</text>
            <text className={styles.positionText}>{userDoc?.designation}</text>
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
        {/* <div className={styles.view}>
          <img className={styles.viewImage} src={eye} alt="eye" />
          <text className={styles.viewText}>4130 views</text>
        </div> */}
        <div className={styles.connection}>
          <img className={styles.connectionImage} src={people} alt="eye" />
          <text className={styles.connectionText}>
            {userDoc?.network ? userDoc.network.length : 0} connections
          </text>
        </div>
      </div>

      <div className={styles.space}>
        <text className={styles.spaceText}>SPACES</text>
        <img className={styles.spaceImage} src={edit} alt="eye" />
      </div>

      {userDoc?.userSpaces?.length ? (
        <div className={styles.spacesRow}>
          {userDoc.userSpaces.slice(0,2).map((item, index) => (
            <div key={index} className={styles.spacesRowDiv}>
              <text className={styles.spacesRowText}>{item}</text>
            </div>
          ))}
        </div>
      ) : (
        <button
          className={styles.addSpaceButton}
          onClick={() => console.log("add spaces clicked")}
        >
          Add Space
        </button>
      )}

      <div className={styles.progressbar}>
        <div style={{ width: `${profileCompletionProgress}%` }}></div>
        <text>{100 - profileCompletionProgress}% is yet to complete</text>
      </div>

      <div className={styles.complete_profile}>
        <button onClick={() => navigate("/user-edit-profile")}>
          Complete your profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
