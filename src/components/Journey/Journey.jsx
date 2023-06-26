import React from "react";
import styles from "./Journey.module.css";

function Journey() {
  return (
    <div className={styles.container}>
      <p style={{ fontWeight: 500, fontSize: 15 }}>
        <span style={{ color: "#ffffff" }}>Check out our tailor-made</span>
        <br />
        <span style={{ color: "#00B3FF" }}>roadmap of courses</span>
        <span style={{ color: "#ffffff" }}>&nbsp;just for you!</span>
      </p>
      <div>
        <img src={require("../../images/Rectangle 1612.png")} alt="img" />
        <button onClick={() => console.log("patch clicked")}>
        The Journey &nbsp;&gt;
        </button>
      </div>
    </div>
  );
}

export default Journey;
