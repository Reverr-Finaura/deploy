import React, { useEffect, useState } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";
import styles from "./Knowledge.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";

const ESOP_Slides = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const obj = [
    {
      title: "Recruting Talent",
      para: `Hi! I’m Jatin Once my startup started to grow, I realized how hard it was to recruit top talent – especially if you can’t afford to pay top dollar.
      Some people are attracted by the excitement of working at a startup, or are passionate about the mission of the startup itself. And that’s awesome!
      `,
      img: "es1.svg",
    },
    {
      title: "Lost opportunities",
      para: "However, I have missed a few opportunities to work with smart, intelligent, and inspiring people on my journey. I’ve learned that in order to hire and retain the best employees in senior positions, you have to give them a part in your startup.",
      img: "es2.svg",
    },
    {
      title: "Stock options can help attract and motivate top employees",
      para: "By giving employees part of your company with stock options, you will not only have an easy time attracting and retaining talent, but they will be even more motivated to make the company a success. Then, the value of their stock options goes up, too! It is a win-win.",
      img: "es3.svg",
    },
    {
      title: "What’s an ESOP?",
      para: "This type of program is called the Employee Stock Option Plan, or ESOP. The purpose of ESOP is to provide incentives to attract, retain, and reward employees who provide services to the company. It also works to encourage such people to contribute to the growth and profitability of the company.",
      img: "es4.svg",
    },
    {
      title: "Key employees",
      para: `There are some companies out there that offer stock options to all of their employees. In most cases, however, only those employees with significant responsibilities, or who play a significant role in the success of the company, are eligible to participate in ESOPs. VCs expect it
 At first, many founders were reluctant to offer stock options to their employees. That reduces our stock even more when we collect funds. But if you raise money from VCs, they will include ESOPs as part of the Seed cycle or series A. Not only VCs, but competing employees are already waiting for stock options as part of their job promise and
`,
      img: "es5.svg",
    },
    {
      title: "Lose a little equity, save a little money",
      para: "While ESOP reduces my equity, it has allowed me to hire better talent without raising direct wages. So, while in the long run I may not enjoy the millions when my startup is so successful, in the short term it has reduced the burning of my money. And, hey, my startup won't benefit millions without my skilled staff!",
      img: "es6.svg",
    },
    {
      title: "How to draft your initial ESOP plan",
      para: `So, how do ESOPs work? You will need to determine two basic conditions:
\t
• ESOP “pool” size: That is, the number of options that must be provided to employees and the number of options per.
• Provisioning terms: When options are actually given, what happens when an employee leaves, when they can use their shares, etc.

`,
      img: "es7.svg",
    },
    {
      title: "What does an ESOP plan look like? How big is the average pool?",
      para: "ESOP programs typically hold about 10% of your company's shares in employees. To put this in perspective, in the Seed round, founders often exchange 20-30% of their startups for funding. Whether you are growing up or not, it is good to have an ESOP program if you want to hire top talent.",
      img: "es8.svg",
    },
    {
      title: "ESOP questions",
      para: `Your ESOP policy will determine the number of stock options to be offered to employees, as well as the value of each option. It will also contain other paragraphs about options.

For example, can an employee be able to transfer options to a third party? What about options when an employee leaves a company? Can they be changed before that?
`,
      img: "es9.svg",
    },
    {
      title: "Vesting in intervals",
      para: `When an employee is rewarded equally, it does not mean that everything is given in advance, but in terms of a “investment” plan.

If I decide to give away my CTO 300,000 stock options, these can be given from time to time, such as 100,000 per year. And if that is 3% of my startup at an average of $ 5 million, that is $ 150,000. No less money!

However, if my startup costs $ 50 million, their share becomes $ 1.5 million! Now do you see the motive?
`,
      img: "es10.svg",
    },
    {
      title: "Cashing in",
      para: "Once granted, employees may form and sell them, or they may be obligated to hold on to them for a period of time. It all depends on your specific plan. Your ESOP system can also limit who to whom employees can sell stock, at least to the public.",
      img: "es11.svg",
    },
    {
      title: "Add all the rules you like",
      para: 'Your plan will probably have additional rules, such as limiting the transfer of stock options to third parties, or whether their equity gives employees a vote or not at shareholder meetings. Sometimes, they cannot be removed, or "converted" until the employee leaves the company. If an employee is fired, sometimes there is a fine, and the company will buy the shares at a lower price.',
      img: "es12.svg",
    },
    {
      title: "The sweet spot",
      para: "If an employee signs up for ESOP and learns that it will take them permanently to access their options, it may discourage them. On the other hand, as a founder, you want your key employees to stay. Find the perfect location for your ESOP plan. It should not be too flexible or too tight.",
      img: "es13.svg",
    },
    {
      title: "Keep it secret, keep it safe",
      para: "In most cases, the candidate needs to keep information about stock options confidential. After all, you do not want your rivals to take revenge on your superiors and steal from you!",
      img: "es14.svg",
    },
    {
      title: "Creating an ESOP committee",
      para: "Your first ESOP plan must be approved by your Board of Directors. This can only be you, if you are just getting started. In some areas, it should also be approved at a shareholders' meeting. At the beginning of the growth phase, the Board of Directors may establish an ESOP committee, which will be responsible for managing the program.",
      img: "es15.svg",
    },
    {
      title: "A little equity, a new CTO",
      para: `I’m glad I executed an ESOP policy. That was what attracted my new CTO, Maurice. Don’t tell anyone, but I gave him a 3% stake in the company!
I think the sense of ownership has really motivated him, because he’s worked wonders for our app. Since I hired him, we’ve seen a five-fold increase in our number of users 
`,
      img: "es15.svg",
    },
    {
      title: "Attracting bright, shiny expert employees",
      para: `Well, not all good employees will dramatically increase your income, which ultimately depends on a number of factors.

However, providing equity with the ESOP program is a necessary step as your startup grows, especially if you are raising money. And it is worthwhile to attract talented, talented, hard-working professionals in their fields. I have no regrets!
`,
      img: "es16.svg",
    },
  ];

  var totalLen = Object.keys(obj).length;
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>
      <div className={styles.knowledge}>
        <KnowledgeNavbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
            <div className={styles.content}>
            {obj.map((slide, index) => (
              <div
                key={index}
                style={{ display: currIndex === index ? "block" : "none" }}
              >
                <Slide
                  content={slide}
                  setCurrIndex={setCurrIndex}
                  currIndex={currIndex}
                  size={totalLen}
                />
              </div>
            ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default ESOP_Slides;
