import React from 'react'
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import './Discover.css'
// import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ArticlesLeftSideBar from '../../components/ArticlesLeftSideBar/ArticlesLeftSideBar'
import { DiscoverPeople } from '../../components/DiscoverPeople/DiscoverPeople'
import DiscoverEvents from '../../components/DiscoverEvents/DiscoverEvents'
import DiscoverSuggestions from '../../components/DiscoverSuggestions/DiscoverSuggestions'
import DiscoverNews from '../../components/DiscoverNews/DiscoverNews'
import ArticleRightSideBar from '../../components/ArticleRightSideBar/ArticleRightSideBar'


const Discover = () => {
  return (
    <>
    <div className='container-1'>
        
        <NavBarFinalDarkMode/>
        <DiscoverPeople/>
        <DiscoverEvents/>
        <DiscoverSuggestions/>




{/* Articles */}
        <div className='article'>
            <h3 style={{color:'white', marginTop:'10px'}}> <span style={{color:'blue'}}>Articles </span> for you</h3>
        </div>

        <div className='article-container'>
        <ArticlesLeftSideBar/>
            <div className='right-container'>

                {/* <NavLink exact to="/discover/featured"> */}
                <ArticleRightSideBar title='featured'/>
                {/* </NavLink> */}
            </div>

        </div>

<DiscoverNews/>


    </div>
    
    </>
  )
}

export default Discover