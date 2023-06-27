import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal'
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import "./CommunityNew.css"

const CommunityNew = () => {

    const [width, setWidth] = useState(window.innerWidth);


    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);

  return (
    <>
        
{width>=600?<><SidebarFinal /><NavBarFinalDarkMode/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}

<section id='communityPagee'>
    <div className='community-page-content'>
        <img className='community-images' src="./images/ef066617-ce4e-45c9-ae22-1af21711119c 1.png" alt="community" />
        <p className='community-sub-text'>We Are Coding</p>
        <h1 className='community-main-text'>COMING SOON</h1>
        <p className='community-explain-text'>From automation of people processes to creating an engage and driven culture</p>
        <div className='community-subscribe-cont'>
            <input className='community-email-input' type="text" name='email' placeholder='Enter Your Email Address' />
            <button className='community-notify-me-button'>Notify Me</button>
        </div>
        <p className='community-getNotified-text'>Get notified when we launch</p>
    </div>
</section>

    </>
  )
}

export default CommunityNew