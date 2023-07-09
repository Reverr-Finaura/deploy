import React, { useState } from "react";
import styles from "./Fourth.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";

function Fourth() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [education, setEducation] = useState([{ degree: "", institute: "" }]);
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleDegreeChange = (event, index) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      degree: event.target.value,
    };
    setEducation(updatedEducation);
  };

  const handleInstituteChange = (event, index) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      institute: event.target.value,
    };
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institute: "" }]);
  };

  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleLinkedinChange = (event) => {
    setLinkedin(event.target.value);
  };

  const handleTwitterChange = (event) => {
    setTwitter(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => navigate("/")}
        className={styles.navbarBrandLogoImgCont}
      >
        <img
          className={styles.navbarFinalBrandLogoImg}
          src={ReverrDarkIcon}
          alt="brand-logo"
        />
        <span className={styles.reverrHeadingSpan}>
          <p className={styles.reverrHeading}>Reverr</p>
        </span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftComponent}>
          <text style={{ fontSize: 40, color: "#ffffff", marginBlock: 20 }}>
            Let us get to know you!
          </text>
          <div className={styles.textInputContainer}>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>Location</text>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={handleStateChange}
              />
            </div>
            <div className={styles.textInput}>
              <input
                style={{ marginTop: 22 }}
                type="text"
                placeholder="Country"
                value={country}
                onChange={handleCountryChange}
              />
            </div>
            {/* <div> */}
            {education.map((edu, index) => (
              <React.Fragment key={index}>
                <div className={styles.textInput} key={index}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    Highest educational degree?
                  </text>
                  <input
                    type="text"
                    placeholder="BTech"
                    value={edu.degree}
                    onChange={(event) => handleDegreeChange(event, index)}
                  />
                  {/* <select>
                    <option value="option1">BTech</option>
                    <option value="option2">MTech</option>
                  </select> */}
                </div>
                <div className={styles.textInput} key={index}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    Name of Institution
                  </text>
                  <input
                    type="text"
                    placeholder="XYZ college"
                    value={edu.institute}
                    onChange={(event) => handleInstituteChange(event, index)}
                  />
                  {/* <select>
                    <option value="option1">XYZ college</option>
                    <option value="option2">ABC college</option>
                </select> */}
                </div>
                {/* <button onClick={() => removeEducation(index)}>Remove</button> */}
              </React.Fragment>
            ))}
            {/* <button onClick={addEducation}>Add Education</button> */}

            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                What’s your designation?
              </text>
              <input
                type="text"
                placeholder="Enter your designation"
                value={designation}
                onChange={handleDesignationChange}
              />
            </div>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                Name of the company
              </text>
              <input
                type="text"
                placeholder="Company name"
                value={company}
                onChange={handleCompanyChange}
              />
            </div>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                LinkedIn Id
              </text>
              <input
                type="text"
                placeholder="Id"
                value={linkedin}
                onChange={handleLinkedinChange}
              />
            </div>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                Twitter username
              </text>
              <input
                type="text"
                placeholder="username"
                value={twitter}
                onChange={handleTwitterChange}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-third")}
            >
              Back
            </button>
            <button
              className={styles.rightButton}
              onClick={() => navigate("/onboarding-fifth")}
            >
              Next
            </button>
            <button className={styles.skipButton}>Skip</button>
          </div>
        </div>
        <img src={require(window.location.origin+"/images/onboardingforth.png")} alt="img" />
      </div>
    </div>
  );
}

export default Fourth;
