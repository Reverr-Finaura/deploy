import React from "react";
import styles from "./CourseReview.module.css";

const CourseReview = () => {
  return (
    <div className={styles.reviews}>
      <h1>Reviews about our Courses</h1>
      <div className={styles.review_cards}>
        <div className={styles.review_card}>
          <img src="/images/Ellipse 172.svg" alt="" />
          <p className={styles.review_name}>Harris Dmitrius</p>
          <p className={styles.review}>
            I'm a Testimonial. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content.I'm a Testimonial. Click here to add your own text and edit
            me. It's easy. Just click “Edit Text” or double click me to add your
            own content.
          </p>
        </div>

        <div className={styles.review_card}>
          <img src="/images/Ellipse 174.svg" alt="" />
          <p className={styles.review_name}>Lily Kiminsky</p>
          <p className={styles.review}>
            I'm a Testimonial. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content.I'm a Testimonial. Click here to add your own text and edit
            me. It's easy. Just click “Edit Text” or double click me to add your
            own content.
          </p>
        </div>
        <div className={styles.review_card}>
          <img src="/images/Ellipse 226.svg" alt="" />
          <p className={styles.review_name}>Susan Ray</p>
          <p className={styles.review}>
            I'm a Testimonial. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content.I'm a Testimonial. Click here to add your own text and edit
            me. It's easy. Just click “Edit Text” or double click me to add your
            own content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseReview;
