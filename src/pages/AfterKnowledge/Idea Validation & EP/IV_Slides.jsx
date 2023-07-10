import React, { useEffect, useState } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
const IV_Slides = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const research_plan = [
    {
      title: "INTRODUCTION",
      para: "Hello folks! Looking forward to establishing your own start-up but don’t know how to? Obviously yes…. Knowing all about it must be your main concern now that you're here. Well, don’t worry because that’s our work now as we’re here to guide you every step of your way!! Where business is involved, busy-ness in its real sense is also involved!!! And so is the inquisitiveness to dream and turn your business vision into reality.",
      img: "Rp1.svg",
    },
    {
      title: "INTRODUCTION",
      para: "I’m sure now you can easily guess that the first thing to give a structure to your business outlook starts with the ideation process. A striking solution you need to come up with to solve the problem you’re targeting. But wait, the ideation process is not over yet. Why? The reason founders end up giving it all up is that they fail to pause, take a step back, and review the key indicators that would tell them whether their specific version of the idea is worth doing. That’s when the feasibility test of your idea gets a green signal in your to-do-list.",
      img: "Rp1.svg",
    },
    {
      title: "How is it done?",
      para: "Step 1- Create a research plan- Aaahhh! This seems tedious but yes, the research plan acts as a bulletproof shield against any perceived threats. It helps you to understand the problem you want to solve, thereby looking for any feasible solution,if any. \nStep 2- Expert Opinion- Getting an expert recommendation/approval will help bring clarity and a sense of purpose to your potential business idea.",
      img: "Rp1.svg",
    },
    {
      title: "How is it done?",
      para: "Step 3- Customer engagement- As a procedure for testing the feasibility of an idea, there’s no better way to get validation than gaining insights from the potential customer base. \nStep 4 - Crafting elevator pitch- Hurry up! Time to tie the loose ends together. Designing a comprehensive elevator pitch helps you bring about all the critical pieces of information you would want to deliver to your end consumer.",
      img: "Rp1.svg",
    },
    {
      title: "RESEARCH PLAN",
      para: "No wonder everything eventually boils down to how good your research outlay is. Yes, it becomes imperative to run through the checks and validation checklists as part of your Research Plan to make sure you understand the market you're venturing.\nStep 1 Looking for research goals- To clear off the blurry picture of your research objective, focus on the questions that’s pulling your business idea down.",
      img: "Rp1.svg",
    },
    {
      title: "RESEARCH PLAN",
      para: "Step 2 Tap reliable research sources- Search for the research sources that are suitable enough to give a proper understanding of your research plan. \nStep 3 Evaluate your findings- Evaluating the checklist finding helps you mark the critical point that can add value to your research set.",
      img: "Rp1.svg",
    },
    {
      title:
        "What is the problem that my startup or idea solves, and how painful is it?",
      para: "Target the issue that you think requires sincere attention and address that and fulfill the need. Ask yourself this first question as a litmus test for your startup idea: “What problem is my startup solving, and how critical is that problem?”",
      img: "Rp2.svg",
    },
    {
      title: "What is the extent of the problem and who is affected?",
      para: "Let’s get this straight! To answer this question, you really need to know who your target base is and to what extent they are getting affected. Basically, you are essentially figuring out the market size for your solution. First thing first, quickly access your Total Addressable Market (TAM) by defining the industry you are operating in. Give yourself a pat on your back as you’ve determined that you have a market worth pursuing, it’s time to look out who you’ll be competing with.",
      img: "Rp3.svg",
    },
    {
      title:
        "What are the strengths and weaknesses of those who are already working on solving the problem?",
      para: "Now that you’ve reached this stage, I’m sure that you know what to do next? Yes, you got it right. SWOT ANALYSIS! SWOT Analysis can serve as an effective tool to have a quick check on your competitors’ position, the other they’ve not entered into taking advantage of which you can exploit those opportunities better, the recurring threats that you should avoid and what not!",
      img: "Rp3.svg",
    },
    {
      title: "Step 2: Search for reliable sources",
      para: "Having a comprehensive insight of what you’re entering widens the ambit of your business outlook and helps you gain a better perspective of the industry on whole. Industry specific searches- Doing some extra work is never a harm! Keep an eye on the sources where your competitors might be selling similar products, such as marketplaces, crowdfunding sites, and trade associations.",
      img: "Rp4.svg",
    },
    {
      title: "Funded Companies",
      para: "After you've figured out who some of the competition is, you'll have to measure them up and identify which of your competitors may be more qualified, which may lead to the discovery of tangential competitors.",
      img: "Rp4.svg",
    },
    {
      title: "Can you beat the competition?",
      para: "Creating an insightful competitive report would enable you to properly stack up your potential features with what’s currently there in the market. Those striking features can enable your business to reach new heights.",
      img: "Rp5.svg",
    },
    {
      title: "Expert Validation",
      para: "Yes, you heard it right! Expert opinion can work wonders in giving your business vision a clarity. The big task is to find the right experts and present them with very specific questions about your idea. After that, you also need to be able to assess the feedback you've gotten objectively, as per your suitability.\nThere are 3 steps involved in the process",
      img: "Rp6.svg",
    },
    {
      title: "Expert Selection",
      para: "We'll figure out which areas of your proposal need expert advice and then select the best experts to comment on those specific issues. Key Questions Asking and seeking opinion on critical questions can allay your doubts regarding the risks you foresee that might hinder your business progress. Results Analysis Comparing the results can help us recognize any patterns we can infer in order to restructure our business model.",
      img: "Rp6.svg",
    },
    {
      title: "Step 1: Expert Selection",
      para: "The experts we identify are typically: \nSubject Matter Experts. Subject matter experts can provide us with a pragmatic view as to how challenging each aspect of our business model can be. \nExpert Founders. A smooth conversation with an expert Founder can also aid us in setting the criticality aspect right that can accelerate your plan dramatically. \nInvestors. Investors can give you useful feedback on how big they envision your market arena. So in that sense, you don’t need to be raising capital to get good feedback from investors.",
      img: "Rp6.svg",
    },
    {
      title: "Step 2: Key Questions",
      para: "The key questions model vary based on your particular concept or precisely on the basis of following questions: Is this feasible? Feasibility test sets everything right by telling the likelihood of any major hurdles acting as a threat toward your growing business.",
      img: "Rp6.svg",
    },
    {
      title: "Step 2: Key Questions",
      para: "What pitfalls should we avoid? Experts can tell you what shortcomings to avoid altogether. We must list and address such problems these experts may identify and build a safety plan in order to avoid such barriers. \nWhat are we not asking? A Questionnaire should be formulated and tailored with the intent of getting actionable feedback from the expert in a detailed and insightful manner.",
      img: "Rp6.svg",
    },
    {
      title: "Step 3: Analysis of Results",
      para: "Mind you, the experts can guide you in getting your answers, not the final decision as to whether we should give a green signal to this idea or not.\n1. Did we hit a hard stop or reset? Sometimes the interviews will yield an answer that can plunge you to the state of dropping that idea altogether. In this case we may have to get back to square one- to the research phase. \n2.What was the most consistent opportunity? After seeking expert opinion, you can explore which aspect of your new product created the most obvious benefit or opportunity? \n3.Is it time to talk to customers? If we are of the view that we passed our feasibility test , it’s time to talk to customers directly.",
      img: "Rp6.svg",
    },
    {
      title: "Weighing Expert Interviews",
      para: "Weighing expert recommendation with other sources can definitely be an eye-opener as it may enable us to expand the ambit of our expert validation exercise to some other sources as well.",
      img: "Rp7.svg",
    },
    {
      title: "Getting a Second Opinion",
      para: "Second opinions are always welcome, no doubt about that. For example, if a single investor we spoke to says “it will never get funded” we may want to seek validation from 1 or 2 other investors to make sure it’s not partial.",
      img: "Rp8.svg",
    },
    {
      title: "CUSTOMER DISCOVERY",
      para: "Customer discovery is an extensive approach to make sure that the problem aligns with the solution you’ve identified with what customers actually want at a price they are willing and able to pay. \nStep 1: Create Customer Archetypes \nIt basically spells out an archetype featuring all the customer profiles representing different use cases of the product like what would attract people to buy your product, what problem is your product capable of solving, what are the different ways your product can be used by customers. Focussing on simple yet obvious customer attributes that clearly represent your audience would add value to your business plan.",
      img: "Rp9.svg",
    },
    {
      title: "STEP 2: CHOOSE YOUR VALIDATION METHOD",
      para: "Getting validation from the potential customers adds lucidity and perspicacity to your business idea. \n(a) LANDING PAGE- Landing page is the star or let’s just say the main highlight of your hours and hours of hard work. Under the landing page, people would have to input their name and email to see if they are interested in what you offer. Pre-selling your solution is evident to know if people are willing to pay for what you have.",
      img: "Rp9.svg",
    },
    {
      title: "STEP 2: CHOOSE YOUR VALIDATION METHOD",
      para: "(b) Digital Advertising- Advertising via social media can be a real game-changer to explore the interest area of your target customer base. This gives an insight of business metrics like- Cost incurred to acquire a potential user, word of mouth with which you can resonate with your target audience. \n(c) Survey- Surveys can be conducted online capturing various channels. Or alternatively, in-person enumeration can be quite effective and you could potentially conduct those one-on-one sessions.",
      img: "Rp9.svg",
    },
    {
      title: "Step 3: Conduct Customer Validation",
      para: "3 steps to seeking customer validation involves - the Problem, Solution, and Revenue Model.",
      img: "Rp10.svg",
    },
    {
      title: "Problem",
      para: "Every new business concept begins with a problem that needs to be solved. Difference lies in the perspective of how you want to solve that problem and how customers would want to get that problem resolved. ",
      img: "Rp10.svg",
    },
    {
      title: "Solution",
      para: "The solution you provide should be in synchronization with where the problem is mostly targeted at. Going through the various features of your solution must align with where you’re focusing your product efforts to where customers need attention should have the greatest demand.",
      img: "Rp11.svg",
    },
    {
      title: "Revenue Mode",
      para: "The revenue model questions checks for price sensitivity, frequency and flexibility or complexity of product, if any. \nELEVATOR PITCH \nElevator Pitch is something that can give “Do or die!” A real meaning. It can either have a long lasting impression or can go totally ignored. It’s a verbatim, appealing, interactive sales pitch that you can deliver to your end customers to have them grabbing the opportunity to try your products/services! A well-crafted Elevator Pitch can open all kinds of doors with potential partners, customers, future employees, and investors.",
      img: "Rp12.svg",
    },
    {
      title: "Revenue Mode",
      para: "Do you need one? \nIf you’re an entrepreneur, business owner, an aspiring one—then “Yes, you are in need of an elevator pitch!” A 30-second elevator pitch helps you to sell yourself, your goals, and your big ideas to the end customers.",
      img: "Rp12.svg",
    },
    {
      title: "Where and when to use your elevator speech?",
      para: "You can use your elevator pitch to spur interest in your customer’s mind about your business in lot many situations: \n• When you meet a potential client or business connection. \n• On your website’s homepage. \n• At networking events. \n• At social gatherings. \n• To help you secure funding or investment.",
      img: "Rp12.svg",
    },
    {
      title: "Where and when to use your elevator speech?",
      para: "Basically, anytime a potential lead or new relationship appears. \nOther modes to use your elevator pitch: \n• In your LinkedIn, Facebook, and other social bios. \n• When pitching new clients by email. \n• In your company’s brand guidelines. \n• Every Thanksgiving when Aunt Urma asks when you’ll be getting a job.",
      img: "Rp12.svg",
    },
    {
      title: "How to write an elevator pitch?",
      para: "The bigger question is what information you should include? How long should an elevator pitch be? There’s more than one way to develop a persuasive and an interactive pitch. To get started, just answer a few questions about your business: \n• Who are you? \n• What do you do? \n• What problem do your customers face? \n• How do you help them solve it? \n• Why is your solution better than those offered by competitors?",
      img: "Rp13.svg",
    },
    {
      title: "How to write an elevator pitch?",
      para: "Step 1: Nail The Problem \n• Founders at times miss out on giving due importance to the bottlenecks and the Solution. A finely tailored problem adds the value of your solution and can put your plan running in different directions. \nStep 2: Explain The Solution \n• Once you've articulated the Problem, the next step is to enunciate how this problem can be fixed. \n• Founders usually presume that their customer base already has a need for their product. \n• Take time to figure out the actual need and potential reach of your product.",
      img: "Rp13.svg",
    },
    {
      title: "How to write an elevator pitch?",
      para: "Step 3: Identify the TAM \n• The Market Size spells out how much potential for growth your startup has. Investors want to know how better you're able to target the problem in the given market. \nThe Three Pies of Market Size \nYour market size is typically segmented into three pies- \nA. TOTAL ADDRESSABLE MARKET- This encapsulates the market share you feel your product/service has the capacity to reach.",
      img: "Rp13.svg",
    },
    {
      title: "How to write an elevator pitch?",
      para: "\nB. SERVED ADDRESSABLE MARKET- Customize the entire TAM by how many of those potential customers you can reasonably convert into actual ones. Remember you can only serve as many customers as your sales and marketing channels will require you to. \nC. TARGET MARKET- Time to put your thinking caps on! This is where you need to be clear about your target market to actually put the key to your business vision.",
      img: "Rp13.svg",
    },
    {
      title: "Tips on how to deliver a confident elevator pitch",
      para: "1. Get them hooked- Once you’ve introduced yourself, you’ve got to keep the audience hooked by stressing on the main highlights/features which would compel them to use your product/service over the others. \n2. Avoid Jargons- Delivering a confident elevator pinch doesn’t mean you should make it too complex so that the end users are not able to get it. Better is to keep it short, precise and engaging but not monotonous. \n3. Using comparison- Comparing it to something that already exists can help you meet your set benchmark.",
      img: "Rp14.svg",
    },
    {
      title: "Tips on how to deliver a confident elevator pitch",
      para: "4. Add emotional touch- Adding an emotional touch can help you pull your audience towards your business concept. So yes, be a tad dramatic and you’re done!! \n5. End by asking an open question- Making your pitch persuasive is the key. This can be done by employing the use of conversation instead of just saying everything in one go. \n6. Close with a call-to-action. A vivid call-to-action (CTA) lets your audience get a sneak-peak of your startup. Think about your end goal. Do answer most sought after questions like- Do you want the chance to pitch for investment, make a new business connection or interview for your dream job?",
      img: "Rp14.svg",
    },
  ];

  var totalLen = Object.keys(research_plan).length;
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.knowledge}>
        <div className={styles.body}>
          {research_plan.map((slide, index) => (
            <div
              key={index}
              style={{ display: currIndex === index ? "block" : "none" }}
              className={styles.content}
            >
              <div className={styles.back_Btn}>
                <button
                  className={styles.knowledge_Btn}
                  onClick={() => navigate("/idea-validation")}
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

export default IV_Slides;
