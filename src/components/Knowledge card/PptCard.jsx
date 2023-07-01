import React, { useState } from "react";
import styles from "./Card.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import Playbtn from "../../images/Play.png";

function PptCard({ title, img }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.card_container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.card_img}>
        {hover && (
          <div
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={styles.blackishCont}
          >
            <button className={styles.viewBtn}>View</button>
          </div>
        )}
        <img src={img} />
      </div>
      <div className={styles.card_titlenlikes}>
        <div className={styles.likesndwnld}>
          <p>{title}</p>
          <div className={styles.likesndwnld_left}>
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
    </div>
  );
}

export default PptCard;
