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


const EquityAndEverything = () => {
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
    para: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop anywhere you like on your page.",
    to: "eeslides",
  };

  return (
    <>
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
        <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
          <Hero
            imgUrl="equity.svg"
            // heading="Idea validation and elevator pitch"
          />
          <CourseIntro courseDetails={courseDetails} />
          <CourseContent imgUrl="equity2.svg" />
          <CourseReview />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EquityAndEverything;
