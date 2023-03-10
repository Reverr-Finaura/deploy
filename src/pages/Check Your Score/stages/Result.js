import React from "react";
import styles from "./stages.module.css";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Label,
  Tooltip,
  Cell,
} from "recharts";

const Result = ({ score }) => {
  const total = { Pnt: 49, Team: 327, Market: 177 };
  const res = [
    Math.round((score.Pnt * 100) / total.Pnt),
    Math.round((score.Team * 100) / total.Team),
    Math.round((score.Market * 100) / total.Market),
  ];
  const data = [
    { name: "Product & Tech", value: res[0] },
    { name: "Team", value: res[1] },
    { name: "Market", value: res[2] },
    { name: "", value: 12 },
  ];
  const COLORS = ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"];
  // console.log(100 - [res[0] + res[1] + res[2]]);
  // const series = [...res, [res[0] + res[1] + res[2]]];
  // const series = [20, 40, 18, 12];

  // const options = {
  //   chart: {
  //     type: "donut",
  //     offsetX: 0,
  //   },
  //   plotOptions: {
  //     pie: {
  //       startAngle: 100,
  //       donut: {
  //         size: "85%",
  //         dataLabels: {
  //           enabled: false,
  //         },
  //         labels: {
  //           show: true,
  //           name: {
  //             show: false,
  //             offsetY: 38,
  //             // formatter: () => "out of 553 points",
  //           },
  //           value: {
  //             show: false,
  //             fontSize: "30px",
  //             fontWeight: 500,
  //             color: "var(--main-text)",
  //             offsetY: -10,
  //           },
  //           total: {
  //             show: true,
  //             showAlways: true,
  //             color: "var(--main-text)",
  //             fontSize: "12px",
  //             fontWeight: 600,
  //             // formatter: (w) => {
  //             //   return score.Pnt + score.Team + score.Market;
  //             // },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   labels: ["Product & Technology", "Team", "Market & Finance", ""],

  //   legend: {
  //     show: false,
  //     position: "top",
  //   },
  //   fill: {
  //     type: "solid",
  //     colors: ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"],
  //   },
  //   stroke: {
  //     width: 0,
  //   },
  //   // colors: ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"],
  // };
  return (
    <div className={styles.stages_done}>
      <div className={styles.result_score}>
        {/* <ResponsiveContainer height={"300"}> */}
        <PieChart width={300} height={200}>
          <Tooltip style={{ border: "none" }} />
          <Pie
            data={data}
            // cx={120}
            // cy={200}
            nameKey="name"
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              width={30}
              position="center"
              content={
                <CustomLabel total={score.Pnt + score.Team + score.Market} />
              }
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
      <text x={"130"} y={"90"} fontSize="22">
        {total}
      </text>
      <text x={"110"} y={"120"} fontSize="15">
        out of 553
      </text>
    </>
  );
}
export default Result;
