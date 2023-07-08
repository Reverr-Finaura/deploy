import React from "react";
import vibeImg from "../../../images/Frame 6267617.svg";
import styles from "./Vibe.module.css";

function Vibe() {
  return (
    <div className={styles.container}>
      <img src={vibeImg} alt="img" />
      <button onClick={() => console.log("vibe clicked")}>
        Coming soon! 
      </button>
    </div>
  );
}

export default Vibe;
