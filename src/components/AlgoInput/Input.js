import React from "react";
import styles from "./Input.module.css";

const Input = ({ title, ...props }) => {
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

const TextArea = ({ title, ...props }) => {
  return (
    <div className={styles.textarea}>
      <p>
        {title}
        <span style={{ color: "red" }}>*</span>
      </p>
      <textarea {...props} />
    </div>
  );
};

export { Input, TextArea };
