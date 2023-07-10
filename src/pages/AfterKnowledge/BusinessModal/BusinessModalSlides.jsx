import React, { useState, useEffect } from "react";
import Slide from "./../../../components/After knowledge/Slide Format/Slide";

import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinal from "../../../components/Navbar/NavBarFinal";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import styles from "./Knowledge.module.css";
import { useNavigate } from "react-router-dom";
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";

const BusinessModalSlides = () => {
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
      title: "What is it",
      para: "A business model Canvas is a way to determine a company business model in a transparent, straightforward manner. It can be used to develop new business ideas or to draw an existing business model. Every company needs to be able to clearly and concisely model their business model. Not only does it serve as a guide for moving the company forward, but it also helps as you approach investors and partners. However, finding a business model can be difficult, especially for beginners.",
      img: "bs1.svg",
    },
    {
      title: "What is it",
      para: "A business model canvas can be printed on a large scale, so that the whole team can work on it together. Consider using the notes behind it to get ideas added, removed, and moved as you work collaboratively on developing a clear business model for your startup.",
      img: "bs1.svg",
    },
    {
      title: "How to write one:-Business model canvas framework",
      para: "The business model canvas framework contains nine sections. Let’s take a closer look at each one. ",
      img: "bs1.svg",
    },
    {
      title: "1. Key Partners",
      para: "For the key partners section, we are trying to determine who else you need in order for your startup to be successful. Who’s going along for this journey with you and your teammates? Ask: Who are our key partners? Who are your suppliers, if relevant? Who are your investors, if relevant?",
      img: "bs1.svg",
    },
    {
      title: "2. Key Activities",
      para: "What’s the most important thing your company has to do in order to be successful? The answer to this is often the product or service you’re delivering to the end consumer. Ask: What’s the most important action your startup needs to take in order to be successful? You must settle on one.",
      img: "es5.svg",
    },
    {
      title: "3. Key Resources",
      para: "In order to be successful, startup needs a variety of resources. “Resources” doesn’t just mean money, though, although that type of resource is certainly important. Resources refers to everything your startup needs to succeed. Ask: What financial resources do we need? What human resources do we need? What physical resources do we need? What intellectual resources do we need?",
      img: "es6.svg",
    },
    {
      title: "4. Value Proposition",
      para: "Startup’s value proposition is the promise you make to customers about the services or goods you’re going to deliver. It can also be thought of as the value your customers find in your product. Ask: What value do we bring to our customers? What problem are we solving? What makes us different from our competitors? What’s new about our startup?",
      img: "es7.svg",
    },
    {
      title: "5. Customer Segments",
      para: "No product can survive without customers, which makes it essential to determine what your customer segments are. The business model canvas has five customer segments: mass market, niche market, segmented, diversified, and multi-sided platform/market.",
      img: "es8.svg",
    },
    {
      title: "Mass Market",
      para: "Mass market means your product or service appeals to the widest possible range of people. Think of a product like dishwashing soap. Pretty much everyone uses it.Niche Market Niche market means your product or services appeals to a specific group of customers, based on their particular needs. For example, only new parents are going to be interested in purchasing a Pampers.",
      img: "es9.svg",
    },
    {
      title: "Segmented",
      para: "Many companies have multiple markets within their main market. This is called a segmented market. So, for example, you may need to segment out your market based on demographic characteristics like age, gender, or location",
      img: "es10.svg",
    },
    {
      title: "Diversified",
      para: "A company that serves more than one market segment has a diversified market.",
      img: "es11.svg",
    },
    {
      title: "Multi-Sided Platform",
      para: "Some companies have two or more markets that they’re serving simultaneously, with the same business. For example, if your company is a go-between for vendors and buyers like Amazon is then you have a multi-sided platform. Ask: Who are our most important customers? Who were our very first customers? Who gets the most out of our value proposition? ",
      img: "es12.svg",
    },
    {
      title: "6. Customer Relationships",
      para: "Startup founders know that customer service is the key to success. Customer relationships can take the form of personal assistance, dedicated personal assistance, self-service, automated service, communities, and co-creation. But whichever method you choose, just make sure it’s excellent. Ask: How is my company going to interact with customers? How am you going to provide that key support and build an ongoing relationship with them? How will customers be able to reach us if they need support with our product What’s the most cost-effective way to still provide great customer service?",
      img: "es13.svg",
    },
    {
      title: "7. Channels to reach customers",
      para: "Your company won’t survive if you can’t reach your customers so how are you going to get your product or service to them? Ask: Are we going to reach our customers directly, through our own channels? Are we going to reach our customers through partner channels, like Amazon or a podcast network or other major distributors? Or are we going to use a combination of both? ",
      img: "es14.svg",
    },
    {
      title: "8. Cost Structure",
      para: "In this section, you’re going to explore the different costs and monetary consequences of your model. Ask: Is your company cost-drive or value-driven? What are your fixed costs? What are the most important costs for your startup? Which Key Resources are most expensive?  Which Key Activities are most expensive? What are your variable costs? What are your economies of scale? What are your economies of scope?",
      img: "es15.svg",
    },
    {
      title: "9. Revenue Streams",
      para: "Your revenue streams are how you actually make money and how much money you make. Your startup may have one or many revenue streams, but this is where you’ll identify them. Ask: What are your customers currently paying for similar products?  How are they paying for those products? Do they like that payment method? Would they prefer a different one? How much are they willing to pay you? How much does each individual revenue stream contribute to overall revenue of the company? ",
      img: "es16.svg",
    },
    {
      title:
        "How is a business model canvas different from a traditional business plan?",
      para: "A typical business plan can take months to create and can run up to 100 pages. It's about making a map of all the possible scenarios for your business, from the weather for your five-year profit to income, table of goods, market size, product, solution ... You get an idea ... It is a consistent document designed to assure entrepreneurs and investors that the company will succeed.",
      img: "es17.svg",
    },
    {
      title:
        "How is a business model canvas different from a traditional business plan?",
      para: "A business model canvas, on the other hand, can be created in a day. It is intended to be a flexible document that helps to provide structure in the beginning, with the understanding that it is just the beginning. It fits well with the first soft model because it is about finding a model that is created quickly for entrepreneurs to start exploring their thinking and hypothesis. A soft start is focused on moving fast and navigating as often as necessary, which a typical business model does not allow you to do.",
      img: "es18.svg",
    },

    {
      title: "How does it help",
      para: "By using Business Model Canvas, you can get a complete overview of your business idea at all angles. So, for example, control, strategy or managers will get instant access to specific information you need. BMC gives start-up companies the opportunity to present their ideas. Using BMC for new projects is also an option for companies.",
      img: "es18.svg",
    },
    {
      title: "How does it help",
      para: "Strong business models can give you a competitive edge in your industry because they can help you make more profit than your competitors. By adopting a different business model, your company can find a market name that creates interest among consumers and encourages them to buy for the first time",
      img: "es18.svg",
    },
    {
      title: "How does it help",
      para: "Creating value for both customers and the business must be an ongoing strategy for a successful business model. Therefore, even established companies need to constantly evaluate and refine their business models.",
      img: "es18.svg",
    },
    {
      title: "How does it help",
      para: "The way a company creates value is defined by its business model. Business power can melt in its simple essence through this process. An effective business model answers questions about what the business will solve, how it will solve it, and market opportunity.",
      img: "es18.svg",
    },
    {
      title: "How does it help",
      para: "Value is created by the development and management of business models. Based on key elements of stakeholder theory, it provides a framework based on stakeholder vision for generating a number of participants.",
      img: "es18.svg",
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
                  onClick={() => navigate("/buisnessmodal")}
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

export default BusinessModalSlides;
