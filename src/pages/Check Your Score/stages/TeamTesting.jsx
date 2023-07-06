import React from "react";
import {
  Input,
  TextArea,
  DropDown,
  Radio,
} from "../../../components/AlgoInput/InputTesting";
import { toast } from "react-toastify";
import styles from "./stageTesting.module.css";
import { scoredData, nonscoredData } from "./scores";

const TeamTesting = ({ setStage, data, setData, score, setScore }) => {
  const handleNext = () => {
    if (Object.keys(data["Team"]).length < 1) {
      toast.error("Kindly Fill All Mandatory Fields");
    } else {
      setData((prev) => ({
        ...prev,
        ["score"]: prev["score"] + prev["Team"]["score"],
      }));
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
    if (score_of_var !== undefined) {
      setData((prev) => {
        return {
          ...prev,
          ["Team"]: {
            ...prev["Team"],
            [name]: value,
            ["score"]: prev["Team"]["score"] + score_of_var,
          },
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          ["Team"]: {
            ...prev["Team"],

            [name]: value,
          },
        };
      });
    }
  };

  const handleChange = (e, lead) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        ["Team"]: {
          ...prev["Team"],
          [lead]: { ...prev["Team"][lead], [name]: value },
        },
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

  const handleTeamLeads = (e, lead) => {
    const { name, value } = e.target;
    const score_of_var = getScore(name, value);
    // console.log(score_of_var);
    // if (score_of_var !== undefined) {
    //   setScore((prev) => ({
    //     ...prev,
    //     ["Team"]: score.Team + score_of_var,
    //   }));
    // }

    // console.log(data["Team"][lead]?.[name]);
    if (score_of_var !== undefined) {
      setData((prev) => {
        return {
          ...prev,
          ["Team"]: {
            ...prev["Team"],

            [lead]: { ...prev["Team"][lead], [name]: value },
            ["score"]: prev["Team"]["score"] + score_of_var,
            ["totalScore"]: prev["Team"]["totalScore"] + findMaxScore(name),
          },
        };
      });
    } else {
      setData((prev) => {
        return {
          ...prev,
          ["Team"]: {
            ...prev["Team"],
            [lead]: { ...prev["Team"][lead], [name]: value },
          },
        };
      });
    }
  };

  return (
    <div className={styles.stages_container}>
      {/* <h3>Team Leads</h3> */}
      <div className={styles.stage_form}>
        <h3>CEO</h3>
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.ceo?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "ceo")}
          title={"Do you have a CEO?"}
        />
        {data?.Team?.ceo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.ceo.name}
                name={"name"}
                onChange={(e) => handleChange(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.ceo.age}
                name={"age"}
                onChange={(e) => handleChange(e, "ceo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.Team?.ceo.gender}
                name={"gender"}
                onChange={(e) => handleChange(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.ceo.email}
                name={"email"}
                onChange={(e) => handleChange(e, "ceo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"year_of_exp"}
                value={data?.Team?.ceo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.ceo.working_years}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.ceo.education}
                onChange={(e) => handleChange(e, "ceo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.ceo.certification}
                onChange={(e) => handleChange(e, "ceo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"prod_launches"}
                value={data?.Team?.ceo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                defaultValue={"select"}
                name={"process_imp"}
                value={data?.Team?.ceo.process_imp}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              defaultValue={"select"}
              name={"new_team"}
              value={data?.Team?.ceo.new_team}
              onChange={(e) => handleTeamLeads(e, "ceo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CFO</h3>
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.cfo?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cfo")}
          title={"Do you have a CFO?"}
        />
        {data?.Team?.cfo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.cfo.name}
                name={"name"}
                onChange={(e) => handleChange(e, "cfo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.cfo.age}
                name={"age"}
                onChange={(e) => handleChange(e, "cfo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.Team?.cfo.gender}
                name={"gender"}
                onChange={(e) => handleChange(e, "cfo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.cfo.email}
                name={"email"}
                onChange={(e) => handleChange(e, "cfo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"year_of_exp"}
                value={data?.Team?.cfo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.cfo.working_years}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.cfo.education}
                onChange={(e) => handleChange(e, "cfo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.cfo.certification}
                onChange={(e) => handleChange(e, "cfo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"prod_launches"}
                value={data?.Team?.cfo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                defaultValue={"select"}
                name={"process_imp"}
                value={data?.Team?.cfo.process_imp}
                onChange={(e) => handleTeamLeads(e, "cfo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              defaultValue={"select"}
              name={"new_team"}
              value={data?.Team?.cfo.new_team}
              onChange={(e) => handleTeamLeads(e, "cfo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CTO</h3>
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.cto?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cto")}
          title={"Do you have a cto?"}
        />
        {data?.Team?.cto?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.cto.name}
                name={"name"}
                onChange={(e) => handleChange(e, "cto")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.cto.age}
                name={"age"}
                onChange={(e) => handleChange(e, "cto")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.Team?.cto.gender}
                name={"gender"}
                onChange={(e) => handleChange(e, "cto")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.cto.email}
                name={"email"}
                onChange={(e) => handleChange(e, "cto")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"year_of_exp"}
                value={data?.Team?.cto.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.cto.working_years}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.cto.education}
                onChange={(e) => handleChange(e, "cto")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.cto.certification}
                onChange={(e) => handleChange(e, "cto")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"prod_launches"}
                value={data?.Team?.cto.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                defaultValue={"select"}
                name={"process_imp"}
                value={data?.Team?.cto.process_imp}
                onChange={(e) => handleTeamLeads(e, "cto")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              defaultValue={"select"}
              name={"new_team"}
              value={data?.Team?.cto.new_team}
              onChange={(e) => handleTeamLeads(e, "cto")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>CMO</h3>
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.cmo?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "cmo")}
          title={"Do you have a cmo?"}
        />
        {data?.Team?.cmo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.cmo.name}
                name={"name"}
                onChange={(e) => handleChange(e, "cmo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.cmo.age}
                name={"age"}
                onChange={(e) => handleChange(e, "cmo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.Team?.cmo.gender}
                name={"gender"}
                onChange={(e) => handleChange(e, "cmo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.cmo.email}
                name={"email"}
                onChange={(e) => handleChange(e, "cmo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"year_of_exp"}
                value={data?.Team?.cmo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.cmo.working_years}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.cmo.education}
                onChange={(e) => handleChange(e, "cmo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.cmo.certification}
                onChange={(e) => handleChange(e, "cmo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"prod_launches"}
                value={data?.Team?.cmo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                defaultValue={"select"}
                name={"process_imp"}
                value={data?.Team?.cmo.process_imp}
                onChange={(e) => handleTeamLeads(e, "cmo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              defaultValue={"select"}
              name={"new_team"}
              value={data?.Team?.cmo.new_team}
              onChange={(e) => handleTeamLeads(e, "cmo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
        <h3>COO</h3>
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.coo?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "coo")}
          title={"Do you have a coo?"}
        />
        {data?.Team?.coo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.coo.name}
                name={"name"}
                onChange={(e) => handleChange(e, "coo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.coo.age}
                name={"age"}
                onChange={(e) => handleChange(e, "coo")}
                placeholder={"Enter here"}
                type={"number"}
                min={1}
              />
            </div>
            <div className={styles.input_flex}>
              <Input
                title={"Gender"}
                value={data?.Team?.coo.gender}
                name={"gender"}
                onChange={(e) => handleChange(e, "coo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.coo.email}
                name={"email"}
                onChange={(e) => handleChange(e, "coo")}
                placeholder={"Enter here"}
                type={"email"}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"year_of_exp"}
                value={data?.Team?.coo.year_of_exp}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"How many years of experience does he/she hold?"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.coo.working_years}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={
                  "How many years of experience does he/she hold working/running a startup?"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.coo.education}
                onChange={(e) => handleChange(e, "coo")}
                title={"What is the Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.coo.certification}
                onChange={(e) => handleChange(e, "coo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"prod_launches"}
                value={data?.Team?.coo.prod_launches}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"Times responsible for New Product Launches:"}
                options={scoredData.prod_launches}
              />
              <DropDown
                defaultValue={"select"}
                name={"process_imp"}
                value={data?.Team?.coo.process_imp}
                onChange={(e) => handleTeamLeads(e, "coo")}
                title={"Times responsible for Process Implementations"}
                options={scoredData.process_imp}
              />
            </div>
            <DropDown
              defaultValue={"select"}
              name={"new_team"}
              value={data?.Team?.coo.new_team}
              onChange={(e) => handleTeamLeads(e, "coo")}
              title={"Times been a part of New / changing teams*"}
              options={scoredData.new_team}
            />
          </>
        )}
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

export default TeamTesting;
