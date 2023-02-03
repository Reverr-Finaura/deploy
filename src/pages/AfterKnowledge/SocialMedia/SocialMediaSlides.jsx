import React, { useState } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

const FundraisingSlides = () => {
  const obj = [
    {
      title: "Set up Facebook",
      para: "• Facebook is “the world's largest social networking site” with more than two billion active users worldwide. India - about 200 million people log on to Facebook every day. \n• To get started, visit facebook.com/pages/create. You will then select which type of page you want to make.",
      img: "smh1.png",
    },
    {
      title: "Set up Facebook",
      para: '• After that, you will fill in the required information and click on "Start". After that, Facebook will take you through the process of creating a screen with easy-to-follow instructions. \n• To get your first followers, link your profile with your page and invite your friends and family to "like" your page.',
      img: "smh1.png",
    },
    {
      title: "Set up Twitter",
      para: "• People on Twitter are looking for something new - with good content and news from their favorite people, businesses, and products. \n• Also, about 47% of people who follow the brand on Twitter are more likely to visit the company's website.",
      img: "smh2.png",
    },
    {
      title: "Set up Twitter",
      para: '• To get started, go to the Twitter homepage and click the "Register Now." Then, complete the required registration details. \n• To find your first followers you can use the feature they give us during registration to import your email addresses from your Gmail, Yahoo or Outlook email account, which will allow you to start tracking other contacts and hopefully they will follow you again. !',
      img: "smh2.png",
    },
    {
      title: "Set up LinkedIn",
      para: '• The LinkedIn Company page helps others to connect and learn more about your business, products and services. \n• But before you can create a LinkedIn page for your business, you must first have a LinkedIn profile with your real name and surname. \n• After creating your own page, click the "Apply" icon in the top right corner of your LinkedIn homepage. Then navigate to "Create Company Page".',
      img: "smh3.png",
    },
    {
      title: "Set up LinkedIn",
      para: '• After entering your company name, you will need to select a URL. Then, after verifying that you have the right to represent your company, you will click the "Create Page" button. \n• In addition to sharing interesting and important content, to get the first few users, you can invite and share your company page with links to your personal page.',
      img: "smh3.png",
    },
    {
      title: "Set up Instagram",
      para: "• Instagram is a place where visible talk from businesses encourages people around the world to take action. \n• In fact, 60% of people say they have found a new product via Instagram and 200 million Instagrammers visit at least one Business Profile per day. \n• Creating an Instagram Business Account is easy after downloading the Instagram app for iOS in the App Store, Android on Google Play Store, or Windows Phone in Windows Phone Store to open it.",
      img: "smh4.png",
    },
    {
      title: "Set up Instagram",
      para: '• You will then select "Register" and enter the required information or, you can log in with your Facebook account to register that way. \n• You will then want to create a free business profile to give people more information about your products, service or business. Visit “Settings” and select “Switch to Business Account”.\n• Once you have done this, you can add any important information such as your hours, business address, or phone number.',
      img: "smh4.png",
    },
    {
      title: "Set up Instagram",
      para: "• To find your first few users, start posting content you'd like to see in your feed. Make sure you use the appropriate hashtags and follow accounts similar to yours.",
      img: "smh4.png",
    },
    {
      title: "Set up Google Adwords",
      para: "• It is secure to count on that everybody is very familiar with the commercials that pop up whilst we search something on Google - the ones are pushed by means of Google's advert serving platform Adwords. \n• Adwords is to advertising what espresso is to our morning routine. it'll allow us to step at the fuel and accelerate our fee of customer acquisition.",
      img: "smh5.png",
    },
    {
      title: "Setting up Adwords",
      para: "• To get began with Google Adwords, visit their website at https://ads.google.com/home/ and click on “begin Now.” \n• From here, you’ll want to have an e-mail cope with and business internet site. if you don’t have a website yet, that’s k. you may nonetheless use AdWords express — Google’s “mild” version.",
      img: "smh5.png",
    },
    {
      title: "Setting up Adwords",
      para: "• In case you have already got a Google account (like Gmail, for instance), you may go ahead and use that. If now not, or in case you need to use a exclusive signal-in electronic mail deal with, click “Create an account” at the lowest of the screen and undergo the stairs to create and confirm your new Google account.",
      img: "smh5.png",
    },
    {
      title: "Compose our First ad",
      para: "Now, it’s time to grasp a carrot in front of our target audience. What may want to we provide in our AdWords marketing campaign that our target purchaser would be not able to withstand? additionally, what can we do to face out from all of the other advertisements?",
      img: "smh6.png",
    },
    {
      title: "Compose our First ad",
      para: "We need to make that what we provide in our campaign is: \n• Valuable \n• Believable \n• Safe \n• A Killer Call to Action",
      img: "smh6.png",
    },
    {
      title: "Setup Facebook ads",
      para: "• FB attempts to get us setup and spending fast (no wonder!). The onboarding system with fb advertising is quite slick. as soon as we sign up, we’ll be brought about to create our first actual campaign. \n• The first component we’ll do is decide what our target final results ought to be. can we need to get extra “likes”? drive traffic to a certain website? Get human beings to download our app? Or are we looking to convert prospects into bona-fide clients?",
      img: "smh7.png",
    },
    {
      title: "Setup Facebook ads",
      para: "• Subsequent, we’ll determine what kind of advert we need to run, and who that target market is. \n• Then, we’ll should clearly create the advert part of our Facebook advert. We’ll want to determine on photos, the copy we’re going to use and which CTA button to feature — if any! \n• The best information is that we will have several commercials centered towards the equal target audience, and kill the underperformers.",
      img: "smh7.png",
    },
  ];

  var totalLen = Object.keys(obj).length;
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>
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
    </>
  );
};

export default FundraisingSlides;
