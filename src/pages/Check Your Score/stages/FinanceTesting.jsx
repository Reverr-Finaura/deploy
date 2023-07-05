import React from "react";
import {
  DropDown,
  Input,
  Radio,
  TextArea,
} from "../../../components/AlgoInput/InputTesting";
import styles from "./stageTesting.module.css";
import { toast } from "react-toastify";
import { nonscoredData, scoredData } from "./scores";

const FinanceTesting = ({ setStage, data, setData, score, setScore }) => {
  const handleNext = () => {
    if (Object.keys(data["Finance"]).length < 12) {
      toast.error("Kindly Fill All Mandatory Fields");
      console.log("kindly fill all mandatory fields");
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
    // console.log(data);
    setData((prev) => {
      return { ...prev, ["Finance"]: { ...prev["Finance"], [name]: value } };
    });
  };

  // const handleDropdown = (e) => {
  //   const { name, value } = e.target;
  //   const score_of_var = scoredData[name].filter(
  //     (val) => val.value === value
  //   )[0].score;
  //   setScore((prev) => ({
  //     ...prev,
  //     ["Market"]: score.Market + score_of_var,
  //   }));
  //   setData((prev) => {
  //     return {
  //       ...prev,
  //       ["Market"]: {
  //         ...prev["Market"],
  //         [name]: value,
  //         ["score"]: prev["Market"]["score"] + score_of_var,
  //       },
  //     };
  //   });
  // };
  const getScore = (name, value) => {
    const score_of_var = scoredData[name].filter(
      (val) => val.value === value
    )[0].score;
    return score_of_var;
  };

  const findMaxScore = (name) => {
    const max_score = scoredData[name].reduce((max, obj) =>
      max.score > obj.score ? max : obj
    );
    return max_score.score;
  };

  const handleDropdown = (e) => {
    const { name, value } = e.target;
    const score_of_var = getScore(name, value);
    // console.log(score_of_var, name, value);
    // setScore((prev) => ({
    //   ...prev,
    //   ["Pnt"]: score.Pnt - prev["Pnt"] + score_of_var,
    // }));
    // console.log(data["productTech"][name] ? data["productTech"][name] : value);
    // console.log(
    //   getScore(
    //     name,
    //     data["productTech"][name] ? data["productTech"][name] : value
    //   )
    // );
    setData((prev) => {
      return {
        ...prev,
        ["Finance"]: {
          ...prev["Finance"],
          [name]: value,
          ["score"]:
            prev["Finance"]["score"] -
            (prev["Finance"][name]
              ? getScore(name, prev["Finance"][name])
              : 0) +
            score_of_var,
          ["totalScore"]:
            prev["Finance"]["totalScore"] +
            (prev["Finance"][name] ? 0 : findMaxScore(name)),
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
        ["Finance"]: {
          ...prev["Finance"],
          ["revenue_growth"]: {
            ...prev["Finance"]["revenue_growth"],
            [name]: value,
          },
          ["score"]: prev["Finance"]["score"] + score_of_var,
        },
      };
    });
  };

  return (
    <div className={styles.stages_container}>
      {/* <h3>Financial</h3> */}
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
        <div className={styles.input_flex}>
          <Input
            name={"revenue_growth"}
            value={data?.Market?.revenue_growth?.revenue_growth}
            // onChange={handleRevenue}
            onChange={handleChange}
            title={"What is you're revenue Growth Rate?"}
            placeholder={"Enter here"}
          />
          <Input
            name={"avg_pricing"}
            value={data?.Market?.avg_pricing}
            onChange={handleChange}
            title={"What is your average product pricing?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
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
          {/* <Radio
            name={"break_even"}
            value={data?.Market?.break_even}
            onChange={handleDropdown}
            title={"Have you achieved break-even?"}
            options={scoredData.break_even}
          /> */}
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
            name={"profitable"}
            value={data?.Market?.profitable}
            onChange={handleDropdown}
            title={"Are You profitable?"}
            options={scoredData.profitable}
          />
          {/* <Radio
            name={"profitable"}
            value={data?.Market?.profitable}
            onChange={handleDropdown}
            title={"Are You profitable?"}
            options={scoredData.profitable}
          /> */}
          <DropDown
            defaultValue={"select"}
            name={"funds"}
            value={data?.Market?.funds}
            onChange={handleDropdown}
            title={"How much funds do you have as of now?(Estimated Runway)"}
            options={scoredData.funds}
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
      </div>
      <h3>Ratios</h3>
      <div className={styles.input_flex}>
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

export default FinanceTesting;
