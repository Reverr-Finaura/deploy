import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import startL from "../../images/startup-light.png";
import toolsL from "../../images/tools-light.png";
import logoutIconn from "../../images/bx_log-out-white.png";
import { BiArrowBack } from "react-icons/bi";
import pptIcon from "../../images/pptIcon.png";
import pptIconL from "../../images/PPT iconVector.svg";

const SidebarFinal = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chat = useSelector(selectChat);
  const theme = useSelector((state) => state.themeColor);

  const routes = useLocation();

  const pptPath = routes.pathname.includes("/pptTemplates/");
  const docPath = routes.pathname.includes("/documentTemplates/");
  //console.log(routes.pathname.includes('/pptTemplates/'),"routes");
  // console.log(theme);
  return (
    <>
      <section id="sidebar-final">
        {/* <img className='sidebar-final-brand-logo' src="./images/Frame 6266720.png" alt="brand-logo" /> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/dashboard"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={dashL} alt="icon" />
            <p className="sidebar-final-icon-name">Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/knowledge"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={knowL} alt="icon" />
            <p className="sidebar-final-icon-name">Knowledge</p>
          </div>
        </NavLink>
        {/* href="https://reverrapp.com/fundingform" target="_blank" */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/funding-page"
        >
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-funding-icon"
              src={fundL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Funding</p>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/mentors"
        >
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-mentor-icon"
              src={mentL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Mentorship</p>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/community"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={comL} alt="icon" />
            <p className="sidebar-final-icon-name">Community</p>
          </div>
        </NavLink>
        {/* <NavLink style={{ textDecoration: "none" }} to="/pptTemplates">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-mentor-icon"
              src={theme === "light-theme" ? pptIconL : pptIcon}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">PPT Templates</p>
          </div>
        </NavLink> */}
        {/* <NavLink style={{ textDecoration: "none" }} to="/documentTemplates">
          <div className="sidebar-final-icon-name-cont">
            <img
              className="sidebar-final-icon sidebar-final-mentor-icon"
              src={theme === "light-theme" ? mentD : mentL}
              alt="icon"
            />
            <p className="sidebar-final-icon-name">Document Templates</p>
          </div>
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/start-up"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={startL} alt="icon" />
            <p className="sidebar-final-icon-name">Start-up</p>
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/tools"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={toolsL} alt="icon" />
            <p className="sidebar-final-icon-name">Tools</p>
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "sidebar_link active" : "sidebar_link"
          }
          to="/messages"
        >
          <div className="sidebar-final-icon-name-cont">
            <img className="sidebar-final-icon" src={knowL} alt="icon" />
            <p className="sidebar-final-icon-name">Messages</p>
          </div>
        </NavLink>
        {pptPath ? (
          <button
            onClick={() => navigate(-1)}
            className="sidebar-final-logout-btn"
          >
            {" "}
            <BiArrowBack style={{marginRight:"1rem",color:"rgba(42, 114, 222, 0.92)"}} /> Back
          </button>
        ) : docPath ? (
          <button
            onClick={() => navigate(-1)}
            className="sidebar-final-logout-btn"
          >
            {" "}
            <BiArrowBack style={{marginRight:"1rem",color:"rgba(42, 114, 222, 0.92)"}}/> Back
          </button>
        ) : null}
      </section>
      {chat && <Chat />}
    </>
  );
};

export default SidebarFinal;
