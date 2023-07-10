import React, { useEffect, useState } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";
import styles from "./Knowledge.module.css";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
const ThinkingOfStartupSlide = () => {
  const obj = [
    {
      title: "HOW TO GENERATE STARTUP IDEAS",
      para: "Now right here's the way to generate a startup concept for what you are in all likelihood looking forward to. you may sit returned and think in element about your startup concept. And we're going to talk approximately a way to do this in a moment. however in truth, this is not the first-class way to get ideas for startups. The best manner to get startup ideas is to organically word them. terrific startup ideas are all around you, and you may see them everywhere in case you're geared up. The problem is that once humans sit down down and attempt to think of a startup idea, they tend to think handiest of bad thoughts. A startup concept that emerges organically can in reality grow to be an awesome idea.",
      img: "es1.svg",
    },
    {
      title: "HOW TO GENERATE STARTUP IDEAS",
      para: "So first I need to speak approximately a way to organically generate thoughts for startups. in case you're no longer beginning a organisation right now, this should be your preferred technique. find exquisite startup thoughts and discover ways to convey them to you. To have a startup idea organically, you first need to realize what an excellent startup idea is so that you'll note it when it comes to you. then you definitely preserve an eye at the matters that appear to be lacking from the arena. if you are making plans to begin your adventure in the destiny, turning into an expert in something worthwhile could be very beneficial, and perhaps your high-quality bet is to get a job at the vanguard of a particular area. if you're at the leading edge of any area or area, you may see a good start before absolutely everyone else.",
      img: "es2.svg",
    },
    {
      title: "HOW TO GENERATE STARTUP IDEAS",
      para: "Good. Let's take a look at 7 ways for explicit idea generation for startups. We list all 7 ways exhaustively. This is almost every way we know how to generate ideas for startups. Now we know examples where all 7 worked and led to successful companies, but not all are equally good. Some are much more likely to generate good ideas. This first way is the best. This is the one most likely to lead to a good idea and the least likely to lead to false positives. Here it is. Start with what your team is particularly good at, and think of ideas that might have an undue advantage in implementation. What makes this so effective is that ideas conceived in this way automatically fit the founders/markets. It basically generates all ideas that are good for the founder/market.",
      img: "es3.svg",
    },
    {
      title: "HOW TO GENERATE STARTUP IDEAS",
      para: "Sixth, you can also crowdsource ideas by talking to people you know and asking questions about problems you want to solve. It is especially interesting to work with people with specific specialties, for example those who work in interesting industry. Seventh Look for industries that appear to be broken. Any industry that appears to be broken is probably ripe for destruction.",
      img: "es4.svg",
    },
    {
      title: "HOW TO EVALUATE A STARTUP IDEA",
      para: "The first criteria is how big is this idea? The best way to judge this, we think, is to look for existing large companies that do something similar. So, suppose you want to start a new kind of bank. Well, there already are a bunch of banks, and they're big companies, so that suggests that this idea could be big. Your idea could also score well here if you're doing something in a market that's small today, but has a real chance of being huge in the future.",
      img: "es5.svg",
    },
    {
      title: "HOW TO EVALUATE A STARTUP IDEA",
      para: "The next criteria is how sure are you that you're solving a big problem? Ideally, you have personal experience with this problem. And finally, do you have a new, important insight into this idea? And a great example of this is Airbnb. When Airbnb got started, most people thought that the idea of allowing strangers you met on the internet to sleep in your apartment was really weird, and probably dangerous. But the Airbnb founders had actually tried this. They'd invite strangers from the internet to stay with them, and they realized it was really fun. So they had this insight that everyone else was wrong about this, and that's what made Airbnb such a good idea.",
      img: "es6.svg",
    },
    {
      title: "HOW TO EVALUATE A STARTUP IDEA",
      para: "Here are some other signs to look for that your idea is probably a good one. You're making something you personally want to have. It turns out it's much easier to start a successful company if you're making something you yourself want, instead of something other people want. For one, you start with at least one user, yourself, but more importantly, when you're building for yourself, you can trust your intuition about what to build. If you're building for other people, you have to guess what they would want.",
      img: "es7.svg",
    },
    {
      title: "HOW TO EVALUATE A STARTUP IDEA",
      para: "Another sign is that this only recently became possible. If something recently changed in the world, like a new technology or a new product you can build on top of, that's often a sign that a new opportunity has been created. Or, there are successful companies that do something similar.",
      img: "es8.svg",
    },
    {
      title: "HOW TO EVALUATE A STARTUP IDEA",
      para: "My last topic about evaluating startup ideas is to talk about filters. Filters are bad reasons to reject startup ideas. And the most dangerous part of filters is that they will cause you to reject your best startup ideas unconsciously, before they even bubble up to your conscious mind, and there are four big ones that are extremely important to understand. Almost everyone has these filters. And one of the most impactful things you can do to become good at ",
      img: "es9.svg",
    },
    {
      title: "MISTAKES FOUNDERS DO ",
      para: "The first and most common mistake is the belief that good ideas come first. It usually looks like this: People believe that the key to a successful startup is starting with a brilliant idea. So they wait for a brilliant idea before starting anything. When you look at successful modern companies like Google or Facebook, it's easy to think, 'Wow, what a brilliant idea.' But we can say that it only looks so in retrospect. When Google was launched, it was the 20th search engine. And when Facebook was launched, it was the 20th social network. What made them successful wasn't a great initial idea. It was a reasonably good initial idea combined with excellent execution.",
      img: "es10.svg",
    },
    {
      title: "MISTAKES FOUNDERS DO ",
      para: "The following real number is the exact opposite. It's about taking the first idea that comes to mind without stopping and critically thinking about whether it's good or not. And it's amazing how common it is. That's the problem. If your startup succeeds, you will spend a lifetime working on it. And if you're going to spend a few years of your life doing something, wouldn't it make sense to spend a few weeks deciding what to do first? Surprisingly, very few founders do this, and when they do they are actually ahead of the curve. My argument is that if you imagine a spectrum where one end is 'try the idea that comes to mind first' and the other end 'wait for the perfect idea', you want to be somewhere in between. You should think of your original idea as a good starting point.",
      img: "es11.svg",
    },
    {
      title: "MISTAKES FOUNDERS DO ",
      para: "Startup ideas change over time. Take Airbnb as an example. Initially, Airbnb was literally a site for renting airbeds in someone else's home. Over time, it evolved into all types of vacation rentals. So, you need to choose a good starting point. If you have a good starting point, even if your initial idea isn't very good, you need to improve it to get a good one. On the other hand, if you choose a bad starting point, you can't turn it into a good starting point. You have to start all over again.",
      img: "es12.svg",
    },
    {
      title: "MISTAKES FOUNDERS DO ",
      para: "The third mistake is to start with the solution, not the problem. And we'll give you an example. Imagine coming up with a startup called Uber for plumbers. This app brings up the plumber at the push of a button. This is the solution. What problem do you solve? we do not know. It can be difficult to find a plumber. This may be a real problem, but when an idea like this comes up, I believe it starts with a solution. so there is a term. This is called SISP (Solving in Search of Problem). And that's usually not good because it usually doesn't find the problem. It's much better to start with the problem and then find a solution.",
      img: "es13.svg",
    },
    {
      title: "MISTAKES FOUNDERS DO ",
      para: "The final mistake is believing that startup ideas are hard to come by. In fact, it is easy to find because there are so many real problems left in the world. If you're having trouble finding it, you haven't learned how to do it yet. Learn to discover great startup ideas and you'll see them everywhere.",
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
                  onClick={() => navigate("/thinkingofstartup")}
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

export default ThinkingOfStartupSlide;
