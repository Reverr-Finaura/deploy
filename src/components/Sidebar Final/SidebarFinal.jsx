import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SidebarFinal.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { remove } from "../../features/newUserSlice";
import { auth } from "../../firebase";
import { selectChat, showChat } from "../../features/chatSlice";
import Chat from "../Chat/Chat";
import { removeUserDoc } from "../../features/userDocSlice";
import { removeUserFundingDoc } from "../../features/userFundingDocSlice";
import dashD from "../../images/dash-light.png";
import dashL from "../../images/dash-dark.png";
import knowD from "../../images/know-dark.png";
import knowL from "../../images/know-light.png";
import mentD from "../../images/ment-dark.png";
import mentL from "../../images/cil_education.png";
import comD from "../../images/com-dark.png";
import comL from "../../images/Vector (1).png";
import fundD from "../../images/funding-dark.png";
import fundL from "../../images/funding-light.png";
import logoutIconn from "../../images/bx_log-out-white.png"


const SidebarFinal = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chat = useSelector(selectChat);
  const theme = useSelector((state) => state.themeColor);

  console.log(theme);
  return (
    <>
      <section id="sidebar-final">
        {/* <img className='sidebar-final-brand-logo' src="./images/Frame 6266720.png" alt="brand-logo" /> */}
        <NavLink style={{ textDecoration: "none" }} to="/dashboard">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon"
              src={theme === "light-theme" ? dashD : dashL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Dashboard</p>
          </div>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/knowledge">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon"
              src={theme === "light-theme" ? knowD : knowL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Knowledge</p>
          </div>
        </NavLink>
        {/* href="https://reverrapp.com/fundingform" target="_blank" */}
        <NavLink style={{ textDecoration: "none" }} to="/funding-page">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-funding-icon"
              src={theme === "light-theme" ? fundD : fundL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Funding</p>
          </div>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/mentors">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-mentor-icon"
              src={theme === "light-theme" ? mentD : mentL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Mentorship</p>
          </div>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/community">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon"
              src={theme === "light-theme" ? comD : comL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Community</p>
          </div>
        </NavLink>

        {/* <div className='sidebar-final-line'></div>
<NavLink style={{textDecoration:"none"}} to="/userprofile">
      <div className='sidebar-final-icon-name-cont'>
        <img className='sidebar-final-icon' src="./images/Vector4.png" alt="icon" />
        <p className='sidebar-final-icon-name'>Profile</p>
      </div>
</NavLink>

      <div onClick={() => {
              dispatch(showChat());
            }} className='sidebar-final-icon-name-cont'>
        <img className='sidebar-final-icon' src="./images/Vector (2).png" alt="icon" />
        <p className='sidebar-final-icon-name'>Messages</p>
      </div>

<NavLink style={{textDecoration:"none" }} to="#">
      <div className='sidebar-final-icon-name-cont'>
        <img className='sidebar-final-icon' src="./images/Vector (3).png" alt="icon" />
        <p className='sidebar-final-icon-name'>Settings</p>
      </div>
</NavLink> */}

        {/* <div onClick={user ? () => signOut(auth).then(() => {dispatch(logout());dispatch(remove());})
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          } className='sidebar-final-icon-name-cont'>
        <img className='sidebar-final-icon' src="./images/bx_log-out.png" alt="icon" />
        <p className='sidebar-final-icon-name'>Log Out</p>
      </div> */}
        <button
          onClick={
            user
              ? () =>
                  signOut(auth)
                    .then(() => {
                      dispatch(logout());
                      dispatch(remove());
                      dispatch(removeUserDoc());
                      dispatch(removeUserFundingDoc());
                    })
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          }
          className="sidebar-final-logout-btn"
        >
          <img
            className="sidebar-final-icon-logout"
            src={logoutIconn}
            alt="icon"
          />
          Log Out
        </button>
      </section>
      {chat && <Chat />}
    </>
  );
};

export default SidebarFinal;
