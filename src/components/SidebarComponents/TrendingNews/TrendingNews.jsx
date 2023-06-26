import React from "react";
import styles from "./TrendingNews.module.css";

function TrendingNews() {
  const newsData = [
    {
      imageSrc: require("../../../images/image 4.png"),
      timestamp: "2 Hrs Ago",
      title:
        "Is your smartphone ruining your memory day by day? Is your smartphone ruining your memory day by day?Is your smartphone ruining your memory day by day?",
      source: "Times of India",
    },
    {
      imageSrc: require("../../../images/image 4.png"),
      timestamp: "2 Hrs Ago",
      title:
        "Is your smartphone ruining your memory day by day? Is your smartphone ruining your memory day by day?Is your smartphone ruining your memory day by day?",
      source: "Times of India",
    },
    {
      imageSrc: require("../../../images/image 4.png"),
      timestamp: "2 Hrs Ago",
      title:
        "Is your smartphone ruining your memory day by day? Is your smartphone ruining your memory day by day?Is your smartphone ruining your memory day by day?",
      source: "Times of India",
    },
  ];

  return (
    <div className={styles.container}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <p>
          <span style={{ color: "#ffffff" }}>Trending</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;News</span>
        </p>
        <span onClick={() => console.log("view more clicked")}>View more</span>
      </div>
      {newsData.map((item, index) => (
        <div key={index} className={styles.newsCard}>
          <img src={item.imageSrc} alt={"img"} />
          <div>
            <text style={{ color: "#A7A7A7", fontSize: 8 }}>
              {item.timestamp}
            </text>
            <text
              style={{
                color: "#ffffff",
                fontSize: 12,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </text>
            <text style={{ color: "#ffffff", fontSize: 8, marginTop: 5 }}>
              {item.source}
            </text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingNews;
