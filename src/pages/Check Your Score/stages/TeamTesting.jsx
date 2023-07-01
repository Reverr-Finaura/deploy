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
    if (Object.keys(data["Team"]).length < 13) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(data);
    setData((prev) => {
      return {
        ...prev,
        ["Team"]: {
          ...prev["Team"],

          [name]: value,
        },
      };
    });
  };

  const handleTeamLeads = (e, lead) => {
    const { name, value } = e.target;
    const score_of_var = scoredData[name]?.filter(
      (val) => val.value === value
    )[0].score;
    // console.log(score_of_var);
    // if (score_of_var !== undefined) {
    //   setScore((prev) => ({
    //     ...prev,
    //     ["Team"]: score.Team + score_of_var,
    //   }));
    // }

    if (score_of_var !== undefined) {
      setData((prev) => {
        return {
          ...prev,
          ["Team"]: {
            ...prev["Team"],

            [lead]: { ...prev["Team"][lead], [name]: value },
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
        {/* <h3>CEO</h3> */}
        <DropDown
          defaultValue={"select"}
          options={scoredData.has}
          value={data?.Team?.ceo?.has}
          name={"has"}
          onChange={(e) => handleTeamLeads(e, "ceo")}
          title={"Do you have a CEO? (Same for CFO, CTO, CMO, COO and SME)"}
        />
        {/* <Radio
          title={"Do you have a CEO? (Same for CFO, CTO, CMO, COO and SME)"}
          name={"has"}
          value={data?.Team?.ceo?.has}
          onChange={(e) => handleTeamLeads(e, "ceo")}
          options={scoredData.has}
        /> */}
        {data?.Team?.ceo?.has === "Yes" && (
          <>
            <div className={styles.input_flex}>
              <Input
                title={"Name"}
                value={data?.Team?.ceo.name}
                name={"name"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Age"}
                value={data?.Team?.ceo.age}
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
                value={data?.Team?.ceo.gender}
                name={"gender"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                placeholder={"Enter here"}
                type={"text"}
              />
              <Input
                title={"Email"}
                value={data?.Team?.ceo.email}
                name={"email"}
                onChange={(e) => handleTeamLeads(e, "ceo")}
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
                title={"Years of experience (overall)"}
                options={scoredData.year_of_exp}
              />
              <DropDown
                defaultValue={"select"}
                name={"working_years"}
                value={data?.Team?.ceo.working_years}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={
                  "Years of experience (working/running a startup)"
                }
                options={scoredData.working_years}
              />
            </div>
            <div className={styles.input_flex}>
              <DropDown
                defaultValue={"select"}
                name={"education"}
                value={data?.Team?.ceo.education}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Highest level of Education?"}
                nonscored={true}
                options={nonscoredData.education}
              />
              {/* <DropDown
                defaultValue={"select"}
                name={"certification"}
                value={data?.Team?.ceo.certification}
                onChange={(e) => handleTeamLeads(e, "ceo")}
                title={"Does he/she hold any professional Certification?"}
                nonscored={true}
                options={nonscoredData.certification}
              /> */}
              <Radio 
                title={"Does he/she hold any professional Certification?"}
                name={"certification"}
                value={data?.Team?.ceo.certification}
                onChange={(e) => handleTeamLeads(e, "ceo")}
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
