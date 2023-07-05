import React from "react";
import "./CourcePageTesting.css";

const CourcePageTesting = () => {
  return (
    <div className="firstback">
      <div className="ideavalid">
        <div className="content">
          <text className="head">IDEA VALIDATION</text>
          <div className="rateing">
            <img src="./images/Star.svg" alt="" height={20} width={120} />
            <span className="space">4.8</span>
            <text className="rat"> 1,980 s ratings | 97%</text>
          </div>
          <p className="sub">
            Is it worthwhile to pursue your fresh startup idea? Let's
            <br /> put it through our tried-and-true method to obtain
            <br /> opinions from experts, users, and the available research{" "}
            <br />
            to determine whether it's worthwhile to construct.
          </p>
          <br />
          <button className="submit-button">Enroll Now</button>
          <p className="sub">2,768 already enrolled</p>
        </div>
        <div className="imgrev">
          <p className="sub">Offered by </p>
          <p className="rever">REVERR</p>
          <div className="ideagirl">
            <img src="/images/idea-validation1.png" alt="" height={280} width={250} />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="aboutsyllabus">
          <div className="tab">
            <text className="about">About</text>
          </div>
          <div>
            <p className="bout">
              <text>
                Is it worthwhile to pursue your fresh startup idea? <br />
                Let's put it through our tried-and-true method to obtain
                opinions from experts, users, and the available research <br />
                to determine whether it's worthwhile to construct.
              </text>
            </p>
          </div>
          <div className="learn">
            <text className="sub">
              What you will learn?
              <br />
            </text>
            <br />
            <text className="bullet">{"\u2B24"}</text>What is Fundraising and
            why is it important?
            <br />
            <br />
            <text className="bullet">{"\u2B24"}</text>What are the different
            means to raise funds?
            <br />
            <br />
            <text className="bullet">{"\u2B24"}</text>What is the role of a
            pitchdeck in fundraising?
          </div>
        </div>
        <div className="imggraph">
          <img src="./images/idea-validation2.png" alt="" height={300} width={250} />
        </div>
      </div>
    </div>
  );
};

export default CourcePageTesting;
