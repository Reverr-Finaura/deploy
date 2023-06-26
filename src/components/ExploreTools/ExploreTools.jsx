import React from "react";
import styles from "./ExploreTools.module.css";

function ExploreTools() {
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
        src={require("../../images/explore.png")}
        alt="img"
      />
      <button onClick={() => console.log("explore tools clicked")}>
        Explore Tools
      </button>
    </div>
  );
}

export default ExploreTools;
