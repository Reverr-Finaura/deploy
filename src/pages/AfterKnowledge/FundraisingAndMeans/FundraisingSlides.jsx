import React, { useState, useEffect } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const FundraisingSlides = () => {
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
      title: "Introduction",
      para: "Startup funding, or startup capital, is the amount of money needed to start a new business. It can come from a variety of sources and can be used for any purpose that helps startups transform their ideas into real businesses. \nUnlike the Car loan application, there is no standard for securing start-up funds. There is no form to fill out and wait for approval. It is driven much more by the founder's ability to convince others of what the vision is and to pool resources quite naturally while they do so.",
      img: "fam1.png",
    },
    {
      title: "Importance Of Funds",
      para: "Without startup funding, most startups die. The amount of funding required to make a startup profitable is usually beyond the capabilities of the founders, friends and family. A startup here means a company built for rapid growth. Fast-growing companies almost always have to burn capital to sustain growth until they reach profitability. Some startups succeed in raising their own funds, but this is an exception. Of course, there are many great companies that are not startups. Management of capital requirements for these companies is beyond the scope of this document.",
      img: "fam2.png",
    },
    {
      title: "Importance Of Funds",
      para: 'Cash not only allows startups to survive and grow, but is almost always a competitive advantage in all important aspects, such as key personnel recruitment, public relations, marketing and sales. So, most startups will almost certainly want to raise money. The good news is that there are many investors looking to put the right money into startups. The bad news is that "funding is brutal." The process of raising this money is often long, difficult, complex, and self-defeating. But this is the path that almost all companies and founders must go through. When is the right time to raise?',
      img: "fam2.png",
    },
    // {
    //   title: "Funding Terms",
    //   para: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
    //   img: "fam3.png",
    // },
    {
      title: "Funding Jargons?",
      para: "• Angel Investor - A wealthy private investor in startup companies. \n• Cap Valuation - The maximum effective valuation for an investor in a convertible note. \n• Convertible Note - This is a debt instrument that will convert into stock; usually preferred stock but sometimes common stock. \n• Common Stock - Capital stock typically issued to founders and employees, having the fewest, or no, rights, privileges and preferences.",
      img: "fam4.png",
    },
    {
      title: "Funding Jargons?",
      para: "• Dilution - The percentage of an ownership share is decreased via the issuance of new shares. \n• Discount - A percentage discount from the pre-money valuation to give safe or note holders an effectively lower price. \n• Equity Round - A financing round in which the investor purchases equity in the company. \n• Fully Diluted Shares - The total number of issued and outstanding shares of capital stock in the company, including outstanding warrants, option grants and other convertible securities.",
      img: "fam4.png",
    },
    {
      title: "Funding Jargons?",
      para: "• IPO - Initial Public Offering - the first sale of stock by a private company to the public. \n• Lead Investor - Usually the first and largest investor in a round who brings others into the round. \n• Liquidation Preference - A legal provision in a company’s charter that allows stockholders with preferred stock to get their money out of a company before the holders of common stock in the event of an exit. \n• Maturity Date - The date at which a promissory note becomes due",
      img: "fam4.png",
    },
    {
      title: "Funding Jargons?",
      para: "• Equity Incentive Plan / Option Pool - The shares allocated and set aside for grants to employees and consultants. \n• Preferred Stock - Capital stock issued in a company that have specific rights, privileges and preferences compared to the common stock. Convertible into common stock, either automatically or at the option of the preferred stockholder. \n• Pre-money Valuation - The value of a company prior to when investor money is added. \n• Pro-rata rights - Contractual rights that allow the holder to maintain their percentage ownership in subsequent financing rounds.",
      img: "fam4.png",
    },
    {
      title: "Funding Jargons?",
      para: "• Protective Provisions - Provisions in a company’s charter that give exclusive voting rights to holders of preferred stock. For example, the approval of these stockholders, voting separately from other stockholders, may be required for an acquisition. \n• TAM - Total Available Market. In pitches, this is the estimated total revenue available for the product(s) you are selling. \n• Venture Capitalist - A professional investor in companies, investing limited partners’ funds.",
      img: "fam4.png",
    },
    {
      title: "Funding Types",
      para: "Before teaching you how to raise capital, you must first identify the type of capital you are seeking. Understanding all the pros and cons of different capital sources can be confusing, and most founders don't really know why one capital source is better than another. We will change everything for you. You are about to learn everything you need to know about the various forms of capital. No, it is not as exciting as watching a Marvel movie, but it costs more.",
      img: "fam5.png",
    },
    {
      title: "Bootstraping",
      para: "Bootstrapping is a process of starting a company with only personal savings, including borrowed or invested funds from family and friends, as well as income from initial revenue. bootstrapped businesses do not rely on traditional financing methods, such as the support of investors, crowdfunding or bank loans.",
      img: "fam6.png",
    },
    {
      title: "Equity",
      para: "Equity financing takes place when an investor invests funds in a startup, with a motive of earning back a multiplied amount of the investment made in the form of returns. In case of equity the startup doesn’t need to pay back the fund invested to the investor but instead has to part with a part of company shares and give it to the investor. The company share is called equity, thus naming this funding process equity financing.",
      img: "fam7.png",
    },
    {
      title: "Debt",
      para: "Debt funding is the process in which an investor lends money to an entrepreneur for their business over a certain period at a given rate of interest. In exchange, the company sells the investors bonds that act as a certificate for the loan. Here, the startup has to pay the debt fund back on a pre-scheduled date along with the interest payment.",
      img: "fam8.png",
    },
    {
      title: "Funding Stages",
      para: "Startups raise money in a series of stages based on how much growth and evolution they have had. \nThink of it like a student going to school. There’s pre-primary, primary, secondary, senior secondary, college. Each of those stages represents an evolution of the student, and there are a number of teachers who has expertise in helping students at each stage.",
      img: "fam9.png",
    },
    {
      title: "Funding Stages",
      para: "Startups are the same way. If you’re just getting started (the Seed Stage) you’ll be talking to different investors than if you have already raised money previously and are in the Expansion stage. These aren’t strict definitions, mind you, but just general guidelines a company goes through as they grow.",
      img: "fam9.png",
    },
    {
      title:
        "Seed Stage (less than Rs. 1cr.) Friends and Family, Angel Investors, Incubators",
      para: "Key Requirements: \n• Business Plan \n• Minimum Viable Product \n• Some \n• Customers Founding Team",
      img: "fam10.png",
    },
    {
      title:
        "Early Stage (less than Rs. 10Cr.) Angel Investors, Venture Capital",
      para: "Early-stage companies have usually achieved at least MVP (minimum viable product), meaning their product or service is being provided to at least a small test subset of customers, and is meeting with customer approval. Early-stage companies are also often generating enough revenue to be worth talking about, although that varies from company to company.",
      img: "fam11.png",
    },
    {
      title:
        "Early Stage (less than Rs. 10Cr.) Angel Investors, Venture Capital",
      para: "Key Requirements: \n• Functional Product \n• Paying Customers \n• Early Key Team Members \n• Early Growth",
      img: "fam11.png",
    },
    {
      title:
        "Expansion Stage (greater than Rs. 10Cr.) Venture Capital, Private Equity",
      para: "By the time you are searching for Expansion Stage capital amongst venture capital and private equity investors, it’s clear that your business has major upside potential. You may not have strong financials yet, but you may have just developed the next Amazon. The investors at this stage are looking for companies that have proven they have found “lightning in a bottle” and just need a bit of a turbo boost to really accelerate to next level.",
      img: "fam12.png",
    },
    {
      title:
        "Expansion Stage (greater than Rs. 10Cr.) Venture Capital, Private Equity",
      para: "Key Requirements: \n• Significant Revenue (Rs.5 Cr.-Rs.50 Cr.) \n• Huge Market Potential (greater than Rs.100Cr.) \n• Strong Market Leadership",
      img: "fam12.png",
    },
    {
      title:
        "Late Stage (less than Rs. 50Cr.) Private Equity, Investment Banks",
      para: "Once a company has built a product that’s become a darling in the market, that’s when the Private Equity and Investment Bankers show up. These folks aren’t looking for a lot of risk they let the angel investors and venture capital firms deal with that. They are looking to put massive sums of money into companies that are already winning to allow them to secure their leadership position. If you make it to this stage you’ve won! \nKey Requirements: \n• Significant Revenue (Rs. 50Cr+)\n• Market Leadership Position",
      img: "fam13.png",
    },
    {
      title: "Investor Types",
      para: "Whether you need to expand your team, pay for product development, or just need to be self-sufficient, at some point you may need to look outside for capital input. Fortunately, there are several ways to find funds. Banking, federal, or state governments may be a good option for some companies, but this guide focuses on the different types of investors you can bring when you run out of these options: friends and family, angel investors, and venture capitalists.",
      img: "fam14.png",
    },
    {
      title: "Friends and Family (less than Rs. 1Cr.)",
      para: "• While a bank or independent investor might be hesitant to risk money on your venture, your friends and family might be more willing to take a chance on your vision. \n• With individual rounds typically raising around Rs.2,50,000 to Rs5,00,000, seeking investments from your personal network be an ideal way to raise seed money to get your company off the ground. These close circles generally consist of individuals most likely to feel a strong affinity for your brand -or, simply, to you -motivated more by loyalty and support than a return on investment alone.",
      img: "fam15.png",
    },
    {
      title: "Friends and Family (less than Rs. 1Cr.)",
      para: "• Securing capital from friends and family can also act as an effective stepping stone toward future investment deals, as it demonstrates to potential future backers that you’ve validated your business plan among those closest to you. \n• However, mixing business with family is notoriously risky, and for good reason. To that end, it is of the utmost importance that all investments are thoroughly documented. You should require that they sign a document acknowledging the risk and clarifying that they may not get their money back.",
      img: "fam15.png",
    },
    {
      title: "Friends and Family (less than Rs. 1Cr.)",
      para: "• Before accepting any money, do some soul-searching to be sure that your ties are strong enough to withstand any worst-case-scenarios. Have each party sign a promissory note spelling out the repayment terms or, if you’re partnering with a friend or family member, sign a partnership agreement.",
      img: "fam15.png",
    },
    {
      title: "Angel Investors (Rs 1Cr.-Rs 2.5Cr.)",
      para: "An angel is a high-net-worth individual who invests directly into genuine entrepreneurial businesses. This capital usually allows the startup to accomplish some of the early milestones like building out an MVP, generating revenue, etc.",
      img: "fam16.png",
    },
    {
      title: "Angel Investors (Rs 1Cr.-Rs 2.5Cr.)",
      para: "Quick facts about Angel Investments: \nThere are over 6,000 active angel investors in the India alone Median funding round size for angel investments: $1.5 million While certainly savvy businesspeople, angel investors are also less likely than venture capitalists to get caught up in bottom lines and profit margins, and might not be as apprehensive about the numerous unknowns that often come attached to seed-stage investments.",
      img: "fam16.png",
    },
    {
      title: "Angel Investors (Rs 1Cr.-Rs 2.5Cr.)",
      para: "Angels can be an ideal fit for startups because their personal interest in the healthy growth of the business and their own litany of past successes and failures often prompt them to act as mentor and coach to their portfolio companies. Many angel investors also belong to networks of other angel investors. These networks, or “Angel Groups,” pool their money and invest as a group in the deals they like the best. These networks are also beneficial to startups because it can make it much easier to raise larger amounts of capital.",
      img: "fam16.png",
    },
    {
      title: "Venture Capital Firms (Rs 2Cr. – Rs 50Cr.)",
      para: "Of the four investor types, Venture Capital firms write the biggest checks with an average investment size of $2.6MM to seed stage companies. \nVCs are in the business of reviewing, assessing, and investing in new and emerging businesses. As a result, they look at a very high volume of deals, and on average only invest in 1 out of every 100 deals they consider compared to angels, who invest in 1 out of every 10 deals. Furthermore, VCs conduct significantly more due diligence than angel investors, spending an average of 5 months vetting each investment opportunity.",
      img: "fam17.png",
    },
    {
      title: "Venture Capital Firms (Rs 2Cr. – Rs 50Cr.)",
      para: "Venture capital is consistently an active, rather than passive, form of financing. These investors seek to add value, in addition to capital, to the companies in which they invest, both to help your company grow and to achieve a greater ROI. This means virtually all VCs will want a seat on the Board of Directors. \nAlthough most VC firms will have a website, or other means of sending in cold call solicitations, it is always best to have a referral to a VC by a mutual acquaintance.",
      img: "fam17.png",
    },
    {
      title: "Venture Capital Firms (Rs 2Cr. – Rs 50Cr.)",
      para: "This is one of the many benefits of equity crowdfunding: by asking your existing supporters to share you fundraise with their own networks, you open yourself up to the possibility of making connections that you may have previously thought were impossible.",
      img: "fam17.png",
    },
    {
      title: "Private Equity (Rs 5Cr. – Rs. 100Cr.+)",
      para: "Private Equity (and investment banks) are designed for relatively mature companies that are beyond the “will this work?” phase and are onto the “how big can this possibly be?” phase. They operate massive funds that are more focused on smaller multiples than angel investors or venture capitalists, but more guaranteed returns because there is less risk involved in funding an already successful company.",
      img: "fam17.png",
    },
  ];

  var totalLen = Object.keys(obj).length;
  const [currIndex, setCurrIndex] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.knowledge}>
        <div className={styles.body}>
          {obj.map((slide, index) => (
            <div
              key={index}
              style={{ display: currIndex === index ? "block" : "none" }}
              className={styles.content}
            >
              <div className={styles.back_Btn}>
                <button
                  className={styles.knowledge_Btn}
                  onClick={() => navigate("/fundraising-and-means")}
                >
                  {" "}
                  ⬅ Back
                </button>
              </div>
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
    </>
  );
};

export default FundraisingSlides;
