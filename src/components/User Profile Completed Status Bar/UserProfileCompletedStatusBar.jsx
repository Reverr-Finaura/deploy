import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { setUserDoc } from "../../features/userDocSlice";
import { db } from "../../firebase";
import "./UserProfileCompletedStatusBar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserProfileCompletedStatusBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);

  const [profileCompletionProgress, setProfileCompletionProgress] = useState(0);

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
  useEffect(() => {
    setProfileCompletionProgress(0);
  }, []);

  // CHECK FOR USER DOC DATA
  // useEffect(()=>{
  //     async function fetchUserDocFromFirebase(){
  //       const userDataRef = collection(db, "Users");
  //       const q = query(userDataRef);
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {

  //        if(doc.id===user?.user?.email){
  //         dispatch(setUserDoc(doc.data()));
  //        }
  //       });
  //     }
  //   fetchUserDocFromFirebase()
  //   },[user])

  return (
    <>
      <div className="progress_container">
        <h3>Complete Your Profile</h3>
        <p>Your start-up score is better than 80% of the other founders.</p>
        <div className="progressbar">
          <div style={{ width: `${profileCompletionProgress}%` }}></div>
        </div>
        <div className="complete_profile">
          <button onClick={() => navigate("/user-edit-profile")}>
            Complete Now
          </button>
          <span>{profileCompletionProgress}%</span>
        </div>
      </div>
    </>
  );
};

export default UserProfileCompletedStatusBar;
