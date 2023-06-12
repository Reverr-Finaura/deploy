import React, { useEffect, useState } from "react";
import "./CommunityNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import { signOut } from "firebase/auth";
import { auth, createNetworkInMessagesDoc, db } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";
import { remove } from "../../features/newUserSlice";
import { removeUserDoc, setUserDoc } from "../../features/userDocSlice";
import { removeUserFundingDoc } from "../../features/userFundingDocSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import brandImg from "../../images/Frame 6266720.png";
import brandImgLight from "../../images/Reverr Light.png";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { VscBellDot } from "react-icons/vsc";
import { FaLightbulb } from "react-icons/fa";
import { setTheme } from "../../features/themeSlice";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import userIcon from "../../images/userIcon.png";
import {AiFillSetting} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
import {IoMdAdd} from "react-icons/io"
import {AiFillBell} from "react-icons/ai"
import {MdOutlineKeyboardArrowDown} from "react-icons/md"
import emailjs from "@emailjs/browser";
import axios from "axios";

const CommunityNavbar = ({ setNavbarPostButtonClick }) => {
  const user = useSelector((state) => state.user);

  const [isSettingButtonClick, setIsSettingbuttonClick] = useState(false);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const [scroll, setScroll] = useState(0);
  const userDoc = useSelector((state) => state.userDoc);
  const [isRequestsButtonClick, setRequestsbuttonClick] = useState(false);
  const [userDocList, setUserDocList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const theme = useSelector((state) => state.themeColor);
  const[loading,setLoading]=useState(false)
  window.onscroll = () => {
    setScroll(window.scrollY);
  };
  console.log("scroll", scroll);
  //CHECK FOR THEME
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  //TOGGLE THEME
  const toggleTheme = () => {
    if (theme === "light-theme") {
      dispatch(setTheme("dark-theme"));
    } else {
      dispatch(setTheme("light-theme"));
    }
  };


  // CHECK FOR USER PHOTO
 useEffect(() => {
  if (userDoc?.image !== "") {
    setUserImage(userDoc.image);
    return;
  }
  if (user?.user?.photoURL !== null) {
    setUserImage(user?.user?.photoURL);
    return;
  } else {
    setUserImage(
      "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
    );
    return;
  }
}, [userDoc]);

useEffect(() => {
  setUserImage(
    "https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Images%2FDefaultdp.png?alt=media&token=eaf853bf-3c60-42df-9c8b-d4ebf5a1a2a6"
  );
}, []);

  //CHECK FOR NOTIFICATION
  useEffect(() => {
    async function fetchNotificationFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (userDoc?.notification?.includes(doc.id)) {
          setNotificationList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
        }
      });
    }
    fetchNotificationFromFirebase();
  }, [isRequestsButtonClick]);

  // CHECK FOR USER DOC LIST WHO HAS REQUESTED FOLLOW
  useEffect(() => {
    async function fetchUserDocListFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (userDoc?.receivedRequests.includes(doc.id))
          setUserDocList((prev) => {
            return [...prev, { ...doc.data(), id: doc.id }];
          });
      });
    }
    fetchUserDocListFromFirebase();
  }, [isRequestsButtonClick]);

  //HANDLE ACCEPT FOLLOW REQUEST
  const handleAcceptFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });

    acceptFollowRequest(id, userData[0]);
  };
  //ACCEPT FOLLOW REQUEST
  const acceptFollowRequest = async (id, userData) => {
    let notificationArray;
    if (!userDoc.notification) {
      notificationArray = [];
    } else {
      notificationArray = userDoc.notification;
    }
    const newNotificationArray = [...notificationArray, userDoc.email];
    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const newNetworkArray = userDoc.network.concat([id]);

    const userDocumentRef = doc(db, "Users", userDoc.email);

    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewNetworkArray = userData.network.concat([
      userDoc.email,
    ]);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
      network: newNetworkArray,
    };
    console.log(
      "userWhoRequestedNewNetworkArray",
      userWhoRequestedNewNetworkArray
    );
    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
        network: newNetworkArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
        network: userWhoRequestedNewNetworkArray,
        notification: newNotificationArray,
      });
      await createNetworkInMessagesDoc(userDoc.email,id);
      toast("Accepted Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE REJECT FOLLOW REQUEST
  const handleRejectFollowRequest = async (id) => {
    const userData = [];
    //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
    const userRef = collection(db, "Users");
    const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === id) {
        userData.push({ ...doc.data(), id: doc.id });
      }
    });
    rejectFollowRequest(id, userData[0]);
  };
  //REJECT FOLLOW REQUEST
  const rejectFollowRequest = async (id, userData) => {
    const newReceivedRequestsArray = userDoc.receivedRequests.filter((item) => {
      return item !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const userWhoRequestedFollowDocRef = doc(db, "Users", id);
    const userWhoRequestedNewsendRequestArray = userData.sendRequests.filter(
      (item) => {
        return item !== user?.user?.email;
      }
    );
    const updatedUserDoc = {
      ...userDoc,
      receivedRequests: newReceivedRequestsArray,
    };

    try {
      await updateDoc(userDocumentRef, {
        receivedRequests: newReceivedRequestsArray,
      });
      await updateDoc(userWhoRequestedFollowDocRef, {
        sendRequests: userWhoRequestedNewsendRequestArray,
      });
      toast("Rejected Follow Request");
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };

  //HANDLE DELETE NOTIFICATION

  const handleDeleteNotification = async (id) => {
    const newNotificationList = notificationList.filter((item) => {
      return item.id !== id;
    });
    const userDocumentRef = doc(db, "Users", userDoc.email);
    const updatedUserDoc = { ...userDoc, notification: newNotificationList };
    try {
      await updateDoc(userDocumentRef, { notification: newNotificationList });
      dispatch(setUserDoc(updatedUserDoc));
    } catch (error) {
      console.log(error.message);
    }
  };



  function generateOTP(n) {
    var add = 1,
      max = 12 - add;
    if (n > max) {
      return generateOTP(max) + generateOTP(n - max);
    }
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

const changePassBtnClick=async()=>{
  setLoading(true)
  const otp = generateOTP(6);
  var templateParams = {
    from_name: "Reverr",
    to_name: userDoc.name,
    to_email: userDoc.email,
    otp,
  };
  try {
    await emailjs.send(
      "service_lfmmz8k",
      "template_n3pcht5",
      templateParams,
      "dVExxiI8hYMCyc0sY"
    )
    await axios.post("https://server.reverr.io/sendSmsCode",
    { to:userDoc?.phone?userDoc?.phone:userDoc?.mobile,code:userDoc?.countryCode,message:`Your Change Password OTP is ${otp}` })

  } catch (error) {
    console.log("FAILED...", error);
    setLoading(false)
    toast.error(error?.response?.data?.message)
  }

  navigate("/change-user-password", {state: otp})
  setLoading(false)
}



  return (
    <>
      <section id={scroll > 1 ? "navbar-finalScrolled" : "navbar-final"}>
        <ToastContainer />
        <div
          onClick={() => navigate("/")}
          className="navbar-brand-logo-img-cont"
        >
          <img
            className="navbar-final-brand-logo-img"
            src={theme === "light-theme" ? brandImg : brandImgLight}
            alt="brand-logo"
          />
        </div>
        <div className="navbar-icons-cont">
          {/* <div className='navbar-topp-social-icon' onClick={toggleTheme}>
        <FaLightbulb className='navbar-changeThemeIcon'/>
        </div> */}

          {/* THEME TOGGLER */}

          {/* <div className="navbar-themeToggler">
            <DarkModeToggle
              mode={theme === "dark-theme" ? "dark" : "light"}
              size="sm"
              inactiveTrackColor="#e2e8f0"
              inactiveTrackColorOnHover="#f8fafc"
              inactiveTrackColorOnActive="#cbd5e1"
              activeTrackColor="#334155"
              activeTrackColorOnHover="#1e293b"
              activeTrackColorOnActive="#0f172a"
              inactiveThumbColor="#1e293b"
              activeThumbColor="#e2e8f0"
              onChange={toggleTheme}
            />
          </div> */}

          {scroll > 150 ? (
            <div
              onClick={() => setNavbarPostButtonClick((current) => !current)}
              className="navbar-topp-social-icon"
            >
              <div
                id="postUploaddSquareCont"
                className="NavbarPostUploaddSquareCont"
              >
              <IoMdAdd className="NavbarPostUploaddSquareContAddImg"/>
                {/* <img
                  className="NavbarPostUploaddSquareContAddImg"
                  src="./images/add.png"
                  alt="addIcon"
                /> */}
              </div>
            </div>
          ) : null}

          {!userDoc.hasUpgrade&&<button onClick={()=>navigate("/upgrade")} className="navbar_final_upgrade_btn">Upgrade</button>}
          <div
            onClick={() => setRequestsbuttonClick((current) => !current)}
            className="navbar-topp-social-icon navbar_noOuterContCSS"
          >
            <AiFillBell
              className={
                userDoc?.receivedRequests?.length === 0 &&
                userDoc?.notification?.length === 0
                  ? "nabar-final-notificationBell"
                  : "nabar-final-notificationBell1"
              }
            />
            {isRequestsButtonClick ? (
              <div className="notifiction-dropdown-cont">
                {userDoc?.receivedRequests?.length === 0 &&
                userDoc?.notification?.length === 0 ? (
                  <p className="notifiction-dropdown-Request-Cont">
                    No New Notification
                  </p>
                ) : null}
                {userDoc?.notification?.map((item) => {
                  return (
                    <>
                      <p
                        className="notifiction-dropdown-Request-Cont"
                        key={item}
                      >
                        <span style={{ height: "fit-content" }}>
                          <img
                            className="notifiction-dropdown-Request-image"
                            src={
                              notificationList?.filter((e) => {
                                return e.id === item;
                              })[0]?.image
                            }
                            alt="requestUsrImg"
                          />
                        </span>
                        <span className="notifiction-dropdown-Request-name">
                          {
                            notificationList?.filter((e) => {
                              return e.id === item;
                            })[0]?.name
                          }
                        </span>{" "}
                        has accepted your follow request
                        <span
                          onClick={() => handleDeleteNotification(item)}
                          className="notifiction-dropdown-Request-reject"
                        >
                          ❌
                        </span>
                      </p>
                    </>
                  );
                })}
                {userDoc?.receivedRequests?.map((item) => {
                  return (
                    <>
                      <p
                        className="notifiction-dropdown-Request-Cont"
                        key={item}
                      >
                        <span style={{ height: "fit-content" }}>
                          <img
                            className="notifiction-dropdown-Request-image"
                            src={
                              userDocList?.filter((e) => {
                                return e.id === item;
                              })[0]?.image
                            }
                            alt="requestUsrImg"
                          />
                        </span>
                        <span className="notifiction-dropdown-Request-name">
                          {
                            userDocList?.filter((e) => {
                              return e.id === item;
                            })[0]?.name
                          }
                        </span>{" "}
                        wants to follow you{" "}
                        <span
                          onClick={() => handleAcceptFollowRequest(item)}
                          className="notifiction-dropdown-Request-accept"
                        >
                          ✅
                        </span>
                        <span
                          onClick={() => handleRejectFollowRequest(item)}
                          className="notifiction-dropdown-Request-reject"
                        >
                          ❌
                        </span>
                      </p>
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>
          
          <img onClick={() => navigate("/userprofile")} className="navbar_final_user_Image" src={userImage?userImage:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userimg" />
          {/* <div className="navbar-topp-social-icon">
          <FaUserAlt className="nabar-final-userProfile-Icon" onClick={() => navigate("/userprofile")}/>
          </div> */}

          <div
            onClick={() => setIsSettingbuttonClick((current) => !current)}
            className="navbar-topp-social-icon setting-social-icon-cont navbar_noOuterContCSS"
          >
           <MdOutlineKeyboardArrowDown className="nabar-final-setting-Icon"/>
            {isSettingButtonClick ? (
              <div className="setting-dropdown-cont">
               
                <button
                  onClick={() => navigate("/userprofile")}
                  className="setting-dropdown-button"
                >
                  My Profile
                </button>

                <button style={{cursor:loading?"default":"",height:"50px"}} disabled={loading}
                  onClick={(e) =>{e.stopPropagation(); changePassBtnClick()}}
                  className="setting-dropdown-button"
                >
                {loading?<img className="navbar_dropdown_changePassword_btn_img" src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a" alt="loader" />:"Change Password"}
                  
                </button>

                {/* <button
                  onClick={() => navigate("/user-edit-profile")}
                  className="setting-dropdown-button"
                >
                  Edit Profile
                </button> */}
                <button
                  onClick={
                    user
                      ? () =>
                          signOut(auth)
                            .then(() => {
                              dispatch(logout());
                              dispatch(remove());
                              dispatch(removeUserDoc());
                              dispatch(removeUserFundingDoc());
                            })
                            .then(() => {
                              toast.success("Sucessfully logged out");
                              navigate("/");
                            })
                      : () => navigate("/login")
                  }
                  className="setting-dropdown-button"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>



        </div>
      </section>
      {chat && <Chat />}
    </>
  );
};

export default CommunityNavbar;
