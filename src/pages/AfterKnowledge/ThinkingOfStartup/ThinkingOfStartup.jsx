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

const ThinkingOfStartup = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "THINKING OF A STARTUP IDEA & IDEA SHORTLISTING",
    para: "How do you come up with the next big concept? What issues need to be resolved, and what would be the best approach for each one? Find out nocw!",
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
              imgUrl="tos1.png"
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url="/thinkingofstartupslides"
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "How to identify problems?",
                "How to come up with innovative solutions?",
                "How to be more observant?",
              ]}
              imgUrl="tos2.png"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ThinkingOfStartup;
