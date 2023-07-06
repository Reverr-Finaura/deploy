import React from "react";
import { useState } from "react";
import styles from "./CheckScoreTesting.module.css";
import PnTTesting from "./stages/PnTTesting";
import TeamTesting from "./stages/TeamTesting";
import MarketTesting from "./stages/MarketTesting";
import FinanceTesting from "./stages/FinanceTesting";
import ResultTesting from "./stages/ResultTesting";
import DoneTesting from "./stages/DoneTesting";

const CheckYourScoreTesting = () => {
  const [stage, setStage] = useState(0);
  const [startupScore, setstartupScore] = useState({
    productTech: { totalScore: 0, score: 0 },
    Team: { totalScore: 0, score: 0 },
    Market: { totalScore: 0, score: 0 },
    Finance: { totalScore: 0, score: 0 },
    totalScore: 0,
    score: 0,
  });
  const [algoScore, setAlgoScore] = useState({
    Pnt: 0,
    Team: 0,
    Market: 0,
    Finance: 0,
  });

  const stages = [
    <PnTTesting
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <TeamTesting
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <MarketTesting
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <FinanceTesting
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <DoneTesting
      setStage={setStage}
      // data={scoreData}
      // setData={setScoreData}
    />,
    <ResultTesting
      score={algoScore}
      data={startupScore}
      setData={setstartupScore}
    />,
  ];

  return (
    <>
      <section id={styles.checkyourscore}>
        {/* <img
          className={styles.checkscoreicon1}
          src="/images/algo-bg1.png"
          alt=""
        />
        <img
          className={styles.checkscoreicon2}
          src="/images/algo-bg2.png"
          alt=""
        /> */}

        <div className={styles.checkscore__container}>
          <h1>
            {" "}
            Take Your Start-Up <span>Assessment </span>today!
          </h1>
          <div className={styles.checkscore__content}>
            <div className={styles.stages}>
              <div>
                {stage >= 0 ? (
                  <>
                    <img src={"/images/blue_circle.svg"} alt="ProgressImg" />
                    <img src={"/images/tick.svg"} alt="ProgressImg" />
                  </>
                ) : (
                  <>
                    <img src={"/images/empty_circle.svg"} alt="ProgressImg" />
                  </>
                )}
                <span>Product</span>
              </div>
              <div>
                {stage >= 1 ? (
                  <>
                    <img src={"/images/blue_circle.svg"} alt="ProgressImg" />
                    <img src={"/images/tick.svg"} alt="ProgressImg" />
                  </>
                ) : (
                  <>
                    <img src={"/images/empty_circle.svg"} alt="ProgressImg" />
                  </>
                )}
                <span>Team</span>
              </div>
              <div>
                {stage >= 2 ? (
                  <>
                    <img src={"/images/blue_circle.svg"} alt="ProgressImg" />
                    <img src={"/images/tick.svg"} alt="ProgressImg" />
                  </>
                ) : (
                  <>
                    <img src={"/images/empty_circle.svg"} alt="ProgressImg" />
                  </>
                )}
                <span>Market</span>
              </div>
              <div>
                {stage >= 3 ? (
                  <>
                    <img src={"/images/blue_circle.svg"} alt="ProgressImg" />
                    <img src={"/images/tick.svg"} alt="ProgressImg" />
                  </>
                ) : (
                  <>
                    <img src={"/images/empty_circle.svg"} alt="ProgressImg" />
                  </>
                )}
                <span>Finance</span>
              </div>
              <div>
                {stage >= 4 ? (
                  <>
                    <img src={"/images/blue_circle.svg"} alt="ProgressImg" />
                    <img src={"/images/tick.svg"} alt="ProgressImg" />
                  </>
                ) : (
                  <>
                    <img src={"/images/empty_circle.svg"} alt="ProgressImg" />
                  </>
                )}
                <span>Done</span>
              </div>
            </div>
            {/* <div className={styles.progress_bar}>
              <div style={{ width: `calc(${(stage + 1) / 4} * 100%)` }}></div>
            </div> */}
            <div className={styles.stage}>{stages[stage]}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckYourScoreTesting;
