import React from 'react'
import './NewsCard.css'

const NewsCard = () => {
  return (
    <>
      <div className='news-box'>
        <img src="../../images/audience2.png" alt="Image" style={{height:'75px', width:'135px'}}/>
          <div className='news-details'>
            <p>Time</p>
            <h3 style={{color:'white'}}>Title</h3>
            <p>source</p>
          </div>

      </div>
    </>
  )
}

export default NewsCard