import React from "react";
import styles from "./Test.module.css";
import ConnectSuggestion from "../components/SidebarComponents/ConnectSuggestion/ConnectSuggestion";
import ProfileSummary from "../components/SidebarComponents/ProfileSummary/ProfileSummary";
import VibePatch from "../components/SidebarComponents/VibePatch/VibePatch";
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

function Test() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSidebar}>
        <ProfileSummary />
        <div style={{ marginTop: 50 }}></div>
        <ConnectSuggestion />
        <div style={{ marginTop: 50 }}></div>
        <VibePatch />
        <div style={{ marginTop: 50 }}></div>
        <ExploreTools />
        <div style={{ marginTop: 50 }}></div>
        <Journey />
        <div style={{ marginTop: 50 }}></div>
        <GetPremium />
      </div>
      <div className={styles.middleSection}>
        <DiscoverEvents />
        <div style={{ marginTop: 50 }}></div>
        <DiscoverPerfectTools />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedSuggestions />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedMentors />
      </div>
      <div className={styles.rightSidebar}>
        <Appoinments />
        <div style={{ marginTop: 50 }}></div>
        <TrendingNews />
        <div style={{ marginTop: 50 }}></div>
        <InvestorFinder />
        <div style={{ marginTop: 50 }}></div>
        <Events />
        <div style={{ marginTop: 50 }}></div>
        <Mentors />
      </div>
    </div>
  );
}

export default Test;
