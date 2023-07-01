import React, { useState } from "react";
import styles from "./Card.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import Playbtn from "../../images/Play.png";
import { useNavigate } from "react-router-dom";

function Card({ title, img,url,desc }) {
  const [hover, setHover] = useState(false);
  const navigate=useNavigate()

  return (
    <div onClick={()=>{navigate(url);window.scrollTo({ top: 0, behavior: 'smooth' })}} className={styles.card_container}>
      <div
        className={styles.card_img}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && (
          <div
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className={styles.blackishCont}
          >
            <p className={styles.viewText}>
              {desc}
            </p>
          </div>
        )}
        <img src={img} alt="card"/>
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
        <div className={styles.likesndwnld_right}>
          <img src={Playbtn} alt="btn" />
        </div>
      </div>
    </div>
  );
}

export default Card;
