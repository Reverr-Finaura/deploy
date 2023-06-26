import React from "react";
import styles from "./Mentors.module.css";

function Mentors() {
  const users = [
    {
      name: "Gloria Balistreri",
      role: "CEO, Starbucks",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Gloria Balistreri",
      role: "CEO, Starbucks",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Gloria Balistreri",
      role: "CEO, Starbucks",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Gloria Balistreri",
      role: "CEO, Starbucks",
      profileImage: require("../../images/userIcon.png"),
    },
    {
      name: "Gloria Balistreri",
      role: "CEO, Starbucks",
      profileImage: require("../../images/userIcon.png"),
    },
  ];

  return (
    <div className={styles.container}>
      <div>
        <p>
          <span style={{ color: "#00B3FF" }}>Featured</span>
          <span style={{ color: "#ffffff" }}>&nbsp;Mentors</span>
        </p>
        <span onClick={() => console.log("see all clicked")}>See All</span>
      </div>
      {users.map((user, index) => (
        <>
          <div className={styles.mentorRow} key={index}>
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
            <button onClick={() => console.log("connect clicked")}>
              Connect
            </button>
          </div>
          <div className={styles.divider}></div>
        </>
      ))}
    </div>
  );
}

export default Mentors;
