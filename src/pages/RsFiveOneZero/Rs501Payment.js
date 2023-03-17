
import { cashfreeSandbox, cashfreeProd } from 'cashfree-dropjs';
import { useState } from 'react';
import styles from "./Rs501Payment.module.css"
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc} from 'firebase/firestore';
import { db } from '../../firebase';

function Rs501Payment({sessionIdTokken,setSessionIdTokken,mob}) {
  const navigate=useNavigate()
  const [orderToken, setOrderToken] = useState(sessionIdTokken);
  const [orderDetails,setOrderDetails]=useState(null)
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


//ACTION PERFORM ON SUCESSFUL PAYMENT

const onSuccessfulPayment=async(order,transaction)=>{
  const newId=uuid()
  await setDoc(
    doc(db, "Rs501", newId),{
orderAmount:transaction.transactionAmount,
orderId:order.orderId,
paymentMode:order.activePaymentMethod,
transactionId:transaction.transactionId,
txStatus:transaction.txStatus,
user:mob,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{toast.success("Transcation Success")}).catch((err)=>{toast(err.message)})
}

//ACTION PERFORM ON FAILED PAYMENT

const onFailedPayment=async(order,transaction)=>{
  setSessionIdTokken(null)
  const newId=uuid()
  await setDoc(
    doc(db, "Rs501", newId),{
orderAmount:transaction.transactionAmount,
orderId:order.orderId,
paymentMode:order.activePaymentMethod,
transactionId:transaction.transactionId,
txStatus:transaction.txStatus,
user:mob,
referenceId:"",
signature:"",
txTime:""
    }).then(()=>{toast.error("Transcation Failed")}).catch((err)=>{toast(err.message)})
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
  );
}

export default Rs501Payment;
