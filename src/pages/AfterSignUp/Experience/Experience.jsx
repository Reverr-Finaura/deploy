import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { modify } from "../../../features/newUserSlice";
import Footer from "../../Footer/Footer";
import styles from "./experience.module.css";

const Experience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const array = [
    { experience: "0-2 Years ", years: "0-2" },
    { experience: "2-4 Years ", years: "2-4" },
    { experience: "4-6 Years ", years: "4-6" },
    { experience: "6-8 Years ", years: "6-8" },
    { experience: "8-10 Years ", years: "8-10" },
    { experience: "10-12 Years ", years: "10-12" },
    { experience: "12+ Years ", years: "12+" },
  ];

  const [experienceYears, setExperienceYears] = useState(null);

  const handleNext = () => {
    dispatch(modify({ experienceYears }));
    navigate("/education");
  };

  const handleSkip = () => {
    dispatch(modify({ experienceYears: null }));
    navigate("/education");
  };

  return (
    <>
      <Header theme={"black"} />
      <div className={styles.ex__container}>
        <div className={styles.ex__heading}>Tell us your Experience</div>
        <div className={styles.ex__btns}>
          {array.map((item, index) => (
            <button
              onClick={() => {
                if (experienceYears === item.years) {
                  setExperienceYears(null);
                } else if (experienceYears !== item.years) {
                  setExperienceYears(item.years);
                }
              }}
              key={index}
              className={styles.ex__btn}
              style={{
                backgroundColor:
                  experienceYears === item.years ? "white" : "#d9d9d9",
              }}
            >
              {item.experience}
            </button>
          ))}
        </div>
        <div className={styles.btns}>
          <button
            disabled={experienceYears?.trim().length > 0 ? false : true}
            className={styles.btn1}
            onClick={handleNext}
            style={{
              opacity: experienceYears?.trim().length > 0 ? "1" : "0.5",
            }}
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

export default Experience;
