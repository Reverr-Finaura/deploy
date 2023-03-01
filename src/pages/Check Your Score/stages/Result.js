import React from "react";
import Chart from "react-apexcharts";
import styles from "./stages.module.css";

const Result = () => {
  const series = [20, 40, 18, 12];
  const options = {
    chart: {
      type: "donut",

      offsetX: 0,
    },
    plotOptions: {
      pie: {
        startAngle: 90,
        donut: {
          size: "80%",
          dataLabels: {
            enabled: false,
          },
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 38,
              formatter: () => "out of 100 points",
            },
            value: {
              show: true,
              fontSize: "40px",
              fontWeight: 500,
              color: "var(--main-text)",
              offsetY: -10,
            },
            total: {
              show: true,
              showAlways: true,
              color: "var(--main-text)",
              fontSize: "12px",
              fontWeight: 600,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `78`;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Product & Technology", "Team", "Market & Finance", ""],
    legend: {
      show: false,
      position: "top",
    },
    fill: {
      type: "solid",
      colors: ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"],
    },
    stroke: {
      width: 0,
    },
    colors: ["#78E426", "#2871DF", "#EE5AAA", "#D9D9D9"],
  };
  return (
    <div className={styles.stages_done}>
      <div className={styles.result_score}>
        <Chart options={options} series={series} type="donut" width={240} />
        <div className={styles.result_labels}>
          <div className={styles.result_label}>
            <img src={"/images/green_label.png"} />
            <span>Product & Team -</span>
            <span>20%</span>
          </div>
          <div className={styles.result_label}>
            <img src="/images/blue_label.png" />
            <span>Team -</span>
            <span>40%</span>
          </div>
          <div className={styles.result_label}>
            <img src={"/images/pink_label.png"} />
            <span>Market & Finance -</span>
            <span>18%</span>
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

export default Result;
