import React, { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "../../components/Calendar/Calendar.css";
import "../../components/TimePicker/TimePicker.css";
import "../../components/Clock/Clock.css";
import { InlineWidget,useCalendlyEventListener } from "react-calendly";
import "animate.css";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import PaymentMentorMeetingSchedule from "../../components/Payment For Mentor Meeting Schedule/PaymentMentorMeetingSchedule";


function Schedule() {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);


  const {state} = useLocation();
  const[paymentModeOn,setPaymentModeOn]=useState(false)

 
  // const [date, setDate] = useState(new Date());
  // const [endDate, setEndDate] = useState();
  // const [time, setTime] = useState("10:00");
  // const [title, setTitle] = useState("One-On-One-Mentorship-Meet");
  // const [details, setDetails] = useState("One-on-One-Mentorship-Meet");
  // const [link, setLink] = useState("");
  // const navigate = useNavigate();

  // const dateobj = {};

  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => {setPaymentModeOn(true);console.log("onDateAndTimeSelected")},
    // onEventTypeViewed: () => console.log("onEventTypeViewed"),
    // onEventScheduled: (e) => console.log("eventSchedule",e.data.payload),
  });

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const prefill = {
    email: user?.email,
    name: user?.displayName,
    guests: [state.mentor.email],
    date: new Date(Date.now() + 86400000),
  };

  // const selectDate = (e) => {
  //   setDate(
  //     new Date(e.target.value).toISOString().replace(/-|:|\.\d\d\d/g, "")
  //   );
  //   setEndDate(new Date(e.target.value.getTime() + 30 * 60000));
  // };

  // const onSelect = (e) => {
  //   e.preventDefault();
  //   setLink(
  //     `https://calendar.google.com/calendar/r/eventedit?text=Test Event&dates=${date}/${endDate}&details=One-on-One Meeting with Reverr Mentor&location=India`
  //   );

  // var templateParams = {
  //   from_name: "Reverr",
  //   subject: "One-To-One Meet Mentorship Meet",
  //   name: "Mentor Name",
  //   email: "akaditya394@gmail.com",
  //   message: `Hey, Mentor. You have a new meeting scheduled. Please add the following event to your calendar
  //     https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${date}00Z/${endDate}00Z&details=${details}&location=India`,
  // };

  //   emailjs
  //     .send(
  //       "service_lfmmz8k",
  //       "template_6lqwjap",
  //       templateParams,
  //       process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  //     )
  //     .then(
  //       function (response) {
  //         console.log("SUCCESS!", response.status, response.text);
  //       },
  //       function (error) {
  //         console.log("FAILED...", error);
  //       }
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
    {width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
          {paymentModeOn?<PaymentMentorMeetingSchedule item={state.mentor}/>:null}
      {/* <PhnSidebar /> */}
      <div className={styles.schedule}>
        {/* <KnowledgeNavbar /> */}
        <div className={styles.body}>
          {/* <Sidebar isVisible={width >= 600 ? true : false} /> */}
          <div
            className={`animate__animated animate__fadeInUp ${styles.content}`}
          >
            <InlineWidget
              url="https://calendly.com/reverrmeet/30min"
              prefill={prefill}
              styles={{
                width: "75vw",
                height: "100vh",
                overflowY: "hidden",
                backgroundImage:
                  "linear-gradient(-45deg, rgba(246,246,246,1), rgba(42, 114, 222, 0.15))",
                padding: "0",
                border: "3px solid rgba(42, 114, 222, 1)",
                borderRadius: "1rem",
              }}
            />
            {/* <form onSubmit={onSelect}>
              <input onChange={selectDate} type="datetime-local" value={date} />
              <button>Select</button>
              <a href={link}>Go</a>
            </form> */}
            {/* <GoogleLogin
              clientId="710745964607-oiv3jlrl61v1f0v5lortvfq4tns1ldmn.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={"single_host_origin"}
              buttonText="Schedule Meeting with Google Calendar"
              responseType="code"
              accessType="offline"
              scope="openid email profile hhtps://www.googleapis.com/auth/calendar"
            /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Schedule;
