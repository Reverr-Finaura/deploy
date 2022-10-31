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

const BusinessPlanning = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Business Planning",
    para: "A solid business strategy is the foundation of every successful venture. However, developing a strategy for your firm doesn't need to be a tedious 80-page exercise. To help you succeed, we're dissecting each element in detail.",
  };
  return (
    <>
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
          <Hero
            imgUrl="businessplan1.png"
            // heading="Idea validation and elevator pitch"
          />
          <CourseIntro url="/buisnessplanningslides" courseDetails={courseDetails} />
          <CourseContent points={["What is a business plan?","How to draft a business plan?"," What are the elements of business plan and how to define each one of them?"]} imgUrl="businessplan2.png" />
          {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessPlanning;
