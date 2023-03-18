import React from "react";
import styles from "./Upgrade.module.css";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Upgrade = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.upgrade_container_outer}>
      <MdArrowBackIos
        className={styles.back_icon}
        size={25}
        onClick={() => navigate(-1)}
      />
      <div className={styles.upgrade_container_main}>
        <h3>Premium</h3>
        <h1>
          Choose your <span>Plan</span>
        </h1>
        <p>Lorem ipsum is a dummy text used for typography</p>
        <div className={styles.plans_card}>
          <div className={styles.plan_card_1}>
            <p className={styles.plan_duration}>Monthly</p>
            <h3 className={styles.plan_price}>
              ₹499/<span>Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_2}>
            <p className={styles.plan_duration}>Quarterly</p>
            <h3 className={styles.plan_price}>
              ₹1099/<span>3Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_3}>
            <p className={styles.plan_duration}>Semi-Annually</p>
            <h3 className={styles.plan_price}>
              ₹4099/<span>6Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button className={styles.plan_buy_btn}>Buy Now</button>
          </div>
          <div className={styles.plan_card_4}>
            <p className={styles.plan_duration}>Yearly</p>
            <h3 className={styles.plan_price}>
              ₹4099/<span>12Month</span>
            </h3>
            <hr className={styles.plan_divider} />
            <ul className={styles.plan_desc}>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
              <li>Loren ipsum</li>
            </ul>
            <button className={styles.plan_buy_btn}>Buy Now</button>
          </div>
        </div>
        <p className={styles.plan_tnc}>
          * <span>Terms & Conditions </span> applied
        </p>
      </div>
    </div>
  );
};

export default Upgrade;
