import React, { useEffect, useState } from "react";
import styles from "./Mentor.module.css";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Footer from "../Footer/Footer";
import Expertise from "../../components/Expertise/Expertise";
import Price from "../../components/Price/Price";
import MentorComponent from "../../components/MentorComponent/MentorComponent";

function Mentor() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {});

  const prices = [
    { id: "1", price: "Rs.499" },
    { id: "2", price: "Rs.749" },
    { id: "3", price: "Rs.999" },
    { id: "4", price: "Rs.999+" },
  ];

  const mentors = [
    {
      id: "1",
      name: "Jimmy Joel",
      img: "./images/mentorimg1.svg",
      type: "Market Researcher",
      rating: "⭐⭐⭐",
      noofReviews: "76 Reviews",
    },
    {
      id: "2",
      name: "Jimmy Joel",
      img: "./images/mentorimg1.svg",
      type: "Market Researcher",
      rating: "⭐⭐⭐",
      noofReviews: "76 Reviews",
    },
    {
      id: "3",
      name: "Jimmy Joel",
      img: "./images/mentorimg1.svg",
      type: "Market Researcher",
      rating: "⭐⭐⭐",
      noofReviews: "76 Reviews",
    },
  ];

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      <PhnSidebar />
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            <div className={styles.search}>
              <img src="./images/searchicon.png" alt="search" />
              <input type="text" placeholder="Search here" />
            </div>
            <div className={styles.heading}>
              <h1>Bussiness Mentors</h1>
            </div>
            {/* <div className={styles.prices}>
              {prices.map((price) => (
                <Price key={price.id} price={price.price} />
              ))}
            </div> */}
            <div className={styles.mentorRow}>
              {mentors.map((mentor) => (
                <MentorComponent
                  key={mentor.id}
                  name={mentor.name}
                  img={mentor.img}
                  type={mentor.type}
                  rating={mentor.rating}
                  noofReviews={mentor.noofReviews}
                />
              ))}
            </div>
            <div className={styles.mentorRow}>
              {mentors.map((mentor) => (
                <MentorComponent
                  key={mentor.id}
                  name={mentor.name}
                  img={mentor.img}
                  type={mentor.type}
                  rating={mentor.rating}
                  noofReviews={mentor.noofReviews}
                />
              ))}
            </div>
            <div className={styles.mentorRow}>
              {mentors.map((mentor) => (
                <MentorComponent
                  key={mentor.id}
                  name={mentor.name}
                  img={mentor.img}
                  type={mentor.type}
                  rating={mentor.rating}
                  noofReviews={mentor.noofReviews}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mentor;
