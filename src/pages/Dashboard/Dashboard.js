import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import "./Dashboard.module-ansh.css"
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Chapter from "../../components/Chapter/Chapter";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import EventCard from "../Event Card/EventCard";
import CoursesCard from "../Courses Card/CoursesCard"
import BlogCard from "../Blog Card/BlogCard";
import MentorCard from "../Mentor Card/MentorCard";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import { useSelector,useDispatch } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";




const Dashboard = () => {
  const dispatch=useDispatch()
const user=useSelector((state)=>state.user)
const userDoc=useSelector((state)=>state.userDoc)
console.log("userDocRedux",userDoc)

  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [mentorArray, setMentorArray] = useState([]);
  const [purementorArray, setPureMentorArray] = useState([]);
  const [blogArray,setBlogArray]=useState([])
  const[coursesArray,setCoursesArray]=useState([])
  const[meetingArray,setMeetingArray]=useState([])
  const[hasMeeting,setHasMeeting]=useState(false)
  const[userImage,setUserImage]=useState("")
  const[userName,setUserName]=useState("")

  const data = [];
  const blogData=[];
  const courseData=[];
  const meetingData=[];
  const pureMentorData=[]
 

// console.log("corses array include ",coursesArray)

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  
  // console.log("user",user)
  
// CHECK FOR USER DOC DATA
useEffect(()=>{
  async function fetchUserDocFromFirebase(){
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
 
     if(doc.id===user?.user?.email){
      dispatch(setUserDoc(doc.data()))
     }
    });
  }
fetchUserDocFromFirebase()
},[user])


// CHECK FOR USER PHOTO
useEffect(()=>{
  if(user?.user?.photoURL!==null){
    setUserImage(user?.user?.photoURL)
  }
  else
  {setUserImage("./images/carbon_user-avatar-filled.png")}
  },[user])

  // CHECK FOR USER NAME
useEffect(()=>{
  if(user?.user?.displayName!==null){
    setUserName(user?.user?.displayName )
  }
  else{
    // const newEmailArray=Array.from(user?.user?.email)
    var idx = user?.user?.email.indexOf("@")
    var name =user?.user?.email.slice(0,idx)
    setUserName(name)
  }
  
  },[user])

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
          data.push(doc.data());
          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
      setMentorArray(data);
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
        if (
          doc.data().userType === "Mentor"
        ) {
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

useEffect(()=>{
async function fetchMeetingData(){
  const meetingRef = collection(db, "Users");
  const q = query(meetingRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // var mentor = [];
    if (
      doc.data().userType === "Individual"&&
      doc.data().events
      
    ) {
      doc.data().events.map((item)=>{meetingData.push(item); })
      
      // var {email} =doc._document.data.value.mapValue.fields;
      // console.log(email.stringValue);
      // doc.data().id=email;
      // console.log(doc.data());
    }
   setMeetingArray(meetingData)
  });
}
fetchMeetingData()
},[])



//FETCH BLOG DATA FROM FIREBASE

  useEffect(()=>{
async function fetchBlogsFromDb(){
  const blogRef = collection(db, "Blogs");
  const q = query(blogRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => { 
        blogData.push(doc.data());
      });
      setBlogArray(blogData)
}
    fetchBlogsFromDb()
  },[])


  //FETCH COURSE DATA FROM FIREBASE

  useEffect(()=>{
    async function fetchCoursesFromDb(){
      const coursesRef=collection(db,"Courses");
      const q = query(coursesRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => { 
        courseData.push(doc.data());
      });
      setCoursesArray(courseData)
    }
fetchCoursesFromDb()
  },[])

// CHECK IF USER HAS MEETING 

useEffect(()=>{
  meetingArray.map((item)=>{
    if(item.month>new Date().getMonth()+1){setHasMeeting(true)} 
    else if(item.month===new Date().getMonth()+1){
    if (item.date>=new Date().getDate()){setHasMeeting(true)}
    }
   })
},[meetingArray])

 
// COURSES HARDCODED DATA
const CourseData=[
  {id:1,
    name:"Fundraising and its Means",
    photo:"./images/fundraising.png",
    url:"/fundraising-and-means",
},
{id:2,
  name:"Idea Validation",
photo:"./images/idea.png",
url:"/idea-validation",
},
{id:3,
  name:"Reaching Out to Investor",
photo:"./images/reachingout.png",
url:"/reaching-out-to-investor",
}]


  return (
    <>
      {/* <PhnSidebar />
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} /> */} 


{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
          
        <section className="dashboard">

          {/* USER INFO CONTAINER */}
<div className="user-container">
  <div >
  <h1 className="greeting">Welcome !</h1>
  <img className="handwave-img" src="./images/emojione_waving-hand.png" alt="handwave" />
  </div>
  <div className="usser-name-photo">
    <img className="user-img" src={userImage} alt="user-photo" />
    <div className="user-name-pos-cont">
      <h4 className="userName">{userName}</h4>
      {/* <p className="userPosition">Start-up Owner</p> */}
    </div>
  </div>
</div>
{/* QUOTATION DATA CONTAINER */}

<section id="quotation-cont">

  <div className="quotation-cont">
    <h4 className="quote-container-quote">Your reputation is more important than your paycheck, and your integrity is worth more than your career.
</h4>
<p className="quote-container-author">“ Joshua Johnson “</p>
  </div>
</section>

{/* DASHBOARD DATA STARTS */}

<section id="dashboard-data-cont">
<div className="dashboard-data-left-cont">

{/* COURSES CONTAINER */}

<section className="courses-container">
  <h4 className="course-container-heading">Courses</h4>
{CourseData.map((item,index)=>{
  return <CoursesCard key={index} item={item} />
})}
  

     <div className="load-more-course-btn-cont" >
     <Link to="/knowledge">
     <button className="load-more-course-link">Load More </button>
     </Link>
     </div> 
</section>


{/* APPLY FOR FUNDING CONTAINER */}
<section className="apply-for-funding-cont">
  <img className="apply-for-funding-img" src="./images/image 302.png" alt="funding-img" />
  <h4 className="apply-for-funding-title">We have got just the patform for you to apply for funding</h4>
  <button onClick={() =>window.open("https://reverrapp.com/fundingform", "_blank")} className="apply-for-funding--btn">Apply for funding</button>
</section>


{/* BLOG CONTAINER */}
<section className="blog-containerr">
<h4 style={{marginBottom:"1rem"}} className="course-container-heading">Blogs</h4>
  {blogArray.slice(0,3).map((item,index)=>{
    return <BlogCard item={item} key={index} />
  })}
</section>

</div>

{/* RIGHT CONTAINER START */}
<div className="dashboard-data-right-cont">


{/* MEETING CONTAINER */}

<section className="meeting-container">
<h1 className="meeting-container-titlee">Meetings</h1>
  <h1 className="meeting-container-current-date">{new Date().toDateString().slice(4)}</h1>

  {hasMeeting?null:<><h2 className="no-meeting-schedule-msg">No Meeting Scheduled For Today</h2></>}
    <EventCard meetingArray={meetingArray} purementorArray={purementorArray} />
</section>


{/* JOIN OUR COMUNITY CONTAINER */}
<section className="join-our-comunity-cont">
  <img className="join-our-comunity-img" src="./images/Group 6267144.png" alt="funding-img" />
  <h4 className="join-our-comunity-title">I am a heading about the community that unites the Startup and helps them grow</h4>
  <a href="https://play.google.com/store/apps/details?id=com.reverr" target="_blank" rel="noreferrer">
  <button className="join-our-comunity-btn">Join Our Community</button></a>
</section>


{/* MENTOR CONTAINER */}

<section className="mentors-containerr">
<h2 className="mentors-container-titlee">Mentors</h2>
{mentorArray.slice(0,4).map((item)=>{
  return <MentorCard key={item.email} item={item}  />
})}
<div className="load-more-mentor-btn-cont">
<button onClick={() => navigate("/mentors")} className="load-more-mentor-btn">Load More</button>
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
