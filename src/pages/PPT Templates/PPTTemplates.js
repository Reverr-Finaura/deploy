import React, { useEffect, useState } from "react";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import styles from "./PPTTemplates.module.css";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import PptCard from "./PPT Card/PptCard";
import PptSkeleton from "../../components/Post Skeleton/PPT SKELETON/PptSkeleton";


const PPTTemplates = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [tagList, setTagList] = useState([]);
  const [pptList, setPptList] = useState([]);
  const [uniqueTagList, setUniqueTagList] = useState([]);
  const [dataFilter, setDataFilter] = useState("All");
  const [pptListShowData, setPptListShowData] = useState([]);

  console.log("pptList", pptList);

  //UPDATE WIDTH
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  //FETCH PPT TEMPLATES FROM FIREBASE
  useEffect(() => {
    async function fetchPptListFromFirebase() {
      const userDataRef = collection(db, "PptTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setTagList((prev) => {
          return [...prev, doc.data().tag];
        });
        setPptList((prev) => {
          return [...prev, { ...doc.data(), id: doc.id }];
        });
      });
    }
    fetchPptListFromFirebase();
  }, []);

  //FETCH UNIQUE LIST OF TAG
  useEffect(() => {
    if (tagList.length === 0) {
      return;
    }
    let unq = [...new Set(tagList.flat(1))];
    setUniqueTagList(unq);
  }, [tagList]);

  //FILTERING ON BASIS OF TAG
  useEffect(() => {
    if (dataFilter === "All") {
      setPptListShowData(pptList);
      return;
    }
    const newData = pptList.filter((ppt) => {
      return ppt.tag.includes(dataFilter);
    });
    setPptListShowData(newData);
  }, [dataFilter]);

  //SHOWING PPT DATA FOR FIRST TIME
  useEffect(() => {
    if (pptList.length === 0) {
      return;
    }
    setPptListShowData(pptList);
  }, [pptList]);

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

      <section className={styles.outerCont}>
        <h1 className={styles.title}>Explore Templates</h1>

        {/* TAG SORTER */}

        <div className={styles.chooser}>
          <section
            onClick={() => setDataFilter("All")}
            className={styles.chooserLink}
          >
            All
            <div
              style={{ display: dataFilter === "All" ? "" : "none" }}
              className={styles.underLine}
            ></div>
          </section>
          {uniqueTagList.map((option) => {
            return (
              <section
                key={option}
                onClick={() => setDataFilter(option)}
                className={styles.chooserLink}
              >
                {option}
                <div
                  style={{ display: dataFilter === option ? "" : "none" }}
                  className={styles.underLine}
                ></div>
              </section>
            );
          })}
        </div>

        {/* PPT CONTAINER */}
        <section className={styles.pptListCont}>
        {pptListShowData?.length === 0 && (
            <>
              <PptSkeleton cards={3} />
            </>
          )}
          {pptListShowData.map((ppt) => {
            return (
              <>
                <PptCard ppt={ppt} />
              </>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default PPTTemplates;
