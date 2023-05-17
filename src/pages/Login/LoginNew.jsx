import React, { useState,useEffect } from "react";
import styles from "./LoginNew.module.css";
import { auth, db } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserData } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai"
import axios from "axios";

function Auth() {
  const[metaData,setMetaData]=useState([])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithOTPModal,setSignInWithOTPModal]=useState(false)
  const[mobileNumber,setMobileNumber]=useState("")
  const[tempOtp,setTempOtp]=useState(null)
  const[loading,setLoading]=useState(false)
  const[otpValue,setOtpValue]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme=useSelector((state)=>state.themeColor)
  const provider = new GoogleAuthProvider();

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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loginEmail = (e) => {
    e.preventDefault();
    if(/^\d+$/.test(email)){
      loginPhone()
      return
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        dispatch(setUserData(docSnap.data()));
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .then(() => {
        toast.success("Sucessfully logged in");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
const loginPhone=()=>{
let tempData=metaData.filter((item)=>{return item.phone===email})
if (tempData.length===0){toast.error("Phone number not registered yet");return}

signInWithEmailAndPassword(auth, tempData[0].email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "Users", auth.currentUser.email);
        const docSnap = await getDoc(docRef);
        dispatch(setUserData(docSnap.data()));
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .then(() => {
        toast.success("Sucessfully logged in");
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });

}
function generate(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

const sendOTP=async()=>{
  setLoading(true)
  if(mobileNumber===""){toast.error("Required phone Number");setLoading(false);return}
  let tempData=metaData.filter((item)=>{return item.phone===mobileNumber})
  if (tempData.length===0){toast.error("Phone number not registered yet");setLoading(false);return}
  const otp = generate(6);
  setTempOtp(otp);
  try {
    const data = await axios.post("https://server.reverr.io/sendSms",
    // const data = await axios.post("http://localhost:3000/sendSms",

    { to:mobileNumber,message:`Your OTP is ${otp}` })
  if(data.data.status){
    toast.success(data.data.message)
    setLoading(false)
  }
  } catch (error) {
    setLoading(false)
    console.log("err",error)
  }
}

const confirmOtpNLogin=()=>{
  setLoading(true)
  if(otpValue===""){toast.error("Required otp");setLoading(false);return}
  if(otpValue!==tempOtp){toast.error("Otp does not match");setLoading(false);return}
  let tempData=metaData.filter((item)=>{return item.phone===mobileNumber})
  fetchDataOfUserFromDB(tempData[0])
}

const fetchDataOfUserFromDB=async(data)=>{
  let tempDocData = {};
  const userDataRef = await collection(db, "Users");
    const q = await query(userDataRef);
    const querySnapshot = await getDocs(q);

     querySnapshot.forEach((doc) => {
      if (doc.id === data.email) {
        tempDocData = {password: doc.data().password };
      }
    });
    try {
      await signInWithEmailAndPassword(auth, data.email, tempDocData.password);
      toast.success("Successfully Logged In");
        navigate("/");
        setLoading(false);
    } catch (error) {
      console.log("err", error);
      setLoading(false);
    }
   
}



  return (
    <>
    {signInWithOTPModal&&<>
      <section className={styles.outerCont}>
            <div className={styles.innerCont}>
            <AiFillCloseCircle onClick={()=>setSignInWithOTPModal(false)} className={styles.closeIcon}/>
            {!tempOtp&&<>
                <h1>Enter below Your Mobile Number</h1>
                <input className={styles.inputCont} onChange={(e)=>setMobileNumber(e.target.value)} type="text" placeholder="Mobile Number" value={mobileNumber} />

                <button onClick={()=>sendOTP()} disabled={loading} className={styles.createCampaignButton}>{loading?<img className={styles.loaderr} src="https://intly-app.s3.ap-south-1.amazonaws.com/WHITE+Spinner-1s-343px.svg" alt="loader" />:"Send OTP"}</button>
                </>}

              {
                tempOtp&&<>
                <h1>Enter the OTP Below</h1>
                <input className={styles.inputCont} onChange={(e)=>setOtpValue(e.target.value)} type="text" placeholder="OTP" value={otpValue} />

                <button onClick={()=>confirmOtpNLogin()} disabled={loading} className={styles.createCampaignButton}>{loading?<img className={styles.loaderr} src="https://intly-app.s3.ap-south-1.amazonaws.com/WHITE+Spinner-1s-343px.svg" alt="loader" />:"Login"}</button>
                </>
              }
            </div>
        </section>
    </>}
     <section className={styles.loginOuterCont}>
        <div className={styles.leftCont}>
            <div className={styles.brandLogoCont}>
                <img className={styles.brandLogo} src={theme === "light-theme"? "/images/Reverr Black 1.png": "/images/reaver-logo.svg"} alt="" />
                <p className={styles.brandName}>REVERR</p>
            </div>
            <div className={styles.leftMidCont}>
                <h1 className={styles.leftMidContTopText}>YOUR DREAM</h1>
                <h1 className={styles.leftMidContBottomText}>OUR RESPONSIBILITY</h1>
            </div>
            <div className={styles.leftBottomCont}>
                <h1 className={styles.leftBottomContTopText}>If you can dream it we can complete it.</h1>
                <h1 className={styles.leftBottomContBottomText}>Because we very well believe in OUR MOTO</h1>
            </div>
        </div>
        <div className={styles.rightCont}>
           <h1 className={styles.rightContHeading}>LOGIN</h1> 
           <div className={styles.optionButtonCont}>
           <button onClick={signInWithGoogle} className={styles.googleBtn}><span className={styles.gIconCont}><img className={styles.gICon} src="/images/icons8-google-48 1.png" alt="gICon" /></span>Log in with google </button>
           <button onClick={()=>setSignInWithOTPModal(true)} className={styles.otpButton}><span className={styles.gIconCont}><img className={styles.gICon} src="/images/business-and-finance.png" alt="gICon" /></span>Log in with OTP </button>
           </div>
           <p className={styles.orText}>-OR-</p>
           <form onSubmit={loginEmail} className={styles.form}>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} type="text" name="email" placeholder="Email Address / Phone Number" required/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type="password" name="email" placeholder="Password" required/>
            <button className={styles.Button} type="submit">Login Now</button>
           </form>
           <p className={styles.randomtext}>Need an account? <Link className={styles.linkk} to="/signup">Sign Up
            </Link></p>
           <p className={styles.randomtext}>Forgot Password? <Link to="/forgotpassword" className={styles.linkk}>
              Click Here
            </Link></p>
        </div>
     </section>
    </>
  );
}

export default Auth;
