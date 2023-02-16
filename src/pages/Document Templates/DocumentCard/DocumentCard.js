import React from "react";
import "./documentCard.css";
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
    <div className="documentCard">
      <Link to={`/${data?.id}`} className="DocumentCard_top">
        <div className="icon">
          <img src="https://i.imgur.com/hEzsvCC.jpg" alt="icon" />
        </div>
        <span className="DocumentCard_title">{data.title}</span>
      </Link>
      <Link to="/ff" className="DocumentCard_description">
        {data.description}
      </Link>

      <div className="DocumentCard_lower">
        <div className="documentCard_tag">
          <AiFillTag className="tag_icon" />
          <span className="tag">{data.tag}</span>
        </div>
        <div className="button_div">
          <button
            onClick={() => navigate(`/documentTemplates/${data?.id}`)}
            className="edit_btn"
          >
            <AiOutlineEdit className="edit_icon" />
          </button>
          <button
            className="download_btn"
            onClick={() => handleDownload(data?.link)}
          >
            <AiOutlineDownload className="download_icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
