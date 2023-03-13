import React, { useEffect } from "react";
import styles from "./stages.module.css";
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

const Result = ({ score, data }) => {
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
      <div className={styles.result_score}>
        {/* <ResponsiveContainer height={"300"}> */}
        <PieChart width={300} height={200}>
          <Tooltip style={{ border: "none" }} />
          <Pie
            data={series}
            nameKey="name"
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
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
              content={<CustomLabel total={res[0] + res[1] + res[2]} />}
            ></Label>
          </Pie>
        </PieChart>
        {/* </ResponsiveContainer> */}
        <div className={styles.result_labels}>
          <div className={styles.result_label}>
            <img src={"/images/green_label.png"} />
            <span>Product & Tech -</span>
            <span>{res[0]}%</span>
          </div>
          <div className={styles.result_label}>
            <img src="/images/blue_label.png" />
            <span>Team -</span>
            <span>{res[1]}%</span>
          </div>
          <div className={styles.result_label}>
            <img src={"/images/pink_label.png"} />
            <span>Market & Finance -</span>
            <span>{res[2]}%</span>
          </div>
        </div>
      </div>
      <div className={styles.result_msg}>
        <div className={styles.msg_text}>
          <h3>You're good to go !</h3>
          <p>Your start-up score is better than 80% of the other founders.</p>
        </div>
        <div className={styles.msg_img}>
          <img src={"/images/score_result.png"} />
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
export default Result;
