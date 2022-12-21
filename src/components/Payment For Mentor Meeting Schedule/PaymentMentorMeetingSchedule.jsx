
import { useState,useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import styles from "./PaymentMentorMeetingSchedule.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";
import CashfreeDropInCont from "../Cashfree Dropin Container/CashfreeDropInCont"

const PaymentMentorMeetingSchedule = ({item}) => {
    const[mentorPlanPrice,setMentorPlanPrice]=useState()
    const user=useSelector((state)=>state.user)
    const userDocc=useSelector((state)=>state.userDoc)
    const dispatch=useDispatch()
    


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
        "x-client-id":process.env.REACT_APP_CASHFREE_APP_ID,
        "x-client-secret":process.env.REACT_APP_CASHFREE_SECRET_KEY,

   }
}

//GENERATE RANDOM UNIQUE ID
const uuid=()=>{
    const val1=Date.now().toString(36)
    const val2=Math.random().toString(36).substring(2)

    return val1+val2
}

//GENERATE EXPIRY DATE
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

const handlePaymentClick=()=>{
const body={
    "order_id": `order_${uuid()}`,
    "order_amount": mentorPlanPrice,
    "order_currency": "INR",
    "order_note": "",
    "order_expiry_time": addMinutes(new Date(),15),
    "customer_details": {
     "customer_id": user?.user?.email,
      "customer_name": userDocc?.name,
      "customer_email": user?.user?.email,
      "customer_phone": userDocc?.phone
    }
}

axios.post(`https://sandbox.cashfree.com/pg/orders`,header,body)
.then((res)=>{console.log("sucess",res)})
.catch((err)=>{console.log("Failure",err)})
}




//DROP CONTAINER CONFIG
const dropinConfig = {
    components: [
        "order-details",
        "card",
        "netbanking",
        "app",
        "upi",
    ],
    onSuccess: function(data){
       //on success
       console.log("sucess",data)
    },
    onFailure: function(data){
       //on success
       console.log("failure",data)
    },
    style: {
          //to be replaced by the desired values
          backgroundColor: "#ffffff",
          color: "#11385b", 
          fontFamily: "Lato",
          fontSize: "14px",
          errorColor: "#ff0000",
          theme: "light"
    }
}

//RENDER DROPIN
const renderDropin=()=>{}

  return (
    <>
    <section className={styles.outerContainer}>
        <div className={styles.innerContainer}>
        {/* <CashfreeDropInCont/> */}
{/* 
        <div className={styles.PaymentSessionIdContainer}>
          <h1 className={styles.container_Heading}>Payment Session Id : <span className={styles.container_SubHeading}>12133131313</span></h1>
          <h3 className={styles.chooseComponentsText}>Choose Components</h3>

          <div className={styles.componentsContainer}>
          <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="order-details" checked/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Order Details</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="card"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Card</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="upi"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>UPI</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="app"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Wallets</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="netbanking"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Netbanking</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="paylater"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Paylater</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="credicardemi"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Credit Card EMI</label> 
        </div>
        <div className={styles.individualComponent}>
          <input id='orderDetailsInput' className="drops" type="checkbox" value="cardlessemi"/>
        <label htmlFor="orderDetailsInput" className={styles.inputLabel}>Cardless EMI</label> 
        </div>
          </div>

         
<button onClick={renderDropin} className={styles.renderButton}>Render</button>

<div className="dropin-parent" id="drop_in_container">
Your component will come here
</div>
        </div> */}
<h1>Make Payment</h1>
        <button style={{padding:"1rem"}} onClick={handlePaymentClick}>Pay</button>
        </div>
    </section>

    </>
    
  )
}

export default PaymentMentorMeetingSchedule