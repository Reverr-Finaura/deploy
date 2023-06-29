import React from 'react'
import NewsCard from '../../components/NewsCard/NewsCard'


const DiscoverNews = () => {
  return (
    <section className='news-section'> 


    {/* News */}
    <div className='news'>
            <h3 style={{color:'white', marginTop:'10px'}}> Trending <span style={{color:'blue'}}>News</span> </h3>
        </div>
        <div className='news-container'>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
    </div>

    </section>
  )
}

export default DiscoverNews