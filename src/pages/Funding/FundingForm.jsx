import React from "react";
import styles from "../MentorForm/MentorForm.module.css";
import Footer from "../Footer/Footer";

function FundingForm() {
  return (
    <div className={styles.form_container}>
      <img src="/images/reverr-logo.svg" alt="" className={styles.logo} />
      <div className={styles.personal_details}>
        <h1 className={styles.heading}>Public Funding</h1>
        <div className={styles.form__heading}>Apply with Profile</div>
        <textarea name="" id="" placeholder="Add Bio"></textarea>
        {/* <div className={styles.input_flex}>
          <input type="text" name="" id="" placeholder="Full name" />
          <input type="text" name="" id="" placeholder="Last name" />
        </div> */}

        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Work"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Title"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Company"
        />
        <div className={styles.input_flex}>
          <input
            type="text"
            className={styles.input}
            name=""
            id=""
            placeholder="From"
          />
          <input
            type="text"
            className={styles.input}
            name=""
            id=""
            placeholder="To"
          />
        </div>
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Education"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Gender"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Location"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Hometown"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Looking for"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Industry"
        />
        <input
          type="text"
          className={styles.input}
          name=""
          id=""
          placeholder="Years of Experience"
        />
        <div className={styles.heading}>Interests</div>
        <div className={styles.input_flex}>
          <input type="text" className={styles.input} name="" id="" />
          <input type="text" className={styles.input} name="" id="" />
          <input type="text" className={styles.input} name="" id="" />
        </div>

        <div className={styles.heading}>How can we meet</div>
        <div className={styles.social__flex}>
          <img
            className={styles.social__icons}
            src="/images/twitter3d.png"
            alt=""
          />
          <input className={styles.input} type="text" name="" id="" />
        </div>
        <div className={styles.social__flex}>
          <img
            className={styles.social__icons}
            src="/images/linkedIn3d.png"
            alt=""
          />
          <input className={styles.input} type="text" name="" id="" />
        </div>
      </div>
      <button className={styles.apply__btn}>Apply Now</button>
      <Footer />
    </div>
  );
}

export default FundingForm;
