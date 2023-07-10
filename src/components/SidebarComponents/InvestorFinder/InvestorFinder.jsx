import React from "react";
import illustration from "../../../images/illustration.svg";
import styles from "./InvestorFinder.module.css";
import { useNavigate } from "react-router-dom";

function InvestorFinder({ isLoggedIn, openModal }) {
  const navigate = useNavigate();
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
      <span
        style={{
          color: "#ffffff",
          fontSize: 10,
          display: "flex",
          textAlign: "center",
        }}
      >
        Worry not, Apply on Reverr.
      </span>
      <button
        onClick={() => {
          if (!isLoggedIn) {
            return openModal();
          } else {
            //normal code
            // console.log("user logged!");
            navigate("/funding-page");
          }
        }}
      >
        Raise Funds
      </button>
    </div>
  );
}

InvestorFinder.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default InvestorFinder;
