import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DocumentCard from "../DocumentCard/DocumentCard";
import styles from "./DocumentSlide.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import DocumentCardSkeleton from "../../../components/Post Skeleton/DocumentTemplate SKELETON/DocumentCardSkeleton";

const DocumentSlide = ({ tag }) => {
  const [AllTagDocuments, setAllTagDocuments] = useState([]);

  async function getAllDocuments(tag) {
    const TagDocumentTemplate = await getDocs(
      collection(db, "DocumentTemplates")
    );

    TagDocumentTemplate?.forEach((doc) => {
      if (doc.data().tag.toLowerCase() === tag.toLowerCase()) {
        setAllTagDocuments((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      }
    });
  }

  useEffect(() => {
    getAllDocuments(tag);
  }, [tag]);
  console.log(AllTagDocuments);

  const DocumentData = [
    {
      title: "lean ValidationValidationVaon ",
      description:
        "All startups should run a Business Model  Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean ValidationValidationVaidat ",
      description:
        "All startups should run a Business Model  Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean ValidationValidationValidat ",
      description:
        "All startups should run a Business Model  Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean ValidationValidationValidion ",
      description:
        "All startups should run a Business Model  Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title:
        "lean ValidationValidationValidationValidationValidationValidation 1",
      description:
        "All startups should run a Business Model  Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean Validation 2",
      description:
        "All startups should run a Business Model Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean Validation 3",
      description:
        "All startups should run a Business Model Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
    {
      title: "lean Validation 4",
      description:
        "All startups should run a Business Model Canvas exercise to understand their company's strengths and weaknesses.",
      tag: tag,
    },
  ];

  return (
    <section className={styles.documentTemplates_main}>
      <h2 className={styles.Document_Template_title}>{tag}</h2>
      
      <Swiper
        spaceBetween={350}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {AllTagDocuments.length === 0 ? (
          <>
            <SwiperSlide>
              <DocumentCardSkeleton cards={1} />
            </SwiperSlide>
            <SwiperSlide>
              <DocumentCardSkeleton cards={1} />
            </SwiperSlide>
            <SwiperSlide>
              <DocumentCardSkeleton cards={1} />
            </SwiperSlide>
          </>
        ) : (
          AllTagDocuments?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <DocumentCard data={item} />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </section>
  );
};

export default DocumentSlide;
