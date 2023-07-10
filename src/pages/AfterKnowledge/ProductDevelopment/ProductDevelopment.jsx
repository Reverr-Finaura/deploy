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

const ProductDevelopment = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "Product Development",
    para: "How is a new product introduced to the market? Learn the ins and outs of the full product lifecycle to avoid getting lost on the way to commercialization.",
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
              imgUrl="pd1.png"
              // heading="Idea validation and elevator pitch"
            />
            <CourseIntro
              url="/productdevelopmentslides"
              courseDetails={courseDetails}
            />
            <CourseContent
              points={[
                "How to build an amazing product?",
                "What is product life cycle?",
                "How to commercialize the product?",
              ]}
              imgUrl="pd2.png"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ProductDevelopment;
