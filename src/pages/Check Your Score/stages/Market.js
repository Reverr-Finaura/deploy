import React from "react";
import { DropDown, Input, TextArea } from "../../../components/AlgoInput/Input";
import styles from "./stages.module.css";
import { toast } from "react-toastify";
import { nonscoredData, scoredData } from "./scores";

const Market = ({ setStage, data, setData, score, setScore }) => {
  console.log(data);
  const handleNext = () => {
    if (Object.keys(data["Market"]).length < 41) {
      toast.error("Kindly Fill All Mandatory Fields");
    } else {
      setData((prev) => ({
        ...prev,
        ["score"]: prev["score"] + prev["Market"]["score"],
      }));
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
      return { ...prev, ["Market"]: { ...prev["Market"], [name]: value } };
    });
  };

  const handleDropdown = (e) => {
    const { name, value } = e.target;
    const score_of_var = scoredData[name].filter(
      (val) => val.value === value
    )[0].score;
    setScore((prev) => ({
      ...prev,
      ["Market"]: score.Market + score_of_var,
    }));
    setData((prev) => {
      return {
        ...prev,
        ["Market"]: {
          ...prev["Market"],
          [name]: value,
          ["score"]: prev["Market"]["score"] + score_of_var,
        },
      };
    });
  };

  const handleRevenue = (e) => {
    const { name, value } = e.target;
    const score_of_var = scoredData[name]?.filter(
      (val) => val.value === value
    )[0].score;
    setScore((prev) => ({
      ...prev,
      ["Market"]: score.Market + score_of_var,
    }));
    setData((prev) => {
      return {
        ...prev,
        ["Market"]: {
          ...prev["Market"],
          ["revenue_growth"]: {
            ...prev["Market"]["revenue_growth"],
            [name]: value,
          },
          ["score"]: prev["Market"]["score"] + score_of_var,
        },
      };
    });
  };

  return (
    <div className={styles.stages_container}>
      <h3>Market</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"target_market"}
            value={data?.Market?.target_market}
            onChange={handleDropdown}
            title={"What is your Target Market?"}
            options={scoredData.target_market}
          />
          <DropDown
            defaultValue={"select"}
            name={"market_dmg"}
            value={data?.Market?.market_dmg}
            onChange={handleChange}
            title={"Describe your market demographics"}
            nonscored={true}
            options={nonscoredData.market_dmg}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"market_size"}
            value={data?.Market?.market_size}
            onChange={handleChange}
            title={"Current Market Size for your product/service (in INR Cr.)"}
            placeholder={"Enter here"}
            type={"number"}
          />
          <DropDown
            defaultValue={"select"}
            name={"growth_rate"}
            value={data?.Market?.growth_rate}
            onChange={handleDropdown}
            title={"What is the Market Growth Rate over the next 4 years? (%)*"}
            options={scoredData.growth_rate}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"interested_customer"}
            value={data?.Market?.interested_customer}
            onChange={handleChange}
            title={
              "Of the INR Cr. market, what percentage of customers will be interested in your specific solution? (in %) "
            }
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"customer_reach"}
            value={data?.Market?.customer_reach}
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
          value={data?.Market?.source}
          onChange={handleChange}
          title={"Source for Market Size Information:"}
          placeholder={"Enter here"}
          type={"text"}
        />
        <Input
          name={"url"}
          value={data?.Market?.url}
          onChange={handleChange}
          title={"URL of Website with Market Size Information:"}
          placeholder={"Enter here"}
          type={"url"}
        />

        <DropDown
          defaultValue={"select"}
          name="competitors"
          value={data?.Market?.competitors}
          onChange={handleChange}
          title={"Do you have any competitors?"}
          options={["Yes", "No"]}
          nonscored={true}
        />
      </div>
      <h3>Financial</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"revenue_stage"}
            value={data?.Market?.revenue_stage}
            onChange={handleDropdown}
            title={"Stage Of Revenue"}
            options={scoredData.revenue_stage}
          />
          <DropDown
            defaultValue={"select"}
            name={"revenue_nature"}
            value={data?.Market?.revenue_nature}
            onChange={handleDropdown}
            title={"What is the Nature of the Revenue"}
            options={scoredData.revenue_nature}
          />
        </div>
        <p>What is you're revenue Growth Rate?</p>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"mom"}
            value={data?.Market?.revenue_growth?.mom}
            onChange={handleRevenue}
            title={"MOM"}
            options={scoredData.mom}
          />
          <DropDown
            defaultValue={"select"}
            name={"qoq"}
            value={data?.Market?.revenue_growth?.qoq}
            onChange={handleRevenue}
            title={"QOQ"}
            options={scoredData.qoq}
          />
          <DropDown
            defaultValue={"select"}
            name={"yoy"}
            value={data?.Market?.revenue_growth?.yoy}
            onChange={handleRevenue}
            title={"YOY"}
            options={scoredData.yoy}
          />
        </div>
        <Input
          name={"avg_pricing"}
          value={data?.Market?.avg_pricing}
          onChange={handleChange}
          title={"What is your average product pricing?"}
          placeholder={"Enter here"}
          type={"text"}
        />
        <div className={styles.input_flex}>
          <Input
            name={"monthly_rate"}
            value={data?.Market?.monthly_rate}
            onChange={handleChange}
            title={"What is your Monthly Burn Rate?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <DropDown
            defaultValue={"select"}
            name={"curr_rate"}
            value={data?.Market?.curr_rate}
            onChange={handleDropdown}
            title={"What is your current Burn Rate?"}
            options={scoredData.curr_rate}
          />
        </div>
        <TextArea
          name={"to_acquire"}
          value={data?.Market?.to_acquire}
          onChange={handleChange}
          title={"What is to aquire a customer?"}
          placeholder={"Type here.."}
        />
        <DropDown
          defaultValue={"select"}
          name={"ltv"}
          value={data?.Market?.ltv}
          onChange={handleDropdown}
          title={"What is LTV/CAC? "}
          tooltip={true}
          content={
            "LTV= Average monthly revenue per customer * Customer Lifetime(in Months) ,CAC= (Cost of sales + Cost of Marketing)/ Number of New users aquired"
          }
          options={scoredData.ltv}
        />
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"break_even"}
            value={data?.Market?.break_even}
            onChange={handleDropdown}
            title={"Have you achieved break-even?"}
            options={scoredData.break_even}
          />
          <DropDown
            defaultValue={"select"}
            name={"est_break_even"}
            value={data?.Market?.est_break_even}
            onChange={handleDropdown}
            title={"If No, by when do you estimate to break-even?*"}
            options={scoredData.est_break_even}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"gross_margin"}
            value={data?.Market?.gross_margin}
            onChange={handleDropdown}
            title={"What is your gross margin?"}
            options={scoredData.gross_margin}
          />
          <DropDown
            defaultValue={"select"}
            name={"net_margin"}
            value={data?.Market?.net_margin}
            onChange={handleDropdown}
            title={"What is your net margin?"}
            options={scoredData.net_margin}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"profitable"}
            value={data?.Market?.profitable}
            onChange={handleDropdown}
            title={"Are You profitable?"}
            options={scoredData.profitable}
          />
          <DropDown
            defaultValue={"select"}
            name={"funds"}
            value={data?.Market?.funds}
            onChange={handleDropdown}
            title={"How much funds do you have as of now?(Estimated Runway)"}
            options={scoredData.funds}
          />
        </div>
        <DropDown
          defaultValue={"select"}
          name={"financial_audited"}
          value={data?.Market?.financial_audited}
          onChange={handleDropdown}
          title={"Do you have your financials Audited?"}
          options={scoredData.financial_audited}
        />
      </div>
      <h3>Ratios</h3>
      <div className={styles.stage_form}>
        <div className={styles.inputgrp_flex}>
          <div className={styles.inputgrp}>
            <h3>LIQUIDITY</h3>
            <DropDown
              defaultValue={"select"}
              name={"curr_ratio"}
              tooltip={true}
              content={"Current Assets/ Current Liabilities"}
              value={data?.Market?.curr_ratio}
              onChange={handleDropdown}
              title={"Current Ratio"}
              options={scoredData.curr_ratio}
            />
            <DropDown
              defaultValue={"select"}
              name={"cash_ratio"}
              content={"Cash+ marketable securities/Current liabilities"}
              tooltip={true}
              value={data?.Market?.cash_ratio}
              onChange={handleDropdown}
              title={"Operating Cashflow Ratio"}
              options={scoredData.cash_ratio}
            />
            <Input
              name={"quick_ratio"}
              value={data?.Market?.quick_ratio}
              onChange={handleChange}
              title={"Quick Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
          </div>
          <div className={styles.inputgrp}>
            <h3>LEVERAGE</h3>
            <DropDown
              defaultValue={"select"}
              name="eqt_ratio"
              value={data?.Market?.eqt_ratio}
              onChange={handleDropdown}
              tooltip={true}
              content={"Total Debt/ Total Equity"}
              title={"Debt-Equity Ratio"}
              options={scoredData.eqt_ratio}
            />
            <Input
              name="service_ratio"
              value={data?.Market?.service_ratio}
              onChange={handleChange}
              title={"Debt Service Coverage Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"interest_ratio"}
              value={data?.Market?.interest_ratio}
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
              value={data?.Market?.asset_turnover}
              onChange={handleChange}
              title={"Asset Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"inventory_turnover"}
              value={data?.Market?.inventory_turnover}
              onChange={handleChange}
              title={"Inventory Turnover"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"receive_turnover"}
              value={data?.Market?.receive_turnover}
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
              value={data?.Market?.pe}
              onChange={handleChange}
              title={"PE Ratio"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              title={"EPS"}
              name={"eps"}
              value={data?.Market?.eps}
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
              value={data?.Market?.profit_margin}
              onChange={handleChange}
              title={"Gross Profit Margin "}
              placeholder={"Enter here"}
              type={"number"}
            />

            <Input
              name={"operating_ratio"}
              value={data?.Market?.operating_ratio}
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
              value={data?.Market?.eqt_return}
              onChange={handleChange}
              title={"Return on Equity"}
              placeholder={"Enter here"}
              type={"number"}
            />
            <Input
              name={"asset_return"}
              value={data?.Market?.asset_return}
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
