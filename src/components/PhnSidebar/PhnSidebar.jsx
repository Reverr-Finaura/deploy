import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  phnSidebarInvisible,
  selectPhnSidebar,
} from "../../features/phnSidebarSlice";
import styles from "./PhnSidebar.module.css";
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
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";
import { remove } from "../../features/newUserSlice";
import { toast } from "react-toastify";
function Sidebar() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const phnSidebar = useSelector(selectPhnSidebar);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <div
      style={{
        display: phnSidebar && width <= 600 ? "flex" : "none",
      }}
      className={`${styles.phnSidebar} animate__animated 
        animate__slideInLeft animate__faster`}
    >
      <div
        onClick={() => {
          dispatch(phnSidebarInvisible());
        }}
        className={styles.phnSidebarOption}
      >
        <XIcon className={styles.xicon} />
      </div>
      <NavLink className={styles.navlink} to="/dashboard">
        <div className={styles.phnSidebarOption}>
          <img src={dashL} alt="" />
          <p>Dashboard</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/knowledge">
        {" "}
        <div className={styles.phnSidebarOption}>
          <img src={knowL} alt="" />
          <p>Knowledge</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/funding-page">
        <div className={styles.phnSidebarOption}>
          <img className={styles.fundingIcon} src={fundL} alt="" />
          <p className={styles.fundingIconText}>Funding</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/mentors">
        <div className={styles.phnSidebarOption}>
          <img src={mentL} alt="" />
          <p>Mentorship</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/community">
        <div className={styles.phnSidebarOption}>
          <img src={comL} alt="" />
          <p>Community</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/start-up">
        <div className={styles.phnSidebarOption}>
          <img src={startL} alt="" />
          <p>Start-up</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/tools">
        <div className={styles.phnSidebarOption}>
          <img src={toolsL} alt="" />
          <p>Tools</p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/messages">
        <div className={styles.phnSidebarOption}>
          <img src={knowL} alt="" />
          <p>Messages</p>
        </div>
      </NavLink>
      <div onClick={user ? () => signOut(auth).then(() => {dispatch(logout());dispatch(remove());})
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          } className={styles.sidebar_final_icon_signout_cont}>
        <img src="./images/bx_log-out.png" alt="icon" />
        <p>Log Out</p>
      </div>
      {/* <NavLink className={styles.navlink} to="/upgrade">
        <div className={styles.phnSidebarOption}>
          <img src="./images/crown.svg" alt="" />
          <p>Upgrade</p>
        </div>
      </NavLink> */}
    </div>
  );
}

export default Sidebar;
