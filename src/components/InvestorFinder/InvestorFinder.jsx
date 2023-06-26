import React from "react";
import illustration from "../../images/illustration.svg";
import styles from "./InvestorFinder.module.css";

function InvestorFinder() {
  return (
    <div className={styles.container}>
      <p style={{ fontWeight: 500, fontSize: 15 }}>
        <span style={{ color: "#ffffff" }}>Struggling to</span>
        <span style={{ color: "#00B3FF" }}>&nbsp;find the ideal investor?</span>
      </p>
      <img
        style={{
          marginTop: 20,
        }}
        src={illustration}
        alt="img"
      />
      <span style={{ color: "#ffffff", fontSize: 10, display: "flex", textAlign: "center"}}>
        Worry not, because Reverr is here to help you to find investors
        perfectly suited for you.
      </span>
      <button onClick={() => console.log("Investor Finder clicked")}>
        Investor Finder
      </button>
    </div>
  );
}

export default InvestorFinder;
