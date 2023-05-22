import React, { useEffect, useState } from "react";
import styles from "./SignUpAuth.module.css";
import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../features/newUserSlice";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import {setPhone,setPassword} from '../../features/onboardingSlice'
import { collection, getDocs, query } from "firebase/firestore";

function Auth() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("FOUNDER");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const[mobile,setMobile]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme=useSelector((state)=>state.themeColor)
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const[metaData,setMetaData]=useState([])

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
      .then((userCredential) => {
        dispatch(
          create({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
            userType: userType,
            loginType: "google",
          })
        );
      })
      .then(() => {
        // navigate("/startup-list");
        navigate("/onboardingGeneralInfoScreen")
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signUpEmail = (e) => {
    e.preventDefault();
    if(password.length<6){toast.error("Password must contain minimum 6 characters");return}
    if (password === confirmPassword) {
      const data=metaData.filter((item)=>{return item.phone===mobile})
      if(data.length>0){toast.error("Phone Number already registered");return}
      dispatch(setPassword(password))
      dispatch(setPhone(mobile))
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
      const otp = generate(6);
      dispatch(
        create({
          name: firstName + " " + lastName,
          email: email,
          userType,
          otp,
          password,
        })
      );
  
      var templateParams = {
        from_name: "Reverr",
        to_name: firstName + " " + lastName,
        to_email: email,
        otp,
      };
      
      emailjs
        .send(
          "service_lfmmz8k",
          "template_n3pcht5",
          templateParams,
          "user_FR6AulWQMZry87FBzhKNu"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        )
        .then(() => {
          navigate("/enterotp");
        })
        .then(() => {
          toast.success("An OTP has been sent to your e-mail");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } else {
      toast.error("passwords do not match");
    }
  };

  return (
    <>
       <section className={styles.loginOuterCont}>
        <div className={styles.leftCont}>
            <div className={styles.brandLogoCont}>
                <img style={{cursor:"pointer"}} onClick={()=>navigate("/")} className={styles.brandLogo} src={theme === "light-theme"? "/images/Reverr Black 1.png": "/images/reaver-logo.svg"} alt="" />
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
           <h1 className={styles.rightContHeading}>SIGNUP</h1> 
           <button onClick={signInWithGoogle} className={styles.googleBtn}><span className={styles.gIconCont}><img className={styles.gICon} src="/images/icons8-google-48 1.png" alt="gICon" /></span>Sign up with google </button>
           <p className={styles.orText}>-OR-</p>
           <form onSubmit={signUpEmail} className={styles.form}>
           <input
           className={styles.input}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder="First Name"
                required
              />
            <input
            className={styles.input}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Last Name"
                required
              />
              <input
             className={styles.input}
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="text"
                placeholder="Your Phone Number"
                required
              />
             <input
             className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your E-Mail"
                required
              />
              <input
              className={styles.input}
                onChange={(e) => setPass(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter a password"
                required
              />
               <input
               className={styles.input}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                required
              />



            <button className={styles.Button} type="submit">Sign Up</button>
           </form>
           <p className={styles.links}>Already have an account? <Link className={styles.linkk} to="/login">Login Here
            </Link></p>
            <div className={styles.links}>
              <p>
                {`Want to join as a ${
                  userType === "FOUNDER" ? "MENTOR" : "FOUNDER"
                }?`}
              </p>
              <button
                onClick={() =>
                  setUserType(userType === "FOUNDER" ? "MENTOR" : "FOUNDER")
                }
                className={styles.apply_link}
              >
                Apply Here
              </button>
            </div>
        </div>
     </section>
    </>
  );
}

export default Auth;
