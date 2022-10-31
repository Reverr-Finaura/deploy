import React, { useState } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

const EESlides = () => {
  const ee = [
    {
      title: "What Is Equity?",
      para: "Equity, typically referred to as shareholders' equity (or owners' equity for privately held companies), represents the amount of money that would be returned to a company's shareholders if all of th e assets were liquidated and all of the company's debt was paid off in the case of liquidation. In the case of acquisition, it is the value of company sales minus any liabilities owed by the company not transferred with the sale.",
      img: "ee1.svg",
    },
    {
      title: "What Is Equity?",
      para: "In addition, shareholder equity can represent the book value of a company. Equity can sometimes be offered as payment-in-kind. It also represents the pro-rata ownership of a company's shares. Equity can be found on a company's balance sheet and is one of the most common pieces of data employed by analysts to assess a companys financial health.",
      img: "ee1.svg",
    },
    {
      title: "Splitting Equity",
      para: "Well well well, you might think splitting equity is a no-brainer. THAT IS A BIG NO!!!   So, let’s just be very honest. Trust me that’s the biggest misconception you can have if you think so.Mind you, it is the most important consideration while deciding the capital structure of your startup.        Therefore,without further ado, let’s dive deep into it and get a thorough understanding of the so-called “Splitting Equity”.",
      img: "ee2.svg",
    },
    {
      title: "PHASE 1- TREAT EQUITY LIKE GOLD",
      para: "There’s no better way than to learn from others’ shortcomings and modify your plan of action beforehand!So, before jumping directly to structuring and managing our equity, it’s pivotal to understand the biggest pitfalls in handing out early equity, especially when we’re putting the appropriate value on every decision we make.",
      img: "ee2.svg",
    },
    {
      title: "Don't Treat Equity like Monopoly Money",
      para: " The biggest mistake that the entrepreneur ends up making is that they don’t understand the worth of their business idea and are unable to take in the exchange for real value at whatever equity the other side is quoting for!But no! That’s where you’re going wrong despite having everything sailing smoothly! One of our most valuable assets is our equity. In the future, it will likely be the only asset class we own that will likely be worth exponentially more than it is today. We don’t get it back. Giving away equity reduces the future payout we will earn over the rest of our career. The issue is not that equity shouldn't be used - the backbone of the startups in one sense - but that we must recognize just how valuable it is",
      img: "ee3.svg",
    },
    {
      title: "Understand the Future Value of Equity",
      para: "Understanding the future value of equity is just as important as taking some current business decision that might influence the profitability of the business.As we’ve grown up hearing,”Power of compounding works wonders”, that is not all! If you don”t understand its true worth, then I’m sorry to say mate, you didn’t appreciate the time value of equity when you just gave it away to some investor at a high rate - and now you’ll have to pay for it for the rest of our lives.",
      img: "ee4.svg",
    },
    {
      title: "Give Equity as Slowly as Possible",
      para: "Not only do startups go on making hasty decisions by issuing and treating equity like Monopoly money, they also tend to run into issues like giving it away all at once – up front. If it were cash we’d never imagine doing that, but for some reason we’re propelled to think that equity should be a lump sum payment despite the services rendered.",
      img: "ee5.svg",
    },
    {
      title: "Give Equity as Slowly as Possible",
      para: "NOTE- Now, beware! That would mean moving slowly towards disaster. That doesn’t mean we are running out of options as to how we can manage our equity or should we consider giving it out. It simply implies that when we do, we want to retrospect where we were and where we are today and think about the greater angles of the business in the long run.",
      img: "ee6.svg",
    },
    {
      title: "Get it in Writing",
      para: "There can be no plausible explanation as to why we need to wait until we’ve got a final affirmation on our equity arrangements to finally put it on paper. We can gradually start regulating each step individually and then eventually compile them all into a single formalized document with our startup lawyers.",
      img: "ee7.svg",
    },
    {
      title: "Time to Wheel in the Lawyer",
      para: "To paper it up, we require good lawyers who will aid in crafting our documents more seamlessly. Our agenda right now will be to put forward and discuss the substantive issues amongst ourselves and then take notes of whatever we have decided upon and ask our attorneys to translate these decisions into binding, sign-able legal docs.",
      img: "ee8.svg",
    },
    {
      title: " PHASE 2-Stock Structure",
      para: "We need to understand exactly how our stock will be structured to allocate. There are several ways we can counter this on the basis of how we want to manage control of the company.By default, the Founders of a business have equity. They’re directly responsible for the management of the company like paying taxes and covering payroll. On the other side the employees, however, don’t necessarily need to own equity or maintain the same liabilities that founders do. This is where the stock structure bridges the gap",
      img: "ee9.svg",
    },
    {
      title: "Regular Equity",
      para: "Employees can get the same types of shares that managerial people possess implying that they shall be eligible for the same benefits along with the same liabilities. Simply allocating the share amongst a handful of co-founders is different, but doing that across a larger group of people can get way more cumbersome.",
      img: "ee10.svg",
    },
    {
      title: "Drawbacks of Regular Equity",
      para: "Potential control issues with adding more members May not be financially able to buy it back Will likely have tax consequences for the recipient May add members who cannot financially support the business",
      img: "ee11.svg",
    },
    {
      title: "Introduction of control issues.",
      para: "The owner of a legal share in a company often has specific rights, such as voting rights and fiduciary duties. It is not necessary to introduce complex control issues as well if our goal is to create cash incentives on upside",
      img: "ee11.svg",
    },
    {
      title: "Inability to afford to buyback of shares",
      para: "It is likely that there is a fair market value for buying back actual equity. The issue is that we probably won’t have idle cash to “buy someone out”.",
      img: "ee11.svg",
    },
    {
      title: "Tax consequences.",
      para: "If we get handed a share of equity, and that equity has marketable value, the IRS may tax us on the value, regardless of the cashflow to show as evidence. This can become a tight spot for someone. This is a complicated legal and tax matter that requires advisors’ say",
      img: "ee11.svg",
    },
    {
      title: "Recipients can’t financially contribute.",
      para: "Employees do not intend to put money back into the company as their share of ownership to cut down liabilities of the business including paying taxes and absorbing additional costs.",
      img: "ee11.svg",
    },
    {
      title: "May accumulate dormant equity",
      para: "Eventually, if we can't buy back the equity from people who have left, we may end up with a lot of equity holders who aren't contributing any ongoing value while eating up valuable equity that could be used to raise more capital or to reward current employees",
      img: "ee11.svg",
    },
    {
      title: "Stock Options",
      para: "This means that the employee have a privilege to avail the “option” to buy stock in the company at a later date implicating that right now they don’t “own” anything, but if the company chose to go public, they can “exercise” the option to buy stock and earn the benefit at that time.",
      img: "ee12.svg",
    },
    {
      title: "Benefits",
      para: "Minimizes “loss of control” issues compared to equity, Can be easily returned Minimizes tax consequences for employees, Well understood in the startup community. ",
      img: "ee12.svg",
    },
    {
      title: "Drawbacks",
      para: "Employees may not be able to exercise them ,Requires us to value the company ,May create dormant equity holders ",
      img: "ee12.svg",
    },
    {
      title: "Strike Price",
      para: "Most Stock Options have a “strike price” which means the price at which the user can purchase their options. For example, if the Strike Price were $1, we would have the option to buy stock in the company for $1 per share. If the company were worth less than $1 per share, our options would be of no worth. If the company were worth $3 per share, like at the time of a sale, we would buy the options for $1, sell them for $3, thereby making a profit of $2 per share. In startups, stock options are issued with a strike price so that new employees can gain from the surge in the value of the company. During our tenure as employees of the company, if we join at a strike price of $1 and the company's value never exceeds $1, we may not reap any benefit because the company's value didn't improve during our tenure ",
      img: "ee13.svg",
    },
    {
      title: "Benefits of Stock Options",
      para: "Benefits of Stock Optios Zero imposition of control issue. Unless the stock option is availed, the employees would typically have no rights within the company such as voting or other control-based problems. It is typically by design since we don't want a lot of people with no ownership stake to have direct control. ",
      img: "ee14.svg",
    },
    {
      title: "They can easily be returned.",
      para: "If an employee terminates and chooses not to exercise his options, then those options will be forfeited, and the stock would be retained back to reward future employees.",
      img: "ee15.svg",
    },
    {
      title: "Less tax consequence. ",
      para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "ee16.svg",
    },
    {
      title: "Everyone understands them.      ",
      para: "The concept of 'stock options' has become standard fare in the startup world, so even if a potential recipient has not experienced them before, they will most likely understand what they are.",
      img: "ee16.svg",
    },
    {
      title: "Drawbacks of Stock Options ",
      para: "The person who worked for the company for say 5 years, left without exercising their options, and the company sold 4 years later may receive no benefit at all. This might be hard to digest and may not be aligned with how we want to compensate people",
      img: "ee16.svg",
    },
    {
      title: "Requires a valuation.",
      para: "In order to mark a Strike Price at which the employee would pay for their option, it would be necessary to know the valuation of the company. ",
      img: "ee16.svg",
    },
    {
      title: "May create dormant holders.",
      para: "In the event that people exercise their options but do not participate in the business moving forward, we might have to get a dormant cap table      ",
      img: "ee16.svg",
    },
    {
      title: "Phantom Equity",
      para: "People  can be offered the option of holding equity (getting a cash payout) without actually needing to give them equity ownership in the firm. This acts more like a company bonus structure, whereby if the company size gets bigger and bigger, the team gets a percentage of the proceeds     ",
      img: "ee16.svg",
    },
    {
      title: "When to use it",
      para: "When we want to provide the benefits of stock without having to give actual equity ownership units of stock.",
      img: "ee16.svg",
    },
    {
      title: " Benefits",
      para: "No dilution of actual equity, No tax consequence to recipients upon grant, Avoids dormant equity issues ",
      img: "ee17.svg",
    },
    {
      title: " Drawbacks",
      para: "As phantom equity is a contractual right, not an equity stake, we can grant upside without having to issue actual equity ownership shares. For example, we may not want our employees to materially own the company. ",
      img: "ee17.svg",
    },
    {
      title: " No dilution of actual equity.",
      para: "No dilution of actual equity, No tax consequence to recipients upon grant, Avoids dormant equity issues ",
      img: "ee17.svg",
    },
    {
      title: " No tax consequence upon grant",
      para: "NA significant issue in granting equity is that it doesn’t come easy since it is taxable upon transfer. Unless money is exchanged, phantom equity units are not a legal ownership of any actual profit.",
      img: "ee17.svg",
    },
    {
      title: " Avoids dormant equity issues.",
      para: "Phantom equity is not the original equity ownership of the company; technically, the Cap Table will never replace it.  That said, company still might be liable if the phantom equity holders leave and still have provisions in their agreement to be paid on outstanding basis. ",
      img: "ee17.svg",
    },
    {
      title: "Drawbacks of Phantom Equity",
      para: "Investors won't be inquisitive about phantom value since they very much want both proprietorship and the rights that come with equity.",
      img: "ee17.svg",
    },
    {
      title: " Not well-understood in the market.",
      para: "We may discover that potential employees and partners are more interested in learning about a phantom equity plan than in the amount of their grant. We'd have to be ready with a standard description of how the system operates.",
      img: "ee17.svg",
    },
    {
      title: "Employees are taxed as “regular income”.",
      para: "Unlike normal equity gains, which are taxed at a lower rate ('capital gains tax') than regular income in the United States, any benefit received through a phantom equity plan is just regular income to the receiver.",
      img: "ee17.svg",
    },

    {
      title: "Vesting",
      para: "Vesting is a method of allowing members to 'earn' their stock over time or in response to certain milestones. A typical '4-year vesting schedule' means that a company member will earn 25% of their stock each year for a total of four years. This is the equivalent of being paid over time based on our participation, similar to a paycheck, rather than receiving our four-year paycheck all at once and praying everything works out.",
      img: "ee18.svg",
    },
    {
      title: "Vesting Schedule",
      para: " Vesting schedule refers to the period of time it takes for us to earn all of our stock. In the previous example, if our equity has a '4 Year Vest,' we will possess 25% of our total 100% stake at the end of the first year. We shall possess a total of 50% by the end of Year 2 and so on. To earn 100% of our share utilizing a time-based scheme, we must hold it for four years. ",
      img: "ee19.svg",
    },
    {
      title: "Time-Based",
      para: "Equity is built up over a set duration of time (usually in years), with a certain percentage of it vested at each stage. This is the most typical method of vesting equity.",
      img: "ee19.svg",
    },
    {
      title: "Milestone-Based.",
      para: "Equity is obtained when a member meets specific requirements. A salesperson's milestone, for example, could be a specific sales target.",
      img: "ee19.svg",
    },
    {
      title: "Vesting Cliff.",
      para: "Vesting Cliffs are voluntary, but it is a decent idea in general to avoid amassing a large number of short-term employee stock grants. It's unlikely that these employees contributed significantly enough to earn their equity in less than a year .One exception: we may provide shares to select contractors or non-employees who do not require a long-term commitment, in which case we will simply ignore the cliff provision.",
      img: "ee19.svg",
    },
    {
      title: "PHASE 3- SPLITTING EQUITY",
      para: "Ok, let’s assume there are only two partners in the business agreeing on a 50/50 split because that sounds fair. Splitting 50/50 feels just and helps allay doubts about whether one person’s contributions deserve more equity or not.Even split is done when you don’t know how to properly allocate contributions in capital. As it happens, an even split is absolutely OK if it turns out that over the long period, both contribute equally to the business but it’s not that easy as it may look like.",
      img: "ee20.svg",
    },
    {
      title: "What’s Our Contribution Worth Now?",
      para: "We can make a variety of contributions, but they generally fall into two categories: monetary and non-monetary contribution Monetary Contribution The funds that has been invested in the company which has been spent.Contributions in kind. Time (sweat equity), relationships, the concept, and tangible resources are all important. The method of evaluating our contributions is as simple as adding up everyone's current and future contributions and weighing them correc",
      img: "ee21.svg",
    },
    {
      title: "The Value Multiplier",
      para: "Not all contributions are the same. Due to scarcity, some contributions are just more valuable than others.Because of the nature of our business, all contributions come with a risk. Putting $1 of any contribution into a business carries a considerably higher risk than investing that same money in publicly listed stocks or taking a salary. As a result, we use  a 'Value Multiplier' to weight cash and non-monetary contributions separately.",
      img: "ee22.svg",
    },
    {
      title: "Cash Contributions",
      para: "  The easiest to value are monetary contributions. We compute the total value by multiplying the value of the cash invested by the 'value multiplier.' Cash Invested ($1) x Value Multiplier (4x for cash) = $4 Contribution   Cash must have been transferred to the business before it may be considered 'contributed.' I haven't actually invested $1 million if I claim 'I'm putting capital of $1 million to the company' but only put $100 into the account. I need a way to 'commit' the funds, or at the very least a legal arrangement that binds me to either put the remaining balance in or forfeit the value of my investment. ",
      img: "ee23.svg",
    },
    {
      title: "Loans as Cash",
      para: "It's possible that the investment will take the form of a bank loan or another structured investment. Most often, this will necessitate someone physically signing for the loan to secure it. ",
      img: "ee24.svg",
    },
    {
      title: "Non-Cash Contributions",
      para: "Time is the most significant investment made by startups. To value time, we divide the average market rate you'd get paid by 2,000 hours in the year, then multiply by the amount of hours you'll commit.",
      img: "ee25.svg",
    },
    {
      title: "Relationships      ",
      para: "If the contribution was related to an important customer, we'd offer a commission for the commencement, and possibly more if they helped us close the deal. It's important to talk about the commission rate so that the sale price may be allocated. 'What is the market rate for this type of transition?' and 'What trigger ensures it has been provided?'",
      img: "ee25.svg",
    },
    {
      title: "Facilities and Hard Goods",
      para: "Some items, such as office space, equipment, inventory, and tangible products, can have a very 'real' fair market value. Offering these things may appear to have 'monetary value,' but they don't always have the same versatility as cash and hence don't attract the same price value.",
      img: "ee25.svg",
    },
    {
      title: "Ideas and Intangibles",
      para: "It's worth noting that ideas and intangibles don't always necessitate the usage of a Value Multiplier because they don't usually come with any 'risk' attached to them. The Value Multiplier is primarily intended for contributions that would be rewarded without this risk if they had a market value.      ",
      img: "ee25.svg",
    },
    {
      title: "Calculating Year 1 Contributions",
      para: "I’ve contributed cash, non-cash and “one off” contributions (the idea) which each have their own multiplier. This adds up to a total contribution to the company. When we calculate everyone else’s contribution in Year 1 we will use the same formula. This will help us determine how equity splits will work relative to the contribution amount each person will make in Year 1 ",
      img: "ee25.svg",
    },
    {
      title: "Step 1: Lock Down Proposals",
      para: "We can propose our contributions at the beginning of each year, and certainly when we first put up the cap table, we can raise our contribution. Simply prorate the contributions for the first year, and we'll be able to put them on the same schedule as the rest of us do.",
      img: "ee25.svg",
    },
    {
      title: "Step 2: Audit Last Year",
      para: "Following our year-end audit, we will go with the new round of proposals each year, knowing that our understanding of what we want to provide and what we can deliver will likely improve year after year. ",
      img: "ee25.svg",
    },
    {
      title: "Step 3: Next Year Proposals",
      para: "Through the audit, we can calculate each proposed contribution versus the actual contribution and sum up the numbers.",
      img: "ee25.svg",
    },
    {
      title:
        "Question 2: What will our contribution be worth over some period of time?",
      para: "We may preferentially reward members who have more value in Year 1 but don't necessarily continue to pay in that value in following years if we merely consider a single year to account for the overall growth of the firm.",
      img: "ee26.svg",
    },
    {
      title: "What Changes after Year 1?",
      para: " This is the most frequent alteration, and while we address it when we get to 'Question: How do we make adjustments later?' it's worth mentioning because it's so widespread. It's highly probable that any contributions made in the first year will not be used after that year. As a result, allocating a percentage of ownership to someone based on what we expected them to contribute in Year 2 or 3 is a genuine difficulty. ",
      img: "ee26.svg",
    },
    {
      title: "Relative Value Changes.",
      para: "We often require a lot of resources to get started in the first year — legal, marketing, accounting, engineering, design, and so on. Those were crucial in Year 1 to getting us off the ground, but their relative significance will certainly shift once we're up and going. Our attorney may be the most important person when we need thousands of dollars in legal work to get started, but it doesn't indicate their relative contribution in Year 2 and past that will be the same.",
      img: "ee26.svg",
    },
    {
      title: "Individual Contributions Change.",
      para: "In the first year, I may have put $50,000 into the business, in addition to my time. But, if I didn't put in another $50,000 in Year 2, wouldn't my contribution in Year 2 be lower? Right, if you think so.  We must ensure that the value of your investment in Year 1 is not at par with that in Years 2 and beyond.",
      img: "ee26.svg",
    },
    {
      title: "One-Time Contributions Expire (this is a big one!)",
      para: "Many of our contributions will be one-time, usually in the first year. These often include the concept, relationships, financial investments, and other resources. We'll come to regret it if we merely project our Year 1 contributions as if they'll be made every year after tha",
      img: "ee26.svg",
    },
    {
      title: "How do we make adjustments later?",
      para: "The next years (and adjustments) are quite similar to the first year, with one exception: our equity may swing quite one way or the other in the future years, which tends to frighten people. Technically, we should all support the contribution we attempted to make and ensure that everyone gets what they deserve, but we've previously proven that this is unlikely to happen",
      img: "ee27.svg",
    },
    {
      title: "Most Common Clawback Provisions",
      para: "Someone is fired for an apparent reason-   This means someone was  fired for a good reason — they did something that was materially wrong. This might include everything from job performance to illegal conduct, but it would be mentioned as ' out of limits' in the Operating Agreement (for members), Stock Agreement (for participants), or Employment Agreement (for everyone). Termination for cause usually results in a considerably higher Clawback penalty, and in some situations, benefits may be revoked entirely.      ",
      img: "ee28.svg",
    },
    {
      title: "Someone is fired for no apparent reason-",
      para: "Without reason' suggests the individual did not do something improper on purpose. This could be due to a workforce downsizing or someone simply resigning. We may have a minimal clawback or none at all in this scenario. These are usually deviations from mutually agreed-upon circumstances, or at the very least, ones that do not affect the organisation purposely'",
      img: "ee28.svg",
    },
    {
      title: "The Exercise Period ends. ",
      para: "A stock returns to the Cap Table when an 'exercise window' expires. It usually occurs if a Stock Option is not exercised within the specified period. The issue may not be whether or not there was a termination for cause, but how the exercise window is allocated and elapsed.",
      img: "ee28.svg",
    },
    {
      title: "Plan for Change",
      para: "The key to knowing how long-term equity splits operate is to comprehend that practically everything changes and evolves over time, so the decisions we make now must account for the multitudes of big changes in value and contribution that will occur over the next decade or longer.",
      img: "ee29.svg",
    },
    {
      title: "Skill Value Changes      ",
      para: "It's common for us to take on the tasks of entire departments or C-level executives in our early days, but the overall value or skill level of our efforts may be primarily predicated on the fact that no one else is willing to do them!",
      img: "ee29.svg",
    },
    {
      title: "Time Investment Changes",
      para: "My time investment can go from 'every minute, all the time' to 'whenever I can find the time' in a matter of seconds. It's unrealistic to think that no life events will ever occur and that our time commitments will never alter. As a result, we must know what to do if and when our future time commitments diverge from our current work obligations",
      img: "ee30.svg",
    },
    {
      title: "Capital Investment Changes",
      para: "The sum required by the organization will fluctuate significantly over time. Say  $10,000 in investment may seem like a large sum today, but it will be a day's earnings in a few years. While there is undoubtedly a premium to be gained by investing early, there is also a realistic limit to how much of the cap table one should receive.",
      img: "ee30.svg",
    },
    {
      title: " Founding Team Changes",
      para: "The issue with validating a 'founding team' and the ownership stakes that people receive is that often the sole qualification for stock is that everyone agrees to stay on for the foreseeable future. However, unlike working for a pay, when our only obligation is to show up every day, working on a startup means we may never receive a payday, which tends to drive people away. As a result, regardless of how strongly the Founders feel about their current commitment to the company, it's critical that they make some basic arrangements for what would happen if that commitment changes",
      img: "ee30.svg",
    },
    {
      title: "Dormant Equity",
      para: "The crux of all of these changes usually results in one major problem: dormant equity. When the Cap Table fills up with participants who possess a share in the company but don't participate in its growth any longer, this is known as dormant equity.",
      img: "ee30.svg",
    },
  ];

  var totalLen = Object.keys(ee).length;
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>
      {ee.map((slide, index) => (
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

export default EESlides;
