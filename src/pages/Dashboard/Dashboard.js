import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Chapter from "../../components/Chapter/Chapter";

const Dashboard = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [mentorArray, setMentorArray] = useState([]);
  const data = [];

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    async function fetchMentorExpertise() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // var mentor = [];
        if (
          doc.data().userType === "Mentor" &&
          doc.data().domain[0] != "" &&
          doc.data().industry != ""
        ) {
          data.push(doc.data());
          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
      setMentorArray(data);
    }

    fetchMentorExpertise();
  }, []);

  return (
    <>
      <PhnSidebar />
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            {/* Recommended Mentors */}
            <h1 style={{ marginTop: "0" }}>Recommended Mentors</h1>
            <div>
              <div
                className={styles["mentor-card"]}
                onClick={() =>
                  navigate(`/mentor-profile`, {
                    state: {
                      mentor: mentorArray[mentorArray.length - 1],
                    },
                  })
                }
              >
                <img src={mentorArray[mentorArray.length - 1]?.image} alt="" />
                <h3>{mentorArray[mentorArray.length - 1]?.name}</h3>
                <p>{mentorArray[mentorArray.length - 1]?.industry}</p>
              </div>

              <div
                className={styles["mentor-card"]}
                onClick={() =>
                  navigate(`/mentor-profile`, {
                    state: {
                      mentor: mentorArray[mentorArray.length - 2],
                    },
                  })
                }
              >
                <img src={mentorArray[mentorArray.length - 2]?.image} alt="" />
                <h3>{mentorArray[mentorArray.length - 2]?.name}</h3>
                <p>{mentorArray[mentorArray.length - 2]?.industry}</p>
              </div>
              <br/>
              
            </div>
            <h4
                onClick={() => navigate("/mentors")}
                style={{ cursor: "pointer", textAlign:'center' }}
              >
                Load More Mentors
              </h4>
            {/* Community */}
            <div className={styles.community}>
              <div className={styles["community-card"]}>
                <h2>Community</h2>
                <img
                  src="/images/commBigImg1.png"
                  alt=""
                  width="300px"
                  height="350px"
                />
                <a
                  href="https://play.google.com/store/apps/details?id=com.reverr"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Here to Join Community
                </a>
              </div>
              <div className={styles.funding}>
                <h2>Funding</h2>
                <img
                  src="/images/fundingform.png"
                  alt="some"
                  width="300px"
                  height="350px"
                />
                <br />
                <button
                  onClick={() =>
                    window.open("https://reverrapp.com/fundingform", "_blank")
                  }
                >
                  Get Funded
                </button>
              </div>
            </div>

            {/* Courses */}
            <h1>Our Courses</h1>
            <div>
              <Chapter
                heading="Idea Validation"
                image="./images/idea.png"
                description="Is it worthwhile to pursue your fresh startup idea? Let's put it through our tried-and-true method to obtain opinions from experts, users, and the available research to determine whether it's worthwhile to construct."
                url="/idea-validation"
              />
              <Chapter
                heading="Fundraising and its Means"
                image="./images/fundraising.png"
                description="How are businesses supported in reality? From the various funding sources accessible to locating investors and creating the ideal pitch, we'll walk you through everything you could possible want to know."
                url="/fundraising-and-means"
              />
              <h4
                onClick={() => navigate("/knowledge")}
                style={{ cursor: "pointer" }}
              >
                Load More
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
