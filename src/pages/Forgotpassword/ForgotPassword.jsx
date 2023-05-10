import React, { useState, useEffect } from "react";
import styles from "./Forgotpassword.module.css";
import { auth, db } from "../../firebase";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";

function Auth() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme = useSelector((state) => state.themeColor);
  const [tempOtp, setTempOtp] = useState(null);
  const [newOtp, setNewOtp] = useState("");
  const [tempUserData, setTempUserData] = useState({});
  const [loading, setLoading] = useState(false);
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

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    let tempDocData = {};
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === email) {
        tempDocData = { name: doc.data().name, password: doc.data().password };
        setTempUserData({
          name: doc.data().name,
          password: doc.data().password,
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
    var templateParams = {
      from_name: "Reverr",
      to_name: tempDocData.name,
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
          setLoading(false);
        },
        function (error) {
          console.log("FAILED...", error);
          setLoading(false);
        }
      )
      .then(() => {
        toast.success("An OTP has been sent to your e-mail");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
    setMinutes(3);
    setSeconds(0);
  };

  const updatePasswordOfUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newOtp !== tempOtp) {
      toast.error("Wrong Otp");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("New Password and Confirm Password do no match");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, tempUserData.password);
      await updatePassword(auth.currentUser, password);
      await updateDoc(doc(db, "Users", email), { password: password });
      toast.success("Successfully Updated Password");
      navigate("/");
      setLoading(false);
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
          <h1 className={styles.rightContHeading}>FORGOT PASSWORD</h1>
          {!tempOtp && (
            <form onSubmit={sendOtp} className={styles.form}>
              <input
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter Your Email"
                required
              />
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
            <form onSubmit={updatePasswordOfUser} className={styles.form}>
              <input
                className={styles.input}
                onChange={(e) => setNewOtp(e.target.value)}
                value={newOtp}
                type="text"
                placeholder="Enter OTP"
                required
              />
              <input
                className={styles.input}
                onChange={(e) => setPass(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter New Password"
                required
              />
              <input
                className={styles.input}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm New Password"
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
                UPDATE
              </button>
            </form>
          )}
          <p className={styles.links}>
            Already have an account?{" "}
            <Link className={styles.linkk} to="/">
              Login Here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Auth;
