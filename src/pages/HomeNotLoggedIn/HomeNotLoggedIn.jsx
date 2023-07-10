import React, { useState } from "react";
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

  const openModal = React.useCallback(() => {
    setIsLogInModalOpen(true);
  }, []);
  return (
    <>
      {isLogInModalOpen ? (
        <div className={styles.logInModalCont}>
          <div className={styles.logInModal}>
            <span
              className={styles.closeIcon}
              onClick={() => setIsLogInModalOpen(false)}
            >
              X
            </span>
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
              className={styles.signUpButton}
              onClick={() => console.log("signUpButton clicked")}
            >
              {/* <img src={require("../../images/google.png")} alt={"img"} /> */}
              <span>Sign up</span>
            </button>
            {/* <div style={{ marginTop: 10 }}>
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
            </div> */}
          </div>
        </div>
      ) : null}

      <NavBarFinalDarkMode isLoggedIn={false} openModal={openModal} />
      <div className={styles.container}>
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          {/* <ProfileSummary />
          <div style={{ marginTop: 50 }}></div> */}
          <ConnectSuggestion isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Vibe isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Patch isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <ExploreTools isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Journey isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          {/* <GetPremium /> */}
          <div style={{ marginTop: 50 }}></div>
        </div>

        <div className={styles.middleSection}>
          <CommunityFinalDark isLoggedIn={false} openModal={openModal}/>
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
          <TrendingNews isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <InvestorFinder isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Events isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Mentors isLoggedIn={false} openModal={openModal} />
        </div>
      </div>
    </>
  );
}

export default HomeNotLoggedIn;
