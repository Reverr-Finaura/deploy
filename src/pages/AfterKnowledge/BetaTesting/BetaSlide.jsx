import React, { useState, useEffect } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BetaSlide = () => {
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
      title: "What is Beta Testing",
      para: "Beta testing is the process of releasing a new product to a limited audience to understand how they respond to it. The team behind the development can then work on flaws, fix bugs, and develop even better features that will enhance the value of the product.",
      img: "es1.svg",
    },
    {
      title: "Importance Of Beta Testing",
      para: "If you are launching your product for the first time, it is crucial that the product is free of bugs. Otherwise, the public will not like the product and the startup will fail even before the official launch. Bug-ridden products can negatively impact your business and can lead to negative publicity. The bad press can spread like wildfire in tech, as well as give your competitors time to add the features that your product lacks to their own products. In short, beta users are important for the following reasons:",
      img: "es2.svg",
    },
    {
      title: "Importance Of Beta Testing",
      para: "In short, beta users are important for the following reasons: they can help you find bugs in the product. they can improve user flow and enhance usability, they can come up with innovative ideas that you can add to the product to improve its value and features, they will do it all for free, so make sure you recruit only those who need the product and understand its use case.",
      img: "es2.svg",
    },
    {
      title: "Who is an ideal beta user?",
      para: "An ideal beta tester is a person who is actually interested in buying the product. This is not your family member or a friend, but a person that fits your buyer persona. This person suffers the pain that your product can resolve.",
      img: "es4.svg",
    },
    {
      title: "How to find Beta testers",
      para: "Here is a list of the best ways to find beta testers for your startup product that we have put together for you. Any of these methods can lead you to 100 to 500 beta testers easily.",
      img: "es5.svg",
    },
    {
      title: "1. Interest-Based User Groups",
      para: "we reach out to specific groups in our community, such as yoga studios, university programs, alumni networks, food bloggers and athletic teams to use their social media platforms. When people hear that they fit your “ideal” testing group, it feels exclusive, and they’re excited to participate in a best test.",
      img: "es5.svg",
    },
    {
      title: "2. Survey Participants      ",
      para: "Finding beta testers is a matter of talking to as many people as possible about your target population. By selecting beta testers, send out a short survey using any of the many free tools available, and ask questions such as, “What part of the product / service do you enjoy the most? Are you willing to give a response every day?  and the leading beta testers will reveal themselves graciously.",
      img: "es5.svg",
    },
    {
      title: "3. Social Networks",
      para: "Apart from family and friends, when we first started finding beta testers. First, we created a series of landing pages with targeted objectives. Then, we spread the word about the pages on various social networks, ran a few ads to better understand our audience, and reached out to bloggers that we thought might want to share with their audience.",
      img: "es5.svg",
    },
    {
      title: "4. Your Best Users",
      para: "When you’re a startup, you have a more personal relationship with your users. They tell you when you have a bug, what they hate, etc. So before release day, we canvas our top users for beta testing to see how they react. They often have invaluable advice as to what does or doesn’t work in the flow, and they are always happy to have been heard. After all, they are the ones who have to use the feature.",
      img: "es5.svg",
    },
    {
      title: "5. Internal Lists and Communities      ",
      para: "Through our network of website communities and internal mailing lists, we have the ability to reach out to our audience and get their perspective on anything we’d like beta tested before it’s fully released. This method is great as they are the ones who not only approve and subjectively review what we are working on, it also gives our users the feeling of importance and growing the community in which, they live.",
      img: "es5.svg",
    },
    {
      title: "What’s Next      ",
      para: "Did the beta testers test the product? Did you fix all the issues they found? Is the product ready? Depending on the results of beta testing, you can move to public launch or conduct a second round of public beta testing. When planning a public launch, make sure that the product is stable and bug-free. The beta stage can be extended if you are still uncertain about the functions of the product. Beta stages usually last between two and three months. When you pass this beta testing stage, it's time for the big launch.",
      img: "es5.svg",
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
                  onClick={() => navigate("/betatesting")}
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

export default BetaSlide;
