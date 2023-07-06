import React from "react";
import styles from "./DocumentCard.module.css";
import { AiFillTag, AiOutlineDownload, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const DocumentCard = ({ data }) => {
  const navigate = useNavigate();
  const handleDownload = (linkk) => {
    const link = linkk.split("/")[5];

    console.log(link);
    const downloadLink = `https://drive.google.com/uc?export=download&id=${link}`;
    window.open(downloadLink, "_blank");
  };

  return (
    <div className={styles.documentCard}>
      <Link to={`/${data?.id}`} className={styles.DocumentCard_top}>
        <div className={styles.icon}>
          <img src="https://i.imgur.com/hEzsvCC.jpg" alt="icon" />
        </div>
        <span className={styles.DocumentCard_title}>{data.title}</span>
      </Link>
      <Link to="/ff" className={styles.DocumentCard_description}>
        {data.description}
      </Link>

      <div className={styles.DocumentCard_lower}>
        <div className={styles.documentCard_tag}>
          <AiFillTag className={styles.tag_icon} />
          <span className={styles.tag}>{data.tag}</span>
        </div>
        <div className={styles.button_div}>
          <button
            onClick={() => navigate(`/documentTemplates/${data?.id}`)}
            className={styles.edit_btn}
          >
            <AiOutlineEdit className={styles.edit_icon} />
          </button>
          <button
            className={styles.download_btn}
            onClick={() => handleDownload(data?.link)}
          >
            <AiOutlineDownload className={styles.download_icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
