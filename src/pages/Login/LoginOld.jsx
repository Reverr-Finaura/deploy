import React, { useState, useEffect } from "react";
import styles from "./LoginOld.module.css";
import { auth, db } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserData } from "../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import CountryCodePicker from "../../Utils/Country Code Picker/CountryCodePicker";
import useQuery from "../../Utils/useQuery";
import linkedinLogin from "../../images/Sign-In-Large---Active.png";
import whiteSpin from "../../images/WHITE Spinner-1s-343px.svg";

function Auth() {
  const selectedCountry = useSelector((state) => state.countryCode);
  const [metaData, setMetaData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithOTPModal, setSignInWithOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [tempOtp, setTempOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeColor);
  const provider = new GoogleAuthProvider();
  const [showCodePicker, setShowCodePicker] = useState(false);
  const queryy = useQuery();
  const user_code = queryy.get("code");
  const linkedinLoginError = queryy.get("error");
  const [isLogginInUsingLinkedIn, setIsLogginInUsingLinkedIn] = useState(false);

  //LINKEDIN LOGIN
  const getUserDataFromLinkedin = async (code) => {
    try {
      const data = await axios.post(
        "https://server.reverr.io/getUserDataFromLinkedin",
        { code: code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("data",data.data.data)
      if (data.status === 200) {
        const signInMethods = await fetchSignInMethodsForEmail(
          auth,
          data?.data?.data?.email
        );
        if (signInMethods.length > 0) {
          if (signInMethods[0] === "password") {
            let userDocument = {};
            const userDataRef = collection(db, "Users");
            const q = query(userDataRef);
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
              if (doc.id === data?.data?.data?.email) {
                userDocument = doc.data();
              }
            });

            if (JSON.stringify(userDocument) !== "{}") {
              try {
                await signInWithEmailAndPassword(
                  auth,
                  userDocument.email,
                  userDocument.password
                );
                toast.success("Successfully Logged In");
                navigate("/");
                setLoading(false);
                setIsLogginInUsingLinkedIn(false);
              } catch (error) {
                console.log("err", error);
                setLoading(false);
                setIsLogginInUsingLinkedIn(false);
              }
            } else {
              toast.error("User is not registered yet, Kindly signup first.");
              setIsLogginInUsingLinkedIn(false);
            }
          } else if (signInMethods[0] === "google.com") {
            toast.error(
              "User is already registered using google, Kindly signin using google."
            );
            setIsLogginInUsingLinkedIn(false);
          } else {
            toast.error("User is not registered yet, Kindly signup first.");
            setIsLogginInUsingLinkedIn(false);
          }
        } else {
          toast.error("User is not registered yet, Kindly signup first.");
          setIsLogginInUsingLinkedIn(false);
        }
      }
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.message);
      setIsLogginInUsingLinkedIn(false);
    }
  };

  useEffect(() => {
    if (user_code) {
      getUserDataFromLinkedin(user_code);
      setIsLogginInUsingLinkedIn(true);
    }
  }, [user_code]);

  useEffect(() => {
    if (linkedinLoginError) {
      navigate("/");
      toast.error(linkedinLoginError);
    }
  }, [linkedinLoginError]);

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
    if (/^\d+$/.test(email)) {
      loginPhone();
      return;
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
  const loginPhone = () => {
    let tempData = metaData.filter((item) => {
      return item.phone === email;
    });
    if (tempData.length === 0) {
      toast.error("Phone number not registered yet");
      return;
    }

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
  };
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

  const sendOTP = async () => {
    setLoading(true);
    if (mobileNumber === "") {
      toast.error("Required phone Number");
      setLoading(false);
      return;
    }
    let tempData = metaData.filter((item) => {
      return item.phone === mobileNumber;
    });
    if (tempData.length === 0) {
      toast.error("Phone number not registered yet");
      setLoading(false);
      return;
    }
    const otp = generate(6);
    setTempOtp(otp);
    try {
      const data = await axios.post("https://server.reverr.io/sendSmsCode", {
        to: mobileNumber,
        code: selectedCountry.dialCode.slice(1),
        message: `Your Reverr Login OTP is ${otp}`,
      });
      if (data.data.status) {
        toast.success(data.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("err", error);
      toast.error(error.response.data.message);
      setTempOtp(null);
    }
    setMinutes(3);
    setSeconds(0);
  };

  const confirmOtpNLogin = () => {
    setLoading(true);
    if (otpValue === "") {
      toast.error("Required otp");
      setLoading(false);
      return;
    }
    if (otpValue !== tempOtp) {
      toast.error("Otp does not match");
      setLoading(false);
      return;
    }
    let tempData = metaData.filter((item) => {
      return item.phone === mobileNumber;
    });
    fetchDataOfUserFromDB(tempData[0]);
  };

  const fetchDataOfUserFromDB = async (data) => {
    let tempDocData = {};
    const userDataRef = await collection(db, "Users");
    const q = await query(userDataRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.id === data.email) {
        tempDocData = { password: doc.data().password };
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
  };
  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }
  useEffect(() => {
    if (email.length === 0) {
      setShowCodePicker(false);
      return;
    }
    if (onlyNumbers(email)) {
      setShowCodePicker(true);
      return;
    }
    if (!onlyNumbers(email)) {
      setShowCodePicker(false);
      return;
    }
  }, [email]);

  const handleLinkedinLogin = () => {
    window.open("https://server.reverr.io/api/linkedin/authorize", "_self");
  };


  return (
    <>
         {signInWithOTPModal && (
        <>
          <section className={styles.outerCont}>
            <div className={styles.innerCont}>
              <AiFillCloseCircle
                onClick={() => setSignInWithOTPModal(false)}
                className={styles.closeIcon}
              />
              {!tempOtp && (
                <>
                  <h1>Enter below Your Mobile Number</h1>
                  <div className={styles.inputContNumberContainer}>
                    <input
                      className={styles.inputCont}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      type="text"
                      placeholder="Mobile Number"
                      value={mobileNumber}
                    />
                    <CountryCodePicker />
                  </div>
                  <button
                    onClick={() => sendOTP()}
                    disabled={loading}
                    className={styles.createCampaignButton}
                    style={{ marginTop: "2rem" }}
                  >
                    {loading ? (
                      <img
                        className={styles.loaderr}
                        src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                        alt="loader"
                      />
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </>
              )}

              {tempOtp && (
                <>
                  <h1>Enter the OTP Below</h1>
                  <p className={styles.otpSendTextMessage}>
                    OTP has been send to <b>{mobileNumber}</b> . If you want to
                    change the number{" "}
                    <span
                      onClick={() => {
                        setTempOtp(null);
                      }}
                    >
                      click here
                    </span>
                  </p>
                  <input
                    className={styles.writeOtpInputCont}
                    onChange={(e) => setOtpValue(e.target.value)}
                    type="text"
                    placeholder="OTP"
                    value={otpValue}
                  />
                  {seconds > 0 || minutes > 0 ? (
                    <p className={styles.otp_timer}>
                      Otp valid till: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p className={styles.otp_timer}>Didn't recieve code?</p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      // gap: "2rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={() => confirmOtpNLogin()}
                      disabled={loading}
                      className={styles.createCampaignButton}
                    >
                      {loading ? (
                        <img
                          className={styles.loaderr}
                          src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                          alt="loader"
                        />
                      ) : (
                        "Login"
                      )}
                    </button>

                    <button
                      onClick={() => sendOTP()}
                      disabled={loading || seconds > 0 || minutes > 0}
                      className={styles.createCampaignButton}
                    >
                      {loading ? (
                        <img
                          className={styles.loaderr}
                          src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                          alt="loader"
                        />
                      ) : (
                        "Resend OTP"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </>
      )}
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
          <h1 className={styles.rightContHeading}>LOGIN</h1>
          <div className={styles.optionButtonCont}>
            <button onClick={signInWithGoogle} className={styles.googleBtn}>
              <span className={styles.gIconCont}>
                <img
                  className={styles.gICon}
                  src="/images/icons8-google-48 1.png"
                  alt="gICon"
                />
              </span>
              Log in with google{" "}
            </button>
            <button
              onClick={() => setSignInWithOTPModal(true)}
              className={styles.otpButton}
            >
              <span className={styles.gIconCont}>
                <img
                  className={styles.gICon}
                  src="/images/business-and-finance.png"
                  alt="gICon"
                />
              </span>
              Log in with OTP{" "}
            </button>
          </div>
          <div
            onClick={handleLinkedinLogin}
            className={styles.linkedinLoginCont}
          >
            <img src={linkedinLogin} alt="linkedinLogin" />
          </div>
          <p className={styles.orText}>-OR-</p>
          <form onSubmit={loginEmail} className={styles.form}>
            <div className={styles.inputPhoneContainer}>
              <input
                style={{ paddingLeft: showCodePicker ? "" : "1rem" }}
                className={styles.inputPhoneNumber}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter Your Email / Mobile Number"
                required
              />
              {showCodePicker && <CountryCodePicker />}
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={styles.input}
              type="password"
              name="email"
              placeholder="Password"
              required
            />
            <button
              disabled={isLogginInUsingLinkedIn}
              className={styles.Button}
              type="submit"
            >
              {isLogginInUsingLinkedIn ? (
                <img
                  className={styles.loaderr}
                  src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                  alt="loader"
                />
              ) : (
                "Login Now"
              )}
            </button>
          </form>
          <p className={styles.randomtext}>
            Need an account?{" "}
            <Link className={styles.linkk} to="/signup">
              Sign Up
            </Link>
          </p>
          <p className={styles.randomtext}>
            Forgot Password?{" "}
            <Link to="/forgotpassword" className={styles.linkk}>
              Click Here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Auth;
