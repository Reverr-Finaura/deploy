import React from "react";
import s from "./Input.module.css";

const Input = ({ label, ...props }) => {
  return (
    <div className={s.funding_input_div}>
      <label htmlFor="">{label}</label>
      <input {...props} />
    </div>
  );
};

export { Input };
