import React from "react";
import clock from "../../../images/clock.svg";
import peopleGroup from "../../../images/profile2user.svg";
import styles from "./Appoinments.module.css";

function Appoinments() {
  const rows = [
    {
      type: "meeting",
      date: "Today",
      title: "Meeting with Maurice",
      time: "10:00 AM",
      buttonText: "Join Now",
      onClick: () => console.log("join meeting clicked"),
    },
    {
      type: "event",
      date: "Tomorrow",
      title: "Event Name",
      location: "Lucknow, India",
      time: "10:00 AM",
      attendees: "123 people attending",
      buttonText: "Join Now",
      onClick: () => console.log("join event clicked"),
    },
    {
      type: "meeting",
      date: "Today",
      title: "Meeting with Maurice",
      time: "10:00 AM",
      buttonText: "Join Now",
      onClick: () => console.log("join meeting clicked"),
    },
  ];

  return (
    <div className={styles.container}>
      <p style={{ marginBottom: 15 }}>
        <span style={{ color: "#ffffff" }}>Upcoming</span>
        <span style={{ color: "#00B3FF" }}>&nbsp;Appoinments</span>
      </p>

      {rows.map((row, index) => {
        if (row.type === "meeting") {
          return (
            <div className={styles.meetingRow}>
              <div className={styles.imageContainer}>
                <img
                  src={require("../../../images/userIcon.png")}
                  alt="Image1"
                  className={styles.image1}
                />
                <img
                  src={require("../../../images/userIcon.png")}
                  alt="Image2"
                  className={styles.image2}
                />
              </div>
              <div>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>Today</text>
                <text style={{ color: "#ffffff", fontSize: 12 }}>
                  Meeting with Maurice
                </text>
                <text style={{ color: "#ffffff", fontSize: 8, marginTop: 5 }}>
                  {" "}
                  <img
                    src={clock}
                    alt="img"
                    style={{ width: 8, height: 8, display: "inline" }}
                  />
                  &nbsp; 10:00 AM
                </text>
              </div>
              <button onClick={() => console.log("join meeting clicked")}>
                Join Now
              </button>
            </div>
          );
        } else if (row.type === "event") {
          return (
            <div className={styles.eventRow}>
              <img src={require("../../../images/image 3.png")} alt="img" />
              <div>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>Tomorrow</text>
                <text style={{ color: "#ffffff", fontSize: 12, marginTop: 5 }}>
                  Event Name
                </text>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>
                  Lucknow, India
                </text>
                <text style={{ color: "#ffffff", fontSize: 8, marginTop: 8 }}>
                  {" "}
                  <img
                    src={clock}
                    alt="img"
                    style={{ width: 8, height: 8, display: "inline" }}
                  />
                  &nbsp; 10:00 AM
                </text>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>
                  {" "}
                  <img
                    src={peopleGroup}
                    alt="img"
                    style={{ width: 8, height: 8, display: "inline" }}
                  />
                  &nbsp; 123 people attending
                </text>
              </div>
              <button onClick={() => console.log("join event clicked")}>
                Join Now
              </button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Appoinments;
