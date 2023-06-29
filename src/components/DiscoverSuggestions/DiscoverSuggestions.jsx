import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard'


const DiscoverSuggestions = () => {
  return (
    <section className='suggest-section'> 


    {/* Suggestions */}
    <div className='people-suggest'>
            <h3 style={{color:'white', marginTop:'10px'}}> More <span style={{color:'blue'}}>Suggestions </span> </h3>
        </div>
        <div className='people-card'>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
        </div>

            </section>
  )
}

export default DiscoverSuggestions