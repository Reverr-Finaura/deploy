import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import styles from "./stages.module.css";
const Market = ({ setStage }) => {
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };
  return (
    <div className={styles.stages_container}>
      <h3>Market</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            title={"What is your Target Market?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Describe your market demographics"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Current Market Size for your product/service (in INR Cr.)"}
            placeholder={"Enter here"}
            type={"number"}
          />
          <Input
            title={"What is the Market Growth Rate over the next 4 years? (%)*"}
            placeholder={"Enter here"}
            type={"number"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={
              "Of the INR Cr. market, what percentage of customers will be interested in your specific solution? (in %) "
            }
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={
              "Of the 0 INR Cr. market, what percentage of customers can you realistically reach within the next 3-4 years? (in %)"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>

        <Input
          title={"Source for Market Size Information:"}
          placeholder={"Enter here"}
          type={"text"}
        />
        <Input
          title={"URL of Website with Market Size Information:"}
          placeholder={"Enter here"}
          type={"url"}
        />

        <Input
          title={"Do you have any competitors?"}
          placeholder={"Yes/No"}
          type={"text"}
        />
      </div>
      <h3>Financial</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            title={"Stage Of Revenue"}
            placeholder={"Enter here"}
            type={"number"}
          />
          <Input
            title={"What is the Nature of the Revenue"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"What is you're revenue Growth Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"What is your average product pricing?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"What is your Monthly Burn Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"What is your current Burn Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          title={"What is to aquire a customer?"}
          placeholder={"Type here.."}
        />
        <TextArea title={"What is LTV/CAC? "} placeholder={"Type here.."} />
        <div className={styles.input_flex}>
          <Input
            title={"Have you achieved break-even?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"If No, by when do you estimate to break-even?*"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"What is your gross margin?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"What is your net margin?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Are You profitable?"}
            placeholder={"Yes / No"}
            type={"text"}
          />
          <Input
            title={"How much funds do you have as of now?(Estimated Runway)"}
            placeholder={"Enter here"}
            type={"number"}
          />
        </div>
      </div>
      <h3>Ratios</h3>
      <div className={styles.stage_form}>
        <div className={styles.inputgrp_flex}>
          <div className={styles.inputgrp}>
            <h3>LIQUIDITY</h3>
            <Input
              title={"Current Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Operating Cashflow Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Quick Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3>LEVERAGE</h3>
            <Input
              title={"Debt-Equity Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Debt Service Coverage Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Interest Coverage Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
        </div>
        <div className={styles.inputgrp_flex}>
          <div className={styles.inputgrp}>
            <h3>EFFICIENCY</h3>
            <Input
              title={"Asset Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Inventory Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Receivables Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3>MAREKT VALUE</h3>
            <Input
              title={"PE Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input title={"EPS"} placeholder={"Enter here"} type={"number"} />
          </div>
        </div>
        <div className={styles.inputgrp_flex}>
          <div className={styles.inputgrp}>
            <h3>PROFITABILITY</h3>
            <Input
              title={"Gross Profit Margin "}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Operating Margin  Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3></h3>
            <Input
              title={"Return on Equity"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"Return on Assets"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
        </div>
      </div>
      <div className={styles.btn_div}>
        <button className={styles.backbtn} onClick={handlePrev}>
          &lt; Back
        </button>
        <button className={styles.nextbtn} onClick={handleNext}>
          {" "}
          Finish &gt;
        </button>
      </div>
    </div>
  );
};

export default Market;
