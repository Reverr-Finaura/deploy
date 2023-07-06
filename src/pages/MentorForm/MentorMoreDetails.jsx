import React from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import styles from "./MoreDetails.module.css";

const MentorMoreDetails = () => {
  const experience = [
    { experience: "I am a Student", years: "0" },
    { experience: "0-2 Years Experience", years: "0-2" },
    { experience: "2-4 Years Experience", years: "2-4" },
    { experience: "4-6 Years Experience", years: "4-6" },
    { experience: "6-8 Years Experience", years: "6-8" },
    { experience: "8-10 Years Experience", years: "8-10" },
    { experience: "10-12 Years Experience", years: "10-12" },
    { experience: "12+ Years Experience", years: "12+" },
  ];

  const fields = [
    { name: "Mentorship" },
    { name: "Find Mentors" },
    { name: "Explore Career Change" },
    { name: "Mentor Others" },
    { name: "Find a new Job" },
    { name: "Find Investors" },
    { name: "Networking" },
    { name: "Find Co-Founders" },
    { name: "Grow My Business" },
    { name: "Get Inspired" },
  ];

  const industries = [
    { name: "Fintech" },
    { name: "Sales" },
    { name: "Product Developement" },
    { name: "Research" },
    { name: "Legal" },
    { name: "Marketing" },
    { name: "Fundraising" },
    { name: "Realtech" },
    { name: "Edtech" },
    { name: "Medtech" },
  ];
  const [experienceYears, setExperienceYears] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [field, setField] = useState(null);

  return (
    <div className={styles.form_container}>
      <img src="/images/reverr-logo.svg" alt="" className={styles.logo} />
      <div className={styles.selection_div}>
        {/* <img src="/images/image 215.svg" alt="" className={styles.img1} /> */}
        <h1 className={styles.h1_tag}>What are you looking for?</h1>
        <div className={styles.search_div}>
          <img src="/images/searchicon.png" alt="" />
          <input type="search" name="" id="" placeholder="Search here" />
        </div>
        <div className={styles.ex__btns}>
          {fields.map((item, index) => (
            <button
              onClick={() => {
                if (field === item.name) {
                  setField(null);
                } else if (field !== item.name) {
                  setField(item.name);
                }
              }}
              key={index}
              className={styles.ex__btn}
              style={{
                backgroundColor: field === item.name ? "#2a72de" : "#f6f6f6",
                color: field === item.name ? "white" : "rgba(32, 32, 32, 0.5)",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.selection_div}>
        <h1 className={styles.h1_tag}>What is your Industry?</h1>
        <div className={styles.search_div}>
          <img src="/images/searchicon.png" alt="" />
          <input type="search" name="" id="" placeholder="Search here" />
        </div>
        <div className={styles.ex__btns}>
          {industries.map((item, index) => (
            <button
              onClick={() => {
                if (industry === item.name) {
                  setIndustry(null);
                } else if (industry !== item.name) {
                  setIndustry(item.name);
                }
              }}
              key={index}
              className={styles.ex__btn}
              style={{
                backgroundColor: industry === item.name ? "#2a72de" : "#f6f6f6",
                color:
                  industry === item.name ? "white" : "rgba(32, 32, 32, 0.5)",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.selection_div}>
        <h1 className={styles.h1_tag}>Tell us your Experience</h1>
        <div className={styles.exp__btns}>
          {experience.map((item, index) => (
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
                  experienceYears === item.years ? "#2a72de" : "#f6f6f6",
                color:
                  experienceYears === item.years
                    ? "white"
                    : "rgba(32, 32, 32, 0.5)",
              }}
            >
              {item.experience}
            </button>
          ))}
        </div>
        <div className={styles.next_div}>
          <a>
            <button className={styles.next_btn}>Save &#38; Next</button>
          </a>
          <p className={styles.info_text}>
            The provided information can be edited in future
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentorMoreDetails;
