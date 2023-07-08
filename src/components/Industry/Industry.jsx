import React from "react";
import { Link } from "react-router-dom";
import styles from "./Industry.module.css";
import { useNavigate } from "react-router-dom";

function Industry(props) {
  const navigate = useNavigate();
  return (
    <a onClick={()=>navigate(`/mentor-profile`, { state: { mentor:props.mentor } })} className={styles.link} >
      <div className={styles.industry}>
        <div className={styles.img}>
          <img src={[props.img]} alt="expertise" />
        </div>
        <div className={styles.name} style={{textAlign:'center'}}>
          <p>
            <b>{props.name}</b>
            <br />
          </p>
          <p style={{borderRadius:'20px', backgroundColor:"rgba(42, 114, 222, 1)", color:'white', padding:'8px 16px' , marginRight:'5px'}}>
            {props.to}
          </p>
        </div>
        <div className={styles.description}>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}

export default Industry;
