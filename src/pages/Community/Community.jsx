import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import { remove } from "../../features/newUserSlice";
import PhnSidebarSlice from "../../features/phnSidebarSlice";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import Footer from "../Footer/Footer";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import styles from "./Community.module.css";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";

function Community() {
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
    {width>=600?<><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
   
      {/* <PhnSidebar /> */}
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <section id={styles.community__intro}>
          <div class={styles.community__main}>
            <div class={styles.community__main_left}>
              <div class={styles.community__intro_heading}>
                <h1 className={styles.community__heading}>
                  Join our Reverr community to get the best knowledge of
                  Start-ups and mentors
                </h1>
              </div>
              <div class={styles.community__text_content}>
                <p>
                  The community where future entrepreneurs come to learn,
                  execute and grow.
                </p>
              </div>
            </div>
            <div class={styles.community__buttons}>
              <a href="https://play.google.com/store/apps/details?id=com.reverr">
                <button class={styles.community__buttons_blue_btn}>
                  Download our app
                </button>
              </a>
              <a>
                <button
                  onclick="toggleJoinUsDropdown()"
                  class={styles.community__buttons_join_us}
                >
                  Join Us
                </button>
              </a>
              {/* <div class={styles.joinus_dropdown}>
              <div id="joinus_options">
                <a href="/mentorform">
                  <div class="joinus_option">Be a Mentor</div>
                </a>
                <a href="/fundingform">
                  <div class="joinus_option">Get Funded</div>
                </a>
                <a href="/newsletter">
                  <div class="joinus_option">Sign the Newsletter</div>
                </a>
              </div>
            </div> */}
            </div>
          </div>
          <div class={styles.community__images}>
            <div class={styles.community__images_div}>
              <img src="/images/commimg1.png" alt="community" />
              <img src="/images/commimg2.png" alt="community" />
            </div>
            <div class={styles.community__images_div}>
              <img src="/images/commimg3.png" alt="community" />
              <img src="/images/commimg4.png" alt="community" />
            </div>
            <div class={styles.community__images_div}>
              <img src="/images/commimg5.png" alt="community" />
              <img src="/images/commimg6.png" alt="community" />
            </div>
          </div>
        </section>
        <section>
          <h1>What is Discussion?</h1>
          <p className={styles.bigpara}>
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop
            anywhere you like on your page.
          </p>
          <img
            className={styles.bigImg}
            src="./images/commBigImg1.png"
            alt=""
          />
          <a href="https://play.google.com/store/apps/details?id=com.reverr">
            Click here to join the discussion
          </a>
        </section>
        <section>
          <h1>Want to know more About vibes?</h1>
          <p className={styles.bigpara}>
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double click me to add your own
            content and make changes to the font. Feel free to drag and drop
            anywhere you like on your page.
          </p>
          <img
            className={styles.bigImg}
            src="./images/commBigImg2.png"
            alt=""
          />
          <a href="https://play.google.com/store/apps/details?id=com.reverr">
            Click here to join the discussion
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Community;
