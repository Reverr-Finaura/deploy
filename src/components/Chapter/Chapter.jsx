import React, { useEffect, useState } from "react";
import styles from "./Chapter.module.css";
import { useNavigate } from "react-router-dom";

function Chapter({ heading, image, description, url }) {
  // const [image, setImage] = useState("");
  const navigate = useNavigate();


  return (
    <div
      className={styles.chapter}
      onClick={() => {
        navigate(url);
      }}
    >
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
