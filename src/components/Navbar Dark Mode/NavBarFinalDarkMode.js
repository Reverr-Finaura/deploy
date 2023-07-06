import React, { useState, useRef } from "react";
import style from "./NavbarFinalDarkMode.module.css";
import products from "../../assets/Products/products";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import { signOut } from "firebase/auth";
import { auth, createNetworkInMessagesDoc, db } from "../../firebase";
import { logout, selectUser } from "../../features/userSlice";
import { remove } from "../../features/newUserSlice";
import { removeUserDoc, setUserDoc } from "../../features/userDocSlice";
import { removeUserFundingDoc } from "../../features/userFundingDocSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { VscBellDot } from "react-icons/vsc";
import { FaLightbulb, FaFacebookMessenger } from "react-icons/fa";
import { setTheme } from "../../features/themeSlice";
import { DarkModeToggle } from "@anatoliygatt/dark-mode-toggle";
import userIcon from "../../images/userIcon.png";
import settingIcon from "../../images/Vector (3).png";
import ReverrLightIcon from "../../images/Reverr Light.png";
import ReverrDarkIcon from "../../images/new-dark-mode-logo.png";
import {
  AiFillBell,
  AiFillSetting,
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineGlobal,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineNotifications,
} from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineTemplate } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import axios from "axios";
import NotificationCard from "./NotificationCard";

const NavBarFinalDarkMode = () => {
  const user = useSelector((state) => state.user);
  const userTypeLower = useSelector((state) =>
    state.onboarding.userType.toLowerCase()
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [isSettingButtonClick, setIsSettingbuttonClick] = useState(false);
  const [isRequestsButtonClick, setRequestsbuttonClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const userDoc = useSelector((state) => state.userDoc);
  const [userDocList, setUserDocList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const theme = useSelector((state) => state.themeColor);
  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResult, setsearchResult] = useState(null);
  const [userData, setUserData] = useState([]);
  const userType = useSelector((state) => state.onboarding.userType);
  window.onscroll = () => {
    setScroll(window.scrollY);
  };
  const [notificationOpen, setNotificationOpen] = useState(false);

  // code for product modal start
  const elementsToCheck = ["VIBE", "PATCH", "KNOWLEDGE", "EVENTS"];
  const filteredArray = elementsToCheck.filter((element) =>
    products[userTypeLower].includes(element)
  );
  // console.log("filtered array" +filteredArray);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleProductModal = () => {
    setIsProductModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      isProductModalOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsProductModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProductModalOpen]);

  // code for product modal end

  // Start functionality for search bar
  async function fetchUserDataFromFirebase(type) {
    const userDataRef = collection(db, "Users");
    let q;

    if (type !== "") {
      q = query(userDataRef, where("userType", "==", type));
    } else {
      q = query(userDataRef);
    }

    const querySnapshot = await getDocs(q);

    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push({ ...doc.data(), id: doc.id });
    });

    return userData;
  }

  useEffect(() => {
    async function fetchData() {
      const userData = await fetchUserDataFromFirebase(userType);
      setUserData(userData);
    }
    fetchData();
  }, []);

  const getFilterData = (data, input, key) => {
    return data.filter((item) => {
      return item[key].toLowerCase().includes(input);
    });
  };

  const searchInputHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === "") {
      setsearchResult(null);
    } else {
      const key = "name";
      const filteredData = getFilterData(userData, input, key);
      setsearchResult(filteredData);
    }
  };
  // End functionality for search bar

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

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

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
        if (userDoc?.receivedRequests?.includes(doc.id))
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
      await createNetworkInMessagesDoc(userDoc.email, id);
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

  const changePassBtnClick = async () => {
    setLoading(true);
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
      );
      await axios.post("https://server.reverr.io/sendSmsCode", {
        to: userDoc?.phone ? userDoc?.phone : userDoc?.mobile,
        code: userDoc?.countryCode,
        message: `Your Change Password OTP is ${otp}`,
      });
    } catch (error) {
      console.log("FAILED...", error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }

    navigate("/change-user-password", {
      state: otp,
    });
    setLoading(false);
  };

  return (
    <>
      {isProductModalOpen ? (
        <div className={style.productModalCont}>
          <div className={style.productModal} ref={modalRef}>
            <text style={{ color: "#A7A7A7", fontSize: 12 }}>KEY PRODUCTS</text>
            <div className={style.productContainer}>
              {filteredArray.includes("VIBE") ? (
                <div>
                  <img src={require("../../images/swipe.png")} alt="img" />
                  <div>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Vibe
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                    >
                      Networking with a swipe.
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("KNOWLEDGE") ? (
                <div>
                  <img src={require("../../images/book1.png")} alt="img" />
                  <div>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Knowledge
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                    >
                      Check out our tailor-made roadmap of courses.
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("PATCH") ? (
                <div>
                  <img
                    src={require("../../images/peoplearrow.png")}
                    alt="img"
                  />
                  <div>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Patch
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                    >
                      1:1 networking
                    </text>
                  </div>
                </div>
              ) : null}
              {filteredArray.includes("EVENTS") ? (
                <div>
                  <img src={require("../../images/playbutton.png")} alt="img" />
                  <div>
                    <text
                      style={{
                        fontSize: 14,
                        color: "#ffffff",
                      }}
                    >
                      Events
                    </text>
                    <text
                      style={{
                        fontSize: 10,
                        color: "#A7A7A7",
                      }}
                    >
                      Join a plethora of exciting events!
                    </text>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <section id={scroll > 1 ? style.navbarFinalScrolled : style.navbarFinal}>
        <ToastContainer />
        <div
          onClick={() => navigate("/")}
          className={style.navbarBrandLogoImgCont}
        >
          {/* <img
            className="navbar-final-brand-logo-img"
            src={theme === "light-theme" ? ReverrDarkIcon : ReverrLightIcon}
            alt="brand-logo"
          /> */}
          <img
            className={style.navbarFinalBrandLogoImg}
            src={ReverrDarkIcon}
            alt="brand-logo"
          />
          <span className={style.reverrHeadingSpan}>
            <p className={style.reverrHeading}>Reverr</p>
          </span>
        </div>

        <div className={style.navbarSearch}>
          <AiOutlineSearch className={style.navbarSearchImg} />
          <input
            className={style.navbarSearchInput}
            onChange={searchInputHandler}
            placeholder="Search"
          />
          {searchResult && (
            <div className={style.navbarSearchResult}>
              <text style={{ color: "#00B3FF", fontSize: 15, marginBottom: 5 }}>
                Search Results
              </text>
              {searchResult.map((item, index) => (
                <div key={index}>
                  <div>
                    <img
                      src={
                        item?.image
                          ? item.image
                          : require("../../images/userIcon.png")
                      }
                      alt="img"
                    />
                    <div>
                      <text
                        style={{
                          fontSize: 14,
                          color: "#000000",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item?.name}
                      </text>
                      <text
                        style={{
                          fontSize: 10,
                          color: "#1A1E28",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item?.designation}
                      </text>
                    </div>
                  </div>
                  <div className={style.divider}></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={style.navbarIconsCont}>
          <div className={style.allNavbarIconsImgName}>
            <div className={style.navbarIconsImgName}>
              <BiHomeAlt className={style.navbarIconsImg} />
              <p className={style.navbarIconsName}>Home</p>
            </div>
            <div className={style.navbarIconsImgName}>
              <AiOutlineGlobal className={style.navbarIconsImg} />
              <NavLink className="navlinks" to="/discover">
                <p className={style.navbarIconsName}>Discover</p>
              </NavLink>
            </div>
            {filteredArray.length >= 1 ? (
              <div
                className={style.navbarIconsImgName}
                onClick={toggleProductModal}
                ref={buttonRef}
              >
                <HiOutlineTemplate className={style.navbarIconsImg} />
                <p className={style.navbarIconsName}>Products</p>
              </div>
            ) : null}
            <div className={style.navbarIconsImgName}>
              <AiOutlineMessage className={style.navbarIconsImg} />
              <p className={style.navbarIconsName}>Messages</p>
            </div>
            <div
              onClick={() => setNotificationOpen(!notificationOpen)}
              className={style.navbarIconsImgName}
            >
              <MdOutlineNotifications className={style.navbarIconsImg} />
              <p className={style.navbarIconsName}>Notifications</p>
              {notificationOpen && (
                <>
                  <div className={style.notificationBar}>
                    {notificationList.length >= 1 ? (
                      <>
                        {" "}
                        <div className={style.notificationHeadings}>
                          <h1 className={style.notificationHeading}>
                            Notifications
                          </h1>
                          {/* <h3 className={style.notificationSubHeading}>Today</h3> */}
                        </div>
                        <NotificationCard />
                        <NotificationCard />
                        <NotificationCard />
                      </>
                    ) : (
                      <h4>No notification till Now !</h4>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {!userDoc.hasUpgrade && (
            <button
              className={style.navbarFinalUpgradeBtn}
              onClick={() => navigate("/upgrade")}
            >
              Get Premium
            </button>
          )}

          <div
            onClick={() => setRequestsbuttonClick((current) => !current)}
            className="navbar-topp-social-icon navbar_noOuterContCSS"
          >
            {/* <AiFillBell
              className={
                userDoc?.receivedRequests?.length === 0 &&
                userDoc?.notification?.length === 0
                  ? "nabar-final-notificationBell"
                  : "nabar-final-notificationBell1"
              }
            /> */}

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

          <img
            onClick={() => navigate("/userprofile")}
            className="navbar_final_user_Image"
            src={
              userImage
                ? userImage
                : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
            }
            alt="userimg"
          />
          {/* <div className="navbar-topp-social-icon">
          <FaUserAlt className="nabar-final-userProfile-Icon" onClick={() => navigate("/userprofile")}/>
          </div> */}

          <div
            onClick={() => setIsSettingbuttonClick((current) => !current)}
            className="navbar-topp-social-icon setting-social-icon-cont navbar_noOuterContCSS"
          >
            {/* <AiFillSetting className="nabar-final-setting-Icon"/> */}
            <MdOutlineKeyboardArrowDown className="nabar-final-setting-Icon" />

            {isSettingButtonClick ? (
              <div className={style.settingDropdownCont}>
                <button
                  onClick={() => navigate("/userprofile")}
                  className="setting-dropdown-button"
                >
                  My Profile
                </button>

                <button
                  style={{ cursor: loading ? "default" : "", height: "50px" }}
                  disabled={loading}
                  onClick={(e) => {
                    e.stopPropagation();
                    changePassBtnClick();
                  }}
                  className="setting-dropdown-button"
                >
                  {loading ? (
                    <img
                      className="navbar_dropdown_changePassword_btn_img"
                      src="https://firebasestorage.googleapis.com/v0/b/reverr-25fb3.appspot.com/o/Utils%2FWHITE%20Spinner-1s-343px.svg?alt=media&token=54b9d527-0969-41ff-a598-0fc389b2575a"
                      alt="loader"
                    />
                  ) : (
                    "Change Password"
                  )}
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

export default NavBarFinalDarkMode;
