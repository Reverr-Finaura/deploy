import React from "react";
import { Link } from "react-router-dom";
import styles from "./Expertise.module.css";
import { useNavigate } from "react-router-dom";

function Expertise(props) {
  const navigate = useNavigate();
  return (
    <a onClick={()=>navigate(`/mentor-profile`, { state: { mentor:props.mentor } })} className={styles.link} >
      <div className={styles.expertise}>
        <div className={styles.img}>
          <img src={[props.img]} alt="expertise" />
        </div>
        <div className={styles.name} style={{textAlign: 'center'}}>
          <p>
            <b>{props.name}</b>
          </p>
          {
            
            props.to.map((item,index)=>{
              if(index<2)
              return(
              <p style={{borderRadius:'20px',fontSize:'17px' , backgroundColor:"rgba(42, 114, 222, 1)", color:'white', padding:'4px 12px' , marginRight:'5px'}}>
                {item}
              </p>
              )
            })
          }
        </div>
        <div className={styles.description}>
          <p>{props.description}</p>
        </div>
      </div>
    </a>
  );
}

export default Expertise;
