import axios from 'axios'
import React, { useState } from 'react'
import styles from "./RsFiveOneZero.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rs501Payment from './Rs501Payment';

const RsFiveOneZero = () => {
const[num,setNum]=useState("")
const[sessionIdTokken,setSessionIdTokken]=useState(null)

    //GENERATE RANDOM UNIQUE ID
const uuid=()=>{
    const val1=Date.now().toString(36)
    const val2=Math.random().toString(36).substring(2)

    return val1+val2
}

const handleMakePayment=()=>{
    const bodyData={
 
        id:`order_${uuid()}`,
        amount:`${501}`,
        // amount:"1",
        currency:"INR",
        customer_id:uuid(),
        customer_phone:num,
        
    }
    axios.post("https://server.reverr.io/webcftoken",bodyData)
.then((res)=>{setSessionIdTokken(res.data.token)})
.catch((err)=>{toast.error(err.message)})
}

  return (
    <><ToastContainer/>
    {sessionIdTokken!==null?<Rs501Payment sessionIdTokken={sessionIdTokken} setSessionIdTokken={setSessionIdTokken}/>:null} 

    <form className={styles.form} onSubmit={handleMakePayment}>
        <input className={styles.input} onChange={(e)=>setNum(e.target.value)} type="number" placeholder='Enter your Phone Number' value={num} required/>
        <button className={styles.btn} type='submit'>Make Payment</button>
    </form>
    </>
  )
}

export default RsFiveOneZero