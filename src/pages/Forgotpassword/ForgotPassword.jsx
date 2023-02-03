import { sendPasswordResetEmail } from "firebase/auth";
import styles from "./Forgotpassword.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth } from "../../firebase";
import Header from "../../components/Header/Header";
import Footer from "../Footer/Footer";
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const theme=useSelector((state)=>state.themeColor)
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your email");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <Header theme={theme} />
      <section className={styles.auth}>
        <div className={styles.password_reset}>
          <p>We'll mail you password reset link.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id=""
              placeholder="Email"
            />
            <p>
              <Link to="/login" className={styles.link}>
                Back to Login
              </Link>
            </p>
            <Button type="submit">Send Mail</Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPassword;
