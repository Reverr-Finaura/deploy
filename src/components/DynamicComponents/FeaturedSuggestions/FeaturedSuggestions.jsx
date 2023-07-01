import React from "react";
import styles from "./FeaturedSuggestions.module.css";

function FeaturedSuggestions() {
  const users = [
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../../images/userIcon.png"),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Featured</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;Suggestions</span>
        </p>
        <span onClick={() => console.log("see all clicked")}>See All</span>
      </div>
      <div className={styles.cardContainer}>
        {users.map((user, index) => (
          <div className={styles.card}>
            <div className={styles.userRow} key={index}>
              <div>
                <img src={user.profileImage} alt="Profile" />
                <div>
                  <text style={{ fontSize: 14, color: "#ffffff" }}>
                    {user.name}
                  </text>
                  <text style={{ fontSize: 10, color: "#A7A7A7" }}>
                    {user.role}
                  </text>
                </div>
              </div>
              <span onClick={() => console.log("cancel clicked")}>X</span>
            </div>
            <button>Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedSuggestions;
