import React,{ useEffect, useState } from 'react'
import "./ChangePassword.css"
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { auth,db } from '../../firebase';
import { setUserDoc } from '../../features/userDocSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

const ChangePassword = () => {  
    const location = useLocation()
    const otp = location.state
 const[changePassForm,setChangePassForm]=useState({oldPass:"",newPass:"",confirmNewPass:""})  
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const user=useSelector((state)=>state.user)
 const userDoc=useSelector((state)=>state.userDoc)
 const theme=useSelector((state)=>state.themeColor)
 const[loading,setLoading]=useState(false)

console.log("userDoc",userDoc)

useEffect(()=>{
if(!otp){navigate("/")}
},[otp])

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


function handleChangePassFormInputChange(e){
    const{name,value}=e.target

    setChangePassForm((prev)=>{
        return {...prev,[name]:value}
    })
}

function handleChangePassBtnClick(){
    setLoading(true)
    if(changePassForm.confirmNewPass===""||changePassForm.newPass===""||changePassForm.oldPass===""){toast.error("Kindly Fill all Inputs");setLoading(false);return;}
if(changePassForm.oldPass!==otp){toast.error("Wrong OTP Entered");setLoading(false);return}

if(changePassForm.newPass!==changePassForm.confirmNewPass){toast.error("Password Doesn't Match");setLoading(false);return}

toast("Processing Your request")
updateUserDocInFirebase()
}

async function updateUserDocInFirebase(){
    try {
        await signInWithEmailAndPassword(
        auth,
        userDoc.email,
        userDoc.password
      );
        await updatePassword(auth.currentUser, changePassForm.newPass);
        await updateDoc(doc(db, "Users", userDoc.email), {
          password: changePassForm.newPass,
        });
        toast.success("Successfully Updated Password");
        setLoading(false);
        navigate("/")

    } catch (error) {
        toast(error.message)
        setLoading(false);
    }

}

  return (
  <>
   <Header theme={theme} />
    <section id='changePassContainer'>
    <ToastContainer />
        <h3 className='changePassContainer-title'>Change Your Password</h3>
        <p className='changePassContainer_otp_send_message'>*OTP has been send to your registered mobile number and email address</p>
<div className='changePassContainer-form'>
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='Enter the OTP' name='oldPass' className='changePassContainer-input' value={changePassForm.oldPass} />
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='New Password' name='newPass' className='changePassContainer-input'  value={changePassForm.newPass}/>
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='Confirm New Password' name='confirmNewPass' className='changePassContainer-input' value={changePassForm.confirmNewPass} />

    <button style={{cursor:loading?"default":""}} disabled={loading} onClick={handleChangePassBtnClick} className='changePassContainer-button'>Change Password</button>
</div>
    </section>
    <Footer />
  </>
  )
}

export default ChangePassword