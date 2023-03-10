import React from "react";
import { Input, TextArea, DropDown } from "../../../components/AlgoInput/Input";
import { toast } from "react-toastify";
import styles from "./stages.module.css";
import { scoredData, nonscoredData } from "./scores";

const Team = ({ setStage, data, setData, score, setScore }) => {
  console.log(score);
  const handleNext = () => {
    console.log(Object.keys(data).length);
    console.log(data);
    if (Object.keys(data).length < 3) {
      toast.error("Kindly Fill All Mandatory Fields");
    } else {
      setStage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setStage((prev) => prev - 1);
  };

  const handleDropdown = (e) => {
    const { name, value } = e.target;
    const score_of_var = scoredData[name].filter(
      (val) => val.value === value
    )[0].score;
    setScore((prev) => ({
      ...prev,
      ["Team"]: score.Team + score_of_var,
    }));
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(data);
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleTeamLeads = (e, lead) => {
    const { name, value } = e.target;
    const score_of_var = scoredData[name]?.filter(
      (val) => val.value === value
    )[0].score;
    // console.log(score_of_var);
    if (score_of_var !== undefined) {
      setScore((prev) => ({
        ...prev,
        ["Team"]: score.Team + score_of_var,
      }));
    }
    setData((prev) => {
      return {
        ...prev,
        [lead]: { ...prev[lead], [name]: value },
      };
    });
  };

  return (
    <div className={styles.stages_container}>
      <h3>Team Leads</h3>
      <div className={styles.stage_form}>
        <h3>CEO</h3>
        <DropDown
          options={scoredData.has}
          value={data?.ceo?.has}
          name={"has"}
          defaultValue={"-"}
          onChange={(e) => handleTeamLeads(e, "ceo")}
          title={"Do you have a CEO?"}
        />
        {data?.ceo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.ceo.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.ceo.age}
                name={"age"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.ceo.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.ceo.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"year_of_exp"}
                value={data?.ceo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                name={"working_years"}
                value={data?.ceo.working_years}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"education"}
                value={data?.ceo.education}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                name={"certification"}
                value={data?.ceo.certification}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"prod_launches"}
                value={data?.ceo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                name={"process_imp"}
                value={data?.ceo.process_imp}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              name={"new_team"}
              value={data?.ceo.new_team}
              onChange={(e) => handleTeamLeads(e, "ceo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CFO</h3>
        <DropDown
          options={scoredData.has}
          value={data?.cfo?.has}
          defaultValue={"-"}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cfo")}
          title={"Do you have a CFO?"}
        />
        {data?.cfo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.cfo.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.cfo.age}
                name={"age"}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.cfo.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.cfo.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"year_of_exp"}
                value={data?.cfo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                name={"working_years"}
                value={data?.cfo.working_years}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"education"}
                value={data?.cfo.education}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                name={"certification"}
                value={data?.cfo.certification}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"prod_launches"}
                value={data?.cfo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                name={"process_imp"}
                value={data?.cfo.process_imp}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              name={"new_team"}
              value={data?.cfo.new_team}
              onChange={(e) => handleTeamLeads(e, "cfo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CTO</h3>
        <DropDown
          options={scoredData.has}
          value={data?.cto?.has}
          defaultValue={"-"}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cto")}
          title={"Do you have a cto?"}
        />
        {data?.cto?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.cto.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "cto")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.cto.age}
                name={"age"}
                onChange={(e) => handleTeamLeads(e, "cto")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.cto.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "cto")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.cto.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "cto")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"year_of_exp"}
                value={data?.cto.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                name={"working_years"}
                value={data?.cto.working_years}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"education"}
                value={data?.cto.education}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                name={"certification"}
                value={data?.cto.certification}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"prod_launches"}
                value={data?.cto.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                name={"process_imp"}
                value={data?.cto.process_imp}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              name={"new_team"}
              value={data?.cto.new_team}
              onChange={(e) => handleTeamLeads(e, "cto")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CMO</h3>
        <DropDown
          options={scoredData.has}
          value={data?.cmo?.has}
          defaultValue={"-"}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cmo")}
          title={"Do you have a cmo?"}
        />
        {data?.cmo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.cmo.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.cmo.age}
                name={"age"}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.cmo.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.cmo.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"year_of_exp"}
                value={data?.cmo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                name={"working_years"}
                value={data?.cmo.working_years}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"education"}
                value={data?.cmo.education}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                name={"certification"}
                value={data?.cmo.certification}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"prod_launches"}
                value={data?.cmo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                name={"process_imp"}
                value={data?.cmo.process_imp}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              name={"new_team"}
              value={data?.cmo.new_team}
              onChange={(e) => handleTeamLeads(e, "cmo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>COO</h3>
        <DropDown
          options={scoredData.has}
          value={data?.coo?.has}
          defaultValue={"-"}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "coo")}
          title={"Do you have a coo?"}
        />
        {data?.coo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.coo.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "coo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.coo.age}
                name={"age"}
                onChange={(e) => handleTeamLeads(e, "coo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.coo.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "coo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.coo.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "coo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"year_of_exp"}
                value={data?.coo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                name={"working_years"}
                value={data?.coo.working_years}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"education"}
                value={data?.coo.education}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                name={"certification"}
                value={data?.coo.certification}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                name={"prod_launches"}
                value={data?.coo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                name={"process_imp"}
                value={data?.coo.process_imp}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              name={"new_team"}
              value={data?.coo.new_team}
              onChange={(e) => handleTeamLeads(e, "coo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
      </div>
      <h3>Team Synergy</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <DropDown
            name={"dependencies"}
            value={data?.dependencies}
            onChange={handleDropdown}
            title={"What level of dependence exists between team members?"}
            options={scoredData.dependencies}
          />
          <DropDown
            name={"informal_com"}
            value={data?.informal_com}
            onChange={handleDropdown}
            title={"How much informal communication exists within the team?"}
            options={scoredData.informal_com}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            name={"personality"}
            value={data?.personality}
            onChange={handleChange}
            title={"How similar are the members' personalities?"}
            nonscored={true}
            options={nonscoredData.personality}
          />
          <DropDown
            name={"skill_overlap"}
            value={data?.skill_overlap}
            onChange={handleChange}
            title={"How much overlap of skills exists in the team?"}
            options={scoredData.skill_overlap}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            name={"interaction"}
            value={data?.interaction}
            onChange={handleChange}
            title={"How necessary is frequent professional interaction?"}
            options={scoredData.interaction}
          />
          <DropDown
            name={"exp_levels"}
            value={data?.exp_levels}
            onChange={handleChange}
            title={
              "What is the difference in experience levels between team members?"
            }
            nonscored={true}
            options={nonscoredData.exp_levels}
          />
        </div>
        <div className={styles.input_flex}>
          <DropDown
            name={"emotion_level"}
            value={data?.emotion_level}
            onChange={handleChange}
            title={"What is the emotional state of the team?"}
            nonscored={true}
            options={nonscoredData.emotion_level}
          />
          <DropDown
            name={"team_apply"}
            value={data?.team_apply}
            onChange={handleChange}
            title={
              "Which of the following applies most significantly to your team?"
            }
            nonscored={true}
            options={nonscoredData.team_apply}
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
