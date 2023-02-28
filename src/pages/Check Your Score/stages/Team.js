import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import styles from "./stages.module.css";
const Team = ({ setStage }) => {
  const handleNext = () => {
    setStage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  return (
    <div className={styles.stages_container}>
      <h3>Team Leads</h3>
      <div className={styles.stage_form}>
        <TextArea
          title={"Do you have a CEO?*  Same for ( CFO, CTO, CMO, COO and SME)"}
        />
        <div className={styles.input_flex}>
          <Input title={"Name"} placeholder={"Enter here"} type={"text"} />
          <Input
            title={"Age"}
            placeholder={"Enter here"}
            type={"number"}
            min={1}
          />
        </div>
        <div className={styles.input_flex}>
          <Input title={"Gender"} placeholder={"Enter here"} type={"text"} />
          <Input title={"Email"} placeholder={"Enter here"} type={"email"} />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"How many years of experience does he/she hold?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={
              "How many years of experience does he/she hold working/running a startup?"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"What is the Highest level of Education?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Does he/she hold any professional Certification?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Times responsible for New Product Launches:"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Times responsible for Process Implementations"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <Input
          title={"Times been a part of New / changing teams*"}
          placeholder={"Enter here"}
          type={"text"}
        />
      </div>
      <h3>Team Synergy</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            title={"What level of dependence exists between team members?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"How much informal communication exists within the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"How similar are the members' personalities?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"How much overlap of skills exists in the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"How necessary is frequent professional interaction?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={
              "What is the difference in experience levels between team members?"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"What is the emotional state of the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={
              "Which of the following applies most significantly to your team?"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
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

export default Team;
