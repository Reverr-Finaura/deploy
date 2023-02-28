import React, { useState, useEffect } from "react";
// import styles from "./Dashboard.module.css";
import "./Dashboard.module-ansh.css";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
// import Chapter from "../../components/Chapter/Chapter";
// import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import EventCard from "../Event Card/EventCard";
import CoursesCard from "../Courses Card/CoursesCard";
import BlogCard from "../Blog Card/BlogCard";
import MentorCard from "../Mentor Card/MentorCard";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import { useSelector, useDispatch } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import UserProfileCompletedStatusBar from "../../components/User Profile Completed Status Bar/UserProfileCompletedStatusBar";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  console.log("user", userDoc);
  // const userFundingDoc=useSelector((state)=>state.userFundingDoc)

  // console.log("userFundingDoc",userFundingDoc)
  console.log("userDocRedux", userDoc);
  console.log("user", user);

  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [mentorArray, setMentorArray] = useState([]);
  const [purementorArray, setPureMentorArray] = useState([]);
  const [blogArray, setBlogArray] = useState([]);
  const [coursesArray, setCoursesArray] = useState([]);
  const [meetingArray, setMeetingArray] = useState([]);
  const [hasMeeting, setHasMeeting] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [hasNoUserDoc, setHasNoUserDoc] = useState(false);
  const [userDocId, setUserDocId] = useState([]);
  const [userDocInputFormInput, setUserDocInputFormInput] = useState({
    name: user?.user?.displayName,
    email: user?.user?.email,
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const blogData = [];
  const courseData = [];
  const meetingData = [];
  const pureMentorData = [];

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDocId((prev) => {
          return [...prev, doc.id];
        });
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  // CHECK IF USER HAS FUNDING PROFILE

  useEffect(() => {
    if (userDoc?.hasFundingProfile === "No") {
      return;
    }
    async function fetchUserFundingDocFromFirebase() {
      const userFundingDataRef = collection(db, "Funding");
      const q = query(userFundingDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserFundingDoc(doc.data()));
        }
      });
    }
    fetchUserFundingDocFromFirebase();
  }, [userDoc]);

  // CHECK IF USER LOGGED IN HAS USERDOC

  useEffect(() => {
    if (userDocId.length === 0) {
      setHasNoUserDoc(false);
      return;
    } else if (userDocId.includes(user?.user?.email)) {
      setHasNoUserDoc(false);
      return;
    } else {
      setHasNoUserDoc(true);
      return;
    }
  }, [userDocId]);

  // CHECK FOR USER PHOTO
  useEffect(() => {
    if (userDoc?.image !== "") {
      setUserImage(userDoc.image);
      return;
    }
    if (user?.user?.photoURL !== null) {
      setUserImage(user?.user?.photoURL);
      return;
    } else {
      setUserImage(
        "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
      );
      return;
    }
  }, [userDoc]);

  useEffect(() => {
    setUserImage(
      "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
    );
  }, []);

  // CHECK FOR USER NAME
  useEffect(() => {
    if (userDoc?.name && userDoc?.name !== "") {
      setUserName(userDoc.name);
      return;
    }
    if (user?.user?.displayName !== null) {
      setUserName(user?.user?.displayName);
      return;
    }

    var idx = user?.user?.email.indexOf("@");
    var name = user?.user?.email.slice(0, idx);
    setUserName(name);
  }, [userDoc]);

  useEffect(() => {
    if (user?.user?.displayName !== null) {
      setUserName(user?.user?.displayName);
    } else {
      var idx = user?.user?.email.indexOf("@");
      var name = user?.user?.email.slice(0, idx);
      setUserName(name);
    }
  }, [user]);

  //FETCH MENTOR DATA FROM FIREBASE
  useEffect(() => {
    async function fetchMentorExpertise() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // var mentor = [];
        if (
          doc.data().userType === "Mentor" &&
          doc.data().domain[0] != "" &&
          doc.data().industry != ""
        ) {
          setMentorArray((prev) => {
            return [...prev, doc.data()];
          });

          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
    }
    fetchMentorExpertise();
  }, []);

  //FETCH PURE MENTOR DATA FROM FIREBASE
  useEffect(() => {
    async function fetchPureMentorExpertise() {
      const pureMentorsRef = collection(db, "Users");
      const q = query(pureMentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // var mentor = [];
        if (doc.data().userType === "Mentor") {
          pureMentorData.push(doc.data());
          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
      setPureMentorArray(pureMentorData);
    }
    fetchPureMentorExpertise();
  }, []);

  //FETCH MEETING DATA FROM FIREBASE

  useEffect(() => {
    async function fetchMeetingData() {
      const meetingRef = collection(db, "Users");
      const q = query(meetingRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // var mentor = [];
        if (doc.data().userType === "Individual" && doc.data().events) {
          doc.data().events.map((item) => {
            meetingData.push(item);
          });

          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
        setMeetingArray(meetingData);
      });
    }
    fetchMeetingData();
  }, []);

  //FETCH BLOG DATA FROM FIREBASE

  useEffect(() => {
    async function fetchBlogsFromDb() {
      const blogRef = collection(db, "Blogs");
      const q = query(blogRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        blogData.push(doc.data());
      });
      setBlogArray(blogData);
    }
    fetchBlogsFromDb();
  }, []);

  //FETCH COURSE DATA FROM FIREBASE

  useEffect(() => {
    async function fetchCoursesFromDb() {
      const coursesRef = collection(db, "Courses");
      const q = query(coursesRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        courseData.push(doc.data());
      });
      setCoursesArray(courseData);
    }
    fetchCoursesFromDb();
  }, []);

  // CHECK IF USER HAS MEETING

  useEffect(() => {
    meetingArray.map((item) => {
      if (item.year < new Date().getFullYear) {
        setHasMeeting(false);
        return;
      }
      if (item.year > new Date().getFullYear) {
        setHasMeeting(true);
        return;
      }
      if (item.month > new Date().getMonth() + 1) {
        setHasMeeting(true);
      } else if (item.month === new Date().getMonth() + 1) {
        if (item.date >= new Date().getDate()) {
          setHasMeeting(true);
        }
      }
    });
  }, [meetingArray]);

  // COURSES HARDCODED DATA
  const CourseData = [
    {
      id: 1,
      name: "Fundraising and its Means",
      photo: "./images/fundraising.png",
      url: "/fundraising-and-means",
    },
    {
      id: 2,
      name: "Idea Validation",
      photo: "./images/idea.png",
      url: "/idea-validation",
    },
    {
      id: 3,
      name: "Reaching Out to Investor",
      photo: "./images/reachingout.png",
      url: "/reaching-out-to-investor",
    },
  ];

  //HANDLE USERDOC CREATION FORM INPUT
  function handleUserDocInputFormInputChange(e) {
    const { name, value } = e.target;
    setUserDocInputFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //CREATE NEW USER DOC
  const handleUserDocInputForm = async () => {
    if (
      userDocInputFormInput.email === "" ||
      userDocInputFormInput.name === "" ||
      userDocInputFormInput.password === "" ||
      userDocInputFormInput.confirmPassword === "" ||
      userDocInputFormInput.phone === ""
    ) {
      toast.error("Kindly Fill data");
      return;
    } else if (
      userDocInputFormInput.password !== userDocInputFormInput.confirmPassword
    ) {
      toast.error("Password and Confirm Password doesn't match");
      return;
    }
    toast("Processing Your Request");
    try {
      await setDoc(doc(db, "Users", user?.user?.email), {
        Appointement_request: [],
        saved: [],
        rating: 0,
        email: userDocInputFormInput.email,
        name: userDocInputFormInput.name,
        password: userDocInputFormInput.password,
        designation: "",
        about: "",
        gender: "",
        dob: "",
        state: "",
        country: "",
        totalRating: 0,
        userType: "Individual",
        notification: [],
        network: [],
        receivedRequests: [],
        sendRequests: [],
        experience: [],
        education: [],
        linkedinLink: "",
        twitterLink: "",
        facebookLink: "",
        instagramLink: "",
        image:
          "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6",

        industry: "",
        orders: [],
        reviews: [],
        phone: userDocInputFormInput.phone,
        mentors: [],
        events: [],
        hasGeneralProfile: false,
        hasFundingProfile: "No",
        applyForFundingId: null,
        meeting: {},
      });

      toast.success("Success");
      setHasNoUserDoc(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* <PhnSidebar />
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} /> */}

      {hasNoUserDoc ? (
        <>
          <section id="userDocFormModal">
            <ToastContainer />
            <div className="userDocFormModal">
              <input
                onChange={handleUserDocInputFormInputChange}
                type="text"
                name="name"
                placeholder="Your Name"
                className="user-doc-input user-doc-input-name"
                value={userDocInputFormInput.name}
              />
              <input
                onChange={handleUserDocInputFormInputChange}
                type="text"
                name="email"
                placeholder="Your Email"
                className="user-doc-input user-doc-input-email"
                value={userDocInputFormInput.email}
              />
              <input
                onChange={handleUserDocInputFormInputChange}
                type="password"
                name="password"
                placeholder="Your Password"
                className="user-doc-input user-doc-input-pass"
                value={userDocInputFormInput.password}
              />
              <input
                onChange={handleUserDocInputFormInputChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="user-doc-input user-doc-input-pass"
                value={userDocInputFormInput.confirmPassword}
              />
              <input
                onChange={handleUserDocInputFormInputChange}
                type="number"
                name="phone"
                placeholder="Your Phone Number"
                className="user-doc-input user-doc-input-phone"
                value={userDocInputFormInput.phone}
              />
              <button
                onClick={handleUserDocInputForm}
                className="user-doc-input-submit-btn"
              >
                Submit
              </button>
            </div>
          </section>
        </>
      ) : null}

      {width >= 600 ? (
        <>
          <SidebarFinal />
          <NavBarFinal />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}

      <section className="dashboard">
        {/* USER INFO CONTAINER */}
        <div className="user-container">
          <div>
            <h1 className="greeting">
              Welcome{" "}
              <span>
                <h4 className="userName">{userName}</h4>
              </span>{" "}
              !
            </h1>
            <img
              className="handwave-img"
              src="./images/welcomeImg.png"
              alt="handwave"
            />
          </div>
          <div className="usser-name-photo">
            <img className="user-img" src={userImage} alt="user-photo" />
            <div className="user-name-pos-cont">
              {/* <h4 className="userName">{userName}</h4> */}
              {/* <p className="userPosition">Start-up Owner</p> */}
            </div>
            <div className="dshboard-user-profile-status-cont">
              <UserProfileCompletedStatusBar />
            </div>
          </div>
        </div>

        {/* QUOTATION DATA CONTAINER */}
        <section id="quotation-cont_outerCont">
        <img
              className="quotation-cont_faltuIcon1"
              src="/images/faltuIcon1.png"
              alt=""
            />
            <img
              className="quotation-cont_faltuIcon2"
              src="/images/faltuIcon2.png"
              alt=""
            />
        <section id="quotation-cont">
          <div className="quotation-cont">
            
            <h4 className="quote-container-quote">
              Your reputation is more important than your paycheck, and your
              integrity is worth more than your career.
            </h4>
            <p className="quote-container-author">“ Joshua Johnson “</p>
            
          </div>
        </section>
</section>
        {/* DASHBOARD DATA STARTS */}

        <section id="dashboard-data-cont">
          <div className="dashboard-data-left-cont">
            {/* COURSES CONTAINER */}

            <section className="courses-container">
              <h4 className="course-container-heading">Courses</h4>
              {CourseData.map((item, index) => {
                return <CoursesCard key={index} item={item} />;
              })}

              <div className="load-more-course-btn-cont">
                <Link to="/knowledge">
                  <button className="load-more-course-link">Load More </button>
                </Link>
              </div>
            </section>

            {/* APPLY FOR FUNDING CONTAINER */}
            <section className="apply-for-funding-cont">
              <img
                className="apply-for-funding-img"
                src="./images/image 302.png"
                alt="funding-img"
              />
              <h4 className="apply-for-funding-title">
                We have got just the patform for you to apply for funding
              </h4>
              <button
                onClick={() =>
                  window.open("https://reverrapp.com/fundingform", "_blank")
                }
                className="apply-for-funding--btn"
              >
                Apply for funding
              </button>
            </section>

            {/* BLOG CONTAINER */}
            <section id="dashborad_blog-containerr_outerCont">
            <img
                className="blog-containerr_faltuIcon3"
                src="/images/faltuIcon3.png"
                alt=""
              />
              <img
                className="blog-containerr_faltuIcon4"
                src="/images/faltuIcon4.png"
                alt=""
              />
            <section className="blog-containerr">
             
              <div className="blog-containerr_Top">
                <h4
                  style={{ marginBottom: "1rem" }}
                  className="course-container-heading"
                >
                  Blogs
                </h4>
                <button
                  onClick={() =>
                    window.open("https://reverr.io/blog", "_blank")
                  }
                  className="blog-containerr_Top_loadMoreBtn"
                >
                  Load More
                </button>
              </div>
              {blogArray.slice(0, 3).map((item, index) => {
                return <BlogCard item={item} key={index} />;
              })}
            
            </section>
            </section>
          </div>

          {/* RIGHT CONTAINER START */}
          <div className="dashboard-data-right-cont">
            {/* MEETING CONTAINER */}

            <section className="meeting-container">
              <h1 className="meeting-container-titlee">Meetings</h1>
              <h1 className="meeting-container-current-date">
                {new Date().toDateString().slice(4)}
              </h1>

              {hasMeeting ? null : (
                <>
                  <h2 className="no-meeting-schedule-msg">
                    No Meeting Scheduled For Today
                  </h2>
                </>
              )}
              <EventCard
                meetingArray={meetingArray}
                purementorArray={purementorArray}
              />
            </section>

            {/* JOIN OUR COMUNITY CONTAINER */}
            <section className="join-our-comunity-cont">
              <img
                className="join-our-comunity-img"
                src="./images/Group 6267144.png"
                alt="funding-img"
              />
              <h4 className="join-our-comunity-title">
                I am a heading about the community that unites the Startup and
                helps them grow
              </h4>
              <a
                href="https://play.google.com/store/apps/details?id=com.reverr"
                target="_blank"
                rel="noreferrer"
              >
                <button className="join-our-comunity-btn">
                  Join Our Community
                </button>
              </a>
            </section>

            {/* MENTOR CONTAINER */}

            <section className="mentors-containerr">
              <h2 className="mentors-container-titlee">Mentors</h2>
              {mentorArray
                .filter((item) => {
                  return (
                    item.image !==
                    "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
                  );
                })
                .slice(0, 8)
                .map((item) => {
                  return <MentorCard key={item.email} item={item} />;
                })}
              <div className="load-more-mentor-btn-cont">
                <button
                  onClick={() => navigate("/mentors")}
                  className="load-more-mentor-btn"
                >
                  Load More
                </button>
              </div>
            </section>
          </div>
        </section>
      </section>

      {/* <div className={styles.content}> */}
      {/* Recommended Mentors */}
      {/* <h1 style={{ marginTop: "0" }}>Recommended Mentors</h1>
            <div>
              <div
                className={styles["mentor-card"]}
                onClick={() =>
                  navigate(`/mentor-profile`, {
                    state: {
                      mentor: mentorArray[mentorArray.length - 1],
                    },
                  })
                }
              >
                <img src={mentorArray[mentorArray.length - 1]?.image} alt="" />
                <h3>{mentorArray[mentorArray.length - 1]?.name}</h3>
                <p>{mentorArray[mentorArray.length - 1]?.industry}</p>
              </div>

              <div
                className={styles["mentor-card"]}
                onClick={() =>
                  navigate(`/mentor-profile`, {
                    state: {
                      mentor: mentorArray[mentorArray.length - 2],
                    },
                  })
                }
              >
                <img src={mentorArray[mentorArray.length - 2]?.image} alt="" />
                <h3>{mentorArray[mentorArray.length - 2]?.name}</h3>
                <p>{mentorArray[mentorArray.length - 2]?.industry}</p>
              </div>
              <br/>
              
            </div>
            <h4
                onClick={() => navigate("/mentors")}
                style={{ cursor: "pointer", textAlign:'center' }}
              >
                Load More Mentors
              </h4> */}
      {/* Community */}
      {/* <div className={styles.community}>
              <div className={styles["community-card"]}>
                <h2>Community</h2>
                <img
                  src="/images/commBigImg1.png"
                  alt=""
                  width="300px"
                  height="350px"
                />
                <a
                  href="https://play.google.com/store/apps/details?id=com.reverr"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Here to Join Community
                </a>
              </div>
              <div className={styles.funding}>
                <h2>Funding</h2>
                <img
                  src="/images/fundingform.png"
                  alt="some"
                  width="300px"
                  height="350px"
                />
                <br />
                <button
                  onClick={() =>
                    window.open("https://reverrapp.com/fundingform", "_blank")
                  }
                >
                  Get Funded
                </button>
              </div>
            </div> */}

      {/* Courses */}
      {/* <h1>Our Courses</h1>
            <div>
              <Chapter
                heading="Idea Validation"
                image="./images/idea.png"
                description="Is it worthwhile to pursue your fresh startup idea? Let's put it through our tried-and-true method to obtain opinions from experts, users, and the available research to determine whether it's worthwhile to construct."
                url="/idea-validation"
              />
              <Chapter
                heading="Fundraising and its Means"
                image="./images/fundraising.png"
                description="How are businesses supported in reality? From the various funding sources accessible to locating investors and creating the ideal pitch, we'll walk you through everything you could possible want to know."
                url="/fundraising-and-means"
              />
              <h4
                onClick={() => navigate("/knowledge")}
                style={{ cursor: "pointer" }}
              >
                Load More
              </h4>
            </div>
          </div> */}

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Dashboard;
