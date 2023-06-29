import React from "react";
import styles from "./Price.module.css";

function Price(props) {
  return <div className={styles.price}>{props.price}</div>;
}

export default Price;
