import React,{ useEffect, useState } from 'react'
import "./ChangePassword.css"
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { setUserDoc } from '../../features/userDocSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


const ChangePassword = () => {  
 const[changePassForm,setChangePassForm]=useState({oldPass:"",newPass:"",confirmNewPass:""})  
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const user=useSelector((state)=>state.user)
 const userDoc=useSelector((state)=>state.userDoc)
 const theme=useSelector((state)=>state.themeColor)

console.log("user",user)
console.log("userDoc",userDoc)

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
    if(changePassForm.confirmNewPass===""||changePassForm.newPass===""||changePassForm.oldPass===""){toast("Kindly Fill all Inputs");return;}
if(changePassForm.oldPass!==userDoc?.password){toast("Wrong Current Password");return}

if(changePassForm.newPass!==changePassForm.confirmNewPass){toast("Password Doesn't Match");return}

toast("Processing Your request")
updateUserDocInFirebase()
}

async function updateUserDocInFirebase(){
    try {
        const userDocumentRef=doc(db,"Users",user?.user?.email)

        await updateDoc(userDocumentRef,{password:changePassForm.newPass})
     toast("Successfully Updated Password")
     setTimeout(()=>{
        navigate("/dashboard")
     },2000)
    
    } catch (error) {
        toast(error.message)
    }

}

  return (
  <>
   <Header theme={theme} />
    <section id='changePassContainer'>
    <ToastContainer />
        <h3 className='changePassContainer-title'>Change Your Password</h3>
<div className='changePassContainer-form'>
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='Current Password' name='oldPass' className='changePassContainer-input' value={changePassForm.oldPass} />
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='New Password' name='newPass' className='changePassContainer-input'  value={changePassForm.newPass}/>
    <input onChange={handleChangePassFormInputChange} type="password" placeholder='Confirm New Password' name='confirmNewPass' className='changePassContainer-input' value={changePassForm.confirmNewPass} />

    <button onClick={handleChangePassBtnClick} className='changePassContainer-button'>Change Password</button>
</div>
    </section>
    <Footer />
  </>
  )
}

export default ChangePassword