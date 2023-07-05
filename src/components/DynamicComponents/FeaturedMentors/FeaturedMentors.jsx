import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./FeaturedMentors.module.css";

function FeaturedMentors() {
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

  const cardData = [
    {
      title: "IT and Telecom",
      image: require("../../../images/unsplash_5.png"),
    },
    {
      title: "Software and Tech",
      image: require("../../../images/unsplash_6.png"),
    },
    {
      title: "Consulting and Advisory",
      image: require("../../../images/unsplash_7.png"),
    },
    {
      title: "Legal",
      image: require("../../../images/unsplash_8.png"),
    },
    {
      title: "Strategy and Business Development",
      image: require("../../../images/unsplash_6.png"),
    },
  ];

  return (
    <div className={styles.container} style={{ marginBottom: "3.2em" }}>
      <div className={styles.header}>
        <p>
          <span style={{ color: "#ffffff" }}>Featured</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;Mentors</span>
          <span style={{ color: "#ffffff" }}>&nbsp;For You</span>
        </p>
        <span onClick={() => navigate("/mentors")}>See All</span>
      </div>
      <div className={styles.cardContainer}>
        {mentorArray
          .filter((item) => {
            return (
              item.image !==
              "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
            );
          })
          .slice(0, 5)
          .map((mentor, index) => (
            <div className={styles.mentorCard} key={index}>
              <div className={styles.mentor}>
                <img src={mentor?.image} alt="Profile" />
                <div>
                  <text style={{ fontSize: 14, color: "#ffffff" }}>
                    {mentor?.name}
                  </text>
                  <text style={{ fontSize: 10, color: "#A7A7A7" }}>
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
                Schedule
              </button>
            </div>
          ))}
      </div>

      <div className={styles.header} style={{ marginTop: 20 }}>
        <p>
          <span style={{ color: "#ffffff" }}>Browse categories</span>
        </p>
      </div>
      <div className={styles.cardContainer}>
        {cardData.map((card, index) => (
          <div
            className={styles.categoriCard}
            key={index}
            onClick={() => navigate(`/mentors-search/${card.title}`)}
          >
            <img src={card.image} alt="img" />
            <div>
              <p
                style={{ fontSize: 12, color: "#ffffff", textAlign: "center" }}
              >
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedMentors;
