import React from "react";
import styles from "./Card.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";

function Card({ title, img }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_img}>
        <img src={img} />
      </div>
      <div className={styles.card_titlenlikes}>
        <p>{title}</p>
        <div className={styles.likesndwnld}>
          <div>
            <AiOutlineHeart size={23} />
            <span>1.1k</span>
          </div>
          <div>
            <FiDownload size={23} />
            <span>1.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
