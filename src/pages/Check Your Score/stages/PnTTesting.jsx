import React from "react";
import {
  DropDown,
  Input,
  Radio,
  TextArea,
} from "../../../components/AlgoInput/InputTesting";
import { toast } from "react-toastify";
import styles from "./stageTesting.module.css";
// import styles from "./stages.module.css";
import { scoredData, nonscoredData } from "./scores";

const PnTTesting = ({ setStage, setData, data, score, setScore }) => {
  const handleNext = () => {
    if (Object.keys(data["productTech"]).length < 18) {
      toast.error("Kindly Fill All Mandatory Fields");
      console.log("Kindly Fill All Mandatory Fields");
    } else {
      setScore((prev) => ({
        ...prev,
        ["Pnt"]: data["productTech"]["score"],
      }));
      setData((prev) => ({
        ...prev,
        ["score"]: prev["score"] + prev["productTech"]["score"],
      }));
      setStage((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        ["productTech"]: { ...prev["productTech"], [name]: value },
      };
    });
  };

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
    // console.log("max Score", findMaxScore(name));
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
        ["productTech"]: {
          ...prev["productTech"],
          [name]: value,
          ["score"]:
            prev["productTech"]["score"] -
            (prev["productTech"][name]
              ? getScore(name, prev["productTech"][name])
              : 0) +
            score_of_var,
          ["totalScore"]:
            prev["productTech"]["totalScore"] +
            (prev["productTech"][name] ? 0 : findMaxScore(name)),
        },
      };
    });
  };
  // console.log("data", data);
  // console.log("score", score);

  return (
    <div className={styles.stages_container}>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            value={data?.productTech?.company_name}
            name={"company_name"}
            onChange={(e) => handleChange(e)}
            title={"Company Name"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            value={data?.productTech?.incor_date}
            name={"incor_date"}
            onChange={(e) => handleChange(e)}
            title={"Incorporation Date"}
            placeholder={"Enter here"}
            type={"date"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            value={data?.productTech?.country}
            title={"Country"}
            name={"country"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"State"}
            value={data?.productTech?.state}
            name={"state"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            value={data?.productTech?.pri_tech}
            title={"Primary Technology"}
            name={"pri_tech"}
            nonscored={true}
            onChange={(e) => handleChange(e)}
            options={nonscoredData.tech_used}
          />
          <DropDown
            defaultValue={"select"}
            value={data?.productTech?.sec_tech}
            title={"Secondary Technology"}
            name={"sec_tech"}
            nonscored={true}
            onChange={(e) => handleChange(e)}
            options={nonscoredData.tech_used}
          />
        </div>
        {/* <DropDown
          defaultValue={"select"}
          value={data?.productTech?.ter_tech}
          title={"Tertiary Technology"}
          name={"ter_tech"}
          nonscored={true}
          onChange={(e) => handleChange(e)}
          options={nonscoredData.tech_used}
        /> */}
        <DropDown
          defaultValue={"select"}
          name={"motivation"}
          options={scoredData.motivation}
          value={data?.productTech?.motivation}
          onChange={(e) => handleDropdown(e)}
          title={"What made you create the solution? (Share your motivation)"}
        />
        <DropDown
          defaultValue={"select"}
          name={"tech_based"}
          value={data?.productTech?.tech_based}
          options={scoredData.tech_based}
          onChange={(e) => handleDropdown(e)}
          title={
            "If product/solution is tech-based in nature (e.g a platform/technology product), will it be developed in-house?"
          }
        />
        {/* <Radio
          name={"tech_based"}
          value={data?.productTech?.tech_based}
          onChange={(e) => handleChange(e)}
          title={
            "If product/solution is tech-based in nature (e.g a platform/technology product), will it be developed in-house?"
          }
        /> */}
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            value={data?.productTech?.prod_stage}
            title={"Stage of Product/Service Development"}
            name={"prod_stage"}
            onChange={(e) => handleDropdown(e)}
            options={scoredData.prod_stage}
          />
          <DropDown
            defaultValue={"select"}
            name={"primary_offer"}
            value={data?.productTech?.primary_offer}
            onChange={(e) => handleChange(e)}
            title={"Primary Offering"}
            nonscored={true}
            options={nonscoredData.primary_offer}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"industry"}
            value={data?.productTech?.industry}
            onChange={(e) => handleChange(e)}
            title={"Which Tech Industry is your Company in?"}
            nonscored={true}
            options={nonscoredData.industry}
          />
          <DropDown
            defaultValue={"select"}
            title={"Sub Industry"}
            value={data?.productTech?.sub_industry}
            name={"sub_industry"}
            onChange={(e) => handleChange(e)}
            nonscored={true}
            options={nonscoredData.industry}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"domain"}
            value={data?.productTech?.domain}
            onChange={(e) => handleChange(e)}
            title={"Which domain does your startup cater to?"}
            nonscored={true}
            options={nonscoredData.domain}
          />
          <DropDown
            defaultValue={"select"}
            name={"customer_segment"}
            value={data?.productTech?.customer_segment}
            onChange={(e) => handleChange(e)}
            title={"Customer Segment"}
            nonscored={true}
            options={nonscoredData.customer_segment}
          />
        </div>
        <TextArea
          name={"business_kw"}
          value={data?.productTech?.business_kw}
          onChange={(e) => handleChange(e)}
          title={
            "Help us understand your business better with upto 10 related keywords"
          }
          placeholder={"Enter here"}
        />
        <div className={styles.input_flex}>
          <DropDown
            defaultValue={"select"}
            name={"ismoat"}
            value={data?.productTech?.ismoat}
            onChange={(e) => handleChange(e)}
            title={"Does your business have a MOAT?"}
            nonscored={true}
            options={nonscoredData.ismoat}
          />
          {/* <Radio
          name={"ismoat"}
          value={data?.productTech?.ismoat}
          onChange={(e) => handleChange(e)}
          title={"Does your business have a MOAT?"}
        /> */}
          <DropDown
            defaultValue={"select"}
            name={"moat"}
            value={data?.productTech?.moat}
            onChange={(e) => handleDropdown(e)}
            title={"What MOAT's does your business have/will potentially have?"}
            options={scoredData.moat}
          />
          {/* <Radio
          name={"moat"}
          value={data?.productTech?.moat}
          onChange={(e) => handleChange(e)}
          title={"What MOAT's does your business have/will potentially have?"}
        /> */}
        </div>
        <DropDown
          defaultValue={"select"}
          name={"pro_risk"}
          value={data?.productTech?.pro_risk}
          onChange={(e) => handleDropdown(e)}
          title={
            "Is your product exposed to any form of risk currently/will be in future?"
          }
          options={scoredData.pro_risk}
        />
      </div>
      <div className={styles.btn_div}>
        {/* <button className={styles.backbtn}>&lt; Back</button> */}
        <button className={styles.nextbtn} onClick={handleNext}>
          {" "}
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default PnTTesting;
