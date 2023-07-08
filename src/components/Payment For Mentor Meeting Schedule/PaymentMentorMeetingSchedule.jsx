
import { useState,useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import styles from "./PaymentMentorMeetingSchedule.module.css"
import CashfreeDropInCont from "../Cashfree Dropin Container/CashfreeDropInCont"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PaymentMentorMeetingSchedule = ({userDocc,item,setPaymentModeOn,setPaymentMade}) => {
    const[mentorPlanPrice,setMentorPlanPrice]=useState()
    const[sessionIdTokken,setSessionIdTokken]=useState(null)
 

    useEffect(()=>{
const planPrice=(item?.plans[0]/2)<=5?item?.plans[0]/2:(item?.plans[0]/2)<=500?500:(item?.plans[0]/2)>500&&(item?.plans[0]/2)<=750?750:(item?.plans[0]/2)>750&&(item?.plans[0]/2)<=1000?1000:(item?.plans[0]/2)>1000&&(item?.plans[0]/2)<=1500?1500:(item?.plans[0]/2)+50
setMentorPlanPrice(planPrice)
    },[])

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

const handlePaymentClick=async()=>{

if(userDocc?.phone===""||userDocc?.phone===undefined||userDocc?.phone===null){
    toast.error("Kindly Fill your Mobile Number Info in your Profile");return
}
if(!item.mentorUniqueID||item.mentorUniqueID===""){
  toast.error("No Mentor Unique Id");return
}
toast("Processing Your Request")
const bodyData={
 
    id:`order_${uuid()}`,
    amount:`${mentorPlanPrice}`,
    // amount:"1",
    currency:"INR",
    customer_id:uuid(),
    customer_phone:userDocc?.phone,
    
}
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
};
console.log(bodyData)
console.log("DATA👀")
// const { id, amount, currency, customer_id, customer_phone } = bodyData;
// 	const options = {
// 	  method: "POST",
// 	  url: "https://api.cashfree.com/pg/orders",
// 	  headers: {
// 		accept: "application/json",
// 		"x-client-id": "21235619dae90a7c71fa82b24c653212",
// 		"x-client-secret": "b3fcd2aee2a93a9d7efedcd88936046a43506c5c",
// 		"x-api-version": "2022-01-01",
// 		"content-type": "application/json",
//         'Access-Control-Allow-Credentials':"true"
// 	  },
// 	  data: {
// 		customer_details: {
// 		  customer_id: customer_id,
// 		  customer_phone: customer_phone,
// 		},
// 		order_id: id,
// 		order_amount: amount,
// 		order_currency: currency,
// 	  },
//     };
//     axios
// 	  .request(options)
// 	  .then(function (response) {
// 		console.log(response.data.order_token );
// 	  })
// 	  .catch(function (error) {
//         toast.error(error.message)
// 		console.error(error);
// 	  });
fetch('https://server.reverrapp.com/webcftoken', requestOptions)
    .then(response => {
        response.json()
        .then(data=>setSessionIdTokken(data.token))
        .catch((err)=>{toast.error(err.message)})
    }).catch((err)=>{toast.error(err.message)});
axios.post("https://server.reverrapp.com/webcftoken",bodyData)
.then((res)=>{setSessionIdTokken(res.data.token)})
.catch((err)=>{toast.error(err.message)})
}


  return (
    <>
    <section className={styles.outerContainer}>
        <div className={styles.innerContainer}>
        <ToastContainer/>
       {sessionIdTokken!==null?<CashfreeDropInCont sessionIdTokken={sessionIdTokken} mentorDetails={item} setSessionIdTokken={setSessionIdTokken} userDoc={userDocc} setPaymentModeOn={setPaymentModeOn} setPaymentMade={setPaymentMade}/>:null} 
{sessionIdTokken===null?<div className={styles.makePaymentContainer}>
<h1 className={styles.makePaymentContainerHeading}>Make Payment</h1>
<p className={styles.makePaymentContainerSubText}>User Name : <span className={styles.makePaymentContainerAmount}>{userDocc?.name}</span></p>
<p className={styles.makePaymentContainerSubText}>User Email : <span className={styles.makePaymentContainerAmount}>{userDocc?.email}</span></p>
<p className={styles.makePaymentContainerSubText}>User Mobile Number : <span className={styles.makePaymentContainerAmount}>{userDocc?.phone}</span></p>
<p className={styles.makePaymentContainerSubText}>Mentor Name : <span className={styles.makePaymentContainerAmount}>{item?.name}</span></p>
<p className={styles.makePaymentContainerSubText}>Mentor Email : <span className={styles.makePaymentContainerAmount}>{item?.email}</span></p>
<p className={styles.makePaymentContainerSubText}>Amount To Be Paid : <span className={styles.makePaymentContainerAmount}>₹ {mentorPlanPrice}</span></p>
<button className={styles.makePaymentContainerPayButton} onClick={handlePaymentClick}>Pay</button>
</div>:null}

        </div>
    </section>

    </>
    
  )
}

export default PaymentMentorMeetingSchedule