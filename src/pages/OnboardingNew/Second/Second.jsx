import React, { useState } from "react";
import styles from "./Second.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";

function Second() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const handleDivClick = (type) => {
    setUserType(type);
  };

  const roleItems = [
    {
      text: "I’m a Founder",
      type: "founder",
      image: require("../../../images/onboardingfounder.png"),
    },
    {
      text: "I’m a Mentor",
      type: "mentor",
      image: require("../../../images/onboardingmentor.png"),
    },
    {
      text: "I’m an Investor",
      type: "investor",
      image: require("../../../images/onboardinginvester.png"),
    },
    {
      text: "I’m a Professional",
      type: "professionals",
      image: require("../../../images/onboardingprofessional.png"),
    },
    // {
    //   text: "I’m a Service Provider",
    //   type: "serviceproviders",
    //   image: require("../../../images/onboardingprovider.png"),
    // },
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
            Your Role?
          </text>
          <text style={{ fontSize: 16, color: "#ffffff" }}>
            Choose an option that fits you the best.
          </text>

          <div className={styles.roleContainer}>
            {roleItems.map((roleItem, index) => (
              <div
                key={index}
                className={`${styles.roleCard} ${
                  userType === roleItem.type ? styles.selected : ""
                }`}
                onClick={() => handleDivClick(roleItem.type)}
              >
                <text>{roleItem.text}</text>
                <img src={roleItem.image} alt="img" />
              </div>
            ))}
          </div>

          <div>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-first")}
            >
              Back
            </button>
            <button
              className={styles.rightButton}
              onClick={() => navigate("/onboarding-third")}
            >
              Next
            </button>
          </div>
        </div>
        <img src={require("../../../images/onboardingsecond.png")} alt="img" />
      </div>
    </div>
  );
}

export default Second;
