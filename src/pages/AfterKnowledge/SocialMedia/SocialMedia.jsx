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

const SocialMedia = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Social Media Handles",
    para: "I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop anywhere you like on your page.",
  };
  return (
    <>
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
        <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
          <Hero imgUrl="SocialMediaHandles.png" />
          <CourseIntro courseDetails={courseDetails} url="/social-media-slides" />
          <CourseContent imgUrl="socialMedia2.png" />
          <CourseReview />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SocialMedia;
