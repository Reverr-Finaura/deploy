import React from "react";
import styles from "../Cards/card.module.css";

const array = [
  {
    img: "./images/role1.png",
    heading: "Mentorship",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role2.png",
    heading: "Ideas",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role3.png",
    heading: "Networking",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role4.png",
    heading: "Accounting",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role5.png",
    heading: "Fundings",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role6.png",
    heading: "Research",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role7.png",
    heading: "Marketing",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/role8.png",
    heading: "Financing",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
];

const Role = () => {
  return (
    <div className={styles.industry__container}>
      <h1 className={styles.big__heading}>What are you looking for?</h1>
      <div className={styles.cards__flex}>
        {array.map(({ heading, paragraph, img }) => (
          <div className={styles.card__container}>
            <div className={styles.card__image_container}>
              <img src={img} alt="" className={styles.card__image} />
            </div>
            <div className={styles.card__heading}>{heading}</div>
            <div className={styles.card__para}>{paragraph}</div>
            <button className={styles.card__btn}>Select</button>
          </div>
        ))}
      </div>
      <div className={styles.btns}>
        <button className={styles.btn1}>Next</button>
        <button className={styles.btn2}>Skip</button>
      </div>
    </div>
  );
};

export default Role;
