import React from 'react'
import "./MentorCard.css"
import { useNavigate } from 'react-router-dom';


const MentorCard = ({item}) => {
  
    const navigate = useNavigate();
  return (
    <>
        <div className="mentor-item-container">
  <img className="mentor-item-image" src={item?.image} alt="mentor-img" />
  <div className="mentor-item-name-designation">
    <h4 className="mentor-item-name">{item?.name}</h4>
    <p className="mentor-item-designation">{item?.designation}</p>
  </div>
  <button onClick={() =>
                  navigate(`/mentor-profile`, {
                    state: {
                      mentor: item,
                    },
                  })
                } className="mentor-item-contact-now-btn">Contact Now</button>
</div>
    </>
  )
}

export default MentorCard