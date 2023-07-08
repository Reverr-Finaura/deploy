import React, { useEffect, useState } from "react";
import styles from "./UserProfileTesting.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import DefaultDP from "../../images/Defaultdp.png";

const UserProfileTesting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const userFundingDoc = useSelector((state) => state.userFundingDoc);

  //   console.log("userDoc", userDoc);
  //   console.log("userFundingDoc", userFundingDoc);

  const [hasUserProfile, setHasUserProfile] = useState(true);
  const [userDocId, setUserDocId] = useState([]);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDocId((prev) => {
          return [...prev, doc.id];
        });
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  // CHECK IF USER HAS FUNDING PROFILE

  useEffect(() => {
    if (userDoc?.hasFundingProfile === "No") {
      return;
    }
    async function fetchUserFundingDocFromFirebase() {
      const userFundingDataRef = collection(db, "Funding");
      const q = query(userFundingDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserFundingDoc(doc.data()));
        }
      });
    }
    fetchUserFundingDocFromFirebase();
  }, [userDoc]);

  useEffect(() => {
    if (user && userDoc) {
      if (userDoc?.hasGeneralProfile === true) {
        setHasUserProfile(true);
        return;
      } else if (userDoc?.hasGeneralProfile === false) {
        setHasUserProfile(false);
      }
    }
  }, [userDoc]);

  //   console.log("hasUserProfile", hasUserProfile);
  console.log("userDoc", userDoc);

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <img src="/images/profileArrowLeft.svg" alt="Linkedin" />
            <p>My Profile</p>
          </div>
          <div className={styles.profileUser}>
            <div className={styles.profileBackground}></div>
            <div className={styles.profileImage}>
              {/* <img src="/images/UserProfileTest.png" alt="Linkedin" /> */}
              <img
                src={
                  userDoc?.image && userDoc?.image !== ""
                    ? userDoc.image
                    : DefaultDP
                }
                alt="Linkedin"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileUserIcon}>
                <img src="/images/fluent_call-24-regular.svg" alt="Linkedin" />
                <img src="/images/logos_google-gmail.svg" alt="Linkedin" />
                <img src="/images/skill-icons_linkedin.svg" alt="Linkedin" />
              </div>
              <div className={styles.profileInfoName}>
                <p>{userDoc?.name}</p>
              </div>
              <div className={styles.profileDesignation}>
                <p>Software Engineer</p>
              </div>
              <div className={styles.profileLocation}>
                <img
                  src="/images/basil_location-outline.svg"
                  alt="ProfileImage"
                />
                <p>San Francisco, CA</p>
              </div>
              <div className={styles.profilePost}>
                <p>10 Posts . 130 Connections</p>
              </div>
              <button>Edit Profile</button>
            </div>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.aboutMe}>
              <p>About Me</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
            <div className={styles.connect}>
              <p>How can we connect?</p>
              <button>Video Call</button>
            </div>
          </div>
          <div className={styles.profileEducation}>
            <div className={styles.education}>
              <p>Education</p>
              <div className={styles.educationInfo}>
                <ul>
                  <li>BTech, IIT Delhi</li>
                  <li>MSc., Harvard</li>
                </ul>
              </div>
            </div>
            <div className={styles.experience}>
              <p>My Work Experience</p>
              <div className={styles.educationInfo}>
                <ul>
                  <li>CEO at Reverr</li>
                  <li>Lorem ipsum hgvfc vhvjub </li>
                  <li>Lorem ipsum hgvfc vhvjub vgvfcfg szd</li>
                </ul>
              </div>
            </div>
            <div className={styles.experienceConnect}>
              <p>I am here to </p>
              <div className={styles.experienceBtn}>
                <button>Find a Mentor</button>
                <button>Raise Investment</button>
              </div>
            </div>
          </div>
          <div className={styles.profileContact}>
            <div className={styles.contact}>
              <p>My Connections</p>
              <div className={styles.contactItem}>
                <img src="/images/skill-icons_linkedin.svg" alt="Linkedin" />
                <p>Connect with me on Linkedin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileTesting;
