import { useState,useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import styles from "./PaymentMentorMeetingSchedule.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";

const PaymentMentorMeetingSchedule = ({item}) => {
    const[mentorPlanPrice,setMentorPlanPrice]=useState()
    const user=useSelector((state)=>state.user)
    const userDocc=useSelector((state)=>state.userDoc)
    const dispatch=useDispatch()
    

//     console.log(item,mentorPlanPrice)
//   console.log("userDoc",userDocc);

    useEffect(()=>{
const planPrice=(item?.plans[0]/2)<=500?500:(item?.plans[0]/2)>500&&(item?.plans[0]/2)<=750?750:(item?.plans[0]/2)>750&&(item?.plans[0]/2)<=1000?1000:(item?.plans[0]/2)>1000&&(item?.plans[0]/2)<=1500?1500:item?.plans[0]/2
setMentorPlanPrice(planPrice)
    },[])

 // CHECK FOR USER DOC DATA
 useEffect(()=>{
    async function fetchUserDocFromFirebase(){
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
     
      querySnapshot.forEach((doc) => {
       
       if(doc.id===user?.user?.email){
        dispatch(setUserDoc(doc.data())); 
       }
      }); 
    }
  fetchUserDocFromFirebase()
  },[user])

const header={
   headers:{
        "Content-Type":`application/json`,
        "x-api-version":"2022-09-01",
        "x-client-id":"",
        "x-client-secret":"",

   }
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

const handlePaymentClick=()=>{
const body={
    "order_id": `order_${new Date().getTime()}`,
    "order_amount": mentorPlanPrice,
    "order_currency": "INR",
    "order_note": "",
    "order_expiry_time": addMinutes(new Date(),15),
    "customer_details": {
     "customer_id": user?.user?.email,
      "customer_name": user?.user?.displayName,
      "customer_email": user?.user?.email,
      "customer_phone": userDocc?.phone
    }
}
axios.post(`https://sandbox.cashfree.com/pg/orders`,header,body)
.then((res)=>{console.log("sucess",res)})
.catch((err)=>{console.log("Failure",err)})
}
  return (
    <>
    <section className={styles.outerContainer}>
        <div className={styles.innerContainer}>

        <button onClick={handlePaymentClick}>Click Me</button>
        </div>
    </section>

    </>
    
  )
}

export default PaymentMentorMeetingSchedule