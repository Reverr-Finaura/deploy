import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./HomeNotLoggedIn.module.css";
import ConnectSuggestion from "../../components/SidebarComponents/ConnectSuggestion/ConnectSuggestion";
import ProfileSummary from "../../components/SidebarComponents/ProfileSummary/ProfileSummary";
import Vibe from "../../components/SidebarComponents/Vibe/Vibe";
import ExploreTools from "../../components/SidebarComponents/ExploreTools/ExploreTools";
import Journey from "../../components/SidebarComponents/Journey/Journey";
import GetPremium from "../../components/SidebarComponents/GetPremium/GetPremium";
import Appoinments from "../../components/SidebarComponents/Appoinments/Appoinments";
import TrendingNews from "../../components/SidebarComponents/TrendingNews/TrendingNews";
import Events from "../../components/SidebarComponents/Events/Events";
import Mentors from "../../components/SidebarComponents/Mentors/Mentors";
import InvestorFinder from "../../components/SidebarComponents/InvestorFinder/InvestorFinder";
import DiscoverEvents from "../../components/DynamicComponents/DiscoverEvents/DiscoverEvents";
import DiscoverPerfectTools from "../../components/DynamicComponents/DiscoverPerfectTools/DiscoverPerfectTools";
import FeaturedSuggestions from "../../components/DynamicComponents/FeaturedSuggestions/FeaturedSuggestions";
import FeaturedMentors from "../../components/DynamicComponents/FeaturedMentors/FeaturedMentors";
import CommunityFinalDark from "../../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import Patch from "../../components/SidebarComponents/Patch/Patch";

function HomeNotLoggedIn() {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  console.log("isLogInModalOpen: 1" + isLogInModalOpen)

  // const handleOutsideClick = (event) => {
  //   console.log("isLogInModalOpen: 2" + isLogInModalOpen)
  //   if (
  //     isLogInModalOpen &&
  //     modalRef.current &&
  //     !modalRef.current.contains(event.target) &&
  //     !buttonRef.current.contains(event.target)
  //   ) {
  //     setIsLogInModalOpen(false);
  //     console.log("isLogInModalOpen: 3" + isLogInModalOpen)
  //   }
  // };

  // useEffect(() => {
  //   // document.addEventListener("click", handleOutsideClick);
  //   console.log("issue fixed")

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isLogInModalOpen]);

  const openModal = React.useCallback(() => {
    console.log("openModal clicked");
    setIsLogInModalOpen(true);
  }, []);

  return (
    <>
      {isLogInModalOpen ? (
        <div className={styles.logInModalCont}>
          <div className={styles.logInModal} ref={modalRef}>
            <img src={require("../../images/userIcon.png")} alt="img" />
            <text style={{ color: "#ffffff", fontSize: 20, marginTop: 10 }}>
              Sign in to Continue
            </text>
           
            <button
              className={styles.signInButton}
              onClick={() => console.log("Sign in clicked")}
            >
              Sign in
            </button>
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine}></div>
              <span style={{ marginInline: 5, color: "#999b9e" }}>or</span>
              <div className={styles.dividerLine}></div>
            </div>
            <button
              className={styles.signInWithGoogleButton}
              onClick={() => console.log("signInWithGoogleButton clicked")}
            >
              <img src={require("../../images/google.png")} alt={"img"} />
              <span>Sign in with Google</span>
            </button>
            <div style={{ marginTop: 10 }}>
              <span style={{ color: "#999b9e", fontSize: 10 }}>
                New to Reverr?&nbsp;
              </span>
              <span
                style={{
                  color: "#00b3ff",
                  fontSize: 10,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Sign up
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <NavBarFinalDarkMode />
      <div className={styles.container}>
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          {/* <ProfileSummary />
          <div style={{ marginTop: 50 }}></div> */}

          <ConnectSuggestion isLoggedIn={false}  openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Vibe />
          <div style={{ marginTop: 50 }}></div>
          <Patch />
          <div style={{ marginTop: 50 }}></div>
          <ExploreTools />
          <div style={{ marginTop: 50 }}></div>
          <Journey />
          <div style={{ marginTop: 50 }}></div>
          <GetPremium />
          <div style={{ marginTop: 50 }}></div>
        </div>

        <div className={styles.middleSection}>
          <CommunityFinalDark />
          {/* <DiscoverEvents />
        <div style={{ marginTop: 50 }}></div>
        <DiscoverPerfectTools />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedSuggestions />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedMentors /> */}
        </div>

        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          {/* <Appoinments />
          <div style={{ marginTop: 50 }}></div> */}
          <TrendingNews />
          <div style={{ marginTop: 50 }}></div>
          <InvestorFinder />
          <div style={{ marginTop: 50 }}></div>
          <Events />
          <div style={{ marginTop: 50 }}></div>
          <Mentors />
        </div>
      </div>
    </>
  );
}

export default HomeNotLoggedIn;
