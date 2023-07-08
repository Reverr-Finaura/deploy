import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { modify } from "../../../features/newUserSlice";
import Footer from "../../Footer/Footer";
import styles from "./Onboarding.module.css";

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [organisationName, setOrganisationName] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [yearsInOrg, setYearsInOrg] = useState(null);
  const [yourRole, setYourRole] = useState(null);

  const handleNext = () => {
    dispatch(modify({ organisationName, designation, yearsInOrg, yourRole }));
    navigate("/startup-review");
  };

  return (
    <>
      <Header theme={"black"} />
      <section className={styles.onboard_section}>
        <div className={styles.onboard_intro}>
          <h1>Tell Us About You</h1>
          <p>
            To invest with REVERR, you must first grasp the fundamentals of
            startup investment. Please confirm that you are aware of the
            following point and the regulations
          </p>
        </div>
        <div className={styles.onboard_details}>
          <div className={styles.onboard_input}>
            <h3>1. Tell us your previos organisation you have worked with</h3>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content.
            </p>
            <input
              value={organisationName}
              required
              type="text"
              name=""
              placeholder="Organisation Name"
              id=""
              onChange={(e) => setOrganisationName(e.target.value)}
            />
          </div>

          <div className={styles.onboard_input}>
            <h3>2. What was your designation?</h3>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content.
            </p>
            <input
              value={designation}
              type="text"
              required
              name=""
              placeholder="Designation"
              id=""
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <div className={styles.onboard_input}>
            <h3>3. Duration you worked with the organisation</h3>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content.
            </p>
            <input
              value={yearsInOrg}
              required
              type="text"
              name=""
              placeholder="Type in years"
              id=""
              onChange={(e) => setYearsInOrg(e.target.value)}
            />
          </div>

          <div className={styles.onboard_input}>
            <h3>4. What was your role in the organisation</h3>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It's
              easy. Just click “Edit Text” or double click me to add your own
              content.
            </p>
            <textarea
              value={yourRole}
              required
              placeholder="Your role"
              onChange={(e) => setYourRole(e.target.value)}
            />
          </div>
          <div className={styles.next_btn}>
            <button
              disabled={
                organisationName?.trim().length > 0 &&
                designation?.trim().length > 0 &&
                yearsInOrg?.trim().length > 0 &&
                yourRole?.trim().length > 0
                  ? false
                  : true
              }
              style={{
                opacity:
                  organisationName?.trim().length > 0 &&
                  designation?.trim().length > 0 &&
                  yearsInOrg?.trim().length > 0 &&
                  yourRole?.trim().length > 0
                    ? "1"
                    : "0.5",
              }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Onboarding;
