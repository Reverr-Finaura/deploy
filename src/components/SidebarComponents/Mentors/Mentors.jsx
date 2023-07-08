import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./Mentors.module.css";

function Mentors() {
  const navigate = useNavigate();
  const [mentorArray, setMentorArray] = useState([]);
  const userDoc = useSelector((state) => state.userDoc);

  const emailToId = (email) => {
    var id = "";
    for (var i = 0; i < email.length; i++) {
      if (email[i] === "@") break;
      id += email[i];
    }
    return id;
  };

  //FETCH MENTOR DATA FROM FIREBASE
  useEffect(() => {
    async function fetchMentorExpertise() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().userType === "Mentor" &&
          doc.data().domain[0] !== "" &&
          doc.data().industry !== ""
        ) {
          setMentorArray((prev) => {
            return [...prev, doc.data()];
          });

          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
    }
    fetchMentorExpertise();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#00B3FF" }}>Featured</span>
          <span style={{ color: "#ffffff" }}>&nbsp;Mentors</span>
        </p>
        <span onClick={() => navigate("/mentors")}>See All</span>
      </div>
      {mentorArray
        .filter((item) => {
          return (
            item.image !==
            "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
          );
        })
        .slice(0, 5)
        .map((mentor, index) => (
          <div key={index}>
            <div className={styles.mentorRow}>
              <div>
                <img src={mentor?.image} alt="Profile" />
                <div>
                  <text
                    style={{
                      fontSize: 14,
                      color: "#ffffff",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {mentor?.name}
                  </text>
                  <text
                    style={{
                      fontSize: 10,
                      color: "#A7A7A7",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {mentor?.designation}
                  </text>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate(
                    `/schedule/${emailToId(mentor?.email)}/${emailToId(
                      userDoc.email
                    )}`
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Connect
              </button>
            </div>
            <div className={styles.divider}></div>
          </div>
        ))}
    </div>
  );
}

export default Mentors;
