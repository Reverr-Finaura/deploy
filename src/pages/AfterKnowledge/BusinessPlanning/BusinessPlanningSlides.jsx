import React, { useEffect, useState } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";
import styles from "./Knowledge.module.css";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import { useNavigate } from "react-router-dom";
const BusinessPlanningSlides = () => {
  // eslint-disable-next-line no-sparse-arrays
  const obj = [
    {
      title: "What is Business Planning.",
      para: "An idea without a plan is just an idea You might have already heard about the importance of a well-constructed business plan.But you might not know what exactly a business plan is, what are it’s key elements, what things you should include and make clear,well-written plan that can attract people towards your business and get them involved. We are here to help",
      img: "bp1.png",
    },
    {
      title: "What is actually a business plan?",
      para: "Business Plan is a document that helps Investors and readers understand your business goals and the steps you’re taking to reach them. An “actionable plan” requires a bit of work. The best business plans are not just informative; they also excite apersuadereaders about taking part (and benefiting from it) in helping your business succeed.",
      img: "bp2.png",
    },
    {
      title: "How do you do this?",
      para: "You do this by answering the major, fundamental questions that your readers will have about your business going forward. These questions fall into two key categories: the WHY questions and the HOW questions. The WHY Questions: Why this?  Why now? Why you? ",
      img: "bp3.png",
    },
    {
      title: "How do you do this?",
      para: "he WHY Questions: Why this? Why now? Why you? The HOW Questions: How will you make money? How will you get customers? How will you grow your business? And while answering these questions your business plan should also highlight  How your company has the right product and the right market. ",
      img: "bp4.png",
    },
    {
      title: "Why do you need a business Plan?",
      para: "1. To Develop your strategies Writing down your goals and analysing market helps you discover new trends in the industry that could help you develop your strategies.",
      img: "bp5.png",
    },
    {
      title: "2. To guide you",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "bp6.png",
    },
    {
      title: "3. To attract Investors ",
      para: "A potential investor wants proof that their time and money will be repaid when they invest in your business. Your business plan helps you make that case.",
      img: "bp7.png",
    },
    {
      title: "4. To obtain a business loan",
      para: "If you’re trying to seek a loan for your enterprise, you can strengthen your loan application using your business plan.",
      img: "bp8.png",
    },
    {
      title: "5. To form strategic Partnerships",
      para: "If at a point of time, you decide to sell your business, your business plan can prove to be helpful for you and the buyer to reach at a best possible price for the sale of your business.",
      img: "bp9.png",
    },
    {
      title: "Who Needs a Business Plan? ",
      para: " 1. Business Seeking funding : If you aim to raise money to support or grow your business. Having a business plan is a necessity. Having a business plan increases the likelihood of obtaining funding.  Established Companies Managing Their Businesses Unlike startups, existing businesses make extensive use of business plans with a view to directing business and accelerating and tracking growth. Established businesses also use business plans to convince consumers to find a company or bring potential partners or employees to the herd. ",
      img: "bp10.png",
    },
    {
      title: "How to choose Good Business Plan",
      para: "Depending on your stage of growth and what you intend to use, business plans can come in a number of different forms.Let's take a quick look at a few of the most common examples.",
      img: "es11.png",
    },
    {
      title: "1. General Business Plan",
      para: "If your goal is to convince investors to financially support your business, a general business plan - or 'external business plan', as it is sometimes called - is the most frequently requested response you will need. General business plans are very well set up and focus on showing investors how your vision translates into greater prof compared to the domestic business. For our purposes, we will focus our discussion firmly on the general business plan this article.",
      img: "bp12.png",
    },
    {
      title: " One-Page Business Plan ",
      para: "A one-page business plan is actually an executive summary - in other words, the TL; DR version of your business plan where you break down every major part of your business plan into a phase or two, giving investors the opportunity to step in. - see key points. One pager is a great help to create early conversations with a potential investor. Investors are incredibly busy, so one pager is a great way to go when you are trying to arouse interest and set up a forum for in-depth discussions about your business after your initial contact",
      img: "bp13.png",
    },
    {
      title: "3. Internal Business Plan",
      para: "As its name implies, internal business plans often reside within the office and are designed to serve as a management tool to help business owners plan and meet goals. Internal business plans are less concerned with covering issues such as overall team vision or problem solving and are more focused on business strategies, which is the next milestone, budget, and forecast. This type of business plan is more commonly used by companies that are more established than startups.",
      img: "bp14.png",
    },
    {
      title: "Key Components of a Business Plan ",
      para: "A. Executive Summary : Your Executive Summary is a brief overview of your overall business plan. The goal is to break down each keyword into a sentence or two in order to convey the vision of your business and prepare the reader for future content. ",
      img: "bp15.png",
    },
    {
      title: "B. Company Description",
      para: "The Company Profile will serve as a “great vision statement” that introduces your company, what it does, and why it is important. It conveys to your readers the direction your company is going, and the scope of the business you are building.",
      img: "bp16.png",
    },
    {
      title: "C. Problem",
      para: "Every good product or service starts with a clear and straightforward problem that you are determined to solve. What problems do your customers face that your product / service solves? If you do not identify the problem that you are solving properly, then the solution (and your entire system) will fall into disrepair.",
      img: "bp17.png",
    },
    {
      title: "D. Solution",
      para: "Once you have identified a problem that you intend to solve, highlight how your product / service connects right back to that problem and resolve it effectively.",
      img: "bp18.png",
    },
    {
      title: "E. Market Size",
      para: "What is the size of your addressable market? Is it growing? How much? Is the market big enough for potential investors to enjoy? Has there been a significant exit from similar companies in your space?",
      img: "bp19.png",
    },
    {
      title: "F. Product (How It Works)",
      para: "Provide readers with an overview of your company's products and services, their key features, with special emphasis on what makes them different from the solutions available in the market.",
      img: "bp20.png",
    },
    {
      title: "G. Revenue Model",
      para: "How does your company (or will) make money? How do you set prices for your product / service? How does your price compare to similar products on the market? How much is your revenue projection for the next 5 years?",
      img: "bp21.png",
    },
    {
      title: "H. Operating Model",
      para: "While your Revenue Model outlines how you will make money, your Operating Model is all about smart ways to manage costs and work efficiently to earn it.",
      img: "bp22.png",
    },
    {
      title: "I. Competitive Analysis",
      para: "Identify other similar companies operating in your same area: What is your strength, and how do you plan to utilize it? What are their weaknesses and how do they translate into the profitability of your company?",
      img: "bp23.png",
    },
    {
      title: "J. Customer Description",
      para: "Describe your customer to help readers gain a clearer understanding of who might use and purchase your product: What are their personas? What are their Demographics? What motivates them to take action (buy)?",
      img: "es18.svg",
    },
    {
      title: "K. Customer Acquisition",
      para: "What strategies will you use to really get your customers involved? What acquisition channels will you explore (direct marketing, paid ads, SEO, social media, etc.)? What are the cost estimates for each channel?",
      img: "es18.svg",
    },
    {
      title: "L. Traction",
      para: "List any achievements that show readers that your company is moving: Where are you in the product development process?Have you established a production or manufacturing partner? Have you found a significant Partner? Do you have the intellectual property rights for ideas about your company?",
      img: "es18.svg",
    },
    {
      title: "M. Management Team ",
      para: "Introduce your team and how you will work together to make the business live. The bio of each group member should include: Name of group member Their title and position in the company Their technical background Any special skills they have developed as a result of their previous experience What makes them unique is driving success in your company ",
      img: "es18.svg",
    },
    {
      title: "N. Funding",
      para: "How much money do you need to complete your next milestone? What are your goals (in other words, what will investors get if they exchange their investments)? How will you spend your money?",
      img: "es18.svg",
    },
    {
      title: "O. Finance",
      para: "Decide what ideas you need to focus on to make your business successful. Common guesses include: Retail price per product Cost of Goods Sold Acqu customer",
      img: "es18.svg",
    },
    {
      title: "How Long Should Your Business Plan Be?",
      para: "When most people think about a business plan, the first thing that usually comes to mind is an incredibly dense, 50-plus-page manifesto that’s as hard to write as it is to read. There’s a reason why people think this. It’s because for a long time, that’s pretty much what a business plan was. Thankfully for the writer and the reader, that’s no longer the case. The modern business plan as we know it today is far more concise — a mere fraction of the length of its long-winded predecessor.",
      img: "es18.svg",
    },
    {
      title: " A good rule of thumb is shooting for around 15 pages.",
      para: "This should give you more than enough room to provide color to each of the required sections of your business plan while also leaving some room for visual elements to break up the copy and make your business plan much more digestible (and aesthetically engaging) for readers If you find yourself exceeding 20 pages, there’s probably opportunities where you can go back through your plan and eliminate redundant or superfluous information",
      img: "es18.svg",
    },
    {
      title: " How to Approach Writing a Business Plan",
      para: " Here are some useful tips to help you get organized and give you the confidence to tackle this head on.",
      img: "es18.svg",
    },
    {
      title: " A. Nail The Research First",
      para: "Going into this knowing everything there possibly is to know about the market you will be competing in, who your audience is, and how you will make money will always be the first step in the business planning process. Conducting the necessary fact gathering will also help you prove or disprove any assumptions you have about your market fit — either validating what you initially thought, or telling you it’s time to go back to the drawing board. ",
      img: "es18.svg",
    },
    {
      title: "B. Create a Business Plan Outline",
      para: "We talked before about the key components that you’ll want to include in your business plan. Instead of jumping in willy-nilly, draft a very basic outline of each of the sections that you will touch on in your business plan. Not only will this make it significantly easier to stay laser focused on only detailing the relevant information you need for each specific section, but it will help the writing process feel much more manageable by breaking it up into bite-sized pieces.",
      img: "es18.svg",
    },
    {
      title: "C. Organize Your Goals and Objectives",
      para: " Start dividing up all of the information that you need to include in your business plan by section. The best way to do this is by thinking about each section as if it were comprised of a series of questions that your readers will want answered. For example, in the Customer Acquisition section, some of the key questions you want to address are: How will you reach your target customers? What marketing strategies will you use? What will it cost to acquire customers? Once you’ve laid this out for each section, you now have a good jumping-off point to go in and start shedding light on each of these key questions. ",
      img: "es18.svg",
    },
    {
      title: " Who Needs to See Your Business Plan (and When)?",
      para: " If you find yourself in the fortunate position of pitching to an investor, this is precisely the right time to have your business plan on hand. Most of the time, you’ll start by providing a pitch deck — a presentation (PowerPoint, Keynote) version of your business plan highlighting the most basic elements of your plan in a handful of highly visual slides. Most investors will want to start here because it’s much quicker to read up front than poring over your business plan.  Assuming that you’ve blown your pitch out of the water and have the investor(s) on the edge of their seat, they may ask for the longer-form narrative to start getting into the nitty-gritty of your plan — which you will be able to easily provide courtesy of your finely-tuned business plan.",
      img: "es18.svg",
    },
    {
      title: " The Dos and Don’ts of Writing a Business Plan ",
      para: "If you’re learning this stuff for the first time, it might feel a bit overwhelming being asked to remember which specific pitfalls to avoid here and which strategies to follow there. To make this all a bit more digestible and help you stay on the right track, we’ve compiled a list of some of the top dos and don’ts to keep in mind when you launch into writing your business plan.",
      img: "es18.svg",
    },
    {
      title: "A. DOs",
      para: "Do your research before you start writing to demonstrate that you have a firm understanding of your market, competitors, and audience. Do update your plan as you go to keep information relevant and up to date. Do write in clear, plain language that anyone can easily understand, whether it’s an investor or your elderly neighbor. Do cite your sources where necessary. Do create an engaging narrative around the problem your customers face and why your product or service is the perfect solution to that problem. Do explain how you arrived at your financial assumptions. Do keep your business plan concise, compelling, and persuasive. Do make it more personal and immediate by writing in the 1st person grammatical point of view (write as if it were your team having a conversation about the company to the reader in person “Our team is on the forefront of innovation…”).",
      img: "es18.svg",
    },
    {
      title: "B. DON’Ts",
      para: "Don’t assume that your reader is already familiar with your industry. Don’t overload your plan with industry-specific jargon. Don’t exceed 20 pages (or 15 if possible). Don’t write lengthy walls of copy. Don’t repeat the same information ad nauseum throughout your plan.  Don’t refer to yourself as “The Company” or use 3rd person grammatical point of view (this is a bit of an outdated approach). Don’t claim you have “no competitors” (#1: your investors won’t buy it, and #2: no matter how unique your solution, there’s almost always someone competing with you either directly or indirectly. Really dig in and do your homework on this). Don’t forget to proofread (make sure you’ve gone back and corrected any spelling or grammatical errors and that your formatting remains consistent throughout)",
      img: "es18.svg",
    },
    {
      title: "Plan On!",
      para: "n this crash course introduction to the business plan, we've thrown a lot of material at you. You should now have a basic understanding of what a business plan is, what goes into one, and how to use one effectively. After you understand the fundamental questions that you must answer your own business plans and the fundamental questions that you have to deploy everything, you can make it more accessible to them to take action.",
      img: "es18.svg",
    },
    {
      title: "How to write a business plan",
      para: "Before you pick your pen and start to write we will pass through the most important things that will help you solve the process of creating yourself. Maintain it short and brief. There's an old school belief that business plans must be dense, convoluted documents the size of a doorstop in order to demonstrate how serious you are about your firm Complexity and length for complexity is rarely a good idea. This is especially true when writing a business plan. There are several reasons for this.",
      img: "es18.svg",
    },
    {
      title: "1. Investors short on time",
      para: "investors go through a ton of business plans a year. There is no way that an investor would dive into your 80 page long business plan and use up hours of their day going through your business plan from front to end Instead, they want you to get the point across as quickly and clearly as possible so you can get to the most important parts to go through your plans and decide if your opportunity is worth considering. start doing). You should be able to articulate all the core values ​​investors are looking for, up to 1520 pages (not including appendices detailing financial information). If you're writing more than that, you're probably overly explanatory, repeating information, or including irrelevant details (eg you don't have to spend 10 pages on how to set up a website) The bottom line is that you should always be on the lookout for methods to 'Trim the fat.'",
      img: "es18.svg",
    },
    {
      title: "2. Recognize Your Target Market",
      para: "If you pack your business plan with buzzwords, industry-specific jargon or acronyms, and long, difficult phrases, it may make sense to a few people familiar with your specialty and those with superhuman attention spans (not many), but it will alienate the great majority of non-expert readers. Use basic, straightforward language that everyone can understand — from the most savvy investor to your Great Aunt Bertha who still uses a landline — and you'll be fine.",
      img: "es18.svg",
    },
    {
      title: "What Is The Best Way To Format Your Business Plan?",
      para: "While there is no one-size-fits-all approach to formatting your plan, the goal is to make it look professional. If your company plan has a lot of different fonts and margins, it's time to rewrite it Here are some simple formatting recommendations to get you started",
      img: "es18.svg",
    },
    {
      title: "Margins",
      para: "If the margins are too thin, the page will appear cluttered and difficult to read. Sticking to conventional one-inch margins all around is a decent rule of thumb.",
      img: "es18.svg",
    },
    {
      title: "Headings",
      para: "Your company plan is divided into numerous major components, much like a book's chapters. You should use a header to indicate the start of a section ('Traction,' for example) so that your reader understands what to expect from the content that follows. This also aids in the organization of your content by breaking it up.",
      img: "es18.svg",
    },
    {
      title: "Subheadings",
      para: "Subheadings are tiny versions of headings that are used to split up text within each section and keep readers moving down the page by capturing their attention. In fact, we're doing just that right now in this section with subheaders!",
      img: "es18.svg",
    },
    ,
    {
      title: "Types of Font",
      para: "Limit yourself to two typefaces (for example, one for headers and another for body copy and subheadings) that you can find in a typical text editor like Microsoft Word or Google Docs.Choose fonts that are simple to read and have both capital and lowercase letters ",
      img: "es18.svg",
    },
    {
      title: "Font Dimensions",
      para: "To ensure readability, keep your body copy between 11 and 12 point font size (some fonts are more squint-inducing than others) Simply increase the font size and bold your subheadings to offset your headings from your body material.",
      img: "es18.svg",
    },
    {
      title: "Visuals",
      para: "It's sometimes preferable to show rather than tell. Assume that your readers will scan your plan rather than reading it word for word, and use colour graphics, tables, and charts (particularly with financial forecasts), as well as product photographs, if relevant, to capture their attention. This will also assist your reader in better understanding what your company is all about.",
      img: "es18.svg",
    },
    {
      title: "Continue to refine",
      para: "A solid business plan is constantly changing, and no one detail is ever fixed in stone. This means that the first version of your strategy is unlikely to be the last (and should not be). It's vital to check your business plan from time to time as your business grows and your thoughts about it change, to ensure that it represents those changes and that everything is as accurate and up-to-date as possible. This is especially true when conducting market research and discovering information that contradicts your initial ideas. You will also need a reliable business critic who can review your work and provide helpful criticism on how it reads stylistically. While different investors have different preferences, the important thing is to be consistent with your audience and business",
      img: "es18.svg",
    },
    {
      title:
        "A Section-by-Section Guide to Writing Your Business Plan Executive Summary",
      para: "The Executive Summary will be the first portion of actual content about your firm after your Title Page — which includes your company name, tagline (if relevant), and contact information — and your Table of Contents. Your Executive Summary's major purpose is to give your readers a high-level overview of your entire business plan by summarising the most significant components in a few brief phrases. Consider your Executive Summary to be a 'teaser' for the content that will follow — information that will be explained in greater depth throughout your strategy. ",
      img: "es18.svg",
    },
    {
      title: "2. Company Synopsis",
      para: "In your Company Synopsis section, you should answer two crucial questions for your readers: What unpleasant PROBLEM are you fixing for your customers? And, more importantly, what is your brilliant SOLUTION to the problem?",
      img: "es18.svg",
    },
    {
      title: "3. The Market Overview",
      para: "Your Market Overview provides context for the industry in which your product or service will compete. Statistics on the size, growth rate, trends, and overall outlook of the industry will be included. This aspect of your business plan may be described in one word: research. The idea is to assemble as much raw data as possible in order to persuade your readers that: This is a market worth getting excited about. You have a strong possibility of snagging a sizable chunk of this market.",
      img: "es18.svg",
    },
    {
      title: "4.  product (How it Works)",
      para: "Whereas your Company Synopsis is supposed to explain why the company exists by illustrating the problem you're trying to solve and then backing it up with a compelling solution, your Product or How it Works section allows you to dig into the fine gritty of how it truly delivers that value.",
      img: "es18.svg",
    },
    {
      title: "5. Revenue Model",
      para: "Simply said, your Revenue Model provides a framework for your readers to understand how you intend to make money. It determines the revenue sources you're using, as well as how and why you're pricing your product or service.",
      img: "es18.svg",
    },
    {
      title: "6. Operating Model",
      para: "Simply said, your Operating Model describes how your business operates. It's a detailed explanation of the processes, technologies, and physical requirements (assets) that enable you to deliver the value your product or service delivers to your customers",
      img: "es18.svg",
    },
    {
      title: "7. Analyze your competition",
      para: "Your Competitive Analysis, like the Market Overview section, informs your readers that you've done your homework and have a ridiculously high degree of understanding about your existing competitors as well as any possible competitors down the road. When composing your Competitive Analysis, your summary should include who your nearest competitors are, what their main strengths and shortcomings are. At least three competitors — direct, indirect, or a mix of the two — should be identified.",
      img: "es18.svg",
    },
    {
      title: "8. Customer Definition",
      para: "Your Customer Definition section allows you to note which customer segment(s) you're targeting, what characteristics and habits each segment embodies, how each segment benefits from your product or service in a unique way, and how all of this ties together to create the ideal portrait of an actual paying customer.",
      img: "es18.svg",
    },
    {
      title: "9. Customer Acquisition",
      para: "Your Customer Acquisition section will explain your readers which techniques and tactics you plan to use to actually approach those people and turn them into paying customers now that you've defined who your customers are for them.",
      img: "es18.svg",
    },
    {
      title: "10.Traction",
      para: "This is a large one. Traction informs investors one key thing: your company is moving forward. It's proof that you're making progress and accomplishing goals. That is exactly what is happening. What is the significance of this? Because if you can show investors that your firm has legs before they put any money into it, it will make them think about all the fantastic things you'll be able to accomplish once they do.",
      img: "es18.svg",
    },
    {
      title: "11. The Management Team",
      para: "What your Management Team section isn't: it's not a comprehensive list of every role your team members have held during their careers. Instead, your Management Team section should explain to investors how each member of your team's experience and skill contributes to the company's and industry's success. In other words, what relevant and applicable experience do they bring to the table? ",
      img: "es18.svg",
    },
    {
      title: "12. Funding",
      para: "This is when you come out and ask your investors straight up how much money you need to drive your business ahead, what precise milestones their investment will enable you to hit, how you'll deploy the capital you secure, and what the investor will get in return for their contribution. You can also provide details on your exit strategy (IPO, acquisition, merger, etc.).",
      img: "es18.svg",
    },
    {
      title: "13. Financials",
      para: "Oh, the spreadsheets, numbers, and charts! Financials are, without a doubt, everyone's 'favourite' element of a business plan. Your Financials section will be last, and it will include all of the projected numbers that investors will use to determine whether or not this is a good investment. This will comprise your sales projection, spending budget, and break-even analysis, among other things. A large portion of this will be based on assumptions or estimations. Breaking down your data into components and looking at each one individually is the key to keeping your estimations as realistic as possible.",
      img: "es18.svg",
    },
    {
      title: "Finally!",
      para: "You've made the decision to write your business plan, and now you've got some tips to help you along the path. Your well-crafted business plan will work as your Holy Grail in helping you take your firm to the next level, whether you're applying for a loan or looking for investors. This is a huge task. We've been in that situation previously. Writing a business plan is only the first step in the startup process. You have a long road ahead of you, filled with investor outreach, genuine funding, and business growth ",
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
                  onClick={() => navigate("/buisnessplanning")}
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

export default BusinessPlanningSlides;
