import React from 'react'
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import ArticlesLeftSideBar from '../../components/ArticlesLeftSideBar/ArticlesLeftSideBar'
import  DiscoverPeople  from '../../components/DiscoverPeople/DiscoverPeople'
import DiscoverEvents from '../../components/DiscoverEvents/DiscoverEvents'
import DiscoverSuggestions from '../../components/DiscoverSuggestions/DiscoverSuggestions'
import DiscoverNews from '../../components/DiscoverNews/DiscoverNews'
import ArticleRightSideBar from '../../components/ArticleRightSideBar/ArticleRightSideBar'

const Accounting = () => {
  return (
    <>
    <div style={{backgroundColor: 'rgb(0, 12, 31)'}}>

        <NavBarFinalDarkMode/>
        <DiscoverPeople/>
        <DiscoverEvents/>
        <DiscoverSuggestions/>
        <div className='article'>
            <h3 style={{color:'white', marginTop:'10px'}}> <span style={{color:'blue'}}>Articles </span> for you</h3>
        </div>
        
            <div className='article-container' style={{ display: 'flex', flexDirection: 'row', margin: '5px 5px'}}>
                <ArticlesLeftSideBar/>
                    <div className='right-container' style={{ marginLeft: '30px'}}>

                        {/* <NavLink exact to="/discover/featured"> */}
                        <ArticleRightSideBar title='accounting'/>
                        {/* </NavLink> */}
                    </div>
            </div>
        <DiscoverNews/>
    </div>
    </>  
  )
}

export default Accounting