import React, { useState } from "react";
import styles from "./Auth.module.css";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../features/newUserSlice";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import { toast } from "react-hot-toast";

function Auth() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("FOUNDER");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const theme=useSelector((state)=>state.themeColor)
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

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
        navigate("/startup-list");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signUpEmail = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      
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
          "dVExxiI8hYMCyc0sY"
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
      alert("passwords do not match");
    }
  };

  return (
    <>
      <Header theme={theme} />
      <section className={styles.auth}>
        <div className={styles.signup}>
          <div>
            <h1>
              Get started as a {userType} with
              <span style={{ color: "#2a72de" }}> REVERR</span>
            </h1>
          </div>
          <div className={styles.google_signup}>
            <Button
              className={styles.googleSignUpBtn}
              onClick={signInWithGoogle}
            >
              <img src="/images/image 134.svg" alt="" />
              Sign up with Google
            </Button>
          </div>
          <div>
            <p>Or Sign Up with your E-mail</p>
          </div>
          <form >
            <div className={styles.name}>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder="First Name"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your E-Mail"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter a password"
              />
            </div>
            <div>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className={styles.email_signup}>
              <Button onClick={signUpEmail} type="submit">Sign Up</Button>
            </div>
          </form>
          <div className={styles.signupBottom}>
            <div className={styles.links}>
              <p>Already have an account? </p>
              <Link className={styles.login_link} to="/login">
                Login Here
              </Link>
            </div>
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
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Auth;
