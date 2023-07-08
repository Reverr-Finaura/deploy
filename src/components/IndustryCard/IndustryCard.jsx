import React from "react";
import FinanceImg from "../../images/FinanceImg.png";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
const IndustryCard = ({ item }) => {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(`/mentors-search/${item.categoryName}`);
  };
  return (
    <div className={styles.categoryCard} onClick={HandleClick}>
      <img
        src={item.image ? item.image : FinanceImg}
        // src=""
        alt="Categorycard"
      />
      <p>{item.categoryName.charAt(0).toUpperCase() + item.categoryName.slice(1)}</p>
    </div>
  );
};

export default IndustryCard;
