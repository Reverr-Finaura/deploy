import React from "react";
import styles from "../Tagline/tagline.module.css";

const Tagline = () => {
  return (
    <div className={styles.hero__hero}>
      {" "}
      <section className={styles.hero__main}>
        <div className={styles.grid}>
          <div className={`${styles.item1}  ${styles.hero__heading}`}>
            Making your startup journey feel like a walk in the garden
          </div>
          <div
            className={`${styles.item2} ${styles.hero__para}  ${styles.flex_hero}`}
          >
            Strive to bring you the best mentorship,sp guidance, and insights
            for the startups you're building
            <div>
              <button className={styles.hero__button}>Download our app</button>
            </div>
          </div>
          <div className={`${styles.item4} ${styles.hero__image_background}`}>
            <img
              src="/images/hero2.png"
              className={styles.hero__image}
              alt=""
            />
            <div className={styles.hero__image_heading}>Become a Mentor</div>
            <div className={styles.hero__image_para}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className={`${styles.item5} ${styles.hero__image_background}`}>
            <img
              src="/images/hero2.png "
              className={styles.hero__image}
              alt=""
            />
            <div className={styles.hero__image_heading}>
              Get your startup Funded
            </div>
            <div className={styles.hero__image_para}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className={`${styles.item6} ${styles.hero__image_background}`}>
            <img
              src="/images/hero2.png"
              className={styles.hero__image}
              alt=""
            />
            <div className={styles.hero__image_heading}>
              Sign up to Newsletter
            </div>
            <div className={styles.hero__image_para}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className={`${styles.item7} ${styles.hero__image_background}`}>
            <img
              src="/images/hero2.png"
              className={styles.hero__image}
              alt=""
            />
            <div className={styles.hero__image_heading}>Join our Community</div>
            <div className={styles.hero__image_para}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tagline;
