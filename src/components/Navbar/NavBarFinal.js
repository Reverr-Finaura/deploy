import React from 'react'
import "./NavbarFinal.css"
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { useNavigate } from 'react-router-dom';

import Chat from "../Chat/Chat";

const NavBarFinal = () => {

  const navigate=useNavigate()
    const dispatch = useDispatch();
    const chat = useSelector(selectChat);

  return (
    <>
    <section id='navbar-final'>
        <div onClick={()=>navigate("/")} className='navbar-brand-logo-img-cont'>
        <img className='navbar-final-brand-logo-img' src="./images/Frame 6266720.png" alt="brand-logo"/>
        </div>
        <div className='navbar-icons-cont'>
            <img onClick={() => {
              dispatch(showChat());
            }}  className='nabar-final-msg-cont' src="./images/Vector (2).png" alt="nav-icons" />
            <img className='nabar-final-setting-cont' src="./images/Vector (3).png" alt="nav-icons" />
            <img className='nabar-final-userProfile-cont' src="./images/carbon_user-avatar-filled.png" alt="nav-icons" />
        </div>

    </section>
    {chat && <Chat />}
    </>
  )
}

export default NavBarFinal