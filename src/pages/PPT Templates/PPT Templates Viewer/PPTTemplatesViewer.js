import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useRoutes } from "react-router-dom";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import { db } from "../../../firebase";
import styles from "./PPTTemplatesViewer.module.css";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import { BsArrowRightSquareFill ,BsArrowLeftSquareFill} from "react-icons/bs";
import { DocumentViewer } from "react-documents";
import load from "../../../images/Pulse-1s-200px.svg";

const PPTTemplatesViewer = () => {
  const pptId = useParams().id;
  const [pptLink, setPPtLink] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [isSideBarCalled, setIsSideBarCalled] = useState(true);
  //UPDATE WIDTH
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  
  //FETCH PARTICULAR PPT LINK FROM FIREBASE
  useEffect(() => {
    async function fetchPptLinkFromFirebase() {
      const userDataRef = collection(db, "PptTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === pptId) {
          setPPtLink(doc.data().link);
          setIsSideBarCalled(false);
        }
      });
    }
    fetchPptLinkFromFirebase();
  }, [pptId]);

  return (
    <>
      {width >= 600 ? (
        <>
          <div
            style={{ transform: isSideBarCalled ? "translateX(0)" : "" }}
            className={styles.animatedSideBar}
          >
            
            {isSideBarCalled? <BsArrowLeftSquareFill
            onClick={() => setIsSideBarCalled((e) => !e)}
            className={styles.arroww}
          /> :<BsArrowRightSquareFill
          onClick={() => setIsSideBarCalled((e) => !e)}
          className={styles.arroww}
        />}
            <SidebarFinal />
          </div>
          <NavBarFinal />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}
      {pptLink !== "" ? (
        <>
          <section className={styles.outerCont}>
            <DocumentViewer
              className={styles.pptViewerOuterCont}
              url={pptLink}
              viewer="url"
              // style={{ width: "100%", height: "100vh" }}
            ></DocumentViewer>
          </section>
        </>
      ) : (
        <>
          <div className={styles.outerContLoading}>
            <h1>Loading......</h1>
            <img className={styles.loadIcon} src={load} alt="loading" />
          </div>
        </>
      )}
    </>
  );
};

export default PPTTemplatesViewer;
