import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${props.className} ${styles.button}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
