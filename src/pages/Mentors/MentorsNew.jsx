import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar';
import NavBarFinal from '../../components/Navbar/NavBarFinal';
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal';
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import SkillIcon from "./skillIcon"
import { db } from '../../firebase';
import "./Mentors_Module_Ansh_New.css"
import MentorProfileCard from './MentorProfileCard';


const MentorsNew = () => {

    const [mentorArray, setMentorArray] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
  
 
    const data = [];

console.log("mentor array",mentorArray)

    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);


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



  return (
    <>
{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
          <h1 className='find-best-mentor-heading'>Find the Best Mentor</h1>
<section id='mentors-page-new'>

<div className='mentors-page-card-container'>
{mentorArray?.map((item,index)=>{
    return <MentorProfileCard key={index} item={item} index={index}/>
})}


</div>

</section>
    </>
  )
}

export default MentorsNew