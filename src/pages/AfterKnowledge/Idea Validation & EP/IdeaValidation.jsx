import React, { useEffect, useState } from "react";
import CourseContent from "../../../components/After knowledge/Course content/CourseContent";
import CourseIntro from "../../../components/After knowledge/Course Intro/CourseIntro";
import CourseReview from "../../../components/After knowledge/Course review/CourseReview";
import Hero from "../../../components/After knowledge/Hero-section/Hero";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import Sidebar from "../../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import styles from "./Knowledge.module.css";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavbarFinal from "../../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";

const IdeaValidation = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Idea validation and elevator pitch",
    para: "Is it worthwhile to pursue your fresh startup idea? Let's put it through our tried-and-true method to obtain opinions from experts, users, and the available research to determine whether it's worthwhile to construct.",
  };

  return (
    <> {width>=600?<><SidebarFinal /><NavbarFinal /></>:<><PhnSidebar />
    <KnowledgeNavbar /></>}
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
        {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
          <Hero imgUrl="ideavalidation.png" />
          <CourseIntro
            courseDetails={courseDetails}
            url="/idea-validation-slides"
          />
          <CourseContent points={["What is Fundraising and why is it important?","What are the different means to raise funds?","What is the role of a pitchdeck in fundraising?"]} imgUrl="image 29.svg" />
          {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default IdeaValidation;
