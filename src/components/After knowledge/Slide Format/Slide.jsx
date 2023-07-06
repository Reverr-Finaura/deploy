import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Slide.module.css";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  backward,
  forward,
  selectAnimation,
} from "../../../features/animationSlice";

const Slide = ({ content, setCurrIndex, currIndex, size }) => {
  const animation = useSelector(selectAnimation);
  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(forward());
    setCurrIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    dispatch(backward());
    setCurrIndex((prev) => prev - 1);
  };
  

  return (
    <div className={`${styles.slide_container} animate__animated ${animation}`}>
      <div className={styles.course_content}>
        <div className={styles.course_details}>
          <h1>{content.title}</h1>
          <p>{content.para}</p>
          <div className={styles.btns_div}>
            {
              currIndex>0&&(
                <button
                style={{ display: currIndex === size - 1 && "none" }}
                onClick={handlePrev}>
                ⬅Move Back
                </button>
              )
            }
            <button
              onClick={handleNext}
              style={{ display: currIndex === size - 1 && "none" }}
            >
              Move Ahead ➡
            </button>
            <a href="/knowledge"
              style={{ display: currIndex === size - 1 ? "block":"none" }}
            >
              Done!
            </a>
          </div>
        </div>
        <div className={styles.course_img}>
          <img src={`/images/${content.img}`} alt="" />
        </div>
      </div>
      <div className={styles.page_line}>
        <div>
          <span>{currIndex + 1}</span>/<span>{size}</span>
        </div>
      </div>
    </div>
  );
};

export default Slide;
