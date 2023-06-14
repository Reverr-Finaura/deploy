import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../firebase';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import axios from 'axios';

const DummyTest = () => {

  const { linkedInLogin } = useLinkedIn({
    clientId: '77k09msokpmnc9',
    redirectUri: `https://server.reverr.io/api/linkedin/redirect`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

const tryNewLinkedin=async()=>{
  // window.open('https://server.reverr.io/api/linkedin/authorize','_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  window.open("https://server.reverr.io/api/linkedin/authorize","_self")

}

const creteMeta=async()=>{
    const dummyArray=[]
        const userDataRef = collection(db, "Users");
        const q = query(userDataRef);
        const querySnapshot = await getDocs(q);
       
        querySnapshot.forEach((doc) => {
        //  if(doc.data().phone||doc.data().mobile){ dummyArray.push({email:doc.id,mobile:doc.data().phone?doc.data().phone:doc.data().mobile})}
        //  if(doc.data().email){ dummyArray.push({email:doc.id,mobile:doc.data().phone?doc.data().phone:doc.data().mobile})}
        //  if(doc.data().phone&&doc.data().email){
        //     dummyArray.push({email:doc.data().email,phone:doc.data().phone})
        //  }
        }); 
        console.log("dummyArray",dummyArray)
        // dummyArray.map(async(item)=>await updateDoc(doc(db,"Users",item.email),{countryCode:'91'}))
        // await setDoc(
        //     doc(db, "meta", 'emailPhone'),{emailPhone:dummyArray})
}
    


  return (
  <>
    {/* <button onClick={}>Create Meta</button> */}
    
       <button onClick={tryNewLinkedin}>Login with LinkedIn</button>

  </>
  )
}

export default DummyTest