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

const ReachingOutToInvestorTesting = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const courseDetails = {
    title: "REACHING OUT TO INVESTOR",
    para: "Find out who angel investors are, why they invest in early-stage firms, and how to contact them. Discover how to use your connections with angel investors to advance your firm.",
  };
  return (
    <>
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            <Hero imgUrl="ReachingOutToInvestor.png" />
            <CourseIntro
              courseDetails={courseDetails}
              url="/reaching-out-to-investor-slides"
            />
            <CourseContent
              points={[
                "Why family is not smart money?",
                "What are the places to lookout for investors for?",
                "What are the requirements in order to win over an investor?",
              ]}
              imgUrl="reachingOut2.png"
            />
            {/* <CourseReview /> */}
          </div>
        </div>
        <div className="firstback">
          <div className="ideavalid">
            <div className="content">
              <text className="head">IDEA VALIDATION</text>
              <div className="rateing">
                <img src="./images/rating.png" alt="" height={20} width={120} />
                <span className="space">4.8</span>
                <text className="rat"> 1,980 s ratings | 97%</text>
              </div>
              <p className="sub">
                Is it worthwhile to pursue your fresh startup idea? Let's
                <br /> put it through our tried-and-true method to obtain
                <br /> opinions from experts, users, and the available research{" "}
                <br />
                to determine whether it's worthwhile to construct.
              </p>
              <br />
              <button className="submit-button">Enroll Now</button>
              <p className="sub">2,768 already enrolled</p>
            </div>
            <div className="imgrev">
              <p className="sub">Offered by </p>
              <p className="rever">REVERR</p>
              <div className="ideagirl">
                <img
                  src="./images/ideagirl.png"
                  alt=""
                  height={280}
                  width={250}
                />
              </div>
            </div>
          </div>

          <div className="sec">
            <div className="aboutsyllabus">
              <div className="tab">
                <text className="about">About</text>
                <text className="syllabus">Syllabus</text>
              </div>
              <div>
                <p className="bout">
                  <text>
                    Is it worthwhile to pursue your fresh startup idea? <br />
                    Let's put it through our tried-and-true method to obtain
                    opinions from experts, users, and the available research{" "}
                    <br />
                    to determine whether it's worthwhile to construct.
                  </text>
                </p>
              </div>
              <div className="learn">
                <text className="sub">
                  What you will learn?
                  <br />
                </text>
                <br />
                <text className="bullet">{"\u2B24"}</text>What is Fundraising
                and why is it important?
                <br />
                <br />
                <text className="bullet">{"\u2B24"}</text>What are the different
                means to raise funds?
                <br />
                <br />
                <text className="bullet">{"\u2B24"}</text>What is the role of a
                pitchdeck in fundraising?
              </div>
            </div>
            <div className="imggraph">
              <img src="./images/graph.png" alt="" height={300} width={250} />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ReachingOutToInvestorTesting;
