import React, { useState } from "react";
import styles from "./First.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";

function First() {
  const navigate = useNavigate();
  const [userSpace, setUserSpace] = useState([]);

  const handleSpaceClick = (spaceText) => {
    if (userSpace.includes(spaceText)) {
      // If the space text is already selected, remove it from the array
      setUserSpace(userSpace.filter((text) => text !== spaceText));
    } else {
      // If the space text is not selected, add it to the array
      setUserSpace([...userSpace, spaceText]);
    }
  };

  const spaceItems = [
    { image: require("../../../images/onboarding11.png"), text: "FinTech" },
    { image: require("../../../images/onboarding12.png"), text: "EdTech" },
    { image: require("../../../images/onboarding13.png"), text: "FoodTech" },
    { image: require("../../../images/onboarding14.png"), text: "AgriTech" },
    { image: require("../../../images/onboarding15.png"), text: "E-Commerce" },
    {
      image: require("../../../images/onboarding16.png"),
      text: "Logistics & Delivery",
    },
    {
      image: require("../../../images/onboarding17.png"),
      text: "CleanTech & RE",
    },
    { image: require("../../../images/onboarding18.png"), text: "AI & ML" },
    { image: require("../../../images/onboarding19.png"), text: "Web 3.0" },
    {
      image: require("../../../images/onboarding110.png"),
      text: "FashionTech",
    },
    { image: require("../../../images/onboarding111.png"), text: "HealthTech" },
    { image: require("../../../images/onboarding112.png"), text: "SpaceTech" },
    {
      image: require("../../../images/onboarding113.png"),
      text: "Cybersecurity",
    },
    { image: require("../../../images/onboarding114.png"), text: "AR & VR" },
    {
      image: require("../../../images/onboarding115.png"),
      text: "Internet of Things(IOT)",
    },
    { image: require("../../../images/onboarding116.png"), text: "Biotech" },
    { image: require("../../../images/onboarding117.png"), text: "RealEstate" },
    { image: require("../../../images/onboarding118.png"), text: "TravelTech" },
    { image: require("../../../images/onboarding119.png"), text: "BeautyTech" },
    { image: require("../../../images/onboarding120.png"), text: "LegalTech" },
    { image: require("../../../images/onboarding121.png"), text: "HR-Tech" },
    {
      image: require("../../../images/onboarding122.png"),
      text: "Personal Fitness Tech",
    },
    {
      image: require("../../../images/onboarding123.png"),
      text: "Waste Management",
    },
    { image: require("../../../images/onboarding124.png"), text: "CloudTech" },
  ];

  return (
    <div className={styles.container}>
      <div
        onClick={() => navigate("/")}
        className={styles.navbarBrandLogoImgCont}
      >
        <img
          className={styles.navbarFinalBrandLogoImg}
          src={ReverrDarkIcon}
          alt="brand-logo"
        />
        <span className={styles.reverrHeadingSpan}>
          <p className={styles.reverrHeading}>Reverr</p>
        </span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftComponent}>
          <text style={{ fontSize: 40, color: "#ffffff", marginBlock: 20 }}>
            Choose your Space(s).
          </text>
          <text style={{ fontSize: 14, color: "#ffffff" }}>
            Your Space will define your Reverr experience.
          </text>

          <div className={styles.spaceContainer}>
            {spaceItems.map((spaceItem, index) => (
              <div
                key={index}
                className={`${styles.spaceItem} ${
                  userSpace.includes(spaceItem.text) ? styles.selected : ""
                }`}
                onClick={() => handleSpaceClick(spaceItem.text)}
              >
                <img src={spaceItem.image} alt="img" />
                <text>{spaceItem.text}</text>
              </div>
            ))}
          </div>

          <div style={{ width: "100%" }}>
            <button
              className={styles.nextButton}
              onClick={() => navigate("/onboarding-second")}
            >
              Next
            </button>
          </div>
        </div>
        <img src={require("../../../images/onboardingfirst.png")} alt="img" />
      </div>
    </div>
  );
}

export default First;
