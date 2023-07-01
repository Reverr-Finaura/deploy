import React, { useEffect } from "react";
import styles from "./stageTesting.module.css";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Label,
  Tooltip,
  Cell,
} from "recharts";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";

const ResultTesting = ({ score, data }) => {
  const user = useSelector((state) => state.user);
  // console.log(data);
  const total = { Pnt: 49, Team: 327, Market: 177 };
  const res = [
    Math.round((score.Pnt * 35) / total.Pnt),
    Math.round((score.Team * 35) / total.Team),
    Math.round((score.Market * 30) / total.Market),
  ];
  const series = [
    { name: "Product & Tech", value: res[0] },
    { name: "Team", value: res[1] },
    { name: "Market", value: res[2] },
    { name: "", value: 12 },
  ];
  const COLORS = ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"];

  useEffect(() => {
    const saveScore = async () => {
      try {
        await updateDoc(doc(db, "Users", user?.user?.email), {
          startupScore: data,
        });
        console.log("done");
      } catch (err) {
        console.log(err);
      }
    };
    saveScore();
  }, []);

  return (
    <div className={styles.stages_done}>
      <div className={styles.result_left}>
        <img src="/images/ResultMan.png" alt="ResultMan" />
      </div>
      <div className={styles.result_right}>
        <h1>And, you’re done!</h1>
        <p>We will review your start-up and get back to you in 24 hours.</p>
        <div className={styles.btn_div}>
          {/* <button className={styles.backbtn}>&lt; Back</button> */}
          <button className={styles.nextbtn} onClick={()=>{}}>
            {" "}
            Visit Home;
          </button>
        </div>
      </div>
    </div>
  );
};

function CustomLabel({ total }) {
  return (
    <>
      <text x={"133"} y={"90"} fontSize="22">
        {total}
      </text>
      <text x={"110"} y={"120"} fontSize="15">
        out of 100
      </text>
    </>
  );
}
export default ResultTesting;
