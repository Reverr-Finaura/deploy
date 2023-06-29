import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import UserAddProfile from "../User Add Profile/UserAddProfile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";
import { useNavigate } from "react-router-dom";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import { auth } from "../../firebase";
const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const userFundingDoc = useSelector((state) => state.userFundingDoc);

  console.log("userDoc", userDoc);
  console.log("userFundingDoc", userFundingDoc);

  const [hasUserProfile, setHasUserProfile] = useState(true);
  const [userDocId, setUserDocId] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  return (
    <>
      {hasUserProfile ? (
        <>
          {width >= 600 ? (
            <>
              <SidebarFinal />
              <NavBarFinal />
            </>
          ) : (
            <>
              <PhnSidebar />
              <KnowledgeNavbar />
            </>
          )}

          <section id="userProfilePage">
            <div className="user-profile-page-user-info">
              <h1 className="user-profile-page-user-info-title">MY PROFILE</h1>
              <img
                className="user-profile-page-user-info-img"
                src={
                  userDoc?.image
                    ? userDoc.image
                    : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                }
                alt="user-profile-img"
              />

              <button
                className="user-edit-profile-button"
                onClick={() => navigate("/user-edit-profile")}
              >
                Edit Profile
              </button>
            </div>

            <div className="user-general-info">
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Name</p>
                <p className="user-general-info-user">{userDoc?.name}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Phone Number</p>
                <p className="user-general-info-user">{userDoc?.phone}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Date Of Birth</p>
                <p className="user-general-info-user">{userDoc?.dob}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Gender</p>
                <p className="user-general-info-user">{userDoc?.gender}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">State</p>
                <p className="user-general-info-user">{userDoc?.state}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Country</p>
                <p className="user-general-info-user">{userDoc?.country}</p>
              </div>
              <div className="user-general-info-user-cont">
                <p className="user-general-info-user-name">Designation</p>
                <p className="user-general-info-user">
                  {userDoc?.designation === ""
                    ? "Not Available"
                    : userDoc?.designation}
                </p>
              </div>
              <div className="user-general-info-user-cont user-general-profile-about-cont">
                <p className="user-general-info-user-name">About</p>
                <p className="user-general-info-user user-general-profile-about-cont-user-name">
                  {userDoc?.about === "" ? "Not Available" : userDoc?.about}{" "}
                </p>
              </div>
            </div>

            {/* <section className='user-work-info'>
    <div className='user-general-info-user-cont'>
        <p className='user-general-info-user-name'>Current Work</p>
        <p className='user-general-info-user'>Marketing Research at Fintech</p>
    </div> 
    <div className='user-general-info-user-cont'>
        <p className='user-general-info-user-name'>Current Company</p>
        <p className='user-general-info-user'>Fintech</p>
    </div> 
    <div className='user-general-info-user-cont'>
        <p className='user-general-info-user-name'>Current Title</p>
        <p className='user-general-info-user'>Director of Marketing Research</p>
    </div> 
    <div className='user-general-info-user-cont'>
    <div className='user-current-job-info-left-cont'>
    <p className='user-general-info-user-name'>From</p>
    <p className='user-general-info-user'>March 2016</p>
    </div>
    <div className='user-current-job-info-right-cont'>
    <p className='user-general-info-user-name'>To</p>
    <p className='user-general-info-user'>April 2018</p>
    </div> 
    </div> 
    </section> */}

            {userDoc?.experience?.length !== 0 && (
              <section className="user-experience-info">
                <h3 className="user-experience-info-title">Experience</h3>

                {userDoc?.experience?.length === 0 ? (
                  <p className="no-social-link-avai-msg">
                    No Experience Details Available
                  </p>
                ) : null}
                <div className="user-experience-info-experince">
                  {userDoc?.experience?.map((item) => {
                    return (
                      <>
                        <div className="user-experience-info-company-role">
                          <h3 className="user-experience-info-company-role-company-name">
                            {item.previousOrCurrentOrganisation}
                          </h3>
                          <ul>
                            <li className="user-experience-info-company-role-job-profile">
                              {item.designation}
                            </li>
                            <li className="user-experience-info-company-role-job-profile">
                              {item.yourRole}
                            </li>
                            <li className="user-experience-info-company-role-job-profile">
                              {item.durationOfYears}
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })}
                </div>
              </section>
            )}

            {userDoc?.education?.length !== 0 && (
              <section className="user-education-info">
                <h4 className="user-education-info-title">Education</h4>
                {userDoc?.education?.length === 0 ? (
                  <p className="no-social-link-avai-msg">
                    No Education Details Available
                  </p>
                ) : null}
                <div className="user-education-info-degree-cont">
                  {userDoc?.education?.map((item) => {
                    return (
                      <>
                        <div className="user-education-info-specific-degree">
                          <p className="user-education-info-institute-name">
                            {item.schoolOrCollege}
                          </p>
                          <p className="user-education-info-institute-degree">
                            {item.degree}
                          </p>
                          <p className="user-education-info-institute-time-period">
                            {item.startingDate}-{item.lastDate}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </section>
            )}

            {userDoc?.instagramLink !== "" ||
              userDoc?.facebookLink !== "" ||
              userDoc?.twitterLink !== "" ||
              (userDoc?.linkedinLink !== "" && (
                <section className="user-how-can-we-meet-info">
                  <h3 className="user-how-can-we-meet-title">
                    How Can We Meet
                  </h3>
                  {userDoc?.instagramLink === "" &&
                  userDoc?.facebookLink === "" &&
                  userDoc?.twitterLink === "" &&
                  userDoc?.linkedinLink === "" ? (
                    <p className="no-social-link-avai-msg">
                      No Social Link Available
                    </p>
                  ) : null}
                  <div className="user-how-can-we-meet-social-icon-cont">
                    {userDoc?.instagramLink === "" ? null : (
                      <div className="user-how-can-we-meet-social-icon">
                        <a href={userDoc?.instagramLink}>
                          <img src="./images/instaIcon.svg" alt="social-icon" />
                        </a>
                      </div>
                    )}

                    {userDoc?.facebookLink === "" ? null : (
                      <div className="user-how-can-we-meet-social-icon">
                        <a href={userDoc?.facebookLink}>
                          <img
                            src="./images/faceBookIcon.svg"
                            alt="social-icon"
                          />
                        </a>
                      </div>
                    )}
                    {userDoc?.twitterLink === "" ? null : (
                      <div className="user-how-can-we-meet-social-icon">
                        <a href={userDoc?.twitterLink}>
                          <img
                            src="./images/twitterIcon.svg"
                            alt="social-icon"
                          />
                        </a>
                      </div>
                    )}
                    {userDoc?.linkedinLink === "" ? null : (
                      <div className="user-how-can-we-meet-social-icon">
                        <a href={userDoc?.linkedinLink}>
                          <img
                            src="./images/linkedinIcon.svg"
                            alt="social-icon"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              ))}
          </section>
        </>
      ) : (
        <UserAddProfile />
      )}
    </>
  );
};

export default UserProfile;
