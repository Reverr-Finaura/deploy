import React from "react";
import styles from "./MentorComponent.module.css";

function MentorComponent(props) {
  return (
    <div className={styles.mentor}>
      <img src={props.img} alt={props.name} />
      <h1 className={styles.name}>{props.name}</h1>
      <p className={styles.type}>{props.type}</p>
      <div className={styles.rating}>
        <div>{props.rating}</div>
        <div className={styles.reviews}>{props.noofReviews}</div>
      </div>
    </div>
  );
}

export default MentorComponent;
