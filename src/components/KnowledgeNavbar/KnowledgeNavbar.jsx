import { MenuIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  phnSidebarInvisible,
  phnSidebarVisible,
  selectPhnSidebar,
} from "../../features/phnSidebarSlice";
import { selectChat, showChat } from "../../features/chatSlice";
import Chat from "../Chat/Chat";
import styles from "./KnowledgeNavbar.module.css";
import { useNavigate } from "react-router-dom";

function KnowledgeNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const [phnOptionsVisible, setPhnOptionsVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const theme=useSelector((state)=>state.themeColor)
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <navbar className={styles.navbar}>
        <MenuIcon
          onClick={() => dispatch(phnSidebarVisible())}
          className={styles.menuIcon}
        />
        <Link onClick={()=>dispatch(phnSidebarInvisible())} to={"/"} style={{ textDecoration: "none" }}>
          <div
            className={styles.logo}
            onClick={() => setPhnOptionsVisible(!phnOptionsVisible)}
          >
            <img
              src={theme==="light-theme"?"/images/Reverr Black 1.png":"/images/reaver-logo.svg"}
              alt="logo"
              style={{ marginTop: "5px", width: "80px" }}
            />
            <p style={{ color: theme==="light-theme"?"black":"white", fontSize: "18px" }}>REVERR</p>
          </div>
        </Link>
        <div className={styles.options}>
          {/* <div>
          <img src="./images/bell.svg" alt="" />
        </div> */}
          {/* <div>
          <img src="./images/question.svg" alt="" />
        </div>
        <div>
          <img src="./images/calender.svg" alt="" />
        </div> */}
          <div style={{cursor:"pointer"}}
            onClick={() => {navigate("/messages")}}
          >
            <img src="./images/chat.svg" alt="" />
          </div>
          <div style={{cursor:"pointer"}}>
            <img onClick={() => navigate("/userprofile")} src="./images/profile.svg" alt="" />
          </div>
        </div>
        <div
          style={{
            display: phnOptionsVisible && width <= 600 ? "flex" : "none",
          }}
          className={`${styles.phnOptions} animate__animated animate__fadeIn`}
        >
          {/* <div>
          <img src="./images/bell.svg" alt="" />
        </div>
        <div>
          <img src="./images/question.svg" alt="" />
        </div>
        <div>
          <img src="./images/calender.svg" alt="" />
        </div> */}
          <div>
            <img onClick={() => {navigate("/messages")}} style={{cursor:"pointer"}} src="./images/chat.svg" alt="" />
          </div>
          <div>
            <img style={{cursor:"pointer"}} onClick={() => navigate("/userprofile")} src="./images/profile.svg" alt="" />
          </div>
        </div>
      </navbar>

    </>
  );
}

export default KnowledgeNavbar;
