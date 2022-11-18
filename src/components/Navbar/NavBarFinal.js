import React,{ useState } from 'react'
import "./NavbarFinal.css"
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { useNavigate } from 'react-router-dom';
import Chat from "../Chat/Chat";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { logout, selectUser } from '../../features/userSlice';
import { remove } from '../../features/newUserSlice';
import { removeUserDoc } from '../../features/userDocSlice';
import { removeUserFundingDoc } from '../../features/userFundingDocSlice';
import toast from 'react-hot-toast';


const NavBarFinal = () => {
  const user = useSelector(selectUser);

const[isSettingButtonClick,setIsSettingbuttonClick]=useState(false)
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
        {/* <div className='navbar-topp-social-icon'><img onClick={() => {
              dispatch(showChat());
            }}  className='nabar-final-msg-cont' src="./images/Vector (2).png" alt="nav-icons" /></div> */}
            <div onClick={()=>setIsSettingbuttonClick(current=>!current)} className='navbar-topp-social-icon setting-social-icon-cont'><img className='nabar-final-setting-cont' src="./images/Vector (3).png" alt="nav-icons" />
            {isSettingButtonClick?
              <div className='setting-dropdown-cont'>
              <button onClick={()=>navigate("/change-user-password")} className='setting-dropdown-button'>Change Password</button>
              <button onClick={()=>navigate("/user-edit-profile")} className='setting-dropdown-button'>Edit Profile</button>
              <button onClick={user ? () => signOut(auth).then(() => {dispatch(logout());dispatch(remove());dispatch(removeUserDoc());dispatch(removeUserFundingDoc())})
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          } className='setting-dropdown-button'>Logout</button>
            </div>:null}
            </div>
            <div className='navbar-topp-social-icon'><img onClick={()=>navigate("/userprofile")} className='nabar-final-userProfile-cont' src="./images/carbon_user-avatar-filled.png" alt="nav-icons" /></div>
        </div>

    </section>
    {chat && <Chat />}
    </>
  )
}

export default NavBarFinal