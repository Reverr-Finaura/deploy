import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import styles from "./MakePayment.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cashfreeProd, cashfreeSandbox } from 'cashfree-dropjs';
import { useSelector } from 'react-redux';

const MakePayment = ({sessionIdTokken,setSessionIdTokken,planDuration,planName}) => {
  const userDoc=useSelector((state)=>state.userDoc)

  const [orderToken, setOrderToken] = useState(sessionIdTokken);
  const [orderDetails,setOrderDetails]=useState(null)
  const [style, setStyle] = useState({});
  const [isProd, setIsProd] = useState(true);
  const [components, setComponents] = useState(['order-details','card','upi','netbanking']);

//TO GET EXPIRY DATE
function getDesireDay(date, days) {
  return new Date(date.setDate(date.getDate() + days));
}

  const cbs = (data) => {
    console.log(data,"sucess")
    setOrderDetails(data)
  };

  const cbf = (data) => {
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


//ACTION PERFORM ON SUCESSFUL PAYMENT

const onSuccessfulPayment=async(order,transaction)=>{
  const newId=uuid()
  await setDoc(
    doc(db, "Payments", newId),{
orderAmount:transaction.transactionAmount,
orderId:order.orderId,
paymentMode:order.activePaymentMethod,
transactionId:transaction.transactionId,
txStatus:transaction.txStatus,
user:userDoc.email,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{updateUserDatabase(newId,transaction)}).catch((err)=>{toast(err.message)})
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
user:userDoc.email,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{updateUserDatabase(newId,transaction)}).catch((err)=>{toast(err.message)})
}

//UPDATE DATA IN USER DATABASE
const updateUserDatabase=async(newId,transaction)=>{
  let userPaymentArray
  if(!userDoc.Payments){userPaymentArray=[]}
  else{userPaymentArray=userDoc.Payments}
  const newUserPaymentArray=[...userPaymentArray,newId]


const userDocumentRef=doc(db,"Users",userDoc?.email)

await updateDoc(userDocumentRef,{Payments:newUserPaymentArray}).then(()=>{
  if(transaction.txStatus==="FAILED"){
  toast.error(transaction.txMsg);
        return;
      }
    if(transaction.txStatus==="SUCCESS"){
      let premiumData;
      let DOE
      if (planDuration === 1) {
        DOE = getDesireDay(new Date(), 30);
      } else if (planDuration === 3) {
        DOE = getDesireDay(new Date(), 92);
      } else if (planDuration === 6) {
        DOE = getDesireDay(new Date(), 185);
      } else if (planDuration === 12) {
        DOE = getDesireDay(new Date(), 365);
      }

      if (userDoc.Premium) {
        premiumData = userDoc.Premium;
      } else {
        premiumData = [];
      }

      const finalPremiumData = premiumData.map(item => {
        if (item.id === 'Upgrade') {
          return {
            ...item,
            DateOfPurchase: new Date(),
            DateOfExpiry: DOE,
            PlanName:planName
          };
        } else {
          return item;
        }
      });
  
      updateDoc(userDocumentRef,{
        Premium: userDoc.hasUpgrade
          ? [...finalPremiumData]
          : [
              ...premiumData,
              {
                DateOfPurchase: new Date(),
                DateOfExpiry: DOE,
                PlanName:planName,
                id: 'Upgrade',
              },
            ],
      }).then(()=>{
        updateDoc(userDocumentRef,{hasUpgrade: true})
      }).then(()=>{
        toast.success(transaction.txMsg); 
      return
      })
      
    }
}).catch((err)=>{toast(err.message)})
}

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
      <div
        className={styles.dropin_parent}
        id="drop_in_container"
      >
        {/* Your component will come here */}
      </div>
    </div>
  )
}

export default MakePayment