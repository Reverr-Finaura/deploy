import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../../../components/Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./industry.module.css";
import { modify } from "../../../features/newUserSlice";
import { useNavigate } from "react-router-dom";

const array = [
  {
    img: "./images/ind1.png",
    heading: "Fintech",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind2.png",
    heading: "Sales",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind3.png",
    heading: "Legal",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind4.png",
    heading: "Fund Raising",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind5.png",
    heading: "Product Development",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind6.png",
    heading: "Research",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind7.png",
    heading: "Marketing",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
  {
    img: "./images/ind8.png",
    heading: "Financing",
    paragraph: "I am a paragraph , Click me to change the paragraph",
  },
];

const Industry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [industry, setIndustry] = useState(null);

  const handleNext = () => {
    dispatch(modify({ industry }));
    navigate("/experience");
  };

  const handleSkip = () => {
    dispatch(modify({ industry: null }));
    navigate("/experience");
  };

  return (
    <>
      <Header theme={"black"} />
      <div className={styles.industry__container}>
        <h1 className={styles.big__heading}>What is your Industry?</h1>
        <div className={styles.cards__flex}>
          {array.map(({ heading, paragraph, img }, index) => (
            <div key={index} className={styles.industry_card_container}>
              <div className={styles.card__image_container}>
                <img src={img} alt="" className={styles.card__image} />
              </div>
              <div className={styles.card__heading}>{heading}</div>
              {!(industry === heading) ? (
                <button
                  onClick={() => {
                    setIndustry(heading);
                  }}
                  className={styles.card__btn}
                >
                  Select
                </button>
              ) : (
                <button
                  onClick={() => setIndustry(null)}
                  className={styles.card__btn}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.btns}>
          <button
            disabled={industry?.length > 0 ? false : true}
            className={styles.btn1}
            onClick={handleNext}
            style={{ opacity: industry?.length > 0 ? "1" : "0.5" }}
          >
            Next
          </button>
          <button onClick={handleSkip} className={styles.btn2}>
            Skip
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Industry;
