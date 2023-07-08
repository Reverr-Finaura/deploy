import React from 'react'
import './EventCard.css'


const EventCard = () => {
  return (
    <>
    <div className='event-box'>
        <img src="../../images/audience2.png" alt="Image" style={{height:'135px', width:'205px'}}/>
        <div className='event-title'>

            <h3 style={{color:'white'}}>Title</h3>
        {/* <p style={{color:'white'}}>Position</p>      */}
            <div className='event-details'>
                <button type="button" className="event-detail-btn">Date</button>  
                <button type="button" className="event-detail-btn">Time</button>  
                <button type="button" className="event-detail-btn">Location</button>  
            </div> 

            <div style={{float:'left', marginTop:'20px'}}>
                <p style={{textSize:'smaller', color:'white'}}>N people Atending</p>
            </div>
            <div style={{float:'right', marginTop:'20px'}}>
                <button type="button" className="attend-event-btn">Attend Event</button>  
            </div>
        </div>

    </div>
    </>
  )
}

export default EventCard