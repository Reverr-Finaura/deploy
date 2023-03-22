import React, { useEffect, useState } from "react";
import Chapter from "../../components/Chapter/Chapter";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Footer from "../Footer/Footer";
import Filter from "../../components/Book filter menu/Filter";
import Card from "../../components/Knowledge card/Card";
import styles from "./Knowledge.module.css";
import "animate.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import { FiArrowUpRight } from "react-icons/fi";
import PptCard from "../../components/Knowledge card/PptCard";

function Knowledge() {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeLink, setactiveLink] = useState("All");

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      {width >= 600 ? (
        <>
          <SidebarFinal />
          <NavBarFinal />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}
      <div className={styles.knowledge}>
        <div className={styles.knowledge_heading}>
          <h3>Explore Knowledge</h3>
          <img src={"images/knowledgeIcon.png"} />
        </div>
        <div className={styles.knowledge_img}>
          <img src={"images/journey.png"} />
        </div>

        <div className={styles.card_navbar}>
          <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("All")}
            style={{ color: activeLink === "All" ? "#2a72de" : "#717171" }}
          >
            All
            <div className={activeLink === "All" && styles.underLine}></div>
          </section>
          <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("Courses")}
            style={{ color: activeLink === "Courses" ? "#2a72de" : "#717171" }}
          >
            Courses
            <div className={activeLink === "Courses" && styles.underLine}></div>
          </section>
          <section
            className={styles.chooserLink}
            onClick={() => setactiveLink("Books")}
            style={{ color: activeLink === "Books" ? "#2a72de" : "#717171" }}
          >
            Books
            <div className={activeLink === "Books" && styles.underLine}></div>
          </section>
        </div>

        <div className={styles.knowledge_cards_container}>
          <div className={styles.knowledge_card_head}>
            <h5>The Journney</h5>
            <div>
              <span>Load more</span>
              <FiArrowUpRight color={"#0058dd"} />
            </div>
          </div>
          <div className={styles.knowledge_cards}>
            <Card title={"Idea Validation"} img={"./images/18915856 1.png"} />
            <Card
              title={"Reaching Out to Investor"}
              img={"./images/reachingout.png"}
            />
            <Card
              title={"Reaching Out to Investor"}
              img={"./images/reachingout.png"}
            />
          </div>
        </div>
        <div className={styles.knowledge_cards_container}>
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
        </div>
      </div>
    </>
  );
}

export default Knowledge;
