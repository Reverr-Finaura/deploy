
import { cashfreeSandbox, cashfreeProd } from 'cashfree-dropjs';
import { useState } from 'react';
import { dropinComponents } from './DropInComments';
import styles from "./CashfreeDropInCont.module.css"
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { createMentorInMessagesDoc, db } from '../../firebase';
import { useSelector } from 'react-redux';
import axios from 'axios';

function CashfreeDropInCont({sessionIdTokken,mentorDetails,setSessionIdTokken,userDoc,setPaymentModeOn,setPaymentMade}) {
  const navigate=useNavigate()
  const [orderToken, setOrderToken] = useState(sessionIdTokken);
  const [orderDetails,setOrderDetails]=useState(null)
  const user=useSelector((state)=>state.user)

console.log(mentorDetails,"mentorDetails")
  const [checkedState, setCheckedState] = useState(
    new Array(dropinComponents.length).fill(true)
  );
  const [style, setStyle] = useState({});
  const [isProd, setIsProd] = useState(true);
  const [components, setComponents] = useState(['order-details','card','upi','netbanking']);
  const cbs = (data) => {
    console.log(data,"sucess")
    setOrderDetails(data)
    // if (data.order && data.order.status === 'PAID') {
    //   alert('order is paid. Call api to verify');
    // }
  };
  const cbf = (data) => {
    // alert(data.order.errorText || 'ERROR');
    console.log(data,"errro data")
    setOrderDetails(data)
  };
  
  const renderDropin = () => {
    if (orderToken === '') {
      toast.error('Order Token is empty');
      return;
    }
    if (!components.length) {
      toast.error('No drop in specified');
      return;
    }
    let parent = document.getElementById('drop_in_container');
    parent.innerHTML = '';
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style
    });
 
  };

//GENERATE RANDOM UNIQUE ID
const uuid=()=>{
  const val1=Date.now().toString(36)
  const val2=Math.random().toString(36).substring(2)

  return val1+val2
}


//MAKE PAYMENT DROP DOWN 
useEffect(()=>{
  renderDropin()
},[])

//ACTION AFTER PAYMENT IS DONE OR FAILED
useEffect(()=>{
if(orderDetails===null){return}
const{order,transaction}=orderDetails
if(transaction.txStatus==="FAILED"){
  onFailedPayment(order,transaction)
  return;
}
if(transaction.txStatus==="SUCCESS"){
  onSuccessfulPayment(order,transaction)
}
},[orderDetails])


//INITIALIZE SPLIT PAYMENT
const initiateSplitPayment=async(order)=>{

  const bodyData={
    orderId:order.orderId,
    vendorId:mentorDetails.mentorUniqueID,
    amount:(mentorDetails.plans[0]/2)*0.9,
    secrett:"2V7W@ODU6HTRS1GY$54JQ*EP0F8N%9!BI&AXKML3#ZCQ!$3U",
}

  
  await axios.post("https://server.reverr.io/webSplitPayment",bodyData)
  .then((res)=>{console.log("success split",res.data.message)})
  .catch((err)=>{console.log("Failure Split",err.message)})
}

//ACTION PERFORM ON SUCESSFUL PAYMENT

const onSuccessfulPayment=async(order,transaction)=>{
  initiateSplitPayment(order)
  const newId=uuid()
  await setDoc(
    doc(db, "Payments", newId),{
orderAmount:transaction.transactionAmount,
orderId:order.orderId,
paymentMode:order.activePaymentMethod,
transactionId:transaction.transactionId,
txStatus:transaction.txStatus,
user:user?.user?.email,
vendor:mentorDetails.email,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{updateUserDatabase(newId,transaction)})
    .catch((err)=>{toast(err.message)})
}

//ACTION PERFORM ON FAILED PAYMENT

const onFailedPayment=async(order,transaction)=>{
  setSessionIdTokken(null)
  const newId=uuid()
  await setDoc(
    doc(db, "Payments", newId),{
orderAmount:transaction.transactionAmount,
orderId:order.orderId,
paymentMode:order.activePaymentMethod,
transactionId:transaction.transactionId,
txStatus:transaction.txStatus,
user:user?.user?.email,
vendor:mentorDetails.email,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{updateUserDatabase(newId,transaction)})
    .catch((err)=>{toast(err.message)})
}

//UPDATE DATA IN USER DATABASE
const updateUserDatabase=async(newId,transaction)=>{
  let userPaymentArray
  let userMentorArray
  let mentorClientArray
  if(!userDoc.Payments){userPaymentArray=[]}
  else{userPaymentArray=userDoc.Payments}
  const newUserPaymentArray=[...userPaymentArray,newId]
if(!userDoc.mentors){userMentorArray=[]}
else{userMentorArray=userDoc.mentors}
const newMentorArray=[...userMentorArray,mentorDetails.email]
if(!mentorDetails.clients){mentorClientArray=[]}
else{mentorClientArray=mentorDetails.clients}
const newMentorClientsArray=[...mentorClientArray,userDoc.email]


const userDocumentRef=doc(db,"Users",user?.user?.email)
const mentorDocumentRef=doc(db,"Users",mentorDetails?.email)
await updateDoc(userDocumentRef,{Payments:newUserPaymentArray}).then(()=>{
  if(transaction.txStatus==="FAILED"){
  toast.error(transaction.txMsg);
  setTimeout(()=>{
    navigate("/mentors")
        },1500)
        return;
      }
    if(transaction.txStatus==="SUCCESS"){
      updateDoc(userDocumentRef,{mentors:newMentorArray}).then(()=>{
        updateDoc(mentorDocumentRef,{clients:newMentorClientsArray})
      }).then(()=>{
        createMentorInMessagesDoc(user?.user?.email,mentorDetails?.email)
      }).then(()=>{
        toast.success(transaction.txMsg); 
      setPaymentModeOn(false) 
      setPaymentMade(true)
      return
      })
      
    }
}).catch((err)=>{toast(err.message)})
}


  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    let comp = [];
    updatedCheckedState.forEach((item, index) => {
      if (item) {
        comp.push(dropinComponents[index].id);
      }
    });
    setComponents(comp);
  };

  const handleStyleChange = () => (e) => {
    setStyle({
      ...style,
      [e.target.id]: e.target.value
    });
  };
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <p
          className={styles.App_link}
        >
          REVERR PAYMENT GATEWAY
          <p className={styles.warningMessage}>Note: Do Not Refresh This Page!!</p>
        </p>
       
      </header>
      {/* <div className={`${styles.mt_1} ${styles.mb_1}`}>
        <span className={`${styles.order_token} ${styles.mr_8}`}>Order Token :</span>
        <input
          type="text"
          placeholder="order_token"
          id="orderToken"
          value={orderToken}
          className={styles.inputText}
          readonly
        />
      </div> */}
      {/* <p className={styles.order_token}>Choose components</p>
      <ul className={styles.toppings_list}>
        {dropinComponents.map(({ name, id }, index) => {
          return (
            <>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={name}
                value={id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
                key={id}
              />
              <label className={styles.mr_8} htmlFor={`custom-checkbox-${index}`}>
                {name}
              </label>
            </>
          );
        })}
      </ul> */}
      {/* <div style={{display:"none"}}>
        <p className={styles.order_token}>Style your Dropin</p>
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="backgroundColor"
          key="backgroundColor"
          placeholder="Background Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="theme"
          key="theme"
          placeholder="Theme"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="color"
          key="color"
          placeholder="Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="errorColor"
          key="errorColor"
          placeholder="Error Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontSize"
          key="fontSize"
          placeholder="Font Size"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontFamily"
          key="fontFamily"
          placeholder="Font Family"
          onChange={handleStyleChange()}
        />
      </div> */}
      {/* <div style={{display:"none"}} className={styles.mt_2}>
        <input
          type="checkbox"
          name="prod"
          id="prod-check"
          checked={isProd}
          onChange={() => setIsProd(!isProd)}
        />
        <label className={styles.mr_8} htmlFor="prod-check">
          Production Mode
        </label>
      </div> */}
      {/* <button className={`${styles.btn_render} ${styles.mt_2}`} onClick={renderDropin}>
        Pay
      </button> */}
      <div
        className={styles.dropin_parent}
        id="drop_in_container"
      >
        {/* Your component will come here */}
      </div>
    </div>
  );
}

export default CashfreeDropInCont;
