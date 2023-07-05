import React from 'react'
import './ProfileCard.css'

const ProfileCard = (props) => {
  return (
    <>
        <div className='profile-box'>
            <img src={props.imgUrl} className='suggest-img' alt="Image" style={{height:'65px', width:'65px'}}/>
            <h3 style={{color:'white', overflowWrap:'anywhere'}}>{props.name}</h3>
            <p className='post' style={{color:'white'}}>{props.post}</p>     
            <button style={{marginBottom:'10px'}} type="button" className="schedule-btn">Schedule</button>  
        </div>
    </>
  )
}

export default ProfileCard






