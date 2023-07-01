import React, { useState, useEffect } from "react";
import styles from "./DocumentTemplates.module.css";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import DocumentCard from "./DocumentCard/DocumentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DocumentSlide from "./DocumentSlide/DocumentSlide";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DocumentTemplates = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [documentTemplate, setDocumentTemplate] = useState([]);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  async function getDocumentTemplate() {
    const DocumentTemplate = await getDocs(collection(db, "DocumentTemplates"));

    DocumentTemplate.forEach((doc) => {
      if (doc.data()) {
        // setDocumentTemplate((prev) => [...prev, doc.data()?.tag]);
        setDocumentTemplate((prev) => [...new Set([...prev, doc.data().tag])]);
      }
    });
  }

  useEffect(() => {
    getDocumentTemplate();
  }, []);
  // console.log(documentTemplate);

  const DummyDocument = [
    "Fundraising",
    "Hr",
    "Business Validation",
    "Financial Models",
  ];

  return (
    <div>
      
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

      <section className={styles.documentTemplates_main}>
        {documentTemplate?.map((tag, index) => {
          return <DocumentSlide key={index} tag={tag} />;
        })}
      </section>
    </div>
  );
};

export default DocumentTemplates;
