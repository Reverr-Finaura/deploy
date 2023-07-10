import React from "react";
import styles from "./ExploreTools.module.css";
import { useNavigate } from "react-router-dom";

function ExploreTools({ isLoggedIn, openModal }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <p style={{ fontWeight: 500, fontSize: 15 }}>
        <span style={{ color: "#ffffff" }}>
          Elevate your startup performance
        </span>
        <br />
        <span style={{ color: "#ffffff" }}>with our next-level</span>
        <span style={{ color: "#00B3FF" }}>&nbsp;online tools!</span>
      </p>
      <img
        style={{
          marginTop: 20,
        }}
        src={require("../../../images/peoplediscussion.png")}
        alt="img"
      />
      <button
        onClick={() => {
          if (!isLoggedIn) {
            return openModal();
          } else {
            //normal code
            console.log("user logged!");
          }
        }}
      >
        Explore Tools
      </button>
    </div>
  );
}

ExploreTools.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default ExploreTools;
