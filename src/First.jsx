import React from "react";
import ConnectSuggestion from "./components/SidebarComponents/ConnectSuggestion/ConnectSuggestion";
import ProfileSummary from "./components/SidebarComponents/ProfileSummary/ProfileSummary";
import VibePatch from "./components/SidebarComponents/VibePatch/VibePatch";
import ExploreTools from "./components/SidebarComponents/ExploreTools/ExploreTools";
import Journey from "./components/SidebarComponents/Journey/Journey";
import GetPremium from "./components/SidebarComponents/GetPremium/GetPremium";
import Appoinments from "./components/SidebarComponents/Appoinments/Appoinments";
import TrendingNews from "./components/SidebarComponents/TrendingNews/TrendingNews";
import Events from "./components/SidebarComponents/Events/Events";
import Mentors from "./components/SidebarComponents/Mentors/Mentors";
import InvestorFinder from "./components/SidebarComponents/InvestorFinder/InvestorFinder"
function First() {
  return (
    <div
      style={{
        backgroundColor: "#030B18",
        flexDirection: "row",
        justifyContent: "space-between",
        // flexDirection: "column",
        display: "flex",
      }}
    >
      <div style={{ width: 300, padding: 30, borderRadius: 15 }}>
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
        <div style={{ width: 350, padding: 30, borderRadius: 15 }}>
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

export default First;
