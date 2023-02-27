import React, { useEffect, useState } from "react";
import Chapter from "../../components/Chapter/Chapter";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Footer from "../Footer/Footer";
import Filter from "../../components/Book filter menu/Filter";
import styles from "./Knowledge.module.css";
import "animate.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";

function Knowledge() {
  const [booksSelected, setBooksSeleceted] = useState(false);
  const [journeySelected, setJourneySeleceted] = useState(true);
  const [coursesSelected, setCoursesSeleceted] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const selectBooks = () => {
    setBooksSeleceted(true);
    setJourneySeleceted(false);
    setCoursesSeleceted(false);
  };
  const selectJourney = () => {
    setBooksSeleceted(false);
    setJourneySeleceted(true);
    setCoursesSeleceted(false);
  };
  const selectCourses = () => {
    setBooksSeleceted(false);
    setJourneySeleceted(false);
    setCoursesSeleceted(true);
  };

  return (
    <>
  {width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
      {/* <PhnSidebar /> */}
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            {/* <div className={styles.search}>
              <img src="./images/searchicon.png" alt="search" />
              <input type="text" placeholder="Search here" />
            </div> */}
            <div className={styles.headings}>
              {/* <div
                onClick={selectBooks}
                style={{ fontSize: booksSelected && "45px" }}
                className={styles.heading}
              >
                <p>Books</p>
              </div> */}
              <div
                onClick={selectJourney}
                style={{ fontSize: journeySelected && "3.5rem" }}
                className={styles.heading}
              >
                <p>The Journey</p>
              </div>
              {/* <div
                onClick={selectCourses}
                style={{ fontSize: coursesSelected && "45px" }}
                className={styles.heading}
              >
                <p>Courses</p>
              </div> */}
            </div>
            <div className={styles.sectionDescription}>
              <p
                style={{ display: journeySelected ? "block" : "none" , fontSize:'22px' }}
                className={styles.text}
              >
                The Series of 10 courses that will help you to understand
                <span className={styles.journeyPartText}>
                  {" "}
                  “What is a Start-Up & how does it work”.
                </span>
                {/* It will teach you from basic to advance concept */}
              </p>
            </div>
            <section
              style={{ display: journeySelected ? "flex" : "none" }}
              className={styles.chapters}
            >
              {/* <Chapter
                heading="Legal - ESOP"
                image="./images/legal.png"
                description="    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor"
                url="/esop"
              /> */}
              <section className={styles.outerCont}>
              <img className={styles.idealValidationIcon} src="/images/faltuIcon1.png" alt="" />
              <Chapter
                heading="Idea Validation"
                image="./images/18915856 1.png"
                description="Is it worthwhile to pursue your fresh startup idea? Let's put it through our tried-and-true method to obtain opinions from experts, users, and the available research to determine whether it's worthwhile to construct."
                url="/idea-validation"
              />
              </section>
              <section className={styles.outerCont}>
              <img className={styles.fundRaisingIcon} src="/images/faltuIcon2.png" alt="" />
              <Chapter
                heading="Fundraising and its Means"
                image="./images/fundraising.png"
                description="How are businesses supported in reality? From the various funding sources accessible to locating investors and creating the ideal pitch, we'll walk you through everything you could possible want to know."
                url="/fundraising-and-means"
              />
              </section>
              <Chapter
                heading="Reaching Out to Investor"
                image="./images/reachingout.png"
                description="Find out who angel investors are, why they invest in early-stage firms, and how to contact them. Discover how to use your connections with angel investors to advance your firm."
                url="/reaching-out-to-investor"
              />
              {/* <Chapter
                heading="Social Media"
                image="./images/socialmedia.png"
                description="    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor"
                url="/social-media"
              /> */}
              <section className={styles.outerCont}>
              <Chapter
                heading="Beta Testing"
                image="./images/beta.png"
                description="Prior to releasing your MVP, become proficient at conducting a beta test. Also read about how to get ready for obstacles both known and unknown while beta testing the product of your firm."
                url="/betatesting"
                faltuImage="/images/faltuIcon3.png"
                
              />
              </section>
              <section className={styles.outerCont}>
              <Chapter
                heading="Business Modal"
                image="./images/definevalues.png"
                description="Find out what a business model canvas is, what makes up its components, and why early-stage startup entrepreneurs should care."
                url="/buisnessmodal"
                faltuImage="/images/faltuIcon4.png"
           
              />
   </section>
   <section className={styles.outerCont}>
   <img className={styles.businessPlaningIcon} src="/images/faltuIcon2.png" alt="" />
              <Chapter
                heading="Business Planning"
                image="./images/pitchdeck.png"
                description="A solid business strategy is the foundation of every successful venture. However, developing a strategy for your firm doesn't need to be a tedious 80-page exercise. To help you succeed, we're dissecting each element in detail."
                url="/buisnessplanning"
                // faltuImage="/images/faltuIcon2.png"
              />
              </section>
              <Chapter
                heading="Competitor Analysis"
                image="./images/comeptitor.svg"
                description="Get a handle on the operating environment and level of market competition in which your company will operate?"
                url="/competitoranalysis"
              />
<section className={styles.outerCont}>
              <Chapter
                heading="Product Development"
                image="./images/productdev.png"
                description="How is a new product introduced to the market? Learn the ins and outs of the full product lifecycle to avoid getting lost on the way to commercialization."
                url="/productdevelopment"
                faltuImage="/images/faltuIcon3.png"
              />
              </section>

              <section className={styles.outerCont}>
              <img className={styles.thinkingStartupIcon} src="/images/faltuIcon1.png" alt="" />
              <Chapter
                heading="THINKING OF A STARTUP IDEA & IDEA SHORTLISTING"
                image="./images/thinking.png"
                description="How do you come up with the next big concept? What issues need to be resolved, and what would be the best approach for each one? Find out nocw!"
                url="/thinkingofstartup"
               
              />
              </section>
              <Chapter
                heading="Building an Audience"
                image="./images/audience.svg"
                description="Finding the first 100 consumers for your product or service is typically regarded as the hardest phase. This class, which was especially created to assist your new firm, will outline exactly how to find your first customers and how to go from there."
                url="/buildingaudience"
              />
            </section>
          </div>
        </div>
        {/* <div style={{width:"81%",marginLeft: "12.5rem"}}>  <Footer /></div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Knowledge;
