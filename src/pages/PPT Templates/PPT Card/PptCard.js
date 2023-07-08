import React from "react";
import styles from "./PptCard.module.css";
import { RiComputerLine } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillTag } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { BsDownload } from "react-icons/bs";

const PptCard = ({ ppt }) => {
  const navigate = useNavigate();

  //HANDLE DOWNLOAD PPT
  const handleDownload = (linkk) => {
    const link = linkk.split("/")[5];

    const downloadLink = `https://drive.google.com/uc?export=download&id=${link}`;
    window.open(downloadLink, "_blank");
  };

  return (
    <section className={styles.outerCont}>
      <div className={styles.imageCont}>
        <img className={styles.img} src={ppt.thumbnail} alt="img" />
      </div>
      {/* <div className={styles.blackEffect}></div> */}
      <div className={styles.infoCont}>
        <h3 className={styles.pptTitle}>{ppt.name}</h3>
        {/* <div className={styles.generealInfoCont}>
          <p className={styles.usesText}>
            <span>
              <RiComputerLine className={styles.Icon} />
            </span>
            <span className={styles.Value}>959.8k</span>uses
          </p>
          <p className={styles.likesText}>
            <span>
              <AiOutlineLike className={styles.Icon} />
            </span>
            <span className={styles.Value}>3.8k</span>likes
          </p>
        </div> */}
        <div className={styles.tagListCont}>
          {ppt.tag.slice(0, 3).map((tag) => {
            return (
              <p className={styles.tagCont}>
                <span>
                  <AiFillTag className={styles.tagIcon} />
                </span>
                {tag}
              </p>
            );
          })}
        </div>
        <div className={styles.btnCont}>
          <button
            onClick={() => {
              navigate(`/pptTemplates/${ppt.id}`);
            }}
            className={styles.btn}
          >
            Edit
            <span><MdModeEditOutline/></span>
          </button>
          <button
            onClick={() => {
              handleDownload(ppt.link);
            }}
            className={styles.btn}
          >
            Download
            <span><BsDownload/></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PptCard;
