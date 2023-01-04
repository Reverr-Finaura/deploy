import React from 'react'
import "./EventCard.css"

const EventCard = ({meetingArray,purementorArray}) => {
console.log("meetingArray",meetingArray)
    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

      // new Date(`2022 ${item.month} ${item.date}`)>new Date()?"":"none"
      
  return (
   <>
    {meetingArray.map((item,index)=>{
return (
<div style={{display:item.year<new Date().getFullYear()?"none":item.month>new Date().getMonth()+1?"":item.month===new Date().getMonth()+1?item.date>=new Date().getDate()?"":"none":"none"}} className="meeting-item-container" key={index}>
    <img className="meeting-person-photo" src={(purementorArray.filter((items)=>{
      return items.email===item.mentor_email
    }))[0].image?
    (purementorArray.filter((items)=>{
      return items.email===item.mentor_email
    }))[0].image
    :"./images/noMentorImage.png"} alt="photo" />
    <div className="meeting-person-name-date-cont">
      <h4 className="meeting-person-name">{`Connect with ${(purementorArray.filter((items)=>{
      return items.email===item.mentor_email
    }))[0].name}`}</h4>
      <p className="meeting-person-date">{toMonthName(item.month)+" "+item.date}</p>
    </div>
    
    {item.approved?<button className="send-invite-btn">Check Email</button>:
    <button className="wait-for-confirmation">To be approve</button>
    }
  </div>
)

})}
   </>
  )
}

export default EventCard