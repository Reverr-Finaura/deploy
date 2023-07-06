import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import { db } from "../../../firebase";
import styles from "./DocumentTemplatesViewer.module.css";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import { BsArrowRightSquareFill,BsArrowLeftSquareFill } from "react-icons/bs";
import { DocumentViewer } from "react-documents";
import loader from "../../../images/Pulse-1s-200px.svg";
const DocumentTemplatesViewer = () => {
  const documentId = useParams().id;
  const [documentLink, setDocumentLink] = useState("");
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

  useEffect(() => {
    async function FetchDocumentTemplate() {
      const documentTemplates = await getDocs(
        collection(db, "DocumentTemplates")
      );

      documentTemplates.forEach((doc) => {
        if (doc.id === documentId) {
          setDocumentLink(doc.data().link);
          setIsSideBarCalled(false);
        }
      });
    }
    FetchDocumentTemplate();
  }, [documentId]);

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
      {documentLink !== "" ? (
        <>
          <section className={styles.outerCont}>
            <DocumentViewer
              className={styles.pptViewerOuterCont}
              url={documentLink}
              viewer="url"
              // style={{ width: "100%", height: "100vh" }}
            ></DocumentViewer>
          </section>
        </>
      ) : (
        <>
          <div className={styles.outerContLoading}>
            <h1>Loading......</h1>
            <img className={styles.loadIcon} src={loader} alt="loading" />
          </div>
        </>
      )}
    </>
  );
};

export default DocumentTemplatesViewer;
