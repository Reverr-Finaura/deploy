import React from "react";
import { Input, TextArea } from "../../../components/AlgoInput/Input";
import { toast } from "react-toastify";
import styles from "./stages.module.css";

const PnT = ({ setStage, setData, data }) => {
  const handleNext = () => {
    console.log(Object.keys(data).length);
    if (Object.keys(data).length < 18) {
      toast.error("Kindly Fill All Mandatory Fields");
    } else {
      setStage((prev) => prev + 1);
    }
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
      {/* <ToastContainer /> */}
      <h3>Product & Technology</h3>
      <div className={styles.stage_form}>
        <div className={styles.input_flex}>
          <Input
            value={data?.company_name}
            name={"company_name"}
            onChange={(e) => handleChange(e)}
            title={"Company Name"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            value={data?.incor_date}
            name={"incor_date"}
            onChange={(e) => handleChange(e)}
            title={"Incorporation Date"}
            placeholder={"Enter here"}
            type={"date"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            value={data?.country}
            title={"Country"}
            name={"country"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"State"}
            value={data?.state}
            name={"state"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            value={data?.pri_tech}
            title={"Primary Technology"}
            name={"pri_tech"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            value={data?.sec_tech}
            title={"Secondary Technology"}
            placeholder={"Enter here"}
            name={"sec_tech"}
            onChange={(e) => handleChange(e)}
            type={"text"}
          />
        </div>
        <TextArea
          name={"motivation"}
          value={data?.motivation}
          onChange={(e) => handleChange(e)}
          title={"What made you create the solution? - Motivation"}
          placeholder={"Type here"}
        />
        <TextArea
          name={"tech_based"}
          value={data?.tech_based}
          onChange={(e) => handleChange(e)}
          title={
            "If product/solution is tech-based in nature (e.g a platform/technology product), will it be developed in-house?"
          }
        />
        <div className={styles.input_flex}>
          <Input
            value={data?.prod_stage}
            title={"Stage of Product/Service Development"}
            name={"prod_stage"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"primary_offer"}
            value={data?.primary_offer}
            onChange={(e) => handleChange(e)}
            title={"Primary Offering"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"industry"}
            value={data?.industry}
            onChange={(e) => handleChange(e)}
            title={"Which Tech Industry is your Company in?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            title={"Sub Industry"}
            value={data?.sub_industry}
            name={"sub_industry"}
            onChange={(e) => handleChange(e)}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <div className={styles.input_flex}>
          <Input
            name={"domain"}
            value={data?.domain}
            onChange={(e) => handleChange(e)}
            title={"Which domain does your startup cater to?"}
            placeholder={"Enter here"}
            type={"text"}
          />
          <Input
            name={"customer_segment"}
            value={data?.customer_segment}
            onChange={(e) => handleChange(e)}
            title={"Customer Segment"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          name={"business_kw"}
          value={data?.business_kw}
          onChange={(e) => handleChange(e)}
          title={
            "Help us understand your business better with upto 10 related keywords"
          }
          placeholder={"Enter here"}
        />
        <div className={styles.input_flex}>
          <Input
            name={"ismoat"}
            value={data?.ismoat}
            onChange={(e) => handleChange(e)}
            title={"Does your business have a MOAT?"}
            placeholder={"Yes/No"}
            type={"text"}
          />
          <Input
            name={"moat"}
            value={data?.moat}
            onChange={(e) => handleChange(e)}
            title={"What MOAT's does your business have/will potentially have?"}
            placeholder={"Enter here"}
            type={"text"}
          />
        </div>
        <TextArea
          name={"pro_risk"}
          value={data?.pro_risk}
          onChange={(e) => handleChange(e)}
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
