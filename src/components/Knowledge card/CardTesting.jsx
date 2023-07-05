import React, { useState } from "react";
import styles from "./CardTesting.module.css";
import Playbtn from "../../images/Play.png";
import { useNavigate } from "react-router-dom";

function CardTesting({ title, img, url, desc }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(url);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={styles.card_container}
    >
      <div className={styles.card_img}>
        <img src={img} alt="card" />
      </div>
      <div className={styles.card_titlenlikes}>
        <div className={styles.likesndwnld}>
          <p>{title}</p>
          <div className={styles.likesndwnld_left}>
            <div>
              <span>{desc}</span>
            </div>
          </div>
        </div>
        <div className={styles.likesndwnld_right}>
          <img src={Playbtn} alt="btn" />
        </div>
      </div>
    </div>
  );
}

export default CardTesting;
