import React, { useState,useEffect } from "react";
import styles from "./MentorProfile.module.css";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";


const MentorProfile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const {state} = useLocation();

  console.log(state.mentor.mobile)
  const navigate = useNavigate()
  return (
<>
{width>=600?<><SidebarFinal /><NavBarFinal /></>:<><PhnSidebar />
    <KnowledgeNavbar /></>}
    <div className={styles.background}>
      {/* <PhnSidebar /> */}
      <div className={styles.knowledge}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div className={styles.content}>
            {/* <div className={styles.search}>
              <img src="./images/searchicon.png" alt="search" />
              <input type="text" placeholder="Search here" />
            </div> */}
          </div>
        </div>
        <div className={styles.profile_container}>
          <div className={styles.mentor_intro}>
            <img src={state.mentor.image} style={{width:"220px", height:'220px'}} alt="" />
            <div className={styles.about_mentor}>
              <h1 className={styles.h1_tag}>{state.mentor.name}</h1>
              <p>{state.mentor.domain[0]}</p>
              <div className={styles.mentor_details}>
                <div className={styles.detail}>
                  <h5>Industry</h5>
                  <p>{state.mentor.industry}</p>
                </div>
                <div className={styles.detail}>
                  <h5>Appointment</h5>
                  <p>{state.mentor.plans[0]}/Hr</p>
                </div>
                <div className={styles.detail}>
                  <h5>Rating</h5>
                  <p>
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star.png" alt="" />
                    <img src="/images/star-gray.svg" alt="" />
                    (4.5)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mentor_bio}>
            {/* <h1 className={styles.h1_tag}>
              “I like being aware of new things around me ”
            </h1> */}
            <p>{state.mentor.about}</p>
          </div>

          <div className={styles.areaofExpertise}>
            <h1 className={styles.h1_tag} style={{fontSize:'30px'}}>Area Of Expertise</h1>
            <div className={styles.mentor_expertise} style={{textAlign:"left"}}>
              {
                state.mentor.domain.map((item,index)=>{
                  return(
                    <div className={styles.expertise} >
                      <p>{index+1}. {item}</p>
                    </div>
                  )
                })
              }
              
            </div>
          </div>

          <div className={styles.mentor_contact}>
            <button onClick={()=>navigate('/schedule', {state:{mentor:state.mentor}})}>Schedule</button>
            <p>Contact</p>
            <div className={styles.contact_option}>
              <a href={"tel:+91"+state.mentor.mobile}></a>
              <img src="/images/phone-logo.svg"  alt="" />
              {/* <a href={"mailto:"+state.mentor.email}>
              <img src="/images/gmail-logo.svg" alt="" />
              </a> */}
              <a href={state.mentor.linkedin} target="_blank">
              <img src="/images/linkedIn3d.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.mentor_subscribe}>
        <img src="/images/Ellipse 468.svg" alt="" />
        <h1>Subscibe to Neetan Sachdeva</h1>
        <p>
          Subscribe for free to receive notification anout upcoming events,
          access live stream, recording and much more!
        </p>
        <div className={styles.subscribe}>
          <input type="email" name="" id="" placeholder="Enter your e-mail" />
          <button>Subscribe for free</button>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default MentorProfile;
