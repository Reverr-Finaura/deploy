import React from "react";
import styles from "./GetPremium.module.css";

function GetPremium() {
  return (
    <div className={styles.container}>
        <div style={{ alignItems: "center",fontWeight: 500, fontSize: 15 }}>
          <span style={{ color: "#ffffff" }}>Upgrade to </span>
          <span style={{ color: "#00B3FF" }}>&nbsp;Premium</span>
        </div>
        <span style={{  fontWeight: 500, fontSize: 15, color: "#ffffff" }}>and receive exclusive access</span>
      <button onClick={() => console.log("get primium clicked")}>
        Get Premium &nbsp;&gt;
      </button>
    </div>
  );
}

export default GetPremium;
