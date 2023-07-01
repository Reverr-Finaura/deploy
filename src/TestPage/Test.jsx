import React from "react";
import { useSelector } from "react-redux";
import styles from "./Test.module.css";
import ConnectSuggestion from "../components/SidebarComponents/ConnectSuggestion/ConnectSuggestion";
import ProfileSummary from "../components/SidebarComponents/ProfileSummary/ProfileSummary";
import Vibe from "../components/SidebarComponents/Vibe/Vibe";
import ExploreTools from "../components/SidebarComponents/ExploreTools/ExploreTools";
import Journey from "../components/SidebarComponents/Journey/Journey";
import GetPremium from "../components/SidebarComponents/GetPremium/GetPremium";
import Appoinments from "../components/SidebarComponents/Appoinments/Appoinments";
import TrendingNews from "../components/SidebarComponents/TrendingNews/TrendingNews";
import Events from "../components/SidebarComponents/Events/Events";
import Mentors from "../components/SidebarComponents/Mentors/Mentors";
import InvestorFinder from "../components/SidebarComponents/InvestorFinder/InvestorFinder";
import DiscoverEvents from "../components/DynamicComponents/DiscoverEvents/DiscoverEvents";
import DiscoverPerfectTools from "../components/DynamicComponents/DiscoverPerfectTools/DiscoverPerfectTools";
import FeaturedSuggestions from "../components/DynamicComponents/FeaturedSuggestions/FeaturedSuggestions";
import FeaturedMentors from "../components/DynamicComponents/FeaturedMentors/FeaturedMentors";
import CommunityFinalDark from "../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../components/Navbar Dark Mode/NavBarFinalDarkMode";
import Patch from "../components/SidebarComponents/Patch/Patch";

function Test() {
  const appoinments = useSelector(
    (state) => state.userDoc.Appointement_request
  );
  const userType = useSelector((state) => state.onboarding.userType);

  const products = {
    Mentor: [
      "ACCESS TO STARTUPS",
      "DISCOVERABILITY",
      "SUPPORT SERVICES",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "RAAYA",
      "NEWS & ARTICLES",
      "DISCOVER",
      "EVENTS",
      "CIRCLES",
      "MESSAGES & NOTIFICATIONS",
    ],
    Investor: [
      "PATCH",
      "VIBE",
      "DASHBOARD",
      "COMMUNITY",
      "CIRCLES",
      "RAAYA",
      "DISCOVER",
      "PROFILE",
      "NEWS & ARTICLES",
      "EVENTS",
      "SEARCH ENGINE",
      "MESSAGES & NOTIFICATIONS",
    ],
    Founder: [
      "MENTOR",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "FUNDING-APPLY",
      "EVENTS",
      "TOOLS",
      "JOBS",
      "CIRCLES",
      "RAAYA",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "INVESTOR FINDER",
      "DISCOVER",
      "MESSAGES & NOTIFICATIONS",
    ],
    Individual: [
      "MENTOR",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "FUNDING-APPLY",
      "EVENTS",
      "TOOLS",
      "JOBS",
      "CIRCLES",
      "RAAYA",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "INVESTOR FINDER",
      "DISCOVER",
      "MESSAGES & NOTIFICATIONS",
    ],
    Professionals: [
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "EVENTS",
      "JOBS",
      "CIRCLES",
      "DISCOVER",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "MESSAGES & NOTIFICATIONS",
    ],
    ServiceProviders: [
      "ACCESS TO STARTUPS",
      "RAAYA",
      "MESSAGES & NOTIFICATIONS",
      "DASHBOARD",
      "PREMIUM",
    ],
    IB: [
      "SUPPORT SERVICES-CLOSING",
      "DISCOVERABILITY OVER THE PLATFORM- PLATFORM FEES",
      "DASHBOARD",
    ],
  };

  

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.container}>
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          <ProfileSummary />
          <div style={{ marginTop: 50 }}></div>
          <ConnectSuggestion />
          {products[userType].includes("VIBE") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Vibe />
            </>
          ) : null}
          {products[userType].includes("PATCH") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Patch />
            </>
          ) : null}
          {products[userType].includes("TOOLS") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <ExploreTools />
            </>
          ) : null}
          <div style={{ marginTop: 50 }}></div>
          <Journey />
          <div style={{ marginTop: 50 }}></div>
          <GetPremium />
          <div style={{ marginTop: 50 }}></div>
        </div>

        <div className={styles.middleSection}>
          <CommunityFinalDark />
          <DiscoverEvents />
        <div style={{ marginTop: 50 }}></div>
        <DiscoverPerfectTools />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedSuggestions />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedMentors />
        </div>

        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          {appoinments?.length ? (
            <>
              <Appoinments />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userType].includes("NEWS & ARTICLES") ? (
            <>
              <TrendingNews />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userType].includes("INVESTOR FINDER") ? (
            <>
              <InvestorFinder />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userType].includes("EVENTS") ? (
            <>
              <Events />
          <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          <Mentors />
        </div>
      </div>
    </>
  );
}

export default Test;
