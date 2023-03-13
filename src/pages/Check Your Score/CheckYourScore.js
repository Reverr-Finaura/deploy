import React from "react";
import { useEffect, useState } from "react";
import styles from "./CheckYourScore.module.css";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import PnT from "./stages/PnT";
import Team from "./stages/Team";
import Market from "./stages/Market";
import Done from "./stages/Done";
import Result from "./stages/Result";

const CheckYourScore = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [stage, setStage] = useState(0);
  const [startupScore, setstartupScore] = useState({
    productTech: { totalScore: 49, score: 0 },
    Team: { totalScore: 327, score: 0 },
    Market: { totalScore: 177, score: 0 },
    totalScore: 553,
    score: 0,
  });
  const [algoScore, setAlgoScore] = useState({ Pnt: 0, Team: 0, Market: 0 });

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getWidth =
    stage === 0 ? "25%" : stage === 1 ? "50%" : stage === 2 ? "75%" : "100%";

  const stages = [
    <PnT
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <Team
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    <Market
      setStage={setStage}
      data={startupScore}
      setData={setstartupScore}
      score={algoScore}
      setScore={setAlgoScore}
    />,
    // <Done setStage={setStage} data={scoreData} setData={setScoreData} />,
    <Result score={algoScore} data={startupScore} setData={setstartupScore} />,
  ];

  return (
    <>
      {width >= 600 ? (
        <>
          <SidebarFinal />
          <NavBarFinal />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}
      <section id={styles.checkyourscore}>
        <img
          className={styles.checkscoreicon1}
          src="/images/algo-bg1.png"
          alt=""
        />
        <img
          className={styles.checkscoreicon2}
          src="/images/algo-bg2.png"
          alt=""
        />

        <div className={styles.checkscore__container}>
          <h1>
            {" "}
            Welcome To <span>Start-Up</span> ALGO.
          </h1>
          <div className={styles.checkscore__content}>
            <h3>Assessment</h3>
            <div className={styles.stages}>
              <span>Product & Tech</span>
              <span>Team</span>
              <span>Market & Finance</span>
              <span>Done</span>
            </div>
            <div className={styles.progress_bar}>
              <div style={{ width: `calc(${(stage + 1) / 4} * 100%)` }}></div>
            </div>
            <div className={styles.stage}>{stages[stage]}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckYourScore;
