import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import styles from "./stages.module.css";
import { toast } from "react-toastify";

const Market = ({ setStage, data, setData }) => {
  const handleNext = () => {
    console.log(Object.keys(data).length);
    if (Object.keys(data).length < 76) {
      toast.error("Kindly Fill All Mandatory Fields");
    } else {
      setStage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(data);
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className={styles.stages_container}>
      <h3>Market</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            name={"target_market"}
            value={data?.target_market}
            onChange={handleChange}
            title={"What is your Target Market?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"market_dmg"}
            value={data?.market_dmg}
            onChange={handleChange}
            title={"Describe your market demographics"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"market_size"}
            value={data?.market_size}
            onChange={handleChange}
            title={"Current Market Size for your product/service (in INR Cr.)"}
            placeholder={"Enter here"}
            type={"number"}
          />
          <Input
            name={"growth_rate"}
            value={data?.growth_rate}
            onChange={handleChange}
            title={"What is the Market Growth Rate over the next 4 years? (%)*"}
            placeholder={"Enter here"}
            type={"number"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"interested_customer"}
            value={data?.interested_customer}
            onChange={handleChange}
            title={
              "Of the INR Cr. market, what percentage of customers will be interested in your specific solution? (in %) "
            }
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"customer_reach"}
            value={data?.customer_reach}
            onChange={handleChange}
            title={
              "Of the 0 INR Cr. market, what percentage of customers can you realistically reach within the next 3-4 years? (in %)"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>

        <Input
          name={"source"}
          value={data?.source}
          onChange={handleChange}
          title={"Source for Market Size Information:"}
          placeholder={"Enter here"}
          type={"text"}
        />
        <Input
          name={"url"}
          value={data?.url}
          onChange={handleChange}
          title={"URL of Website with Market Size Information:"}
          placeholder={"Enter here"}
          type={"url"}
        />

        <Input
          name="competitors"
          value={data?.competitors}
          onChange={handleChange}
          title={"Do you have any competitors?"}
          placeholder={"Yes/No"}
          type={"text"}
        />
      </div>
      <h3>Financial</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            name={"revenue_stage"}
            value={data?.revenue_stage}
            onChange={handleChange}
            title={"Stage Of Revenue"}
            placeholder={"Enter here"}
            type={"number"}
          />
          <Input
            name={"revenue_nature"}
            value={data?.revenue_nature}
            onChange={handleChange}
            title={"What is the Nature of the Revenue"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"revenue_grt"}
            value={data?.revenue_grt}
            onChange={handleChange}
            title={"What is you're revenue Growth Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"avg_pricing"}
            value={data?.avg_pricing}
            onChange={handleChange}
            title={"What is your average product pricing?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"monthly_rate"}
            value={data?.monthly_rate}
            onChange={handleChange}
            title={"What is your Monthly Burn Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"curr_rate"}
            value={data?.curr_rate}
            onChange={handleChange}
            title={"What is your current Burn Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          name={"to_acquire"}
          value={data?.to_acquire}
          onChange={handleChange}
          title={"What is to aquire a customer?"}
          placeholder={"Type here.."}
        />
        <TextArea
          name={"ltv"}
          value={data?.ltv}
          onChange={handleChange}
          title={"What is LTV/CAC? "}
          placeholder={"Type here.."}
        />
        <div className={styles.input_flex}>
          <Input
            name={"break_even"}
            value={data?.break_even}
            onChange={handleChange}
            title={"Have you achieved break-even?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"est_break_even"}
            value={data?.est_break_even}
            onChange={handleChange}
            title={"If No, by when do you estimate to break-even?*"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"gross_margin"}
            value={data?.gross_margin}
            onChange={handleChange}
            title={"What is your gross margin?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"net_margin"}
            value={data?.net_margin}
            onChange={handleChange}
            title={"What is your net margin?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"profitable"}
            value={data?.profitable}
            onChange={handleChange}
            title={"Are You profitable?"}
            placeholder={"Yes / No"}
            type={"text"}
          />
          <Input
            name={"funds"}
            value={data?.funds}
            onChange={handleChange}
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
              name={"curr_ratio"}
              value={data?.curr_ratio}
              onChange={handleChange}
              title={"Current Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"cash_ratio"}
              value={data?.cash_ratio}
              onChange={handleChange}
              title={"Operating Cashflow Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"quick_ratio"}
              value={data?.quick_ratio}
              onChange={handleChange}
              title={"Quick Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3>LEVERAGE</h3>
            <Input
              name="eqt_ratio"
              value={data?.eqt_ratio}
              onChange={handleChange}
              title={"Debt-Equity Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name="service_ratio"
              value={data?.service_ratio}
              onChange={handleChange}
              title={"Debt Service Coverage Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"interest_ratio"}
              value={data?.interest_ratio}
              onChange={handleChange}
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
              name={"asset_turnover"}
              value={data?.asset_turnover}
              onChange={handleChange}
              title={"Asset Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"inventory_turnover"}
              value={data?.inventory_turnover}
              onChange={handleChange}
              title={"Inventory Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"receive_turnover"}
              value={data?.receive_turnover}
              onChange={handleChange}
              title={"Receivables Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3>MAREKT VALUE</h3>
            <Input
              name={"pe"}
              value={data?.pe}
              onChange={handleChange}
              title={"PE Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"EPS"}
              name={"eps"}
              value={data?.eps}
              onChange={handleChange}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
        </div>
        <div className={styles.inputgrp_flex}>
          <div className={styles.inputgrp}>
            <h3>PROFITABILITY</h3>
            <Input
              name={"profit_margin"}
              value={data?.profit_margin}
              onChange={handleChange}
              title={"Gross Profit Margin "}
              placeholder={"Enter here"}
              type={"number"}
            />

            <Input
              name={"operating_ratio"}
              value={data?.operating_ratio}
              onChange={handleChange}
              title={"Operating Margin  Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3></h3>
            <Input
              name={"eqt_return"}
              value={data?.eqt_return}
              onChange={handleChange}
              title={"Return on Equity"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"asset_return"}
              value={data?.asset_return}
              onChange={handleChange}
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
