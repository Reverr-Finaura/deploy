import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import { toast } from "react-toastify";
import styles from "./stages.module.css";

const Team = ({ setStage, data, setData }) => {
  const handleNext = () => {
    console.log(Object.keys(data).length);
    if (Object.keys(data).length < 38) {
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
      <h3>Team Leads</h3>
      <div className={styles.stage_form}>
        <TextArea
          value={data?.hasceo}
          name={"hasceo"}
          onChange={handleChange}
          title={"Do you have a CEO?*  Same for ( CFO, CTO, CMO, COO and SME)"}
        />
        <div className={styles.input_flex}>
          <Input
            title={"Name"}
            value={data?.name}
            name={"name"}
            onChange={handleChange}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Age"}
            value={data?.age}
            name={"age"}
            onChange={handleChange}
            placeholder={"Enter here"}
            type={"number"}
            min={1}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            title={"Gender"}
            value={data?.gender}
            name={"gender"}
            onChange={handleChange}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Email"}
            value={data?.email}
            name={"email"}
            onChange={handleChange}
            placeholder={"Enter here"}
            type={"email"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"year_of_exp"}
            value={data?.year_of_exp}
            onChange={handleChange}
            title={"How many years of experience does he/she hold?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"working_years"}
            value={data?.working_years}
            onChange={handleChange}
            title={
              "How many years of experience does he/she hold working/running a startup?"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"education"}
            value={data?.education}
            onChange={handleChange}
            title={"What is the Highest level of Education?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"certification"}
            value={data?.certification}
            onChange={handleChange}
            title={"Does he/she hold any professional Certification?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"prod_launches"}
            value={data?.prod_launches}
            onChange={handleChange}
            title={"Times responsible for New Product Launches:"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"process_imp"}
            value={data?.process_imp}
            onChange={handleChange}
            title={"Times responsible for Process Implementations"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <Input
          name={"new_team"}
          value={data?.new_team}
          onChange={handleChange}
          title={"Times been a part of New / changing teams*"}
          placeholder={"Enter here"}
          type={"text"}
        />
      </div>
      <h3>Team Synergy</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            name={"dependencies"}
            value={data?.dependencies}
            onChange={handleChange}
            title={"What level of dependence exists between team members?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"informal_com"}
            value={data?.informal_com}
            onChange={handleChange}
            title={"How much informal communication exists within the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"personality"}
            value={data?.personality}
            onChange={handleChange}
            title={"How similar are the members' personalities?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"skill_overlap"}
            value={data?.skill_overlap}
            onChange={handleChange}
            title={"How much overlap of skills exists in the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"interaction"}
            value={data?.interaction}
            onChange={handleChange}
            title={"How necessary is frequent professional interaction?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"exp_levels"}
            value={data?.exp_levels}
            onChange={handleChange}
            title={
              "What is the difference in experience levels between team members?"
            }
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"emotion_level"}
            value={data?.emotion_level}
            onChange={handleChange}
            title={"What is the emotional state of the team?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"team_apply"}
            value={data?.team_apply}
            onChange={handleChange}
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
