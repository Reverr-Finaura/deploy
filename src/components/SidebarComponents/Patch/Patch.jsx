import React from "react";
import styles from "./Patch.module.css";

function Patch({ isLoggedIn, openModal }) {
  return (
    <div className={styles.container}>
      {/* <img src={vibeImg} alt="img" />
      <button onClick={() => console.log("vibe clicked")}>
        Explore VIBE &nbsp;&gt;
      </button> */}
      <img
        // style={{ marginTop: 40 }}
        src={require("../../../images/image 827.png")}
        alt="img"
      />
      <text
        style={{
          marginTop: 10,
          fontSize: 25,
          fontWeight: 700,
          color: "#00B3FF",
        }}
      >
        PATCH
      </text>
      <text
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        One-on-One Networking
      </text>
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
        Coming Soon!
      </button>
    </div>
  );
}

Patch.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Patch;
