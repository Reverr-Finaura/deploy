import React from "react";
import vibeImg from "../../../images/Frame 6267617.svg";
import styles from "./VibePatch.module.css";

function VibePatch() {
  return (
    <div className={styles.container}>
      <img src={vibeImg} alt="img" />
      <button onClick={() => console.log("vibe clicked")}>
        Explore VIBE &nbsp;&gt;
      </button>
      <img
        style={{ marginTop: 40 }}
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
      <button onClick={() => console.log("patch clicked")}>
        Explore PATCH &nbsp;&gt;
      </button>
    </div>
  );
}

export default VibePatch;
