import React from "react";
import "./CoursesCard.css";
import { useNavigate } from "react-router-dom";

const CoursesCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(item.url)}
        className="course-item"
        id={item.id}
      >
        <div className="course-item-name-and-img">
          <div className="course_item_content">
            <h2 className="course-item-name">{item.name}</h2>
            <p>{item.desc}</p>
          </div>
          <img
            className="course-item-img"
            src={item.photo}
            alt="course-item-img"
          />
        </div>
      </div>
    </>
  );
};

export default CoursesCard;
