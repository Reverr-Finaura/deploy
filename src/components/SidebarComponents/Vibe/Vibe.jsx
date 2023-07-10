import React from "react";
import vibeImg from "../../../images/Frame 6267617.svg";
import styles from "./Vibe.module.css";

function Vibe({ isLoggedIn, openModal }) {
  return (
    <div className={styles.container}>
      <img src={vibeImg} alt="img" />
      <button
        onClick={() => {
          if (!isLoggedIn) {
            return openModal();
          } else {
            console.log("user logged!");
          }
        }}
      >
        Coming soon!
      </button>
    </div>
  );
}

Vibe.defaultProps = {
  isLoggedIn: true,
  openModal: () => {},
};

export default Vibe;
