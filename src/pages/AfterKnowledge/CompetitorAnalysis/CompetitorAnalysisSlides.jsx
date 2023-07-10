import React, { useEffect, useState } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
const CompetitorAnalysisSlides = () => {
  const obj = [
    {
      title: "INTRODUCTION",
      para: "The competitive analysis section of your market analysis is important. Knowing your competition is just as important as knowing your product and your customer. Market spaces tell you where to improve your product and internal weaknesses tell you that you are at risk of losing customers. Strong competition analysis is your way of showing that you know exactly where you stand among your fierce rivals and that you have a way to outdo them. Your competitive analysis should start with your SWOT Analysis Strengths, Opportunities, Weaknesses and Threats",
      img: "es1.svg",
    },
    {
      title: "Market Analysis",
      para: "Market analysis is the evaluation of any given market that includes both quality and volume research. Doing in-depth market analysis as an important part of your business plan ensures that you know everything you need to know about your market. Coincidentally, it assures any current or future investors that you know what you are doing, that you have done your homework and that you are the right entrepreneur to address the gap in this particular market. How to do",
      img: "es2.svg",
    },
    {
      title: "Top 10 Topics to cover in your Market Analysis",
      para: "Industry Description and Outlook : What does a start-up industry or a small business look like? Be sure to include size, trends, life cycle, and any expected growth. It is good to start with an industry definition and perspective because it gives all your market analysis a solid, comprehensive view to start with.",
      img: "es3.svg",
    },
    {
      title: "Demographics and segmentation",
      para: "If your startup is focused on more than one market segment, you need to define that in the segregation and segregation category. Start with demographics and explore other potential features. Other factors to consider include geographical segregation (where people live) and behavioral segregation (what specific things, appropriate actions taken by people).",
      img: "es4.svg",
    },
    {
      title: "Target Market",
      para: "If the definition of a sector is a broad idea to analyze the market you are starting from, then the target market is a microscope view. This is where you will decide and determine who owns your product. Explain. The target market description should include the size of the market and the specific person.",
      img: "es5.svg",
    },
    {
      title: "Total Addressable Market (TAM)",
      para: "The total addressable market (TAM) explains just how much potential for growth your startup has. Investors want to know you’re solving a painful problem in a giant market. They want to invest in good companies that can have huge outcomes to make up for all the bad investments they might have made. They’re thinking to themselves, “If this startup isn’t going after a big enough market, it won’t be able to create an exponential outcome for me.” TAM addresses the question “How many people could potentially use this product?”  It doesn’t mean how many people will use your product.",
      img: "es6.svg",
    },
    {
      title: "Market Demand",
      para: "Market demand is about determining the drivers for the need for your product? Why do potential customers need your product? What will make them spend their money on it? In this section, we will look at the current behavior of the market you are targeting and highlight how those behaviors prove that they will be interested in spending money on your product. The need for the market is not your competition analysis, but it helps to look at your competition to find out how people are behaving. It also helps because you can find gaps in unmet market needs that your company cannot afford.",
      img: "es7.svg",
    },
    {
      title: "Market Test Results",
      para: "If you have been able to do market tests or if you have been able to access the results of another market test you should write it in the market results test section. What conclusions did you reach after you did your tests or did your research? How did you reach those conclusions? Do you have experts who can support you?",
      img: "es8.svg",
    },
    {
      title: "Competition",
      para: "An important part of market analysis is deciding who is on the field. Who are your rivals? Describe their strengths and weaknesses. Once you have decided on those, you will be able to use them to determine your initial profit and marketing status.",
      img: "es9.svg",
    },
    {
      title: "How much will the customers pay?     ",
      para: "You need to be able to estimate how much customers will pay for your project. Imagine if you were an investor and you got a pitch of a product that was actually a reference pen and the founder was trying to say that people would agree to pay Rs 4,000 for it. You can dismiss that point, can't you? So, face the facts. Do your research. Check the market. See what people are already paying for the same products and pinpoint your price in the same range. You do not want to look down on your product but you do not want to be expensive.",
      img: "es10.svg",
    },
    {
      title: "Barriers to entry",
      para: "The barriers to getting into your market analysis are about what prevents a competitor from taking your position in the market and what makes you a better person and your company is the best company to do what you do. You need to be able to answer the question of what prevents a competitor from opening and taking most or all of your market away from you. You also need to be able to explain why you are successful in this market. What are some specific barriers to entry for your competitors? Consider such things as the technology needed, any rules in your market, the required investment, access to services, product visibility, and location, depending on your business and market.",
      img: "es11.svg",
    },
    {
      title: " Regulation ",
      para: "What guidelines are needed in your market? Explain what they are and the steps you will take to maintain them.",
      img: "es12.svg",
    },
    {
      title: "Few Resources For Conducting Market Analysis:   ",
      para: "The Census Bureau :  When you’re looking for demographic info, look no further than the US Census Bureau. You can find great information ranging from locations to age to race (to name just a few) on their site.",
      img: "es13.svg",
    },
    {
      title: "Online tools",
      para: "If you’re looking to gather information about your competition and your company is primarily online, check out SimilarWeb for extensive data. It’s a great resource for boosting up the credibility of your numbers.",
      img: "es14.svg",
    },
    {
      title: "Surveys   ",
      para: "When you’re trying to learn more about your market, why not ask them yourself? A well-designed survey can give you information about your users that you never would have expected. You can design and conduct surveys yourself, if that’s in your skill set, or you can hire a professional firm to conduct them for you.",
      img: "es15.svg",
    },
    {
      title: "Market Analysis Companies",
      para: "Another option is to hire a market analysis or market research company or consultant to help you complete this essential task. Startup founders often think that they have to do everything — and they try to save money by “wearing all the hats” but it’s fine to admit that you just don’t have the skills for certain things. If market analysis feels way to far out of your wheel house, do a little research and find a company that can take care of it for you.",
      img: "es16.svg",
    },
    {
      title: "Completive Pricing Strategy",
      para: "Specialize Further : There’s one thing a client will always privilege over low cost, and that is specialization. If a client has the choice between a cheap offer and an offer that is specifically geared towards them, they will choose the latter nine times out of 10. Find a way to tailor your product or service to sub-groups of customers. You can still hit the entire market by offering multiple tailored solutions for each sub-category.",
      img: "es17.svg",
    },
    {
      title: "Do Not Race to Bottom",
      para: "Make your stand on quality with your unique offerings. You may need to teach your customers why you deserve more money, but do not rush to beat another team for a price. Running downhill can damage your company for a long time. Hold yourself accountable by respecting your competitor's pricing strategy. People will respect you for it.",
      img: "es18.svg",
    },
    {
      title: "Learn About Your Market  ",
      para: "Because you believe that your competitor is of low quality, it may not be. The market determines quality, and if it likes a competitor, that is an opportunity for you to learn why. You will probably understand the marketing angle they use or the feature they use in a different way that attracts customers to them. Use your competition to learn more about your market, and move around accordingly.",
      img: "es18.svg",
    },
    {
      title: "Polish Your Brand",
      para: "You have invested in your products. Your staff is top notch. Also, you are really ready to enter the market. But remember: The most important client for your product itself. Create an engaging story that truly builds product balance within your customer base. Feel for them. They understand. Add value to them all the time. Never take them for granted. This is the story you want to share, and that should lead to flexible pricing strategies.",
      img: "es18.svg",
    },
    {
      title: "Have Depth and Wide Scope",
      para: "We do SEO with wider scope and great depth. You have to prove yourself better first to set a higher price than your competition. Then you can differentiate yourself by right marketing and messaging. If you are struggling to find a reason why you are better, you may need to revisit your business strategy and point out where you are offering the most value.",
      img: "es18.svg",
    },
    {
      title: "Provide a Better Customer experience   ",
      para: "At the end of the day, it's about bringing in a better first impression than your competitor. If someone hits your site for the first time, give them exactly what they need and eliminate any distractions. If your competition uses text and images, create a white board or animated video to explain the benefits of your product. Short story short, make it as easy as possible for your audience.",
      img: "es18.svg",
    },
  ];

  var totalLen = Object.keys(obj).length;
  const [currIndex, setCurrIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      {" "}
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
                  onClick={() => navigate("/competitoranalysis")}
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

export default CompetitorAnalysisSlides;
