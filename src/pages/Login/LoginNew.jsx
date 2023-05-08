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
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { toast } from "react-hot-toast";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

function Auth() {
  const[metaData,setMetaData]=useState([])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <>
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
           <button onClick={signInWithGoogle} className={styles.googleBtn}><span className={styles.gIconCont}><img className={styles.gICon} src="/images/icons8-google-48 1.png" alt="gICon" /></span>Log in with google </button>
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
