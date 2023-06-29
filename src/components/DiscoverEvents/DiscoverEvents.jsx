import React from 'react'
import EventCard from '../../components/EventCard/EventCard'


const DiscoverEvents = () => {
  return (
    <section className='events-section'> 


    {/* Events */}
    <div className='events'>
            <h3 style={{color:'white', display:'flex'}}> Suggested <span style={{color:'blue'}}> Events </span> </h3>
            <button type="button" className="explore-btn" style={{float:'right', display:'flex', marginLeft:'1000px'}}>Explore Events</button>
    </div>  

            <button type="button" className="event-btn">Upcoming</button>  
            <button type="button" className="event-btn">Ongoing</button>  

            <div className='event-card'>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
            </section>
  )
}

export default DiscoverEvents