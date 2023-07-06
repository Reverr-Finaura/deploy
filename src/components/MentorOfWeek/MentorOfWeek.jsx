import React from "react";
import styles from "./MentorOfWeek.module.css";
import { useNavigate } from "react-router-dom";

function MentorOfWeek(props) {
  const navigate = useNavigate();
  return (
    <div  onClick={()=>navigate(`/mentor-profile`, { state: { mentor:props.mentor } })} className={styles.mentor}>
      <img src={props.img} alt="mentor" style={{width:"140px"}} />
      <div className={styles.name}>
        <p>
          <b>{props.name}</b>
        </p>
      </div>
    </div>
  );
}

export default MentorOfWeek;
