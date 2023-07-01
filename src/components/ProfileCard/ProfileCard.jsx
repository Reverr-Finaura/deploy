import React from 'react'
import './ProfileCard.css'

const ProfileCard = () => {
  return (
    <>
        <div className='profile-box'>
            <img src="../../images/profile.png" alt="Image" style={{height:'65px', width:'65px'}}/>
            <h3 style={{color:'white'}}>Name</h3>
            <p style={{color:'white'}}>Position</p>     
            <button type="button" className="schedule-btn">Schedule</button>  
        </div>
    </>
  )
}

export default ProfileCard