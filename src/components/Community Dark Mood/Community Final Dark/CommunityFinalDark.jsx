import React, { useEffect, useRef, useState } from "react";
import style from "./CommunityFinalDark.module.css";
import KnowledgeNavbar from "../../../components/KnowledgeNavbar/KnowledgeNavbar";
import CommunityNavbar from "../../../components/Community Navbar/CommunityNavbar";
import SidebarFinal from "../../../components/Sidebar Final/SidebarFinal";
import NavBarFinalDarkMode from "../../Navbar Dark Mode/NavBarFinalDarkMode";
import PhnSidebar from "../../../components/PhnSidebar/PhnSidebar";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from "../../../components/Post Card/PostCard";
import PostCardDark from "../../../components/Community Dark Mood/Post Card Dark Mode/PostCardDark";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../../features/userDocSlice";
import PostSkeleton from "../../../components/Post Skeleton/PostSkeleton";
import CommunityUserProfilePopup from "../../../components/Community User Profile Popup/CommunityUserProfilePopup";
import { Outlet } from "react-router-dom";
import CommunitySidebar from "../../../components/Community Sidebar/CommunitySidebar";
// import expandTextAreaIcon from "../../images/addExpandTextArea.png";
import axios from "axios";
import CommunityNews from "../../../components/Community News/CommunityNews";
import NewSkeleton from "../../../components/Post Skeleton/News Skeleton/NewSkeleton";
import { RxCrossCircled } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

// import SortingNavbarTest from ".././Sorting Navbar Test/SortingNavbarTest";

import NoFollowingCard from "../../../components/No Following Card/NoFollowingCard";
import {
  MdOutlineAddPhotoAlternate,
  MdVideoCameraBack,
  MdLocationOn,
  MdPoll,
} from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { RiFileSearchLine } from "react-icons/ri";
// import SortingNavbarTwoOption from "./Sorting Navbar Two Options/SortingNavbarTwoOptions";
import { setUserSpace } from "../../../features/userSlice";
import Appoinments from "../../SidebarComponents/Appoinments/Appoinments";
import TrendingNews from "../../SidebarComponents/TrendingNews/TrendingNews";
import Events from "../../SidebarComponents/Events/Events";
import Mentors from "../../SidebarComponents/Mentors/Mentors";
import darkSparkle from "../../../images/black-sparkle.png";
import { auth } from "../../../firebase";
import DiscoverEvents from "../../DynamicComponents/DiscoverEvents/DiscoverEvents";
import DiscoverPerfectTools from "../../DynamicComponents/DiscoverPerfectTools/DiscoverPerfectTools";
import FeaturedSuggestions from "../../DynamicComponents/FeaturedSuggestions/FeaturedSuggestions";
import FeaturedMentors from "../../DynamicComponents/FeaturedMentors/FeaturedMentors";

const CommunityFinalDark = () => {
  const userSpace = useSelector((state) => state.user.userSpace);
  const [userSpaceArr, setUserSpaceArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPostUserspace, setIsOpenPostUserspace] = useState(false);
  const [postSpaceArr, setPostSpaceArr] = useState([]);
  const [postBtnVisible, setPostBtnVisible] = useState(false);

  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const dispatch = useDispatch();
  const postData = [];
  const [width, setWidth] = useState(window.innerWidth);
  const [postsData, setPostsData] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [tempImageURL, setTempImageURL] = useState(null);
  const chooseFileRef = useRef(null);
  const [newPostText, setNewPostText] = useState("");
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const [newPostdataId, setNewPostDataId] = useState([]);
  const [editPostButtonClick, setEditPostButtonClick] = useState(false);
  const [newEditText, setNewEditText] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [textAreaIsClick, setTextAreaIsClick] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [navbarPostButtonClick, setNavbarPostButtonClick] = useState(false);
  const [postsAuthorIsClick, setPostsAuthorIsClick] = useState(false);
  const [postsAuthorInfo, setPostsAuthorInfo] = useState(null);
  const [sortOptionSelected, setSortOptionSelected] = useState({
    time: "Newest",
    whose: "Everything",
  });
  const [sortOptionClick, setSortOptionClick] = useState(false);
  const [furtherSortOptionClick, setfurtherSortOptionClick] = useState(false);

  const [postIdExist, setPostIdExist] = useState("");
  const [newScoll, setNewScroll] = useState(0);
  const [newsData, setNewsData] = useState();
  const [singleNews, setSingleNews] = useState(null);
  const [blogArray, setBlogArray] = useState([]);
  const [seeAllNewsIsClicked, setSeeAllNewsIsClicked] = useState(false);
  const [mySpaceStatus, setMySpaceStatus] = useState(true);
  const [whatHotStatus, setWhatHotStatus] = useState(false);
  const [spaceFilteredPost, setSpaceFilteredPost] = useState([]);
  const [whatsHotCommunityPost, setWhatsHotCommunityPost] = useState([]);
  const [postSpaceFilled,setPostSpaceFilled] = useState(false);
  const [postSpaceData , setPostSpaceData]=  useState();

  //FETCH LATEST NEWS
  const options = {
    method: "GET",
    url: "https://api.bing.microsoft.com/v7.0/news/search",
    params: { q: "startup", safeSearch: "Off", textFormat: "Raw" },
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "bd03e8f8f29b46479ee4c2004280308f",
    },
  };

  async function getNews() {
    try {
      await axios.request(options).then((res) => {
        setNewsData(res.data.value);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  window.onscroll = () => {
    setScroll(window.scrollY);
  };

  // console.log("postsData", postsData);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updateScroll = () => {
    setNewScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  //GET SITE URL
  useEffect(() => {
    function getCurrentURL() {
      return window.location.href;
    }
    const url = getCurrentURL();
    const subUrl = url.indexOf("y");
    setPostIdExist(url.slice(subUrl + 2));
  }, []);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          setCurrentUserDoc(doc.data());
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  //CHECK IF USERDOC HAS POSTS
  useEffect(() => {
    if (userDoc?.posts) {
      setNewPostDataId(userDoc?.posts);
      return;
    }
  }, [userDoc]);


  //FETCH POSTS DATA FROM FIREBASE
  useEffect(() => {
    async function fetchPostsFromDb() {
      const postRef = collection(db, "Posts");
      const q = query(postRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        postData.push({ ...doc.data(), id: doc.id });
      });

      setSpaceFilteredPost(postData);

      setPostsData(
        postData.sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds;
        })
      );

      console.log("this is the filtered post ", postsData);

      let postDataAllLikesLength = 0;
      postsData.map((post) => {
        postDataAllLikesLength += post.likes.length;
      });

      const likesAverage = Math.round(
        postDataAllLikesLength / postsData.length
      );
      setWhatsHotCommunityPost(
        postsData.filter((post) => {
        
          return post.likes.length >= likesAverage;
        })
      );
    

      if (sortOptionSelected.time === "") {
        setPostsData(
          postData.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Popular Now") {
        setPostsData(
          postData.sort((a, b) => {
            return b.likes.length - a.likes.length;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Newest") {
        setPostsData(
          postData.sort((a, b) => {
            return b.createdAt.seconds - a.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
      if (sortOptionSelected.time === "Oldest") {
        setPostsData(
          postData.sort((a, b) => {
            return a.createdAt.seconds - b.createdAt.seconds;
          })
        );
        furtherSortPost();
      }
    }
    fetchPostsFromDb();
  }, [sortOptionSelected, whatHotStatus]);

  //FURTHER SORT POST AFTER INITIAL SORT
  const furtherSortPost = () => {
    if (sortOptionSelected.whose === "Everything") {
      setPostsData(postData);
      return;
    }
    if (sortOptionSelected.whose === "People You Follow") {
      const newData = postData.filter((item) => {
        return userDoc.network.includes(item.postedby.id);
      });
      setPostsData(newData);
    }
  };

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 6;
  const pagesVisited = pageNumber * postsPerPage;
  const displayPosts = postsData.slice(0, pagesVisited + postsPerPage);
  console.log("postData are here: ", postsData);
  // const pageCount=Math.ceil(postsData.length/notesPerPage)
  const fetchMorePosts = () => {
    setTimeout(() => {
      setPageNumber(pageNumber + 1);
    }, 1000);
  };

  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };

  const RemoveFile = () => {
    setImageUpload(null);
    setTempImageURL(null);
  };

  //ON IMAGE CHANGE
  function onImageChange(e) {
    setImageUpload(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      setTempImageURL(URL.createObjectURL(fileURL));
    }
  }
  // UPLOAD IMAGE TO FIREBASE

  const uploadImageToFireBase = async () => {
    if (imageUpload === null && newPostText === "") {
      toast("Nothing To Post");
      return;
    }
    toast("Processing Your Request");
    if (imageUpload === null) {
      createNewPost("");
      return;
    } else if (imageUpload !== null) {
      const imageReff = ref(
        storage,
        `Community/Posts/${imageUpload.name + new Date().getTime()}`
      );
      const uploadTask = uploadBytesResumable(imageReff, imageUpload);
      try {
        await uploadBytes(imageReff, imageUpload);

        // GET URL OF IMAGE UPLOADED IN FIREBASE
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createNewPost(downloadURL);
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  //UPLOAD NEW POST TO FIREBASE
  const createNewPost = async (item) => {
    const userRef = doc(db, "Users", user?.user?.email);
    toast("Processing Your Request");
  
    try {
      const timeId = new Date().getTime().toString();
      let newPostId = [...newPostdataId];

      await setDoc(doc(db, "Posts", timeId), {
        comments: [],
        createdAt: new Date(),
        image: item,
        likes: [],
        postedby: userRef,
        text: newPostText,
        postSpace: postSpaceData,
      });
      newPostId.push(timeId);

      updateUserDatabase(newPostId);
    } catch (error) {
      console.log(error.message);
    }
  };

  //UPDATE USER DATABSE IN FIREBASE

  const updateUserDatabase = async (id) => {
    const userDocumentRef = doc(db, "Users", user?.user?.email);

    try {
      await updateDoc(userDocumentRef, { posts: id });

      toast("Sucessfully Posted");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  // HANDLE EDIT POST BUTTON CLICK
  const handleEditPostButtonClick = (item, itemId) => {
    setEditPostButtonClick(true);
    setNewEditText(item.text);
    setEditPostId(itemId);
    if (item.image !== "") {
      setTempImageURL(item.image);
    }
  };

  // EDIT POST CHECK
  const EditPost = async () => {
    toast("Processing Your Request");
    toast("Processing Your Request");
    if (imageUpload === null && newEditText === "") {
      toast("Nothing To Edit");
      return;
    }
    if (imageUpload === null) {
      EditPostInDatabase(tempImageURL);
      return;
    } else if (imageUpload !== null) {
      const imageReff = ref(
        storage,
        `Community/Posts/${imageUpload.name + new Date().getTime()}`
      );
      const uploadTask = uploadBytesResumable(imageReff, imageUpload);
      try {
        await uploadBytes(imageReff, imageUpload);

        // GET URL OF IMAGE UPLOADED IN FIREBASE
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          EditPostInDatabase(downloadURL);
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  //EDIT POST IN DATABASE

  const EditPostInDatabase = async (imageURLL) => {
    const postRef = doc(db, "Posts", editPostId);

    try {
      await updateDoc(postRef, { image: imageURLL, text: newEditText });

      toast("Sucessfully Saved");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  //FETCH BLOG DATA FROM FIREBASE

  useEffect(() => {
    async function fetchBlogsFromDb() {
      const blogRef = collection(db, "Blogs");
      const q = query(blogRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setBlogArray((prev) => {
          return [...prev, { ...doc.data(), id: doc.data().id }];
        });
      });
    }
    fetchBlogsFromDb();
  }, []);

  const ArticleDummyData = [
    {
      id: "1",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "2",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "3",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "4",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "5",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "6",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
    {
      id: "7",
      text: "That changes today with the news that Ampeco has raised a se ",
    },
  ];

  // below code is for the userspace
  const [activeIndex, setActiveIndex] = useState([]);

  const handleSpaceMenuDataClick = (index, event, value) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index)); // Remove the index if it's already active
    } else {
      setActiveIndex([...activeIndex, index]); // Add the index if it's not active
    }
    // setIsSpaceMenuDataActive(!isSpaceMenuDataActive)
    setUserSpaceArr((prevOptions) => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter((option) => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };
  const [selectedCommunitySpace, setSelectedCommunitySpace] = useState([]);

  function handleModalSubmit() {
    if (userSpaceArr.length >= 1) {
      dispatch(setUserSpace(userSpaceArr));
      setSelectedCommunitySpace(userSpaceArr);
      setIsOpen(false);
    } else {
      window.alert("Please choose atleast one!");
    }
  }


  function openTheSpaceModal() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  function handleModalClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (postsData.length >= 1 && selectedCommunitySpace.length >= 1) {
      const filteredData = postsData.filter((eachElement) => {
        if (Array.isArray(eachElement.postSpace)) {
          return eachElement.postSpace.some((value) =>
            selectedCommunitySpace.includes(value)
          );
        }
      });
      setSpaceFilteredPost(filteredData);
    }
    
  }, [postsData, selectedCommunitySpace]);

  const handleOptionChange = (event) => {
    setPostSpaceData(event.target.value);
  };

  return (
    <>
      {/* raaya chat boot */}
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/dpblbF2UGnrFPdqMPCxWb"
        width="100%"
        style={{ height: '100%', minHeight: '700px',display:"none" }}
        frameborder="0"
      ></iframe>

      {/* userSpace modal */}
      <button onClick={openTheSpaceModal} className={style.spaceSectionButton}>
        <span className={style.spaceSectionButtonImg}>
          {" "}
          <img src={darkSparkle} />
        </span>
        Change your Space
      </button>
      {isOpen && (
        <div className={style.spaceSection}>
          <div className={style.spaceModal}>
            <div className={style.spaceModalContent}>
              {/* <span className="close" onClick={closeModal}>
                &times;
              </span> */}

              <p className={style.spaceModalHeading}>Select your space (s).</p>

              <div className={style.spaceMenu}>
                {currentUserDoc.userSpace.length >= 1 ?  
                currentUserDoc.userSpace.map((space, index) => {
                  return (
                    <div
                      key={index}
                      className={`${style.spaceMenuData} ${
                        activeIndex.includes(index)
                          ? style.spaceMenuDataActive
                          : ""
                      }`}
                      onClick={(event) =>
                        handleSpaceMenuDataClick(
                          index,
                          event,
                          event.target.innerText
                        )
                      }
                    >
                      <p
                        className={`${style.spaceMenuDataPara} ${
                          activeIndex.includes(index)
                            ? style.spaceMenuDataParaActive
                            : ""
                        }`}
                      >
                        {space}
                      </p>
                    </div>
                  );
                }): <p style={{color:"#fff"}}>data is not present</p> }
               

                {/* <p>Selected Options: {userSpaceArr.join(", ")}</p> */}
              </div>
              <div className={style.spaceDoneCloseBtn}>
                <button
                  className={style.spaceDoneBtn}
                  onClick={handleModalSubmit}
                >
                  Done
                </button>
                <button
                  className={style.spaceCloseBtn}
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {width >= 600 ? (
        <>
          {/* <SidebarFinal /> */}
          {/* <NavBarFinalDarkMode/> */}
          {/* <CommunitySidebar /> */}
          {/* <CommunityNavbar
            setNavbarPostButtonClick={setNavbarPostButtonClick}
          /> */}
        </>
      ) : (
        <>
          {/* <PhnSidebar />
          <KnowledgeNavbar /> */}
        </>
      )}

      <section
        style={{
          position: postsAuthorIsClick || postIdExist !== "" ? "fixed" : "",
        }}
        id={style.communityFinalPageOuterSection}
      >
        <section
          style={{ position: singleNews ? "fixed" : "" }}
          id={style.communityFinalPage}
        >
          <ToastContainer />
          <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type="file"
            hidden
            className={style.postImageUpload}
          />

          {/* NAVBAR POST BUTTON CLICK SECTION */}
          {navbarPostButtonClick ? (
            <section className="editPostContainerrrr">
              <ToastContainer />
              <div className="editPostContainer-edit-container">
                <div
                  onClick={() => {
                    setNavbarPostButtonClick(false);
                    setTempImageURL(null);
                    setImageUpload(null);
                  }}
                  className="closeContainerButton"
                >
                  X
                </div>
                <section className={style.uploadPostContainerrrrSection}>
                  <div className="EdituploadPostContainerrrr">
                    <img
                      className="community-upload-cont-userImage"
                      src={
                        userDoc?.image
                          ? userDoc.image
                          : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                      }
                      alt="userImage"
                    />
                    <div className="textAreaUploadContainer">
                      <div className={style.navbarUploadPostOuterBoxContainer}>
                        <textarea
                          className="navbarUploadPostContainerTextArea"
                          onChange={(e) => setNewPostText(e.target.value)}
                          name="postText"
                          id="postTextContainerExpanded"
                          rows="3"
                          value={newPostText}
                          placeholder="What Would You Like To Post?"
                        ></textarea>
                        {tempImageURL ? (
                          <div className="edit-communityPostImage-cont">
                            <img
                              className="edit-communityPostImage"
                              src={tempImageURL}
                              alt="postFile"
                            />
                            <div className={style.editDeleteBtn}>
                              <RxCrossCircled
                                onClick={RemoveFile}
                                className="delete_Btn"
                              />
                              <FiEdit
                                onClick={chooseFile}
                                className={style.editBtn}
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* { && } */}

                        <div className="addImageandUploadPostIcon">
                          {/* <img
                            onClick={chooseFile}
                            className="addImageInCommunityIcon"
                            src="./images/add-image-icon.png"
                            
                            alt="addImageIcon"
                          /> */}
                          <MdOutlineAddPhotoAlternate
                            className="addImageInCommunityReactIcon"
                            onClick={chooseFile}
                          />

                          <button
                            onClick={uploadImageToFireBase}
                            className="uploadPostIconButton"
                          >
                            Post
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          ) : null}

          {/* EDIT OLD POST SECTION */}

          {editPostButtonClick ? (
            <>
              <section className="editPostContainerrrr">
                <ToastContainer />
                <div className="editPostContainer-edit-container">
                  <div
                    onClick={() => {
                      setEditPostButtonClick(false);
                      setTempImageURL(null);
                      setImageUpload(null);
                    }}
                    className="closeContainerButton"
                  >
                    X
                  </div>
                  <section className={style.uploadPostContainerrrrSection}>
                    <div className="EdituploadPostContainerrrr">
                      <img
                        className="community-upload-cont-userImage"
                        src={
                          userDoc?.image
                            ? userDoc.image
                            : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                        }
                        alt="userImage"
                      />
                      <div className="textAreaUploadContainer">
                        <div className={style.navbarUploadPostOuterBoxContainer}>
                          <textarea
                            onChange={(e) => setNewEditText(e.target.value)}
                            name="postText"
                            className="editOldPostTextArea"
                            id="postTextContainerExpanded"
                            rows="3"
                            value={newEditText}
                            placeholder="What Would You Like To Edit?"
                          ></textarea>
                          {tempImageURL ? (
                            <div className="edit-communityPostImage-cont">
                              <div className="editImageOverLayContainerImageContainer">
                                <div className="editImageOverLayContainer"></div>
                                <img
                                  className="edit-communityPostImage"
                                  src={tempImageURL}
                                  alt="postFile"
                                />
                                <button
                                  onClick={chooseFile}
                                  className="changePhotoIconButton"
                                >
                                  Change
                                </button>
                              </div>
                            </div>
                          ) : null}

                          <div className="addImageandUploadPostIcon">
                            {/* <img onClick={chooseFile} className='addImageInCommunityIcon' src="./images/add-image-icon.png" alt="addImageIcon" /> */}

                            <button
                              onClick={EditPost}
                              className="uploadPostIconButton"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </>
          ) : null}

          {/* UPLOAD NEW POST SECTION */}

          <div className={style.reverrCommunityUploadContainerrr}>
            <div className="reverrCommunityHeadingAndPostUploadIcon">
              <div>
                <h2 className={style.reverrCommunityHeading}>
                  {" "}
                  Welcome To Reverr ,{" "}
                  <span style={{ color: "rgba(42, 114, 222, 1)" }}>
                    Jahanvi Singh
                  </span>
                </h2>
                {/* <p className="reverrCommunitySubbHeading">
                  The community where future entrepreneurs come to learn,
                  execute and grow.
                </p> */}
              </div>
              {width < 600 && scroll > 230 && (
                <>
                  <div
                    style={{
                      position: "fixed",
                      width: "50px",
                      height: "50px",
                      bottom: "1rem",
                      zIndex: "10000",
                      right: "1rem",
                    }}
                    onClick={() =>
                      setNavbarPostButtonClick((current) => !current)
                    }
                    id={style.postUploaddSquareCont}
                    className={style.postUploaddSquareCont}
                  >
                    <img
                      className="postUploaddSquareContAddImg"
                      src="./images/add.png"
                      alt="addIcon"
                    />
                  </div>
                </>
              )}
              {width < 600 ? (
                <div
                  onClick={() => setTextAreaIsClick((current) => !current)}
                  id={style.postUploaddSquareCont}
                  className={style.postUploaddSquareCont}
                >
                  <img
                    className="postUploaddSquareContAddImg"
                    src="./images/add.png"
                    alt="addIcon"
                  />
                </div>
              ) : scroll > 150 ? null : (
                <div
                  onClick={() => setTextAreaIsClick((current) => !current)}
                  id={style.postUploaddSquareCont}
                  className={style.postUploaddSquareCont}
                >
                  <img
                    className="postUploaddSquareContAddImg"
                    src="./images/add.png"
                    alt="addIcon"
                  />
                </div>
              )}
            </div>

            <section
              className={style.uploadPostContainerrrrSection}
              ClassName={style.uploadPostContainerrrrSectionBoxShadow}
            >
              <div className={style.uploadPostContainerrrr}>
                <img
                  className={style.communityUploadContUserImage}
                  src={
                    userDoc?.image
                      ? userDoc.image
                      : "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
                  }
                  alt="userImage"
                />
                <div className="textAreaUploadContainer">
                  <div
                    className={
                      `textAreaIsClick
                        ? ${style.navbarUploadPostOuterBoxContainer}
                        : ${style.UploadPostOuterBoxContainerNotExpanded}`
                    }
                  >
                    <textarea
                      style={{ borderRadius: "30px" }}
                      onClick={() => setTextAreaIsClick(true)}
                      onChange={(e) => setNewPostText(e.target.value)}
                      name="postText"
                      id={
                        textAreaIsClick
                          ? style.postTextContainerExpanded
                          : style.postTextContainer
                      }
                      rows="3"
                      value={newPostText}
                      placeholder="What Would You Like To Post?"
                    ></textarea>
                    {!textAreaIsClick ? ( <img
                      style={{
                        display: "inline-flex",
                        position: "absolute",
                        right: " 23px",
                        top: "15px",
                        cursor: "pointer",
                        height: "40px",
                      }}
                      src="./images/right-arraow-bg-blue.png"
                    />): null}
                   

                    {tempImageURL ? (
                      <div className={style.communityPostImageCont}>
                        <img
                          className={style.communityPostImage}
                          src={tempImageURL}
                          alt="postFile"
                        />
                        <div className={style.editDeleteBtn}>
                          <RxCrossCircled
                            onClick={RemoveFile}
                            className="delete_Btn"
                          />
                          <FiEdit onClick={chooseFile} className={style.editBtn} />
                        </div>
                      </div>
                    ) : null}

                    {postSpaceData ? <p className={style.spaceTag} >{postSpaceData}</p> : null}

                    {/* {textAreaIsClick ? (
                      <div className="addImageandUploadPostIcon uploadNewPostaddImageandUploadPostIcon">
                      
                        {isOpenPostUserspace && (
                          <div className={style.spaceSection}>
                            

                            <div className={style.spaceModal}>
                              <div className={style.spaceModalContent}>
                                <p className={style.spaceModalHeading}>
                                  Select the Post Space (s).
                                </p>
                                
                                <div className={style.spaceMenu}>
                                  {currentUserDoc.userSpace.map((space) => {
                                    return (
                                      <div
                                        className={style.spaceMenuData}
                                        onClick={(event) =>
                                          handleSpaceMenuDataClick(
                                            event,
                                            event.target.innerText
                                          )
                                        }
                                      >
                                        <p className={style.spaceMenuDataPara}>
                                          {space}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className={style.spaceDoneCloseBtn}>
                                  <button
                                    className={style.spaceDoneBtn}
                                    onClick={() => {
                                      if (userSpaceArr.length >= 1) {
                                        setPostSpaceArr(userSpaceArr);
                                        setIsOpenPostUserspace(
                                          !isOpenPostUserspace
                                        );
                                        setPostBtnVisible(true);
                                      } else {
                                        window.alert("choose atleast one.");
                                      }
                                    }}
                                  >
                                    Done
                                  </button>
                                  <button
                                    className={style.spaceCloseBtn}
                                    onClick={() =>
                                      setIsOpenPostUserspace(
                                        !isOpenPostUserspace
                                      )
                                    }
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        
                          {/* <button
                            onClick={uploadImageToFireBase}
                            className="uploadPostIconButton"
                          >
                            Post
                          </button> */}
                        
                      {/* </div>
                    ) : null} */} 
                    
                  </div>
                  <div className={style.postAssetsIconMain}>
                    <div
                      className={style.postAssetsIconMaindiv}
                      onClick={chooseFile}
                    >
                      <BsImages className={style.assest_icon} />
                      <span className={style.icon_text}>Images</span>
                    </div>
                    {/* <div className="post_assets_icon_main_div">
                      <MdPoll className={style.assest_icon} />
                      <span className={style.icon_text}>Polls</span>
                    </div> */}
                    <div className={style.postAssetsIconMaindiv}>
                      <MdVideoCameraBack className={style.assest_icon} />
                      <span className={style.icon_text}>Video</span>
                    </div>

                    
                      <select className={style.userSpaceSelect}  onChange={handleOptionChange} >
                        <option className={style.userSpaceOption} value="">Select Spaces</option>                      
                        {  currentUserDoc?.userSpace?.map((item)=>{
                          return   <option  className={style.userSpaceOption} value={item}>{item}</option>     
                        })}

                      </select>
                      <button
                            onClick={uploadImageToFireBase}
                            className="uploadPostIconButton"
                          >
                            Post
                      </button>
                    
                
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* POST SECTION */}

          <div className={style.infiniteScrollOuterDiv}>
            <InfiniteScroll
              dataLength={displayPosts.length}
              next={fetchMorePosts}
              hasMore={displayPosts.length !== postsData.length}
              loader={
                <div>
                  <PostSkeleton cards={2} />
                </div>
              }
            >
              <div className={style.communityNavbarBlock}>
                <div
                  onClick={(e) => {
                    setMySpaceStatus(true);
                    setWhatHotStatus(false);
                  }}
                  className={
                    mySpaceStatus
                      ? `${style.communityNavbarBlockNav} ${style.activeNav}`
                      : style.communityNavbarBlockNav
                  }
                >
                  <h3
                    className={
                      mySpaceStatus
                        ? `${style.communityNavHeading} ${style.activeNavHeading}`
                        : style.communityNavHeading
                    }
                  >
                    My Space
                  </h3>
                </div>

                <div
                  onClick={() => {
                    setMySpaceStatus(false);
                    setWhatHotStatus(true);
                  }}
                  className={
                    whatHotStatus
                      ? `${style.communityNavbarBlockNav} ${style.activeNav}`
                      : style.communityNavbarBlockNav
                  }
                >
                  <h3
                    className={
                      whatHotStatus
                        ? `${style.communityNavHeading} ${style.activeNavHeading}`
                        : style.communityNavHeading
                    }
                  >
                    What's Hot?
                  </h3>
                </div>
                {/* <div className={style.communityNavbarBlockNav}>
                  <h3 className={style.communityNavHeading}>Recent</h3>
                </div> */}
              </div>

              {mySpaceStatus ? (
                // myfeed posts-container
                <section className="posts-containerr">
                  {displayPosts.length === 0 &&
                    sortOptionSelected.whose !== "People You Follow" && (
                      <div>
                        <PostSkeleton cards={2} />
                      </div>
                    )}
                  {userDoc?.network?.length === 0 &&
                  sortOptionSelected.whose === "People You Follow" ? (
                    <>
                      <NoFollowingCard
                        setSortOptionSelected={setSortOptionSelected}
                        setSortOptionClick={setSortOptionClick}
                      />
                    </>
                  ) : null}
                  {spaceFilteredPost.map((item, index) => {
                    if (index === 3) {
                      return (
                        <>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            setPostsAuthorIsClick={setPostsAuthorIsClick}
                            setPostsAuthorInfo={setPostsAuthorInfo}
                          />
                          <DiscoverEvents />
                        </>
                      );
                    } else if (index === 7) {
                      return (
                        <>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            setPostsAuthorIsClick={setPostsAuthorIsClick}
                            setPostsAuthorInfo={setPostsAuthorInfo}
                          />
                          <DiscoverPerfectTools />
                        </>
                      );
                    } else if (index === 11) {
                      return (
                        <>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            setPostsAuthorIsClick={setPostsAuthorIsClick}
                            setPostsAuthorInfo={setPostsAuthorInfo}
                          />
                          <FeaturedSuggestions />
                        </>
                      );
                    } else if (index === 15) {
                      return (
                        <>
                          <PostCardDark
                            postsData={postsData}
                            setPostsData={setPostsData}
                            item={item}
                            key={index}
                            handleEditPostButtonClick={
                              handleEditPostButtonClick
                            }
                            setPostsAuthorIsClick={setPostsAuthorIsClick}
                            setPostsAuthorInfo={setPostsAuthorInfo}
                          />
                          <FeaturedMentors />
                        </>
                      );
                    } else {
                      return (
                        <PostCardDark
                          postsData={postsData}
                          setPostsData={setPostsData}
                          item={item}
                          key={index}
                          handleEditPostButtonClick={handleEditPostButtonClick}
                          setPostsAuthorIsClick={setPostsAuthorIsClick}
                          setPostsAuthorInfo={setPostsAuthorInfo}
                        />
                      );
                    }
                  })}
                </section>
              ) : (
                // what's hot posts-container
                <section className="posts-containerr">
                  {displayPosts.length === 0 &&
                    sortOptionSelected.whose !== "People You Follow" && (
                      <div>
                        <PostSkeleton cards={2} />
                      </div>
                    )}
                  {userDoc?.network?.length === 0 &&
                  sortOptionSelected.whose === "People You Follow" ? (
                    <>
                      <NoFollowingCard
                        setSortOptionSelected={setSortOptionSelected}
                        setSortOptionClick={setSortOptionClick}
                      />
                    </>
                  ) : null}
                  {whatsHotCommunityPost.map((item, index) => {
                    return (
                      <PostCardDark
                        postsData={postsData}
                        setPostsData={setPostsData}
                        item={item}
                        key={index}
                        handleEditPostButtonClick={handleEditPostButtonClick}
                        setPostsAuthorIsClick={setPostsAuthorIsClick}
                        setPostsAuthorInfo={setPostsAuthorInfo}
                      />
                    );
                  })}
                </section>
              )}
            </InfiniteScroll>
          </div>
        </section>
      </section>

      <CommunityUserProfilePopup
        setPostsAuthorIsClick={setPostsAuthorIsClick}
        postsAuthorInfo={postsAuthorInfo}
        setPostsAuthorInfo={setPostsAuthorInfo}
        postsAuthorIsClick={postsAuthorIsClick}
        postsData={postsData}
        setPostsData={setPostsData}
        handleEditPostButtonClick={handleEditPostButtonClick}
      />

      <Outlet />
    </>
  );
};

export default CommunityFinalDark;
