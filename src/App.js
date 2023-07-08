import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { selectNewUser } from "./features/newUserSlice";
import { login, logout, selectUser } from "./features/userSlice";
import Card from "./pages/AfterSignUp/Cards/Card";
import Auth from "./pages/Auth/Auth";
import SignUpAuth from "./pages/Auth/SignUpAuth";
import SignupAuthUpdated from "./pages/Auth/SignupAuthUpdated";
import EnterOtp from "./pages/EnterOtp/EnterOtp";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import ForgotEmail from "./pages/Forgotemail/ForgotEmail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LoginNew from "./pages/Login/LoginNew";
import PasswordReset from "./pages/PasswordRecover/PasswordReset";
import Experience from "./pages/AfterSignUp/Experience/Experience";
import Industry from "./pages/AfterSignUp/Industry/Industry";
import Onboarding from "./pages/AfterSignUp/Onboarding/Onboarding";
import Education from "./pages/AfterSignUp/Education/Education";
import Gender from "./pages/AfterSignUp/Gender/Gender";
import Review from "./pages/AfterSignUp/Review page/Review";
import Confirmation from "./pages/AfterSignUp/Confirmation/Confirmation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Verification from "./pages/AfterSignUp/Verification/Verification";
import { Toaster } from "react-hot-toast";
import Knowledge from "./pages/Knowledge/Knowledge";
import Mentors from "./pages/Mentors/Mentors";
import MentorsNew from "./pages/Mentors/MentorsNew";
import IdeaValidation from "./pages/AfterKnowledge/Idea Validation & EP/IdeaValidation";
import BusinessPlanning from "./pages/AfterKnowledge/BusinessPlanning/BusinessPlanning";
import Newsletter from "./pages/AfterKnowledge/Newsletter/Newsletter";
import BuildAudience from "./pages/AfterKnowledge/BuildAudience/BuildAudience";
import BusinessModal from "./pages/AfterKnowledge/BusinessModal/BusinessModal";
import BetaTestingOld from "./pages/AfterKnowledge/BetaTesting/BetaTesting";
import ESOP from "./pages/AfterKnowledge/ESOP/ESOP";
import FounderAgreement from "./pages/AfterKnowledge/Founder Agreement/FounderAgreement";

import EquityAndEverything from "./pages/AfterKnowledge/EquityAndEverything/EquityAndEverything";

import IV_Slides from "./pages/AfterKnowledge/Idea Validation & EP/IV_Slides";
import ESOP_Slides from "./pages/AfterKnowledge/ESOP/ESOP_Slides";
import FA_Slides from "./pages/AfterKnowledge/Founder Agreement/FA_Slides";
// import ESOP_Slides from "./pages/AfterKnowledge/Esop/ESOP_Slides";
import Slide from "./components/After knowledge/Slide Format/Slide";
import BetaSlide from "./pages/AfterKnowledge/BetaTesting/BetaSlide";
import FundraisingSlides from "./pages/AfterKnowledge/FundraisingAndMeans/FundraisingSlides";
import FundraisingAndMeans from "./pages/AfterKnowledge/FundraisingAndMeans/FundraisingAndMeans";
import MentorForm from "./pages/MentorForm/MentorForm";
import MentorMoreDetails from "./pages/MentorForm/MentorMoreDetails";
import Mentor from "./pages/Mentor/Mentor";
import Funding from "./pages/Funding/FundingPage/Funding";
import FundingForm from "./pages/Funding/FundingForm";
import MentorProfile from "./pages/MentorProfile/MentorProfile";
import Community from "./pages/Community/Community";
import Schedule from "./pages/Schedule/Schedule";
import ReachingOutSlides from "./pages/AfterKnowledge/ReachingOutToInvestor/ReachingOutSlides";
import BusinessPlanningSlides from "./pages/AfterKnowledge/BusinessPlanning/BusinessPlanningSlides";
import EESlides from "./pages/AfterKnowledge/EquityAndEverything/EESlides";
import FinanceforStartupSlides from "./pages/AfterKnowledge/FinanceForStartup/FinanceforStartupSlides";
import FInanceForStartup from "./pages/AfterKnowledge/FinanceForStartup/FInanceForStartup";
import ReachingOutToInvestor from "./pages/AfterKnowledge/ReachingOutToInvestor/ReachingOutToInvestor";
import SocialMediaSlides from "./pages/AfterKnowledge/SocialMedia/SocialMediaSlides";
import SocialMedia from "./pages/AfterKnowledge/SocialMedia/SocialMedia";
import NotFound from "./pages/NotFound/NotFound";
import BuildAudienceSlides from "./pages/AfterKnowledge/BuildAudience/BuildAudienceSlides";
import BusinessModalSlides from "./pages/AfterKnowledge/BusinessModal/BusinessModalSlides";
import CompetitorAnalysis from "./pages/AfterKnowledge/CompetitorAnalysis/CompetitorAnalysis";
import CompetitorAnalysisSlides from "./pages/AfterKnowledge/CompetitorAnalysis/CompetitorAnalysisSlides";
import ProductDevelopment from "./pages/AfterKnowledge/ProductDevelopment/ProductDevelopment";
import ProductDevelopmentSlide from "./pages/AfterKnowledge/ProductDevelopment/ProductDevelopmentSlide";
import ThinkingOfStartup from "./pages/AfterKnowledge/ThinkingOfStartup/ThinkingOfStartup";
import ThinkingOfStartupSlide from "./pages/AfterKnowledge/ThinkingOfStartup/ThinkingOfStartupSlide";
import Dashboard from "./pages/New Dashboard/Dashboard";
import UserAddProfile from "./pages/User Add Profile/UserAddProfile";
import UserProfile from "./pages/User Profile/UserProfile";
import UserEditProfile from "./pages/User Edit Page/UserEditProfile";
import ChangePassword from "./pages/Change Password/ChangePassword";
import GetFundedPage from "./pages/Get Funded/GetFundedPage";
import CommunityNew from "./pages/Community/CommunityNew";
import CommunityFinal from "./pages/Community/CommunityFinal";
import SharedCommunityPost from "./pages/Shared Community Post/SharedCommunityPost";
import PaymentMentorMeetingSchedule from "./components/Payment For Mentor Meeting Schedule/PaymentMentorMeetingSchedule";
import PPTTemplates from "./pages/PPT Templates/PPTTemplates";
import PPTTemplatesViewer from "./pages/PPT Templates/PPT Templates Viewer/PPTTemplatesViewer";
import DocumentTemplates from "./pages/Document Templates/DocumentTemplates";
import DocumentTemplatesViewer from "./pages/Document Templates/Document Templates Viewer/DocumentTemplatesViewer";
import CheckYourScore from "./pages/Check Your Score/CheckYourScore";
import EquityAndEverythingg from "./pages/New Courses/Courses/EquityAndEverythingg";
import BetaTesting from "./pages/New Courses/Courses/BetaTesting";
import StartupIdea from "./pages/New Courses/Courses/StartupIdea";
import ReachingOutToInvestorr from "./pages/New Courses/Courses/ReachingOutToInvestor";
import OnboardingScreen from "./pages/Onboarding Screens/OnboardingScreen";
import Tools from "./pages/Tools/Tools";
import GoogleSignupInfoPage from "./pages/Onboarding Screens/Google Signup Info Page/GoogleSignupInfoPage";
import RsFiveOneZero from "./pages/RsFiveOneZero/RsFiveOneZero";
import Upgrade from "./pages/Upgrade/Upgrade";
import Chat from "./pages/Chat/Chat";
import DummyTest from "./pages/Dummy Test Page/DummyTest";
// import CompetitorAnalysis from "./pages/New Courses/Courses/CompetitorAnalysis";
// import BuildAudience from "./pages/New Courses/Courses/BuildAudience";
import CommunityFinalDark from "./components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import Test from "./TestPage/Test";
import Discover from "./pages/Discover/Discover";
import Featured from "./pages/Articles/Featured";
import Accounting from "./pages/Articles/Accounting";
import Business from "./pages/Articles/Business";
import Consulting from "./pages/Articles/Consulting";
import Gaming from "./pages/Articles/Gaming";
import Design from "./pages/Articles/Design";
import Enterpreneurship from "./pages/Articles/Enterpreneurship";
import Finance from "./pages/Articles/Finance";
import Healthcare from "./pages/Articles/Healthcare";
import MentorTesting from "./pages/Mentors/MentorTesting";
import ScheduleTesting from "./pages/Schedule/ScheduleTesting";
import MentorSearch from "./pages/MentorSearch/MentorSearch";
import KnowledgeTesting from "./pages/Knowledge/KnowledgeTesting";
import CheckYourScoreTesting from "./pages/Check Your Score/CheckYourScoreTesting";
import CourcePageTesting from "./pages/AfterKnowledge/CourcesPage/CourcePageTesting";
import HomeNotLoggedIn from "./pages/HomeNotLoggedIn/HomeNotLoggedIn";
import EnterOtpUpdated from "./pages/EnterOtpUpdated/EnterOtpUpdated";



function App() {
  const user = useSelector(selectUser);
  const newUser = useSelector(selectNewUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  console.log(user);

  return(
    <>
      <Toaster />
      <Routes>
        {!user && (
          <>
            <Route path="/" element={<LoginNew />} />
            {/* <Route path="/signup" element={<Auth />} /> */}
            <Route path="/signup" element={<SignupAuthUpdated />}></Route>

            <Route path="/login" element={<LoginNew />} />
            <Route path="/community2" element={<HomeNotLoggedIn />}>
              <Route path=":postId" element={<SharedCommunityPost />}></Route>
            </Route>
          </>
        )}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotemail" element={<ForgotEmail />} />
        <Route path="/password-reset" element={<PasswordReset />} />
       
        {newUser ? (
          <Route path="enterotp" element={<EnterOtpUpdated/>}></Route>
        ) : null}

        <Route path="/startup-list" element={<Card />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/startup-confirm" element={<Confirmation />} />
        <Route path="/startup-onboarding" element={<Onboarding />} />
        <Route path="/startup-review" element={<Review />} />
        <Route path="/startup-verification" element={<Verification />} />
        <Route path="/schedule" element={<Schedule />}></Route>
        <Route path="/schedule/:id/:userEmail" element={<ScheduleTesting/>}></Route>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/knowledge" element={<Knowledge />}></Route> */}
        <Route path="/knowledge" element={<KnowledgeTesting />}></Route>
        {/* <Route path="/com" element={<BusinessPlanningSlides />}></Route> */}
        <Route path="/mentors" element={<MentorTesting/>}></Route>
        <Route path="/mentors-search/:category" element={<MentorSearch/>}></Route>
        <Route path="/mentor" element={<Mentor />}></Route>
        <Route path="/mentorform" element={<MentorForm />}></Route>
        <Route path="/mentordetails" element={<MentorMoreDetails />}></Route>
        <Route path="/funding" element={<Funding />}></Route>
        <Route path="/fundingform" element={<FundingForm />}></Route>
        <Route path="/mentor-profile" element={<MentorProfile />}></Route>
        <Route path="/community" element={<Test />}>
          {/* <Route path="/community" element={<CommunityFinalDark />}> */}
          {/* <Route path="/community" element={<CommunityFinal />}> */}
          <Route path=":postId" element={<SharedCommunityPost />}></Route>
        </Route>
        <Route path="/schedule/:id/:userEmail" element={<Schedule />}></Route>
        <Route path="/betaslide" element={<BetaSlide />}></Route>
        <Route path="/eeslides" element={<EESlides />}></Route>
        <Route
          path="/equityandeverything"
          element={<EquityAndEverything />}
        ></Route>
        <Route
          path="/financeforstartup"
          element={<FInanceForStartup />}
        ></Route>
        <Route
          path="/financeforstartupslides"
          element={<FinanceforStartupSlides />}
        ></Route>
        <Route path="/betatesting" element={<BetaTestingOld />}></Route>
        <Route path="/betatestingslides" element={<BetaSlide />}></Route>

        <Route path="/buildingaudience" element={<BuildAudience />}></Route>
        <Route
          path="/buildingaudienceslides"
          element={<BuildAudienceSlides />}
        ></Route>

        <Route path="/buisnessmodal" element={<BusinessModal />}></Route>
        <Route
          path="/buisnessmodalslides"
          element={<BusinessModalSlides />}
        ></Route>

        <Route path="/buisnessplanning" element={<BusinessPlanning />}></Route>
        <Route
          path="/buisnessplanningslides"
          element={<BusinessPlanningSlides />}
        ></Route>

        <Route
          path="/competitoranalysis"
          element={<CompetitorAnalysis />}
        ></Route>
        <Route
          path="/competitoranalysisslides"
          element={<CompetitorAnalysisSlides />}
        ></Route>

        <Route
          path="/productdevelopment"
          element={<ProductDevelopment />}
        ></Route>
        <Route
          path="/productdevelopmentslides"
          element={<ProductDevelopmentSlide />}
        ></Route>

        <Route
          path="/thinkingofstartup"
          element={<ThinkingOfStartup />}
        ></Route>
        <Route
          path="/thinkingofstartupslides"
          element={<ThinkingOfStartupSlide />}
        ></Route>

        <Route path="/esop" element={<ESOP />}></Route>
        <Route path="/esop-slides" element={<ESOP_Slides />}></Route>
        {/* <Route path="/idea-validation" element={<IdeaValidation />}></Route> */}
        <Route path="/idea-validation" element={<CourcePageTesting/>}></Route>
        <Route path="/idea-validation-slides" element={<IV_Slides />}></Route>
        <Route
          path="/fundraising-and-means"
          element={<FundraisingAndMeans />}
        ></Route>
        <Route
          path="/fundraising-and-means-slides"
          element={<FundraisingSlides />}
        ></Route>
        <Route
          path="/reaching-out-to-investor"
          element={<ReachingOutToInvestor />}
        ></Route>
        <Route
          path="/reaching-out-to-investor-slides"
          element={<ReachingOutSlides />}
        ></Route>
        <Route path="/social-media" element={<SocialMedia />}></Route>
        <Route
          path="/social-media-slides"
          element={<SocialMediaSlides />}
        ></Route>
        <Route path="/userprofile" element={<UserProfile />}></Route>
        <Route path="/user-edit-profile" element={<UserEditProfile />}></Route>
        <Route
          path="/change-user-password"
          element={<ChangePassword />}
        ></Route>
        <Route path="/funding-page" element={<GetFundedPage />}></Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/payment"
          element={<PaymentMentorMeetingSchedule />}
        ></Route>
        <Route path="/pptTemplates" element={<PPTTemplates />}></Route>
        <Route
          path="/pptTemplates/:id"
          element={<PPTTemplatesViewer />}
        ></Route>
        <Route
          path="/documentTemplates"
          element={<DocumentTemplates />}
        ></Route>
        <Route
          path="/documentTemplates/:id"
          element={<DocumentTemplatesViewer />}
        ></Route>
        {/* <Route path="/start-up" element={<CheckYourScore />}></Route> */}
        <Route path="/start-up" element={<CheckYourScoreTesting />}></Route>
        <Route
          path="/newcourses/EquityAndEverything"
          element={<EquityAndEverythingg />}
        ></Route>
        <Route path="/newcourses/BetaTesting" element={<BetaTesting />}></Route>
        <Route path="/newcourses/StartupIdea" element={<StartupIdea />}></Route>
        <Route
          path="/newcourses/ReachingOutToInvestor"
          element={<ReachingOutToInvestorr />}
        ></Route>
        <Route path="/OnboardingScreen" element={<OnboardingScreen />}></Route>
        <Route
          path="/onboardingGeneralInfoScreen"
          element={<GoogleSignupInfoPage />}
        ></Route>
        <Route path="/tools" element={<Tools />}></Route>
        {/* <Route path="/rs501" element={<RsFiveOneZero />}></Route> */}
        {/* <Route
          path="/newcourses/CompetitorAnalysis"
          element={<CompetitorAnalysis />}
        ></Route>
        <Route
          path="/newcourses/BuildAudience"
          element={<BuildAudience />}
        ></Route> */}
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/messages" element={<Chat />}></Route>
        <Route path="/dummy_test" element={<DummyTest />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/discover/featured" element={<Featured/>}></Route>
        <Route path="/discover/accounting" element={<Accounting/>}></Route>
        <Route path="/discover/business" element={<Business/>}></Route>
        <Route path="/discover/consulting" element={<Consulting/>}></Route>
        <Route path="/discover/gaming" element={<Gaming/>}></Route>
        <Route path="/discover/design" element={<Design/>}></Route>
        <Route path="/discover/enterpreneurship" element={<Enterpreneurship/>}></Route>
        <Route path="/discover/finance" element={<Finance/>}></Route>
        <Route path="/discover/healthcare" element={<Healthcare/>}></Route>
      </Routes>
    </>
  );
}

export default App;
