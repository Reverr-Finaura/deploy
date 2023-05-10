import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { create, modify, selectNewUser } from "../../features/newUserSlice";
import { auth } from "../../firebase";
import styles from "./EnterOtp.module.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { toast } from "react-hot-toast";

function EnterOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredOtp, setEnteredotp] = useState("");
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");
  const [fifthDigit, setFifthDigit] = useState("");
  const [sixthDigit, setSixthDigit] = useState("");
  const newUser = useSelector(selectNewUser);
  const [minutes, setMinutes] = useState(3);
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

  useEffect(() => {
    const enteredDigits =
      firstDigit +
      secondDigit +
      thirdDigit +
      fourthDigit +
      fifthDigit +
      sixthDigit;
    setEnteredotp(enteredDigits);
  }, [
    firstDigit,
    secondDigit,
    thirdDigit,
    fourthDigit,
    fifthDigit,
    sixthDigit,
  ]);

  const checkOtp = (e) => {
    e.preventDefault();

    console.log(enteredOtp);

    if (newUser.otp === enteredOtp) {
      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(() => {
          dispatch(create({ newUser }));
        })
        .then(() => {
          // navigate("/startup-list");
          navigate("/OnboardingScreen");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("Please check the entered OTP");
    }
  };

  const resendOtp = () => {
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

    var templateParams = {
      from_name: "Reverr",
      to_name: newUser.name,
      to_email: newUser.email,
      otp,
    };
    dispatch(modify({ otp }));
    emailjs
      .send(
        "service_lfmmz8k",
        "template_n3pcht5",
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
    setMinutes(3);
    setSeconds(0);
  };

  return (
    <>
      <Header theme={"black"} />
      <div className={styles.otp}>
        <div className={styles.getStarted}>
          <h1>
            Get Started with <span>REVERR</span>
          </h1>
        </div>
        <div className={styles.para}>
          <p>
            We have provided you an OTP email address; please enter the OTP
            received to proceed and become a member of Reverr.
          </p>
        </div>
        <form className={styles.otpForm} onSubmit={checkOtp}>
          <div className={styles.otpInputs}>
            <input
              maxLength={1}
              type="text"
              value={firstDigit}
              onChange={(e) => setFirstDigit(e.target.value)}
            />
            <input
              maxLength={1}
              type="text"
              value={secondDigit}
              onChange={(e) => setSecondDigit(e.target.value)}
            />
            <input
              maxLength={1}
              type="text"
              value={thirdDigit}
              onChange={(e) => setThirdDigit(e.target.value)}
            />
            <input
              maxLength={1}
              type="text"
              value={fourthDigit}
              onChange={(e) => setFourthDigit(e.target.value)}
            />
            <input
              maxLength={1}
              type="text"
              value={fifthDigit}
              onChange={(e) => setFifthDigit(e.target.value)}
            />
            <input
              maxLength={1}
              type="text"
              value={sixthDigit}
              onChange={(e) => setSixthDigit(e.target.value)}
            />
          </div>
          {seconds > 0 || minutes > 0 ? (
            <p className={styles.otp_timer}>
              Otp valid till: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p className={styles.otp_timer}>Didn't recieve code?</p>
          )}

          <button
            onClick={resendOtp}
            disabled={seconds > 0 || minutes > 0}
            className={styles.resend}
          >
            Resend OTP
          </button>
          <Button type="submit">Move Ahead</Button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default EnterOtp;
