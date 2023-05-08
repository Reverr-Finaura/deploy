import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../firebase';


const DummyTest = () => {

const creteMeta=async()=>{
    const dummyArray=[]
        const userDataRef = collection(db, "Users");
        const q = query(userDataRef);
        const querySnapshot = await getDocs(q);
       
        querySnapshot.forEach((doc) => {
        //  if(doc.data().phoneNumber){ dummyArray.push({email:doc.id,mobile:doc.data().phoneNumber})}
        //  if(doc.data().phone&&doc.data().email){
        //     dummyArray.push({email:doc.data().email,phone:doc.data().phone})
        //  }
        }); 
        console.log("dummyArray",dummyArray)
        // dummyArray.map(async(item)=>await updateDoc(doc(db,"Users",item.email),{phone:item.mobile}))
        // await setDoc(
        //     doc(db, "meta", 'emailPhone'),{emailPhone:dummyArray})
}
    
  return (
  <>
    <button onClick={creteMeta}>Create Meta</button>
  </>
  )
}

export default DummyTest