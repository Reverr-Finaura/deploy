import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { modify } from "../../../features/newUserSlice";
import Footer from "../../Footer/Footer";
import styles from "./gender.module.css";

const Gender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const array = [
    { gender: "Male", image: "./images/gen1.png" },
    { gender: "Female", image: "./images/gen2.png" },
    { gender: "Other", image: "./images/gen3.png" },
    { gender: "Not Say", image: "./images/gen4.png" },
  ];

  const [gender, setGender] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hometown, setHometown] = useState(null);

  const handleNext = () => {
    dispatch(modify({ gender, currentLocation, hometown }));
    navigate("/startup-confirm");
  };

  const handleSkip = () => {
    dispatch(modify({ gender: null, currentLocation: null, hometown: null }));
    navigate("/startup-confirm");
  };

  return (
    <>
      <Header theme={"black"} />
      <div className={styles.gender__container}>
        <h1 className={styles.big__heading}>Let's know more about you</h1>
        <div className={styles.gen__cards}>
          {array.map((item, index) => (
            <div
              onClick={() => {
                if (gender === item.gender) {
                  setGender(null);
                } else if (gender !== item.gender) {
                  setGender(item.gender);
                }
              }}
              key={index}
              className={styles.gen__card}
              style={{
                backgroundColor: gender === item.gender && "white",
                }}
            >
              <img src={item.image} alt="" className={styles.gen__img} />
              <div
                className={styles.gen__para}
                style={{
                color: gender === item.gender && "#2a72de",
                }}
              >
                {item.gender}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.divider}></div>
        <div className="loc__container">
          <h1 className={styles.loc__heading}>What are you looking for?</h1>
          <form>
            <div className={styles.entry}>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => {
                  setCurrentLocation(e.target.value);
                }}
                placeholder="Your Location Currently"
                className={styles.loc__hometown}
              />
              <input
                type="text"
                value={hometown}
                onChange={(e) => {
                  setHometown(e.target.value);
                }}
                placeholder="Hometown"
                className={styles.loc__hometown}
              />
            </div>
          </form>
        </div>
        <div className={styles.btns}>
          <button
            disabled={
              gender?.length > 0 &&
              currentLocation?.trim().length > 0 &&
              hometown?.trim().length > 0
                ? false
                : true
            }
            style={{
              opacity:
                gender?.length > 0 &&
                currentLocation?.trim().length > 0 &&
                hometown?.trim().length > 0
                  ? "1"
                  : "0.5",
            }}
            onClick={handleNext}
            className={styles.btn1}
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

export default Gender;
