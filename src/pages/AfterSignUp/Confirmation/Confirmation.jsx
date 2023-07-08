import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./Confirmation.module.css";
import "animate.css";
import { useDispatch } from "react-redux";
import { modify } from "../../../features/newUserSlice";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasStartup, setHasStartup] = useState(false);

  const handleVerify = () => {
    dispatch(modify({ hasStartup }));
    navigate("/startup-onboarding");
  };

  return (
    <>
      <Header theme={"black"} />
      <section className={styles.confirm_section_1}>
        <h1>Do you have a Start-Up?</h1>
        <div className={styles.yesNoBtns}>
          <button
            className={styles.yes_btn}
            onClick={() => {
              setHasStartup(true);
            }}
            style={{
              backgroundColor: hasStartup ? "#2a72de" : "transparent",
              color: hasStartup ? "white" : "#2a72de",
            }}
          >
            Yes
          </button>
          <Link to="/">
          <button
            className={styles.no_btn}
            onClick={() => {
              setHasStartup(false);
            }}
            style={{
              backgroundColor: !hasStartup ? "#2a72de" : "transparent",
              color: !hasStartup ? "white" : "#2a72de",
            }}
          >
            No
          </button>
          </Link>
        </div>
      </section>

      {hasStartup && (
        <section
          className={`${styles.confirm_section_2} animate__animated animate__fadeInUp`}
          id="try"
        >
          <h1>That's great!!</h1>
          <h1> Let's get your start-up verified..</h1>
          <div className={styles.btns_div}>
            <button onClick={handleVerify} className={styles.verify_btn}>
              Get Verified
            </button>
            <Link to="/">
              <button className={styles.back_btn}>Go Home</button>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default Confirmation;
