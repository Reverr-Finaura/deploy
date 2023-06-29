import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard'

export const DiscoverPeople = () => {
  return (
    <section className='people-section'> 


    {/* People */}
                <div className='people'>
                    <h3 style={{color:'white'}}> <span style={{color:'blue'}}>People </span> you May Know</h3>
                </div>
                <div className='people-card'>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                </div>
            </section>
  )
}
