import React from 'react'
import './ArticlesLeftSideBar.css'
import { NavLink } from 'react-router-dom'

const ArticlesLeftSideBar = () => {
  return (
    <div className="left-sidebar">
        <nav className="side-nav">
            <NavLink exact to="/discover/featured" className="side-nav-links " activeClassName='active'>
                Featured
            </NavLink>
            <NavLink exact to="/discover/accounting" className="side-nav-links " activeClassName='active'>
                Accounting
            </NavLink>
            <NavLink exact to="/discover/business" className="side-nav-links " activeClassName='active'>
                Business
            </NavLink>
            <NavLink exact to="/discover/consulting" className="side-nav-links " activeClassName='active'>
                Consulting
            </NavLink>
            <NavLink exact to="/discover/gaming" className="side-nav-links " activeClassName='active'>
                Gaming
            </NavLink>
            <NavLink exact to="/discover/design" className="side-nav-links " activeClassName='active'>
                Design
            </NavLink>
            <NavLink exact to="/discover/enterpreneurship" className="side-nav-links " activeClassName='active'>
                Entrepreneurship
            </NavLink>
            <NavLink exact to="/discover/finance" className="side-nav-links " activeClassName='active'>
                Finance
            </NavLink>
            <NavLink exact to="/discover/healthcare" className="side-nav-links " activeClassName='active'>
                Healthcare
            </NavLink>
            {/* <div className="side-nav-div">
                <div>
                    <p>PUBLIC</p>
                </div>
                <NavLink exact to="/Questions" className="side-nav-links" activeClassName='active'>
                    <img style={{ height:'20px', width:'20px'}} src='' alt="globe" />
                    <p style={{paddingLeft:'10px'}}>Questions</p>
                </NavLink>
                <NavLink exact to="/Tags" className="side-nav-links" activeClassName='active' style={{paddingLeft: "40px"}}>
                    <p>Tags</p> 
                </NavLink>
                <NavLink exact to="/Users" className="side-nav-links" activeClassName='active' style={{paddingLeft: "40px"}}>
                    <p>Users</p>
                </NavLink>
            </div> */}
        </nav>
    </div>  
  )
}

export default ArticlesLeftSideBar