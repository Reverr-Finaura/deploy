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
import CountryCodePicker from "../../Utils/Country Code Picker/CountryCodePicker";

function Auth() {
  const selectedCountry=useSelector((state)=>state.countryCode)
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  // const [email, setEmail] = useState("");
  const theme = useSelector((state) => state.themeColor);
  const [tempUserData, setTempUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const [tempOtp, setTempOtp] = useState(null);
  const [newOtp, setNewOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds >= 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
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

  const sendOtp = async (e) => {
    e.preventDefault();
    let tempData = metaData.filter((item) => {
      return item.phone === mobile;
    })[0];
    if (tempData.length === 0) {
      toast.error("Phone number not registered yet");
      return;
    }

    setLoading(true);

    let tempDocData = {};
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === tempData.email) {
        tempDocData = { name: doc.data().name, password: doc.data().password };
        setTempUserData({
          name: doc.data().name,
          password: doc.data().password,
          email: doc.data().email,
        });
      }
    });
    if (JSON.stringify(tempDocData) === "{}") {
      toast.error("Email does not exist in database");
      setLoading(false);
      return;
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
    const otp = generate(6);
    setTempOtp(otp);
    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: mobile,
        code:selectedCountry.dialCode.slice(1),
        message: `Your OTP is ${otp}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("err", error);
      toast.error(error?.response?.data?.message)
    }
    setMinutes(3);
    setSeconds(0);
  };

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
    if (newOtp !== tempOtp) {
      toast.error("OTP does not match");
      setLoading(false);
      return;
    }
    // let tempDocData = {};
    // const userDataRef = collection(db, "Users");
    // const q = query(userDataRef);
    // const querySnapshot = await getDocs(q);

    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: mobile,
        code:selectedCountry.dialCode.slice(1),
        message: `Your registered email is: ${tempData.email}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        setLoading(false);
        navigate("/forgotpassword");
      }
    } catch (error) {
      console.log("err", error);
      setLoading(false);
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <>
      <section className={styles.loginOuterCont}>
        <div className={styles.leftCont}>
          <div className={styles.brandLogoCont}>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
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
          {!tempOtp && (
            <form onSubmit={sendOtp} className={styles.form}>
            <div className={styles.inputPhoneContainer}>
              <input
                className={styles.inputPhoneNumber}
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="text"
                placeholder="Enter Your Mobile Number"
                required
              />
              <CountryCodePicker/>
              </div>
              <button
                disabled={loading}
                className={styles.Button}
                type="submit"
              >
                Send OTP
              </button>
            </form>
          )}
          {tempOtp && (
            <form onSubmit={sendSMSByPhone} className={styles.form}>
              <input
                className={styles.input}
                onChange={(e) => setNewOtp(e.target.value)}
                value={newOtp}
                type="text"
                placeholder="Enter OTP"
                required
              />
              {seconds > 0 || minutes > 0 ? (
                <p className={styles.otp_timer}>
                  Otp valid till: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p className={styles.otp_timer}>Didn't recieve code?</p>
              )}

              <button
                style={{
                  cursor: loading ? "default" : "",
                  marginBottom: "1rem",
                }}
                disabled={loading || seconds > 0 || minutes > 0}
                className={styles.Button}
                type="button"
                onClick={sendOtp}
              >
                Resend OTP
              </button>

              <button
                style={{ cursor: loading ? "default" : "" }}
                disabled={loading}
                className={styles.Button}
                type="submit"
              >
                Send sms
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default Auth;
