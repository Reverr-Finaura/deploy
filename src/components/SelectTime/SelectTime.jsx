import React from "react";
import styles from "./SelectTime.module.css";

function SelectTime() {
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  const minute = [];
  for (let i = 1; i <= 60; i++) {
    if (i < 9) {
      minute.push("0" + i.toString());
      i++;
    } else {
      minute.push(i.toString());
    }
  }
  return (
    <div className={styles.selectTime}>
      <div>
        <h3>Set Your time for the session</h3>
      </div>
      <div className={styles.picker}>
        <div className={styles.pickhour}>
          {hours.map((hour, index) => (
            <div className={styles.hour}>{hour}</div>
          ))}
        </div>
        <div className={styles.pickhour}>
          {minute.map((minute, index) => (
            <div className={styles.hour}>{minute}</div>
          ))}
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}

export default SelectTime;
