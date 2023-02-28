import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import styles from "./stages.module.css";
const PnT = ({ setStage }) => {
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  return (
    <div className={styles.stages_container}>
      <h3>Product & Technology</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            title={"Company Name"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Incorporation Date"}
            placeholder={"Enter here"}
            type={"date"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input title={"Country"} placeholder={"Enter here"} type={"text"} />
          <Input title={"State"} placeholder={"Enter here"} type={"text"} />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Primary Technology"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Secondary Technology"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          title={"What made you create the solution? - Motivation"}
          placeholder={"Type here"}
        />
        <TextArea
          title={
            "If product/solution is tech-based in nature (e.g a platform/technology product), will it be developed in-house?"
          }
        />
        <div className={styles.input_flex}>
          <Input
            title={"Stage of Product/Service Development"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Primary Offering"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Which Tech Industry is your Company in?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Sub Industry"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Which domain does your startup cater to?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Customer Segment"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          title={
            "Help us understand your business better with upto 10 related keywords"
          }
          placeholder={"Enter here"}
        />
        <div className={styles.input_flex}>
          <Input
            title={"Does your business have a MOAT?"}
            placeholder={"Yes/No"}
            type={"text"}
          />
          <Input
            title={"What MOAT's does your business have/will potentially have?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          title={
            "Is your product exposed to any form of risk currently/will be in future?"
          }
          placeholder={"Enter here"}
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

export default PnT;
