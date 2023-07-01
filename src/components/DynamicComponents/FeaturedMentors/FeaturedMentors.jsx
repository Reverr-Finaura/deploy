import React from "react";
import styles from "./FeaturedMentors.module.css";

function FeaturedMentors() {
  const users = [
    {
      name: "Theresa Webb",
      role: "Founder, Abstergo",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Theresa Webb",
      role: "Founder, Abstergo",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Theresa Webb",
      role: "Founder, Abstergo",
      profileImage: require("../../../images/userIcon.png"),
    },
    {
      name: "Theresa Webb",
      role: "Founder, Abstergo",
      profileImage: require("../../../images/userIcon.png"),
    },
  ];


  const cardData = [
    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },
    {
      title: "StartUp Algo",
      image: require("../../../images/unsplash_5.png"),
    },
  ];


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Featured</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;Mentors</span>
          <span style={{ color: "#ffffff" }}>&nbsp;For You</span>
        </p>
        <span onClick={() => console.log("see all clicked")}>See All</span>
      </div>
      <div className={styles.cardContainer}>
        {users.map((user, index) => (
          <div className={styles.userCard}>
            <div className={styles.user} key={index}>
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
            <button>Schedule</button>
          </div>
        ))}
      </div>

      <div className={styles.header} style={{marginTop: 20}}>
        <p>
          <span style={{ color: "#ffffff" }}>Browse categories</span>
        </p>
      </div>
      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <div className={styles.categoriCard} key={index}>
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

export default FeaturedMentors;
