import React, { useEffect } from "react";
import styles from "./Review.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { modify, selectNewUser } from "../../../features/newUserSlice";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newUser = useSelector(selectNewUser);
  useEffect(() => {
    dispatch(modify({ isVerfied: false }));

    const docRef = addDoc(collection(db, "Users"), {
      email: auth?.currentUser?.email,
      uid: auth?.currentUser?.uid,
      displayName: auth?.currentUser?.displayName,
      ...newUser,
    }).then(() => {
      var templateParams = {
        subject: "Welcome to Reverr!",
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        message: "You have successfully created your account at Reverr!",
      };

      emailjs
        .send(
          "service_lfmmz8k",
          "template_6lqwjap",
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
        .then(() => {
          toast.success("You have successfully create your account!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  }, []);

  return (
    <>
      <Header theme={"black"} />
      <section className={styles.review_section}>
        <div className={styles.review_intro}>
          <div className={styles.review_note}>
            <h1>
              Wait for your Start-up to get reviewed by us ! We will get back to
              you in 24 hours !
            </h1>
            <p>Till then, Let's add more details to your profile</p>
          </div>
          <div className={styles.review_img}>
            <img src="/images/review-img.svg" alt="" />
          </div>
        </div>
        <div className={styles.review_btns}>
          <Link to="/startup-verification">
            <button className={styles.next_btn}>Next</button>
          </Link>
          <Link to="/">
            <button className={styles.skip_btn}>Skip</button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Review;
