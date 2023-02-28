import React from "react";
import styles from "./Input.module.css";

const Input = ({ name, title, ...props }) => {
  return (
    <div className={styles.input}>
      <p>
        {title}
        <span style={{ color: "red" }}>*</span>
      </p>
      <input {...props} />
    </div>
  );
};

const TextArea = ({ name, title, placeholder }) => {
  return (
    <div className={styles.textarea}>
      <p>
        {title}
        <span style={{ color: "red" }}>*</span>
      </p>
      <textarea placeholder={placeholder} />
    </div>
  );
};

export { Input, TextArea };
