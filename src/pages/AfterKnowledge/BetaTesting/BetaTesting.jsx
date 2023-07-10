import React, { useEffect, useState } from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import CourseReview from "../../../components/After knowledge/Course review/CourseReview";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./Knowledge.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BetaTesting = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Beta Testing-Learn from the basic level to the best",
    para: "Prior to releasing your MVP, become proficient at conducting a beta test. Also read about how to get ready for obstacles both known and unknown while beta testing the product of your firm.",
  };
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            <Hero
              imgUrl="betatesting.png"
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url="/betatestingslides"
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "Why should you not be in a hurry to launch your MVP?",
                "Why beta test?",
                "A/B testing?",
              ]}
              imgUrl="betaimg2.png"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BetaTesting;
