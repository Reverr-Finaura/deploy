import React from "react";
import "./MentorCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MentorCard = ({ item }) => {
  const userDoc = useSelector((state) => state.userDoc);
  console.log("mentors", item);
  const navigate = useNavigate();

  const emailToId = (email) => {
    var id = "";
    for (var i = 0; i < email.length; i++) {
      if (email[i] === "@") break;
      id += email[i];
    }
    return id;
  };

  return (
    <>
      <div className="mentor-item-container">
        <div className="mentor_details">
          <img
            className="mentor-item-image"
            src={item?.image}
            alt="mentor-img"
          />
          <div className="mentor-item-name-designation">
            <h4 className="mentor-item-name">{item?.name}</h4>
            <p className="mentor-item-designation">{item?.designation}</p>
          </div>
        </div>
        <button
        onClick={()=>{navigate(`/schedule/${emailToId(item.email)}/${emailToId(userDoc.email)}`);window.scrollTo({ top: 0, behavior: 'smooth' })}}
          // onClick={() =>
          //   navigate(`/mentor-profile`, {
          //     state: {
          //       mentor: item,
          //     },
          //   })
          // }
          className="mentor-item-contact-now-btn"
        >
          Schedule
        </button>
      </div>
    </>
  );
};

export default MentorCard;
