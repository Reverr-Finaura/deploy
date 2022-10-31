import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { modify } from "../../../features/newUserSlice";
import Footer from "../../Footer/Footer";
import styles from "./education.module.css";

const Education = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [educationLevel, setEducationLevel] = useState(null);

  const array = [
    { level: "High School", image: "./images/edu1.png" },
    { level: "College", image: "./images/edu2.png" },
    { level: "Under Graduate", image: "./images/edu3.png" },
    { level: "Post Graduate", image: "./images/edu4.png" },
    { level: "PHD", image: "./images/edu5.png" },
    { level: "Other", image: "./images/edu6.png" },
  ];

  const handleNext = () => {
    dispatch(modify({ educationLevel }));
    navigate("/gender");
  };

  const handleSkip = () => {
    dispatch(modify({ educationLevel: null }));
    navigate("/gender");
  };

  return (
    <>
      <Header theme={"black"} />
      <div className={styles.education__container}>
        <h1 className={styles.big__heading}>Let's know about your education</h1>
        <div className={styles.education__cards}>
          {array.map((item, index) => {
            if (index < 3) {
              return (
                <div
                  onClick={() => {
                    if (educationLevel === item.level) {
                      setEducationLevel(null);
                    } else if (educationLevel !== item.level) {
                      setEducationLevel(item.level);
                    }
                  }}
                  key={index}
                  className={styles.education__card}
                >
                  <img
                    src={item.image}
                    alt={item.level}
                    className={styles.edu__img}
                  />
                  <div
                    className={styles.edu__name}
                    style={{
                      borderBottom:
                        educationLevel === item.level && "2px solid blue",
                    }}
                  >
                    {item.level}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={styles.education__cards}>
          {array.map((item, index) => {
            if (index >= 3) {
              return (
                <div
                  onClick={() => {
                    if (educationLevel === item.level) {
                      setEducationLevel(null);
                    } else if (educationLevel !== item.level) {
                      setEducationLevel(item.level);
                    }
                  }}
                  key={index}
                  className={styles.education__card}
                >
                  <img
                    src={item.image}
                    alt={item.level}
                    className={styles.edu__img}
                  />
                  <div
                    className={styles.edu__name}
                    style={{
                      borderBottom:
                        educationLevel === item.level && "2px solid blue",
                    }}
                  >
                    {item.level}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={styles.btns}>
          <button
            disabled={educationLevel?.trim().length > 0 ? false : true}
            className={styles.btn1}
            onClick={handleNext}
            style={{ opacity: educationLevel?.trim().length > 0 ? "1" : "0.5" }}
          >
            Next
          </button>
          <button onClick={handleSkip} className={styles.btn2}>
            Skip
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Education;
