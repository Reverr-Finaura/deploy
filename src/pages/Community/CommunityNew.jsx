import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
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
        
{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}

<section id='communityPagee'>
    
</section>

    </>
  )
}

export default CommunityNew