import React from "react";
import "./documentCard.css";
import { AiFillTag } from "react-icons/ai";
import { Link } from "react-router-dom";
const DocumentCard = ({ data }) => {
  return (
    <div className="documentCard">
      <Link to="/dd" className="DocumentCard_top">
        <div className="icon">
          <img src="https://i.imgur.com/hEzsvCC.jpg" alt="icon" />
        </div>
        <span className="DocumentCard_title">{data.title}</span>
      </Link>
      <Link to="/ff" className="DocumentCard_description">
        {data.description}
      </Link>
      <div className="documentCard_tag">
        <AiFillTag className="tag_icon" />
        <span className="tag">{data.tag}</span>
      </div>
      <div className="DocumentCard_lower">
        <button className="edit_btn">Edit</button>
        <button className="delete_btn">Download</button>
      </div>
    </div>
  );
};

export default DocumentCard;
