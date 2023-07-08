import React, { useEffect, useState } from "react";
import styles from "./EquityAndEverythingg.module.css";
import data from "../../../assets/New Courses Data/StartupIdea";
import { IoIosArrowForward } from "react-icons/io";
import ChooseModuleCard from "../Courses Card/Choose Module Card/ChooseModuleCard";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";

const StartUpIdea = () => {
  const [isSlideBegin, setIsSlideBegin] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

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

      {!isSlideBegin && (
        <section className={styles.outerCont}>
          <div className={styles.innerCont}>
            <div className={styles.cont}>
              <h1 className={styles.title}>{data[0]?.courseName} </h1>
              <img className={styles.img} src={data[0]?.image} alt="img" />
            </div>
            <button
              onClick={() => setIsSlideBegin(true)}
              className={styles.nextBtn}
            >
              Next{" "}
              <span className={styles.icon}>
                <IoIosArrowForward />
              </span>
            </button>
          </div>
        </section>
      )}
      {isSlideBegin && (
        <section>
          <ChooseModuleCard setIsSlideBegin={setIsSlideBegin} data={data[0]} />
        </section>
      )}
    </>
  );
};

export default StartUpIdea;
