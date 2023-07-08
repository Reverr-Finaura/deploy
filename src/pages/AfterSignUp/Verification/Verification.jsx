import React from "react";
import styles from "../Review page/Review.module.css";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";

const Verification = () => {
  return (
    <>
      <Header theme={"black"} />
      <div>
        <section className={styles.review_section}>
          <div className={styles.review_intro}>
            <div className={styles.review_note}>
              <h1>Congratulations , Now you are a verified Start-up here</h1>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                It’s easy. Just click “Edit Text” or double click me to add your
                own content{" "}
              </p>

              <button className={styles.btn1}>Start your Journey</button>
            </div>
            <div className={styles.review_img}>
              <img src="/images/verification.png" alt="" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Verification;
