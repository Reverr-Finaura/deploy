import React from "react";
import peopleGroup from "../../../images/profile2user.svg";
import styles from "./Events.module.css";

function Events() {
  const items = [
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
  ];
  return (
    <div className={styles.container}>
      <p style={{ marginBottom: 15 }}>
        <span style={{ color: "#00B3FF" }}>Events</span>
        <span style={{ color: "#ffffff" }}>&nbsp;you may like</span>
      </p>

      {items.map((item, index) => (
        <div className={styles.eventRow} key={index}>
          <img src={require("../../../images/image 5.png")} alt="img" />
          <div>
            <text style={{ color: "#A7A7A7", fontSize: 8 }}>{item.date}</text>
            <text style={{ color: "#ffffff", fontSize: 12, marginTop: 5 }}>
              {item.eventName}
            </text>
            <text style={{ color: "#A7A7A7", fontSize: 8 }}>
              {item.location}
            </text>
            <text style={{ color: "#A7A7A7", fontSize: 8, marginTop: 5 }}>
              <img
                src={peopleGroup}
                alt="img"
                style={{ width: 8, height: 8, display: "inline" }}
              />
              &nbsp; {item.attending} people attending
            </text>
          </div>
          <button onClick={() => console.log("Register clicked")}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
}

export default Events;
