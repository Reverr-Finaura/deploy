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
import { useNavigate } from "react-router-dom";

const ResultTesting = ({ score, data }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const total = { Pnt: 49, Team: 327, Market: 177 };
  const res = [
    Math.round((data.productTech.score * 35) / data.productTech.totalScore),
    Math.round((data.Team.score * 35) / data.Team.totalScore),
    Math.round((data.Market.score * 15) / data.Market.totalScore),
    Math.round((data.Finance.score * 15) / data.Finance.totalScore),
  ];
  // const res = [
  //   Math.round((score.Pnt * 35) / total.Pnt),
  //   Math.round((score.Team * 35) / total.Team),
  //   Math.round((score.Market * 30) / total.Market),
  // ];
  const series = [
    { name: "Product", value: res[0] },
    { name: "Team", value: res[1] },
    { name: "Market", value: res[2] },
    { name: "Finance", value: res[3] },
    { name: "", value: 12 },
  ];
  const COLORS = ["#FF17A8", "#F1F45E", "#41FA8B","#41A1FA", "#D9D9D9"];

  // useEffect(() => {
  //   const saveScore = async () => {
  //     try {
  //       await updateDoc(doc(db, "Users", user?.user?.email), {
  //         startupScore: data,
  //       });
  //       console.log("done");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   saveScore();
  // }, []);

  return (
    <div className={styles.result}>
      <div className={styles.stages_done}>
        <div className={styles.result_CardLeft}>
          {/* <img src="/images/ResultMan.png" alt="ResultMan" /> */}
          <p>You have scored</p>
          <p>{res[0] + res[1] + res[2] + res[3]}</p>
          <p>out of</p>
          <p>100 points</p>
        </div>
        <div className={styles.result_right}>
          <h1>You’re good to go</h1>
          <p>Your start-up score is better than 80% of the other founders.</p>
          <div className={styles.btn_div}>
            {/* <button className={styles.backbtn}>&lt; Back</button> */}
            <button
              className={styles.nextbtn}
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Visit Home Page
            </button>
          </div>
        </div>
      </div>
      <div className={styles.result_score}>
        {/* <ResponsiveContainer height={"300"}> */}
        <PieChart width={300} height={200}>
          <Tooltip style={{ border: "none" }} />
          <Pie
            data={series}
            nameKey="name"
            dataKey="value"
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
          >
            {series.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              width={30}
              position="center"
              content={<CustomLabel total={res[0] + res[1] + res[2] + res[3]} />}
              color="white"
            ></Label>
          </Pie>
        </PieChart>
        {/* </ResponsiveContainer> */}
        <div className={styles.result_labels}>
          <div className={styles.result_label}>
            <img src={"/images/pnt_label.png"} />
            <span>Product -</span>
            <span>{res[0]}%</span>
          </div>
          <div className={styles.result_label}>
            <img src="/images/team_label.png" />
            <span>Team -</span>
            <span>{res[1]}%</span>
          </div>
          <div className={styles.result_label}>
            <img src={"/images/market_label.png"} />
            <span>Market -</span>
            <span>{res[2]}%</span>
          </div>
          <div className={styles.result_label}>
            <img src={"/images/finance_label.png"} />
            <span>Finance -</span>
            <span>{res[3]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function CustomLabel({ total }) {
  return (
    <>
      <text x={"133"} y={"90"} fontSize="22" color="white">
        {total}
      </text>
      <text x={"110"} y={"120"} fontSize="15">
        out of 100
      </text>
    </>
  );
}
export default ResultTesting;
