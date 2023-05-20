import React, { useEffect, useState } from "react";
import styles from "./Forgotemail.module.css";
import { auth, db } from "../../firebase";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import axios from "axios";

function Auth() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  // const [email, setEmail] = useState("");
  const theme = useSelector((state) => state.themeColor);
  const [tempUserData, setTempUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState([]);

  //CHECK FOR META DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "meta");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setMetaData(doc.data().emailPhone);
      });
    }
    fetchUserDocFromFirebase();
  }, []);

  // console.log(metaData);

  // const sendOtp = async (e) => {
  //   e.preventDefault();

  //   if (/^\d+$/.test(email)) {
  //     sendOTPByPhone();
  //     return;
  //   }

  //   setLoading(true);
  //   let tempDocData = {};
  //   const userDataRef = collection(db, "Users");
  //   const q = query(userDataRef);
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     if (doc.id === email) {
  //       tempDocData = { name: doc.data().name, password: doc.data().password };
  //       setTempUserData({
  //         name: doc.data().name,
  //         password: doc.data().password,
  //         email: doc.data().email,
  //       });
  //     }
  //   });
  //   if (JSON.stringify(tempDocData) === "{}") {
  //     toast.error("Email does not exist in database");
  //     setLoading(false);
  //     return;
  //   }
  //   function generate(n) {
  //     var add = 1,
  //       max = 12 - add;
  //     if (n > max) {
  //       return generate(max) + generate(n - max);
  //     }
  //     max = Math.pow(10, n + add);
  //     var min = max / 10;
  //     var number = Math.floor(Math.random() * (max - min + 1)) + min;

  //     return ("" + number).substring(add);
  //   }
  //   const otp = generate(6);
  //   setTempOtp(otp);
  //   var templateParams = {
  //     from_name: "Reverr",
  //     to_name: tempDocData.name,
  //     to_email: email,
  //     otp,
  //   };

  //   emailjs
  //     .send(
  //       "service_lfmmz8k",
  //       "template_n3pcht5",
  //       templateParams,
  //       "user_FR6AulWQMZry87FBzhKNu"
  //     )
  //     .then(
  //       function (response) {
  //         console.log("SUCCESS!", response.status, response.text);
  //         setLoading(false);
  //       },
  //       function (error) {
  //         console.log("FAILED...", error);
  //         setLoading(false);
  //       }
  //     )
  //     .then(() => {
  //       toast.success("An OTP has been sent to your e-mail");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.message);
  //       setLoading(false);
  //     });
  //   setMinutes(3);
  //   setSeconds(0);
  // };

  const sendSMSByPhone = async (e) => {
    e.preventDefault();
    let tempData = metaData.filter((item) => {
      return item.phone === mobile;
    })[0];
    // console.log(tempData);
    if (tempData?.length === 0 || tempData === undefined) {
      toast.error("Phone number not registered yet");
      return;
    }

    setLoading(true);
    // let tempDocData = {};
    // const userDataRef = collection(db, "Users");
    // const q = query(userDataRef);
    // const querySnapshot = await getDocs(q);

    try {
      const data = await axios.post("https://server.reverr.io/sendSms", {
        to: mobile,
        message: `Your email is ${tempData.email}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        console.log("done");
        setLoading(false);
      }
    } catch (error) {
      console.log("err", error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.loginOuterCont}>
        <div className={styles.leftCont}>
          <div className={styles.brandLogoCont}>
            <img
              className={styles.brandLogo}
              src={
                theme === "light-theme"
                  ? "/images/Reverr Black 1.png"
                  : "/images/reaver-logo.svg"
              }
              alt=""
            />
            <p className={styles.brandName}>REVERR</p>
          </div>
          <div className={styles.leftMidCont}>
            <h1 className={styles.leftMidContTopText}>YOUR DREAM</h1>
            <h1 className={styles.leftMidContBottomText}>OUR RESPONSIBILITY</h1>
          </div>
          <div className={styles.leftBottomCont}>
            <h1 className={styles.leftBottomContTopText}>
              If you can dream it we can complete it.
            </h1>
            <h1 className={styles.leftBottomContBottomText}>
              Because we very well believe in OUR MOTO
            </h1>
          </div>
        </div>
        <div className={styles.rightCont}>
          <h1 className={styles.rightContHeading}>FORGOT EMAIL</h1>
          {/* {tempOtp && ( */}
          <form onSubmit={sendSMSByPhone} className={styles.form}>
            <input
              className={styles.input}
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              type="text"
              placeholder="Enter Your Mobile Number"
              required
            />
            <button disabled={loading} className={styles.Button} type="submit">
              Send SMS
            </button>
          </form>
          {/* )} */}

          {/* <p className={styles.links}>
            Already have an account?{" "}
            <Link className={styles.linkk} to="/">
              Login Here
            </Link>
          </p> */}
        </div>
      </section>
    </>
  );
}

export default Auth;
