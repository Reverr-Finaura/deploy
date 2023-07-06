import React, { useEffect, useState } from "react";
import styles from "./Chapter.module.css";
import { useNavigate } from "react-router-dom";

function Chapter({ heading, image, description, url ,faltuImage}) {
  // const [image, setImage] = useState("");
  const navigate = useNavigate();


  return (
    <div
      className={styles.chapter}
      onClick={() => {
        navigate(url);
      }}
    >
{faltuImage?<img className={heading==="Idea Validation"?styles.idealValidationIcon:heading==="Fundraising and its Means"?styles.fundRaisingIcon:heading==="Beta Testing"?styles.betaTestingIcon:heading==="Business Modal"?styles.businessModalIcon:heading==="Business Planning"?styles.businessPlaningIcon:heading==="Product Development"?styles.productDevIcon:heading==="THINKING OF A STARTUP IDEA & IDEA SHORTLISTING"?styles.thinkingStartupIcon:null} src={faltuImage} alt="icon" />:null}
      <div className={styles.details}>
        <img src={image} alt="" />
        <div className={styles.info}>
          <p className={styles.name}>{heading}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.actions}>
        {/* <div>
          <img src="./images/bookIcon.svg" alt="" />
        </div> */}
        <div>
          <img src="./images/play.svg" alt="" />
        </div>
        {/* <div>
          <img src="./images/bookmark.svg" alt="" />
        </div> */}
      </div>
    </div>
  );
}

export default Chapter;
