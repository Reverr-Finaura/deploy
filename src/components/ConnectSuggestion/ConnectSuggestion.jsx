import React from "react";
import styles from "./ConnectSuggestion.module.css";

function ConnectSuggestion() {
  const users = [
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Monica Nitzsche",
      role: "Strategist",
      profileImage: require("../../images/userIcon.png"),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <text style={{ color: "#00B3FF" }}>Suggested </text>
          <text style={{ color: "#FFFFFF" }}>For You</text>
        </div>
        <span onClick={() => console.log("see all clicked")}>See All</span>
      </div>
      <div>
        {users.map((user, index) => (
          <div>
            <div className={styles.userRow} key={index}>
              <div>
                <img
                  src={user.profileImage}
                  className={styles.profileImage}
                  alt="Profile"
                />
                <div>
                  <text style={{ fontSize: 14, color: "#00b3ff" }}>
                    {user.name}
                  </text>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    {user.role}
                  </text>
                </div>
              </div>
              <button onClick={() => console.log("connect clicked")}>
                Connect
              </button>
            </div>
            <div className={styles.divider}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConnectSuggestion;
