import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { selectUser, logout } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { remove } from "../../features/newUserSlice";
import { auth } from "../../firebase";
import { ArrowLeftOnRectangle } from "@heroicons/react/outline";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const location = useLocation();
  const pathname = location.pathname;

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
        padding: isHoveringSidebar ? "1rem 10rem 1rem 1rem" : "1rem",
      }}
      className={styles.sidebar}
      onMouseOver={() => setIsHoveringSidebar(true)}
      onMouseOut={() => setIsHoveringSidebar(false)}
    >
      <NavLink className={styles.navlink} to="/dashboard">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/dashboard"
                ? "./images/dashboard-selected.svg"
                : "./images/dashboard.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Dashboard
          </p>
        </div>
      </NavLink>
      {/* <NavLink className={styles.navlink} to="/tools">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/tools"
                ? "./images/presentation-selected.svg"
                : "./images/presentation.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>Tools</p>
        </div>
      </NavLink> */}
      <NavLink className={styles.navlink} to="/knowledge">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/knowledge"
                ? "./images/knowledge-selected.svg"
                : "./images/brain.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Knowledge
          </p>
        </div>
      </NavLink>
      <a
        className={styles.navlink}
        href="https://reverrapp.com/fundingform"
        target="_blank"
      >
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/funding"
                ? "./images/funding-selected.svg"
                : "./images/wallet.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Funding
          </p>
        </div>
      </a>
      {/* <NavLink className={styles.navlink} to="/patch">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/patch"
                ? "./images/patch-selected.svg"
                : "./images/videos.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>Patch</p>
        </div>
      </NavLink> */}
      <NavLink className={styles.navlink} to="/mentors">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/mentors" ||
              pathname === "/mentor" ||
              pathname === "/payment" ||
              pathname === "/schedule"
                ? "./images/book-selected.svg"
                : "./images/bookopen.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Get Mentored
          </p>
        </div>
      </NavLink>
      <NavLink className={styles.navlink} to="/community">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/community"
                ? "./images/community-selected.svg"
                : "./images/handshake.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Community
          </p>
        </div>
      </NavLink>
      <div className={styles.navlink}>
        <div
          className={styles.sidebarOption}
          onClick={
            user
              ? () =>
                  signOut(auth)
                    .then(() => {
                      dispatch(logout());
                      dispatch(remove());
                    })
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          }
        >
          <img src="./images/logout.png" alt="" style={{ cursor: "pointer" }} />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Log out
          </p>
        </div>
      </div>
      {/* <NavLink className={styles.navlink} to="/myprofile">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/myprofile"
                ? "./images/myprofile-selected.svg"
                : "./images/myprofile.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            My Profile
          </p>
        </div>
      </NavLink> */}
      {/* <NavLink className={styles.navlink} to="/upgrade">
        <div className={styles.sidebarOption}>
          <img
            src={
              pathname === "/upgrade"
                ? "./images/knowledge-selected.svg"
                : "./images/crown.svg"
            }
            alt=""
          />
          <p style={{ display: isHoveringSidebar ? "block" : "none" }}>
            Upgrade
          </p>
        </div>
      </NavLink> */}
    </div>
  );
}

export default Sidebar;
