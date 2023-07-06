import React, { useState } from 'react'
import styles from "./GoogleSignUpInfoPage.module.css"
import logo from "../../../images/Frame 6267154.png"
import img from "../../../images/Arranging Files.png"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import {setPhone,setPassword, setcountryCode} from "../../../features/onboardingSlice"
import { useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import CountryCodePicker from '../../../Utils/Country Code Picker/CountryCodePicker'
import { selectNewUser } from '../../../features/newUserSlice'
import { createUserWithEmailAndPassword } from 'firebase/auth'


const GoogleSignupInfoPage = () => {
const selectedCountry=useSelector((state)=>state.countryCode)
const dispatch=useDispatch()
const navigate=useNavigate()
const[mob,setMob]=useState("")
const [pass,setPass]=useState("")
const [confirmPass,setConfirmPass]=useState("")
const[metaData,setMetaData]=useState([])
const newUser = useSelector(selectNewUser);
// console.log("newUser",newUser)

 //CHECK FOR META DATA
 useEffect(()=>{
  async function fetchUserDocFromFirebase(){
    const userDataRef = collection(db, "meta");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
      setMetaData(doc.data().emailPhone)
    }); 
  }
fetchUserDocFromFirebase()
},[])

const handleNext=()=>{
    if(mob===""||pass===""||confirmPass===""){ toast.error("Fill All Fields");return}
    if(pass!==confirmPass){toast.error("Password don not match");return}
    if(pass.length<6){toast.error("Password must contian minimum 6 letters");return}
    const data=metaData.filter((item)=>{return item.phone===mob})
    if(data.length>0){toast.error("Phone Number already registered");return}

  if(newUser.loginType==="linkedin"){
    toast("Processing your request")
    createUserWithEmailAndPassword(auth, newUser.email,pass)
        .then(() => {
          dispatch(setPhone(mob));
          dispatch(setcountryCode(selectedCountry.dialCode.slice(1)))
          dispatch(setPassword(pass))
        })
        .then(() => {
          // navigate("/startup-list");
          navigate("/OnboardingScreen");
          return
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          return
        });
  }
  if(newUser.loginType!=="linkedin"){
    dispatch(setPhone(mob));
    dispatch(setcountryCode(selectedCountry.dialCode.slice(1)))
    dispatch(setPassword(pass))
    navigate("/OnboardingScreen")
  }
}

  return (
   <>
   <ToastContainer/>
     <section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    </div>
    <div className={styles.dataCont}>
        <div className={styles.left}>
            <h1>Let’s get general info first !!</h1>
            <div className={styles.mobileNumberOuterCont}>
            <textarea onChange={(e)=>setMob(e.target.value)} rows="3" type="text" placeholder='Phone Number ' value={mob} />
            <CountryCodePicker/>
            </div>
            <input onChange={(e)=>setPass(e.target.value)} type="password" placeholder='Create Your Password ' value={pass} />
            <input onChange={(e)=>setConfirmPass(e.target.value)} type="password" placeholder='Confirm Your Password ' value={confirmPass} />
            <button onClick={handleNext}>Next</button>
        </div>
        <div className={styles.right}>
            <img src={img} alt="img" />
        </div>
    </div>
   </section>
   </>
  )
}

export default GoogleSignupInfoPage