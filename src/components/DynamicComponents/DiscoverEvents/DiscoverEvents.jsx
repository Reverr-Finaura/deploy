import React from "react";
import styles from "./DiscoverEvents.module.css";

function DiscoverEvents() {
  const cardData = [
    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/explore.png"),
    },
  ];
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Discover these amazing </span>
          <span style={{ color: "#00B3FF" }}>&nbsp;events</span>
          <span style={{ color: "#ffffff" }}>&nbsp;near you!</span>
        </p>
        <span onClick={() => console.log("see all clicked")}>See All</span>
      </div>
      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <div className={styles.card} key={index}>
            <img src={card.image} alt="img" />
            <div>
              <p style={{ fontSize: 12, color: "#ffffff" }}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverEvents;
