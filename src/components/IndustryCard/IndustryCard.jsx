import React from "react";
import FinanceImg from "../../images/FinanceImg.png";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const IndustryCard = ({ item }) => {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(`/mentors-search/${item.industryname}`);
  };
  return (
    <div className={styles.categoryCard} onClick={HandleClick}>
      <img
        src={item.image ? item.image : FinanceImg}
        alt="Categorycard"
      />
      <p>{item.industryname.charAt(0).toUpperCase() + item.industryname.slice(1)}</p>
    </div>
  );
};

export default IndustryCard;
