import React, { useState } from "react";
import Slide from "../../../components/After knowledge/Slide Format/Slide";

const FinanceforStartupSlides = () => {
  const ndas = [
    {
      title: "FINANCE FOR STARTUPS",
      para: "A startup is a procedure in which you start a business with a low amount of capital and aspire to generate a significant output. However, many entrepreneurs do not have this relatively small sum of money to launch their firm, so you will need to raise this capital. After you've found this money, you'll want to know how to put it to the best possible use. After that, you'll want to keep track of your startup's progress. All of this necessitates comprehension of finance. Founders should also ensure that the company is well-funded at all times.",
      img: "nd1.svg",
    },
    {
      title: "WEEK 1",
      para: "Understanding financial statements is the first step in studying finance, and there are three major financial statements. These financial statements will provide insight into a company's health.",
      img: "nd2.svg",
    },
    {
      title: "BALANCE SHEET",
      para: "The Balance Sheet presents the financial position of a company at a given point in time. It comprises three parts: Assets, Liabilities, and Shareholder's Equity.",
      img: "nd3.svg",
    },
    {
      title: "RIGHT SIDE OF THE BALANCE SHEET",
      para: "Assets are the economic resources of a company. They are the resources that the company uses to operate its business and include Cash, Inventory, and Equipment. (Both financial statements and accounts in financial statements are capitalized.) A company normally obtains the resources it uses to operate its business by incurring debt, obtaining new investors, or through operating earnings",
      img: "nd4.svg",
    },
    {
      title: "Current assets:",
      para: "Current assets are any assets that can be easily converted into cash within one calendar year. Examples- accounts receivables",
      img: "nd5.svg",
    },
    {
      title: "Fixed assets",
      para: "Fixed Assets are assets (both tangible and intangible) that the company owns, which cannot be converted to cash easily or which cannot be liquidated easily. Typical examples of fixed assets are land, plant and machinery, vehicles, building etc.",
      img: "nd6.svg",
    },
    {
      title: "Fixed assets",
      para: "Tangible assets consist of assets which have a physical form. In other words, these assets can be seen or touched. This usually includes plant and machinery, vehicles, buildings, fixtures etc",
      img: "nd7.svg",
    },
    {
      title: "LEFT SIDE OF THE BALANCE SHEET",
      para: "The Liabilities section of the Balance Sheet presents the debts of the company. Liabilities are the claims that creditors have on the company's resources. Within liabilities, there are three subsections – shareholders’ fund, non-current liabilities, and current liabilities. The first section is the shareholders’ funds. The Equity section of the Balance Sheet presents the net worth of a company, which equals the assets that the company owns less the debts it owes to creditors.'Reserves and Surplus' is the following line item on the liability side of the Balance Sheet. Reserves are funds set aside by a firm for a specific reason. The excess is where the company's profits are kept.",
      img: "nd8.svg",
    },
    {
      title: "LEFT SIDE OF THE BALANCE SHEET",
      para: "Consider a hypothetical example of a firm that is issuing its first shares. Consider the following scenario: Company ABC issues 1000 shares, each with a face value of Rs.10. The share capital would be Rs.10 x 1000 = Rs.10,000/- in this situation (Face value X —number of shares).",
      img: "nd9.svg",
    },
    {
      title: "CONSTRUCTING THE BALANCE SHEET",
      para: "In any typical balance sheet, the company’s total assets should be equal to the company’s total liabilities. Hence,Assets = Liabilities The above equation is known as the accounting equation or the balance sheet equation. In fact, this equation reflects the balance sheet's most important property: it must always be balanced. To put it another way, the company's assets should be equal to its liabilities. This is due to the fact that all of a company's assets (assets) must be purchased using either the owner's capital or liabilities.",
      img: "nd10.svg",
    },
    {
      title: "The Profit and Loss statement",
      para: "The Profit and Loss statement is also popularly referred to as the P&L statement, Income Statement, Statement of Operations, and Statement of Earnings. The Profit and Loss statement shows what has transpired during a time period.  The P&L statement reports information on: The revenue of the company for the given period (yearly or quarterly) ,The expenses incurred to generate the revenues ,Tax and depreciation ,The earnings per share number ,",
      img: "nd11.svg",
    },
    {
      title: "Revenue",
      para: "Revenue is a source of income that normally arises from the sale of goods or services and is recorded when it is earned. For example, when a retailer of roller blades makes a sale, the sale would be considered revenue.",
      img: "nd12.svg",
    },
    {
      title: "Expenses:",
      para: "Expenses are the costs incurred by a business over a specified period of time to generate the revenues earned during that same period of time. For example, in order for a manufacturing company to sell a product, it must buy the materials it needs to make the product.",
      img: "nd13.svg",
    },
    {
      title: "Cost of materials consumed-",
      para: "This is invariably the raw material cost that the company requires to manufacture finished goods. You can say, the cost of raw material consumed/raw material is the company’s largest expense.",
      img: "nd14.svg",
    },
    {
      title: "Net income:",
      para: "The Revenue a company earns, less its Expenses over a specified period of time, equals its Net Income. A positive Net Income number indicates a profit, while a negative Net Income number indicates that a company suffered a loss (called a 'net loss')",
      img: "nd15.svg",
    },
    {
      title: "Depreciation-",
      para: "Remember the asset, even though purchased this year, would continue to provide economic benefits over its useful life. Hence it makes sense to spread the cost of acquiring the asset over its useful life. This is called depreciation",
      img: "nd16.svg",
    },
    {
      title: "EBIT",
      para: "It measures how well your company is run. So, it shows that the demand of the company's products or services that's revenue, and it also shows the company's efficiency in delivering these products or services, there are costs and expenses. You get net profit by subtracting interest and tax from the operating profit and it's also called the bottom line.",
      img: "nd17.svg",
    },
    {
      title: "CONSTRUCTING PROFIT/LOSS ACCOUNT",
      para: "CASH FLOW STATEMENT :: The cash flow statement is an important financial statement since it shows how much money the company generates. You could wonder why this information isn't included in the P&L statement. Well, there's a yes and a no to that question  Consider a different laptop-selling business. Let's suppose that the shop only sells one type of laptop at a standard fixed price of Rs.25,000/- per laptop for the purposes intended. Assume the shop sells 20 of these computers on a given day. Therefore, the shop's revenue will be Rs.25,000 x 20 = Rs.500,000/-. What if five of the twenty laptops were purchased on credit? A credit sale occurs when a customer accepts a product today but agrees to pay for it later. Here's how the numbers would appear in this situation:",
      img: "nd18.svg",
    },
    {
      title: "WEEK 2",
      para: "If this shop's total revenue was shown in its P&L statement, it would be Rs.500,000/-, which appears to be a good figure. However, it is unclear how much of this Rs.500,000/- is truly in the company's bank account. What if this corporation had a Rs.400,000 loan that needed to be repaid right away? Despite a sale of Rs.500,000, the company only has Rs.375,000 in its account. This indicates that the company is experiencing a financial shortage and is unable to satisfy its debt obligations.",
      img: "nd19.svg",
    },
    {
      title: "Cash flows from operating activities:",
      para: " Includes the cash effects of transactions involved in calculating net income. A company with healthy operating cash flow is probably profitable and you are doing a good job of cutting its profit into cash, and without additional outside investment, you can finance your growth internally.",
      img: "nd20.svg",
    },
    {
      title: "Cash flows from investing activities:",
      para: "Basically, cash from non-operating activities or activities outside the normal scope of business. This involves items classified as assets in the Balance Sheet and includes the purchase and sale of equipment and investments If this is too low, that might mean that the owner may be treating the business as a cash cow, not investing in the future growth. If this is high, the owner probably has high hopes for the future of the company.",
      img: "nd21.svg",
    },
    {
      title: "Cash flows from financing activities:",
      para: "nvolves items classified as liabilities and equity in the Balance Sheet; it includes the payment of dividends as well as issuing payment of debt or equity. Cash flow from financing activities shows to what extent the company is dependent on outside financing.",
      img: "nd21.svg",
    },
    {
      title: "Financial Ratios",
      para: "Studying the 'Financial Ratios' is the greatest technique to assess financial accounts. Benjamin Graham, also known as the father of fundamental analysis, popularized the theory of financial ratios. Financial ratios are useful for interpreting outcomes and comparing them to past years and organizations in the same industry. A financial ratio by itself doesn't necessarily tell you a lot. What more important is comparison of how a company's financial ratios are changing from one quarter to the other, and how they compare a company's financial ratios with other companies within an industry. Below are the most common ratios used in finance to analyze companies. Particularly if you are interviewing for investment management, equity research or similar finance positions, you may be asked questions about how to calculate common financial ratios and what they signify",
      img: "nd21.svg",
    },
    {
      title:
        "Financial ratios can be ‘somewhat loosely’ classified into different categories, namely –",
      para: "Profitability Ratios, Leverage Ratios, Operating Ratios. ",
      img: "nd21.svg",
    },
    {
      title: "Profitability ratios",
      para: "assist analysts in determining a company's profitability. The ratios indicate how well a business may perform in terms of profit generation. The profitability of a corporation also reflects the management's competitiveness. Profitability is a crucial aspect since earnings are required for business expansion and dividend payments to shareholders.",
      img: "nd21.svg",
    },
    {
      title: "Leverage ratios",
      para: "often known as solvency ratios or gearing ratios, reflect a company's ability to sustain its day-to-day operations over time. Leverage ratios indicate how much debt a company is using to fund its expansion. Remember that the company must pay its debts and commitments in order to continue operating. Solvency ratios assist us in determining a company's long-term viability while keeping its obligations in mind",
      img: "nd21.svg",
    },
    {
      title: "Operating Ratios",
      para: "often known as 'Activity Ratios,' are a set of ratios that indicate how efficiently a company can transform its assets (both current and noncurrent) into revenue. This ratio allows us to determine how effective the company's management is. As a result, Operating Ratios are also known as 'Management Ratios.",
      img: "nd21.svg",
    },
    {
      title: "WEEK-4",
      para: "FINANCIAL PLANNING : Financial planning is the process of putting your ideas into action. You anticipate the financial trajectory of your firm by making assumptions about sales, expenses, and other financial aspects of your organization using data.",
      img: "nd21.svg",
    },
    {
      title: "Why is Financial Planning Important for Startups?",
      para: "Financial planning, in essence, forces you to think strategically about how to best employ your resources and what you hope to achieve. You'll be asked questions like these during the process: How much revenue will we generate? ,What will our churn rate look like? ,How many months of runway will we have? ,How much do we have to spend on sales and marketing? ,How many people can we afford to hire? ,",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "A good plan- This is an excellent strategy. Financial planning that is straightforward to comprehend and implement may frequently determine whether an enterprise succeeds or fails - a solid plan is a highly powerful instrument. (1) Define the core of the company opportunity and the strategy for capitalizing on it, (2) assess financial requirements in terms of -assets needed and -operating needs, and (3) finalize the details.",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "The business strategy is constantly driven by the business opportunity, which in turn drives the financial requirements, sources, and deal structures, as well as the financial strategy.",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "Cash is King, and cash flow is Queen, pointing to the critical role of cash in the overall health of a startup or new business – cash is a startup's lifeblood. One of the most commonly stated causes of business failure is poor cash management.",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "Use other people's resources (OPR), which might be anything that can assist you advertise your idea. The key to a 'less is more' resource approach is control of resources rather than ownership of resources. Bootstrapping entails relying on the bare minimum to demonstrate that you can bring money into the company.",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "Spreadsheets (a double-edged sword) are just pieces of accounting paper that have been computerized. While computer-based analysis is a valuable tool, it may also cause problems for entrepreneurs who are accustomed to worrying about schedules and numbers rather than using facts based on a thorough understanding of the firm.",
      img: "nd21.svg",
    },
    {
      title: "Some of the best FP&A principles to keep in mind",
      para: "If an analysis isn't based on sound views of an opportunity, it's virtually always erroneous. 'Playing with the numbers' is just that – playing if the business potential isn't firmly defined.",
      img: "nd21.svg",
    },
    {
      title: "BURN RATE",
      para: "It's easy to dismiss 'burn rate' as funny startup lingo or a witty subplot on the TV show Silicon Valley. However, a properly determined burn rate is critical for a company's responsible growth, planning, and success. The rate at which a company burns money — usually venture capital — before reaching profitability is known as burn rate or negative cash flow. It's usually computed monthly (for example, a firm with a burn rate of Rs 30,000 per month spends Rs 30,000 per month) and includes both overhead and variable expenses.",
      img: "nd21.svg",
    },
    {
      title: "Startup Burn Rate",
      para: "Cost of growth and unit economics are two of the most critical factors that influence burn rates in most businesses. The charges that go into the operating expenses we mentioned previously are referred to as cost of growth in this context. Costs associated with renting office space, employee salaries, and benefit packages are common examples. The term 'unit economics' refers to the amount of money your organisation makes on each product or service transaction; this figure may be estimated by subtracting each customer's acquisition cost (CAC) from their lifetime value (CLV)",
      img: "nd21.svg",
    },
    {
      title: "What is a good burn rate?",
      para: "As I previously stated, the majority of entrepreneurs and professionals advise keeping at least twelve months of runway on hand at all times. A good burn rate is roughly one-twelfth of your available cash. If you have Rs 6,00,000 in cash, a burn rate of around Rs 50,000 would be ideal.You must understand burn rate as a concept, regardless of the stage of your startup. It's a crucial component that will influence how you spend, forecast, decide whether or not to turn to investors, and make key business decisions",
      img: "nd21.svg",
    },
    {
      title: "Seed Funding",
      para: "If the early phases of the hypothetical company described above appear to be too good to be true, it's because they usually are. While a tiny percentage of companies are lucky enough to expand according to the model stated above, the vast majority of successful startups have gone through multiple rounds of external funding. These funding rounds allow outside investors to put money into a developing firm in exchange for equity, or a portion of the company's ownership. When you hear the terms 'Series A,' 'Series B,' and 'Series C,' these terminology allude to the process of developing a company's reliance on external financing.",
      img: "nd21.svg",
    },
    {
      title: "Seed Funding",
      para: "Depending on the business and the level of interest among possible investors, several sorts of funding rounds are available to companies. It's not commonplace for firms to receive 'seed' capital or angel investor money in the early stages. Following these investment rounds, Series A, B, and C funding rounds, as well as other efforts to raise funds, if necessary, can be pursued. Series A, B, and C are essential components for a company that has decided that bootstrapping, or relying solely on the generosity of friends, family, and the depths of their own pockets, is no longer sufficient.",
      img: "nd21.svg",
    },
    {
      title: "WEEK 4      ",
      para: "VENTURE CAPITAL TERM FUND :The term sheet for a venture capital investment is the blueprint for the investment. Term sheets have a set of codified components, but meanings are often undefined, and participants on either side of the table may have quite different interpretations of what the terms signify. Nonetheless, everyone must anticipate the likelihood of various outcomes for your organization, including its worth and the time and terms of future funding, according to the term sheet. Term sheet is a letter of intent or memorandum of understanding, and it's a basic agreement on the terms of transactions. A term sheet isn't a legal commitment to invest. The term sheet is typically just a contract in the sense that it requires you to keep negotiations private and, in some situations, may bar you from seeking further investors for a period of time. ",
      img: "nd21.svg",
    },
    {
      title: "What is the “Pre-Money” and “Post-Money” Valuation?",
      para: "Pre-Money Valuation refers to how much a company's equity is worth prior to raising funds in a future round of financing when analysing early-stage enterprises. The implied worth of the company's shares grows by the amount of funding raised once the financing round and terms are concluded, resulting in the Post-Money Valuation. The total amount of new finance is added to the pre-money valuation to arrive at the post-money valuation if a company decides to raise capital",
      img: "nd21.svg",
    },
    {
      title: "Pre-Money Valuation Example",
      para: "In our hypothetical situation, a fictional start-up is raising a fresh round of funding, with venture capital investors contributing $6 million. The investors are demanding a 25% ownership stake in the company in exchange for the $6 million in financing. Assumptions for Pre-Money Valuation Pre-Money Valuation: $4 million The cost of a single share is $10.00. The start-up is valued at $10 million post-money, because the pre-money valuation is what a company is judged to be worth before a round of funding. ",
      img: "nd21.svg",
    },
    {
      title: "Post-Money Valuation Example",
      para: "When a corporation decides to raise equity capital through fresh share issuances, the equity value rises by the amount raised, but the share price stays the same. The number of shares issued is proportional to the amount of capital raised, with the pre-money share price serving as the cost basis – that is, the pre-money share price carries over into the following round of financing.",
      img: "nd21.svg",
    },
    {
      title: "VC Valuation Example:",
      para: "often known as solvency ratios or gearing ratios, reflect a company's ability to sustain its day-to-day operations over time. Leverage ratios indicate how much debt a company is using to fund its expansion. Remember that the company must pay its debts and commitments in order to continue operating. Solvency ratios assist us in determining a company's long-term viability while keeping its obligations in mind",
      img: "nd21.svg",
    },
    {
      title: "How to get a fair VC term sheet",
      para: "Although a VC term sheet is non-binding in many ways, it may contain unfamiliar phrases that need to be defined because this plan will be used to influence future investor agreements. As a result, you must safeguard your own and your company's interests. Although legal representation is essential, you must also have a working grasp of words in order to properly negotiate.",
      img: "nd21.svg",
    },
    {
      title: "How to get a fair VC term sheet",
      para: "Work with your partners and advisors to select the terms that are most essential to you and your team, and then concentrate on them. You're not just bargaining for better conditions, but you're also establishing credibility with the VC. If you accept the term sheet 'as is' or inversely debate every issue without compelling justifications, you'll be portraying yourself and your team in an unfavorable light moving forward",
      img: "nd21.svg",
    },
    {
      title: "How to get a fair VC term sheet",
      para: "First, establish the value of your startup and acknowledge that a lesser valuation from a reputable investor may be a better deal than a high valuation from one with a shady track record. Second, recognize the importance of bargaining for a small option plan reserve in the completely diluted pre-money valuation. It may allow you to achieve a higher per-share exit price for your company.",
      img: "nd21.svg",
    },
    {
      title: "How to get a fair VC term sheet",
      para: "Liquidation preference – This determines how much money an investor gets when you sell your firm and can have a big impact on your profit. To understand the actual monetary differences between liquidation preference options, model various projected exit values.",
      img: "nd21.svg",
    },
    {
      title: "How to get a fair VC term sheet",
      para: "Investors have veto power over specified company actions under protective clauses. Some are reasonable, especially for businesses in their early stages, but others, such as those that restrict where you can seek funds or how you can change your certificate of incorporation, may pose problems in the future. Founder vesting – The most crucial factors to consider are: 1) when does vesting begin? 2) Does vesting accelerate (in whole or in part) upon a change of control? 3) Does vesting accelerate (in whole or in part) upon termination without cause?",
      img: "nd21.svg",
    },
    {
      title: "A fair term sheet is good for everyone",
      para: "It's tempting to believe that the investor has complete control while negotiating a term sheet. However, if you are sure in your vision and team, this is your chance to show your worth. You'll be able to gain favorable terms and respect from your new VC partner if you have a good understanding of the challenges, a sensible attitude, and a desire to negotiate fairly.",
      img: "nd21.svg",
    },
  ];

  var totalLen = Object.keys(ndas).length;
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>
      {ndas.map((slide, index) => (
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

export default FinanceforStartupSlides;
