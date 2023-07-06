import React from "react";
import styles from "./CourseContent.module.css";

const CourseContent = ({ points,imgUrl }) => {
  return (
    <div className={styles.course_content}>
      <div className={styles.cc_details}>
        <h1>What will you learn?</h1>
        {/* <h3>Course Content</h3> */}
        {/* <p>5 Sections - 8 Sub Sections - 30 Mins total reading time </p> */}
        <ul>
          { points.map(item=>{
            return(
            <li>{item}</li>
            )    
          })}
        </ul>
      </div>
      <div className={styles.cc_img}>
        <img src={`/images/${imgUrl}`} alt="" />
      </div>
    </div>
  );
};

export default CourseContent;
