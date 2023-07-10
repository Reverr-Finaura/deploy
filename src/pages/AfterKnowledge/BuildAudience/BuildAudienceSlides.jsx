import React, { useEffect, useState } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
const BuildAudienceSlides = () => {
  const obj = [
    {
      title: "Introduction",
      para: "Building an audience is simply about being incredibly consistent with our marketing tactics. On most days, we won’t see much action. No new followers, no responses to our newsletter – not even the Internet trolls will take the time to engage us and that’s perfectly OK! But, if we use the tools we’re about to learn, and use them consistently, we will almost certainly grow our audience (unless our marketing message is just truly awful – in which case we have a whole lotta work to do!)",
      img: "as1.svg",
    },
    {
      title: "The Audience Building Formula",
      para: "Start with friends who will listen. It’s only natural that the biggest learning curve will occur during our earliest efforts. That’s why we’re going to start by testing our messaging with those who are much more forgiving: our immediate social circle. Repeat your message ungodly many times. We live in an age of nanosecond concentration. It will take tremendous effort for our message to subdue it. We will make the process very repeatable.",
      img: "as2.svg",
    },
    {
      title: "The Audience Building Formula",
      para: "Focus on getting people to share information. Creating content is only half the marketing formula. The other 50% of our time will be devoted to encouraging others to spread the word. Be damn patient. Spoiler Warning: You won't be very successful in the first place. Our initial marketing efforts are based on trial and error so you can learn from what doesn't work and focus on what works",
      img: "as3.svg",
    },
    {
      title: "Newsletter",
      para: "Newsletter is the backbone of your first customer acquisition efforts. This is usually the most common place to interact with users during the first few weeks and months. We love it because it's free, gives you a lot of freedom and opportunity to express your message, and gives you an instant response. Newsletters are most effective when treated like a friendly conversation. It's terrible when treated like a billboard wrapped in an email container. The world is mostly filed with the latter, so we're going to show you how to engage and build your early audience using a friendly, personal style.",
      img: "as3.svg",
    },
    {
      title: "How to Approach Newsletter Marketing",
      para: "We're going to use our newsletter to communicate to our small but growing audience on a fairly regular basis at least once a month if not more. Each time we send our newsletter, we're not just sending an update we're leveraging our audience to help us explore and understand another unknown area of our business model.",
      img: "as1.svg",
    },
    {
      title: "How to Approach Newsletter Marketing",
      para: "One send may be focused on learning what price point works best. Another may be determining which features we should build first. Another might be a way to increase interest in pending releases. We will choose one goal and create a small campaign to help us achieve this result. The newsletter is going to be the moimportant brainstorming session we can have because we engage with real potential customers.",
      img: "as1.svg",
    },
    {
      title: "3 Key Questions for Each Newsletter",
      para: "Each time we sit down to create our next newsletter masterpiece, we will ask ourselves 3 questions. What do we want to achieve? We can only choose one target. So, what is the most important thing we can learn from this message?",
      img: "as1.svg",
    },
    {
      title: "3 Key Questions for Each Newsletter",
      para: "What words make people happy? We want people to like our newsletter. So, what can you share with your audience so they can entertain, inform, or engage them in a way that makes them look forward to the next release? Which single action will you focus on? What single 'call to action' would you like to drive in line with our goals?",
      img: "es8.svg",
    },
    {
      title: "Set up your newsletter account",
      para: "For our purposes, we're going to suggest creating a free account with Mailchimp though, feel free to use any other newsletter software that you'd like. One thing we don't recommend is using your default mail client and sending out a mass email. Not only does it look low rent there isn’t an easy way to add new subscribers, purge unsubscribes or get a closer look at detailed reporting on newsletter performance.",
      img: "as1.svg",
    },
    {
      title: "Set up your newsletter account",
      para: "If you want to get a feel for what you'll need to do, the good folks of Mailchimp have a very easy step-by-step tutorial as well as a video walkthrough. You can dig into that now or keep reading and come back to the setup later.",
      img: "es10.svg",
    },

    {
      title: "Almighty CTA",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "es12.svg",
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
                  onClick={() => navigate("/buildingaudience")}
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

export default BuildAudienceSlides;
