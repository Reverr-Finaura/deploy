import React, { useState,useEffect } from "react";
import styles from "./Login.module.css";
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
import { doc, getDoc } from "firebase/firestore";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme=useSelector((state)=>state.themeColor)
  const provider = new GoogleAuthProvider();

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


  return (
    <>
      <Header theme={theme} />
      <section className={styles.auth}>
        <div className={styles.signup}>
          <div className={styles.google_signup}>
            <Button
              className={styles.googleLoginBtn}
              onClick={signInWithGoogle}
            >
              <img src="/images/image 134.svg" alt="" />
              Login with Google
            </Button>
          </div>
          <div>
            <p className={styles.login_dontHaveAccountText}>Or Login with your E-mail</p>
          </div>
          <form onSubmit={loginEmail}>
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
            <Button type="submit">Login</Button>
          </form>
          <p className={styles.login_dontHaveAccountText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>
          <p className={styles.login_dontHaveAccountText}>
            Forgot Password?{" "}
            <Link to="/forgotpassword" className={styles.link}>
              Click Here
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Auth;
