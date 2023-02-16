import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import DocumentCard from "../DocumentCard/DocumentCard";
import "./DocumentSlide.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

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
      title:
        "lean ValidationValidationValidationValidationValidationValidation 1",
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
      title:
        "lean ValidationValidationValidationValidationValidationValidation 1",
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
    <section className="documentTemplates_main">
      <h2 className="Document_Template_title">{tag}</h2>
      <Swiper
        spaceBetween={250}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {AllTagDocuments?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <DocumentCard data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default DocumentSlide;
