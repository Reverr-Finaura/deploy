import React from 'react'
import './ArticleDisplay.css'

const ArticleDisplay = (props) => {
  return (
    <>
    <div className='article-box'>
      <img src="../../images/audience2.png" alt="Image" style={{height:'75px', width:'135px'}}/>
        <div className='article-details'>
          <p>Time</p>
          <h3 style={{color:'white'}}>title - {props.title}</h3>
          <p>source</p>
        </div>
        <div >
          <a classname='article-link' href="">Read More</a>
        </div>

    </div>
  </>
  )
}

export default ArticleDisplay