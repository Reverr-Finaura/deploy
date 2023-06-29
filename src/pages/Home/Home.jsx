import React from "react";
import Divider from "../../components/Divider/Divider";
import RoundButton from "../../components/RoundButton/RoundButton";
import Header from "../../components/Header/Header";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import Hero from "./Hero/Hero";
import Tagline from "../Tagline/Tagline";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className={styles.main_div}>
      <Header theme={"white"} />
      <section className={styles.hero}>
        <Hero />
      </section>
      <Divider />
      <section className="styles tagline">
        <Tagline />
      </section>
      <Divider />

      <section className={styles.rever_stats}>
        <div>
          <p className={styles.rs_heading}>
            Trusted by <b>Entrepreneurs</b> and <b>Investors</b>, India's
            Leading Early Stage Platform for <b>Startup Investing</b>.
          </p>
          <div className={styles.rs_stats}>
            <div className={styles.rs_card}>
              <div>
                <img src="/images/blue-bg.svg" alt="" />
                <span className={styles.rs_stat_no}>900+</span>
              </div>
              <p>I'm a stat about start-ups</p>
            </div>
            <div className={styles.rs_card}>
              <div>
                <img src="/images/blue-bg.svg" alt="" />
                <span className={styles.rs_stat_no}>5Cr+</span>
              </div>
              <p>I'm a stat about start-ups</p>
            </div>
            <div className={styles.rs_card}>
              <div>
                <img src="/images/blue-bg.svg" alt="" />
                <span className={styles.rs_stat_no}>115L+</span>
              </div>
              <p>I'm a stat about start-ups</p>
            </div>
          </div>
          <div className={styles.rs_stats}>
            <div className={styles.rs_card}>
              <div>
                <img src="/images/blue-bg.svg" alt="" />
                <span className={styles.rs_stat_no}>200+</span>
              </div>
              <p>I'm a stat about start-ups</p>
            </div>
            <div className={styles.rs_card}>
              <div>
                <img src="/images/blue-bg.svg" alt="" />
                <span className={styles.rs_stat_no}>100+</span>
              </div>
              <p>I'm a stat about start-ups</p>
            </div>
          </div>
          <div className={styles.rs_btn}>
            <RoundButton>Join REVERR</RoundButton>
          </div>
        </div>
      </section>
      <Divider />
      <section className={styles.rever_founder}>
        <div className={styles.rf_div}>
          <p className={styles.rf_heading}>
            The Founders that reached heights with
            <span style={{ color: "#2A72DE" }}> REVERR</span>
          </p>
          <p className={styles.rf_para}>
            I'm a paragraph. Click here to add your own text and edit me. It's
            easy. Just click “Edit Text” or double click me to add your own
            content
          </p>
          <div className={styles.rf_founder_card}>
            <div className={styles.rf_card}>
              <img src="/images/Rectangle 2662.svg" alt="" />
              <p>I'm a Start-up</p>
            </div>
            <div className={styles.rf_card}>
              <img src="/images/Rectangle 2661.svg" alt="" />
              <p>I'm a Start-up</p>
            </div>
            <div className={styles.rf_card}>
              <img src="/images/Rectangle 2660.svg" alt="" />
              <p>I'm a Start-up</p>
            </div>
            <div className={styles.rf_card}>
              <img src="/images/Rectangle 2661.svg" alt="" />
              <p>I'm a Start-up</p>
            </div>
            <div className={styles.rf_card}>
              <img src="/images/Rectangle 2662.svg" alt="" />
              <p>I'm a Start-up</p>
            </div>
          </div>
          <div className={styles.rf_btn}>
            <RoundButton>Join REVERR</RoundButton>
          </div>
        </div>
      </section>
      <Divider />
      <section className={styles.rever_deal}>
        <div className={styles.rd_intro}>
          <p className={styles.rd_intro_heading}>
            Close all of your Start-ups deals with
            <span style={{ color: "#2A72DE" }}> REVERR</span>
          </p>
          <p className={styles.rd_intro_para}>
            I'm a paragraph. Click here to add your own text and edit me. It's
            easy. Just click “Edit Text” or double click me to add your own
            content
          </p>
          <div className={styles.rd_btn}>
            <Link to="/login">
              <RoundButton>Login Now</RoundButton>
            </Link>
          </div>
        </div>
        <div className={styles.rd_img}>
          <img src="/images/Business-deal.svg" alt="" />
        </div>
      </section>
      <Divider />
      <section className={styles.rever_testimonials}>
        <p className={styles.rt_heading}>Testimonials</p>
        <div className={styles.rt_cards}>
          <div className={styles.rt_card}>
            <img src="/images/person1.svg" alt="" />
            <p className={styles.card_name}>Heather Jones</p>
            <p className={styles.card_para}>
              “ I'm a paragraph. Click here to add your own text and edit me.
              It's easy. Just click “Edit Text” or double click me to add your
              own content.
            </p>
          </div>
          <div className={styles.rt_card}>
            <img src="/images/person2.svg" alt="" />
            <p className={styles.card_name}>Alam Khangis</p>
            <p className={styles.card_para}>
              “ I'm a paragraph. Click here to add your own text and edit me.
              It's easy. Just click “Edit Text” or double click me to add your
              own content.
            </p>
          </div>
          <div className={styles.rt_card}>
            <img src="/images/person3.svg" alt="" />
            <p className={styles.card_name}>Davis Laid</p>
            <p className={styles.card_para}>
              “ I'm a paragraph. Click here to add your own text and edit me.
              It's easy. Just click “Edit Text” or double click me to add your
              own content.
            </p>
          </div>
        </div>
      </section>
      <section className="styles">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
