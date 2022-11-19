import React from 'react'
import "./MentorsNew_Module_Ansh_New.css"
import SkillIcon from './skillIcon'
import { useNavigate } from 'react-router-dom'

const MentorProfileCard = ({item,index}) => {

    const navigate=useNavigate()
  return (
  <>
   <div className='mentors-page-card' key={index} id={index}>
    <div className='mentor-cardd'>
<div className='mentor-cardd-top-part'>
    <div className='mentor-cardd-top-part-left-col'>
    <div className='mentor-cardd-top-part-left-col-name-icon-cont'>
    <h4 className='mentor-cardd-top-part-left-col-title'>{item?.name}</h4> 
    <a className='MentorslinkedInSocialLink' href={item?.linkedin}><img src="./images/linkedinIcon.svg" alt="social-icon" /></a>
    </div>
       
        <p className='mentor-cardd-top-part-left-col-sub-title'>{item?.designation}</p>
        
    </div>
    <div className='mentor-cardd-top-part-right-col'>
        <img className='mentor-cardd-top-part-right-col-image' src={item?.image} alt="mentor-profile" />
    </div>
</div>

<div className='mentor-cardd-middle-part'>
    <p className='mentor-cardd-middle-part-intro'>{item?.about.slice(0,180)}</p>
</div>

<div className='mentor-cardd-skill-part'>
{item?.domain?.slice(0,4).map((skill)=>{
    return <>
    <div className='mentor-cardd-skill-part-skill-cont'>
        <div className='mentor-cardd-skill-part-skill-cont-skill-tag'><SkillIcon /></div>
        <p className='mentor-cardd-skill-part-skill-cont-skill name'>{skill}</p>
    </div> 
    </>
})}
    
</div>

<div className='mentor-cardd-bottom-part'>
    <div className='mentor-cardd-bottom-part-left-col'>
<h3 className='mentor-cardd-bottom-part-left-col-price-cont'>&#8377; {(item?.plans[0]/2)} <span className='mentor-cardd-bottom-part-left-col-per-time'>/ 30 min</span></h3>
    </div>
    <div className='mentor-cardd-bottom-part-right-col'>
        <button onClick={()=>navigate('/schedule', {state:{mentor:item}})}className='mentor-cardd-bottom-part-right-col-schedule-btn'>Schedule</button>
    </div>
</div>


    </div>
</div>
  </>
  )
}

export default MentorProfileCard