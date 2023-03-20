import React, { useState } from "react";
import styles from "./Upgrade.module.css";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MakePayment from "./Make Payment/MakePayment";

const Upgrade = () => {
  const navigate = useNavigate();
  const userDoc=useSelector((state)=>state.userDoc)
  const[sessionIdTokken,setSessionIdTokken]=useState(null)
  const[loading,setLoading]=useState(false)
  const [planAmt,setPlanAmt]=useState("")
  const[planDuration,setPlanDuration]=useState('')
  const[planName,setPlanName]=useState("")

  console.log("userDoc",userDoc)

//GENERATE RANDOM UNIQUE ID
const uuid=()=>{
  const val1=Date.now().toString(36)
  const val2=Math.random().toString(36).substring(2)

  return val1+val2
}

const handleUpgrade=(amt,duration,planName)=>{
  toast("Processing Your Request")
  setLoading(true)
  setPlanAmt(amt)
  setPlanDuration(duration)
  setPlanName(planName)
  const bodyData={
 
    id:`order_${uuid()}`,
    amount:`${amt}`,
    // amount:"1",
    currency:"INR",
    customer_id:uuid(),
    customer_phone:userDoc?.phone,
    
}
axios.post("https://server.reverr.io/webcftoken",bodyData)
.then((res)=>{setSessionIdTokken(res.data.token);setLoading(false)})
.catch((err)=>{toast.error(err.message);setLoading(false)})
}

  return (
    <><ToastContainer/>
{sessionIdTokken!==null?<MakePayment sessionIdTokken={sessionIdTokken} setSessionIdTokken={setSessionIdTokken} planDuration={planDuration} planName={planName}/>:null} 
{sessionIdTokken===null&&
<div className={styles.upgrade_container_outer}>
      <MdArrowBackIos
        className={styles.back_icon}
        size={25}
        onClick={() => navigate(-1)}
      />
     <div className={styles.upgrade_container_main}>
        <h3>Premium</h3>
        <h1>
          Choose your <span>Plan</span>
        </h1>
        <p>Lorem ipsum is a dummy text used for typography</p>
        <div className={styles.plans_card}>
          <div className={styles.plan_card_1}>
            <p className={styles.plan_duration}>Monthly</p>
            <h3 className={styles.plan_price}>
              ₹499/<span>Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button disabled={loading} onClick={()=>{handleUpgrade(499,1,"Monthly")}} className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_2}>
            <p className={styles.plan_duration}>Quarterly</p>
            <h3 className={styles.plan_price}>
              ₹1099/<span>3Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button disabled={loading} onClick={()=>{handleUpgrade(1099,3,"Quarterly")}} className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_3}>
            <p className={styles.plan_duration}>Semi-Annually</p>
            <h3 className={styles.plan_price}>
              ₹4099/<span>6Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button disabled={loading} onClick={()=>{handleUpgrade(4099,6,"Semi-Annually")}} className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_4}>
            <p className={styles.plan_duration}>Yearly</p>
            <h3 className={styles.plan_price}>
              ₹4099/<span>12Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button disabled={loading} onClick={()=>{handleUpgrade(4099,12,"Yearly")}} className={styles.plan_buy_btn}>Buy Now</button>
          </div>
        </div>
        <p className={styles.plan_tnc}>
          * <span>Terms & Conditions </span> applied
        </p>
      </div>
    </div>}
    </>
  );
};

export default Upgrade;
