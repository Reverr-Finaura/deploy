import { collection, getDocs, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase'

const DummyData = () => {
const [individualTypeUser,setindividualTypeUser]=useState([])
const [vibe_dataUser,setvibe_dataUser]=useState([])
const [noCalendlyMentorUser,setnoCalendlyMentorUser]=useState([])
console.log("individualTypeUser",individualTypeUser)
console.log("vibe_dataUser",vibe_dataUser)
console.log("noCalendlyMentorUser",noCalendlyMentorUser)
useEffect(()=>{
    async function fetchUserDocFromFirebase() {
        const userDataRef = collection(db, "Users");
        const q = query(userDataRef);
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
        if(doc.data()?.userType?.toLowerCase()==="individual"){
            setindividualTypeUser((p)=>{return[...p,doc.id]})  
        }
        if(doc.data().Vibe_Data){
            setvibe_dataUser((p)=>{return[...p,doc.id]})  
        }
        if((doc.data()?.userType?.toLowerCase()==="mentor"||doc.data()?.userType?.toLowerCase()==="mentors")&&!doc.data().mentorCalendlyLink){
            setnoCalendlyMentorUser((p)=>{return[...p,doc.id]})  
        }
        });
        
      }
      fetchUserDocFromFirebase();
},[])

  return (
    <div>DummyData</div>
  )
}

export default DummyData