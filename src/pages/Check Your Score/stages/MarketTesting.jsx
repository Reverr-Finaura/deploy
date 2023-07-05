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

const MarketTesting = ({ setStage, data, setData, score, setScore }) => {
  console.log(data);
  const handleNext = () => {
    if (Object.keys(data["Market"]).length < 11) {
      toast.error("Kindly Fill All Mandatory Fields");
      console.log("Kindly Fill All Mandatory Fields");
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
    console.log("max Score", findMaxScore(name));
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
        ["Market"]: {
          ...prev["Market"],
          [name]: value,
          ["score"]:
            prev["Market"]["score"] -
            (prev["Market"][name] ? getScore(name, prev["Market"][name]) : 0) +
            score_of_var,
          ["totalScore"]:
            prev["Market"]["totalScore"] +
            (prev["Market"][name] ? 0 : findMaxScore(name)),
        },
      };
    });
  };
  console.log("data", data);

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
      {/* <h3>Market</h3> */}
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
              "Of the INR Cr. market, what percentage of customers will be interested in your specific solution? (in %) "
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
        <div className={styles.input_flex}>
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
        </div>
        <DropDown
          defaultValue={"select"}
          name="competitors"
          value={data?.Market?.competitors}
          onChange={handleChange}
          title={"Do you have any competitors?"}
          options={["Yes", "No"]}
          nonscored={true}
        />
        {/* <Radio
          name={"competitors"}
          value={data?.Market?.competitors}
          onChange={handleChange}
          title={"Do you have any competitors?"}
        /> */}
      </div>
      <div className={styles.btn_div}>
        <button className={styles.backbtn} onClick={handlePrev}>
          &lt; Back
        </button>
        <button className={styles.nextbtn} onClick={handleNext}>
          {" "}
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default MarketTesting;
