import React from "react";
import styles from "./Hero.module.css";

const Hero = ({ imgUrl }) => {
  return (
    <div className={styles.hero}>
      <img src={`/images/${imgUrl}`} alt="" className={styles.heroImg} />
      {/* <h1 className={styles.heroText}>{heading}</h1> */}
    </div>
  );
};

export default Hero;
