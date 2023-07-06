import React, { Fragment, useEffect, useState } from "react";
import Chapter from "../../components/Chapter/Chapter";
import Footer from "../Footer/Footer";
import Filter from "../../components/Book filter menu/Filter";
import Card from "../../components/Knowledge card/Card";
import styles from "./KnowledgeTesting.module.css";
import "animate.css";
import { FiArrowUpRight } from "react-icons/fi";
import PptCard from "../../components/Knowledge card/PptCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardTesting from "../../components/Knowledge card/CardTesting";

const knowledgeData = [
  {
    heading: "Idea Validation",
    image: "./images/18915856 1.png",
    description:
      "Is it worthwhile to pursue your fresh startup idea? Let's put it through our tried-and-true method to obtain opinions from experts, users, and the available research to determine whether it's worthwhile to construct.",
    url: "/idea-validation",
  },
  {
    heading: "Fundraising and its Means",
    image: "./images/fundraising.png",
    description:
      "How are businesses supported in reality? From the various funding sources accessible to locating investors and creating the ideal pitch, we'll walk you through everything you could possible want to know.",
    url: "/fundraising-and-means",
  },
  {
    heading: "Reaching Out to Investor",
    image: "./images/reachingout.png",
    description:
      "Find out who angel investors are, why they invest in early-stage firms, and how to contact them. Discover how to use your connections with angel investors to advance your firm.",
    url: "/reaching-out-to-investor",
  },
  {
    heading: "Beta Testing",
    image: "./images/beta.png",
    description:
      "Prior to releasing your MVP, become proficient at conducting a beta test. Also read about how to get ready for obstacles both known and unknown while beta testing the product of your firm.",
    url: "/betatesting",
  },
  {
    heading: "Business Modal",
    image: "./images/definevalues.png",
    description:
      "Find out what a business model canvas is, what makes up its components, and why early-stage startup entrepreneurs should care.",
    url: "/buisnessmodal",
  },
  {
    heading: "Business Planning",
    image: "./images/pitchdeck.png",
    description:
      "A solid business strategy is the foundation of every successful venture. However, developing a strategy for your firm doesn't need to be a tedious 80-page exercise. To help you succeed, we're dissecting each element in detail.",
    url: "/buisnessplanning",
  },
  {
    heading: "Competitor Analysis",
    image: "./images/comeptitor.svg",
    description:
      "Get a handle on the operating environment and level of market competition in which your company will operate?",
    url: "/competitoranalysis",
  },
  {
    heading: "Product Development",
    image: "./images/productdev.png",
    description:
      "How is a new product introduced to the market? Learn the ins and outs of the full product lifecycle to avoid getting lost on the way to commercialization.",
    url: "/productdevelopment",
  },
  {
    heading: "Thinking Of A Startup Idea",
    image: "./images/thinking.png",
    description:
      "How do you come up with the next big concept? What issues need to be resolved, and what would be the best approach for each one? Find out nocw!",
    url: "/thinkingofstartup",
  },
  {
    heading: "Building an Audience",
    image: "./images/audience.svg",
    description:
      "Finding the first 100 consumers for your product or service is typically regarded as the hardest phase. This class, which was especially created to assist your new firm, will outline exactly how to find your first customers and how to go from there.",
    url: "/buildingaudience",
  },
];
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1000 },
    items: 1,
    partialVisibilityGutter: 100,
  },
  desktop: {
    breakpoint: { max: 1000, min: 800 },
    items: 1,
    partialVisibilityGutter: 100,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function KnowledgeTesting() {
  const [activeLink, setactiveLink] = useState("Courses");
  return (
    <>
      <div className={styles.knowledge}>
        <div className={styles.knowledge_heading}>
          <h3>
            Dive into the world of <span>Learning</span>
            <img src={"images/knowledgeIcon.png"} />
          </h3>
          <p>Explore the Power of Knowledge!</p>
        </div>
        <div className={styles.knowledge_img}>
          {/* <img src={"images/journey.png"} /> */}
          <div className={styles.slider}>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              partialVisible={false}
              transitionDuration={500}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
            >
              <div className={styles.slide}>
                <img src={"images/journey.png"} />
              </div>
            </Carousel>
          </div>
        </div>

        <div className={styles.card_navbar}>
          {/* <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("All")}
            style={{ color: activeLink === "All" ? "#2a72de" : "#717171" }}
          >
            All
            <div className={activeLink === "All" && styles.underLine}></div>
          </section> */}
          <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("Courses")}
            style={{ color: activeLink === "Courses" ? "#2a72de" : "#717171" }}
          >
            Courses
            <div className={activeLink === "Courses" && styles.underLine}></div>
          </section>
          {/* <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("Books")}
            style={{ color: activeLink === "Books" ? "#2a72de" : "#717171" }}
          >
            Books
            <div className={activeLink === "Books" && styles.underLine}></div>
          </section> */}
        </div>

        <div className={styles.knowledge_cards_container}>
          <div className={styles.knowledge_card_head}>
            {/* <h5>The Journney</h5> */}
            {/* <div>
              <span>Load more</span>
              <FiArrowUpRight color={"#0058dd"} />
            </div> */}
          </div>
          <div className={styles.knowledge_cards}>
            {knowledgeData.map((card, idx) => {
              return (
                <Fragment key={idx}>
                  <CardTesting
                    title={card.heading}
                    img={card.image}
                    desc={card.description}
                    url={card.url}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        {/* <div className={styles.knowledge_cards_container}>
          <div className={styles.knowledge_card_head}>
            <h5>Recommended Books</h5>
            <div>
              <span>Load more</span>
              <FiArrowUpRight color={"#0058dd"} />
            </div>
          </div>
          <div className={styles.knowledge_cards}>
            <PptCard
              title={"Sample Ppt name"}
              img={"./images/knowledgeRec.png"}
            />
            <PptCard
              title={"Sample Ppt name"}
              img={"./images/knowledgeRec.png"}
            />
            <PptCard
              title={"Sample Ppt name"}
              img={"./images/knowledgeRec1.png"}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default KnowledgeTesting;
