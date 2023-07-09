import React, { useState } from "react";
import styles from "./Third.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";

function Third() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
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
          <text style={{ fontSize: 12, color: "#ffffff" }}>
            Upload your photo
          </text>
          <label htmlFor="upload" className={styles.uploadPhoto}>
            {image ? (
              <img src={image} alt="img" />
            ) : (
              <>
                <img
                  src={require("../../../images/uploadphoto.png")}
                  alt="img"
                />
                <div>
                  <span style={{ fontSize: 12 }}>Upload</span>
                  <span style={{ fontSize: 12 }}>+</span>
                </div>
              </>
            )}
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
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
              Tell us a little bit about yourself.
            </text>
            <textarea
              type="text"
              placeholder="About"
              value={about}
              onChange={handleAboutChange}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-second")}
            >
              Back
            </button>
            <button
              className={styles.rightButton}
              onClick={() => navigate("/onboarding-fourth")}
            >
              Next
            </button>
          </div>
        </div>
        <img src={require("../../../images/onboardingthird.png")} alt="img" />
      </div>
    </div>
  );
}

export default Third;
