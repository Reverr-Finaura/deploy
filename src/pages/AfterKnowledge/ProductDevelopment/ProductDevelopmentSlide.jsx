import React, { useEffect, useState } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
const ProductDevelopmentSlide = () => {
  const obj = [
    {
      title: "PRODUCT DEVELOPMENT",
      para: "When it comes to product design for startups, there are a few things to keep in mind. Let's discuss the main elements and procedures you must follow to design a product if you don't know how to construct a product design for a startup.",
      img: "es1.svg",
    },
    {
      title: "PHASE 1- PRODUCT ROADMAP",
      para: "A product roadmap is a sophisticated visual that depicts your product's progression over a foreseeable period of time. The product roadmap outlines where the company is now, where it wants to go, and how it will get there. It is a great resource for teams to plan tasks and carry out the strategy. Product roadmaps can be used in conjunction with other business strategies such as marketing and business plans. They can even assist you in developing a marketing growth strategy.",
      img: "es2.svg",
    },
    {
      title: "Planning a product roadmap",
      para: "Because different audiences' needs  and demands will vary, the information and structure of your plan must be adjusted to them. External stakeholders, for example, would most certainly need a high-level overview of strategic initiatives, which should be planned out across several quarters to a few years. They might be more interested in long-term, medium-term, and long-term time horizons.",
      img: "es3.svg",
    },
    {
      title: "Planning a product roadmap",
      para: "Internal product team members, on the other hand, will require a more detailed picture of certain features and tasks. Instead of years, it's usually better to plan these out over a few weeks or months.The timescale must be fair in addition to aligning with the needs of your audience. It must be long enough to achieve major project developments while being short enough to estimate accurate timelines.",
      img: "es4.svg",
    },
    {
      title: "Planning a product roadmap",
      para: "You may start putting things into place about the product development once you've identified your target customer and set an acceptable deadline. This includes the following: High-level goals and initiatives, Low-level tasks and their time requirements,Task priorities,Key milestones,Task dependencies A product roadmap can improve communication within an organization, resulting in better alignment within and among teams, and allowing for more real work to be completed.",
      img: "es5.svg",
    },
    {
      title: "Minimum Viable Product",
      para: "So, you have this brilliant idea that has piqued your curiosity. It may or may not have the same effect on the other persons to whom you will present your project. That is why people participate in MVPs. To quickly test something, construct it and receive comments to see if you should continue. You may be thrilled with the concept! A minimum viable product (MVP) is a concept that emphasizes the importance of learning in product development. An MVP is a version of a new product that allows a team to collect the most amount of validated customer learning with the least amount of effort. This verified knowledge is in the form of whether or not your clients will actually buy your product. ",
      img: "es6.svg",
    },
    {
      title: "Minimum Viable Product",
      para: "A crucial premise behind the MVP concept is that you create an actual product (which might be as simple as a landing page or a service that appears to be automated but is entirely manual behind the scenes) that you can give to clients and monitor their conduct with it. Observing what people do with a product rather than asking them what they would do is far more reliable.",
      img: "es7.svg",
    },
    {
      title: "Expected Benefits",
      para: "The main advantage of an MVP is that it allows you to learn about your clients' interest in your product without having to fully construct it. The sooner you can determine whether your product will appeal to clients, the less time and money you'll waste on a product that won't sell.",
      img: "es8.svg",
    },
    {
      title: "Common Pitfalls",
      para: "Why is it so minimal? Consider the concept you want to develop. How many days should you devote to developing a working prototype? Let's do the math: 4 functionalities, plus 3 integrations, and the ability to pay in all countries, and one more feature to display cool metrics, and an awesome user interface, and..., and... It would take you 9 months, hmm. Alright! It took you 13 months to construct (some unexpected adjustments here and there). You put it out to an alpha test and discovered that no one is interested. You may argue that it's due to a lack of adequate market research. You identified the private households in a village as your target market. You spoke with a number of them and inquired about the problem you were attempting to solve.",
      img: "es9.svg",
    },
    {
      title: "Common Pitfalls",
      para: "So you've concluded that spending 13 months constructing a solution is acceptable. You then exhibited it to your target potential clients, who discovered that your solution does not solve their problem. Okay, you gathered feedback and corrected your MVP in two months. Then, over the course of a year, you repeated the release-receive feedback cycle a few times to get a few people interested in using your solution. So, simply to get started, it'll take at least two years.",
      img: "es10.svg",
    },
    {
      title: "Common Pitfalls",
      para: "The MVP concept's key goal is to adapt quickly. You build something quickly, show it to potential users, get feedback on what's wrong, and make changes as needed. Repeat this process until you have a few users. Then some more until you have a product-market fit and your scaling issue is solved.",
      img: "es11.svg",
    },
    {
      title: "Potential Costs",
      para: "When an MVP is used correctly, a team can drastically alter a product that they give to their clients or drop the product altogether based on customer feedback. MVP encourages teams to undertake the least amount of effort possible to get relevant feedback, which helps them avoid working on a product that no one wants.",
      img: "es12.svg",
    },
    {
      title:
        "Designing 1. Decide that reaching a diverse audience is important to you.",
      para: "Making a conscious decision to prioritize diversity and inclusion as an individual or as an organization is the first and most important action you can take. There's a common misconception that if we all look and think alike, business culture — the pinnacle of the startup sector — will be 'easier.' So make the decision. Build it as a part of your company’s essential values. Discuss about it over a meeting or so. But you can’t let it stop there.",
      img: "es13.svg",
    },
    {
      title: "Step 2. User Interviews and User Persona Creation ",
      para: "User research is another crucial phase in the product design process for companies. Because your customers are at the heart of your product decision, user interviews are critical for gathering their feedback. You can effectively assess the interests of your user base if you do it right.Make sure the questions are well-thought-out and prepared before the interview. An interview's conclusions can be tainted by poor phrasing or bias.",
      img: "es14.svg",
    },
    {
      title: "Step 3. Competitor Research",
      para: "In order to establish a product design for a startup, you must perform competitive research in addition to user research. Examine the market performance of your immediate competitors' offerings. Analyzing the competitor's strategy will assist you in determining its efficacy and exploitable loopholes. To distinguish yourself from the competition, figure out what your product's unique selling proposition is.",
      img: "es14.svg",
    },
    {
      title: "Step 4. User Journey Mapping",
      para: "Create a user journey map to better understand the potential interactions between the user and your product. This map depicts the actions a user must take to address a certain problem. It might be as simple as a series of stages or it can branch out into several directions. The more paths you can anticipate the user taking, the better you'll be able to predict how they'll engage with your product. However, complex user path maps can frequently make the process more difficult.",
      img: "es14.svg",
    },
    {
      title: "Step 5. Sketching and Wireframing ",
      para: "The ideas for the user interface are visualized via sketching and wireframing. Sketching focuses on the concept representation itself, allowing the designer to experiment with different choices before deciding on the best one Wireframing is concerned with the element structure, page structure, and interactions between them. Because it acts as the product's backbone, the wireframe must be well-structured. They are less engaging, though, and should not be deployed for testing. Always check that the wireframes are the right size for the device that the product will be used on.",
      img: "es14.svg",
    },
    {
      title: "Step 6. Prototyping",
      para: "A prototype is a representation of a concept before it is turned into a finished product. Prototyping should be quick and easy to use, with enough functionality to allow for thorough testing. They typically begin small and expand as new features and concepts become integrated into the product. You can experiment with ideas and visualize alterations while working on the prototype. The prototype, on the other hand, can act as a specification for developers.",
      img: "es14.svg",
    },
    {
      title: "Step7. Testing with the Product Team",
      para: "terative testing is an important part of the design process since it allows us to find and correct defects and inconsistencies that were missed during earlier stages. You can also come up with new concepts and acquire information about the product's potential success. A technique that does not necessitate a lot of resources is product testing with your team. However, with input from your specialized team, it enables you to weed out important flows before the launch.",
      img: "es14.svg",
    },
    {
      title:
        "HOW TO CREATE A MOBILE APP THAT PEOPLE WOULD LOVE | Foster a pool of qualified users",
      para: "Find people who are enthusiastic about your product or service and rely on them heavily. Allow them to provide comments, include them in decision-making, and keep them informed about new developments. These are the folks who will be your initial clients and prospective investors.",
      img: "es14.svg",
    },
    {
      title: "Get advice from strangers",
      para: "Find your target audience and use them as a proving ground for your ideas. It's crucial to remember that you should build what people genuinely want, not what you believe they want.",
      img: "es14.svg",
    },
    {
      title: "Grow your team",
      para: "Before you start constructing your app, take the time to identify the right people and assemble a fantastic squad. It will save you time later and guarantee that you are involving the appropriate individuals for the correct reasons.",
      img: "es14.svg",
    },
    {
      title: "Code with someone you trust",
      para: "App design is a significant investment that you want to get right. Make sure the designers are individuals you can trust to complete the project to your specifications.",
      img: "es14.svg",
    },
    {
      title: "Functionality > Looks",
      para: "It's preferable to have an unattractive software that functions well than a beautiful app that doesn't accomplish what it's supposed to. Prioritize the functionality first, then devote work to the design later.",
      img: "es14.svg",
    },
    {
      title: "Pay attention to analytics",
      para: "Another wonderful technique to see where users are having issues is to employ this method. Perhaps something in your coding is erroneous, or the instructions are difficult to follow. Sifting through the stats will help you figure out where consumers have stopped using the app and find any issues.",
      img: "es14.svg",
    },
    {
      title: "Create a landing page",
      para: "If you need assistance creating a landing page, consider using Launchrock's services. This will drive traffic to your website and allow them to discover more about your products or services.",
      img: "es14.svg",
    },
    {
      title: "Build by example",
      para: "Find apps that run on similar platforms to yours and research how they evolved as businesses. While it isn't infallible, following their marketing strategy and improving as you go can be beneficial.",
      img: "es14.svg",
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
                  onClick={() => navigate("/productdevelopment")}
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

export default ProductDevelopmentSlide;
