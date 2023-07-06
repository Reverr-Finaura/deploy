import React from "react";
import styles from "./Input.module.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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

const DropDown = ({
  title,
  nonscored,
  content,
  tooltip,
  options,
  ...props
}) => {
  return (
    <>
      <div className={styles.dropdown}>
        <p>
          {title}
          <span style={{ color: "red" }}>*</span>
        </p>
        <select
          {...props}
          data-tooltip-id={props.name}
          data-tooltip-content={content}
          data-tooltip-place="top"
          data-tooltip-float
        >
          {options.map((option) => (
            <option value={option.value}>
              {nonscored ? option : option.value}
            </option>
          ))}
        </select>
      </div>
      {tooltip && <Tooltip id={props.name} />}
    </>
  );
};

export { Input, TextArea, DropDown };
