import React from "react";
import styles from "./RoundButton.module.css";

function RoundButton(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={styles.round_btn}
    >
      {props.children}
    </button>
  );
}

export default RoundButton;
