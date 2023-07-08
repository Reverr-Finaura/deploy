import React, { useEffect, useRef, useState } from "react";
import "./CommunityFinal.css";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import CommunityNavbar from "../../components/Community Navbar/CommunityNavbar";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from "../../components/Post Card/PostCard";
import PostCardDark from "../../components/Community Dark Mood/Post Card Dark Mode/PostCardDark";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import PostSkeleton from "../../components/Post Skeleton/PostSkeleton";
import CommunityUserProfilePopup from "../../components/Community User Profile Popup/CommunityUserProfilePopup";
import { Outlet } from "react-router-dom";
import CommunitySidebar from "../../components/Community Sidebar/CommunitySidebar";
import expandTextAreaIcon from "../../images/addExpandTextArea.png";
import axios from "axios";
import CommunityNews from "../../components/Community News/CommunityNews";
import NewSkeleton from "../../components/Post Skeleton/News Skeleton/NewSkeleton";
import { RxCrossCircled } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

import SortingNavbarTest from "./Sorting Navbar Test/SortingNavbarTest";

import NoFollowingCard from "../../components/No Following Card/NoFollowingCard";
import {
  MdOutlineAddPhotoAlternate,
  MdVideoCameraBack,
  MdLocationOn,
  MdPoll,
} from "react-icons/md";

import { IoLocationSharp } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import { RiFileSearchLine } from "react-icons/ri";
import SortingNavbarTwoOption from "./Sorting Navbar Two Options/SortingNavbarTwoOptions";
const CommunityFinal = () => {
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
  console.log("blogArray", blogArray);

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
  }, [sortOptionSelected]);

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

  return (
    <>
      {width >= 600 ? (
        <>
          <SidebarFinal />
          {/* <NavBarFinal /> */}
          {/* <CommunitySidebar /> */}
          <CommunityNavbar
            setNavbarPostButtonClick={setNavbarPostButtonClick}
          />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}
      <section
        style={{
          position: postsAuthorIsClick || postIdExist !== "" ? "fixed" : "",
        }}
        id="communityFinalPageOuterSection"
      >
        <section
          style={{ position: singleNews ? "fixed" : "" }}
          id="communityFinalPage"
        >
          <ToastContainer />
          <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type="file"
            hidden
            className="postImageUpload"
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
                <section className="uploadPostContainerrrrSection">
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
                      <div className="navbarUploadPostOuterBoxContainer">
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
                            <div className="edit_Delete_Btn">
                              <RxCrossCircled
                                onClick={RemoveFile}
                                className="delete_Btn"
                              />
                              <FiEdit
                                onClick={chooseFile}
                                className="edit_Btn"
                              />
                            </div>
                          </div>
                        ) : null}
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
                  <section className="uploadPostContainerrrrSection">
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
                        <div className="navbarUploadPostOuterBoxContainer">
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

          <div className="reverrCommunityUploadContainerrr">
            <div className="reverrCommunityHeadingAndPostUploadIcon">
              <div>
                <h2 className="reverrCommunityHeading">
                  {" "}
                  Welcome To Reverr{" "}
                  <span style={{ color: "rgba(42, 114, 222, 1)" }}>
                    ,Jahanvi Singh
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
                    id="postUploaddSquareCont"
                    className="postUploaddSquareCont"
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
                  id="postUploaddSquareCont"
                  className="postUploaddSquareCont"
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
                  id="postUploaddSquareCont"
                  className="postUploaddSquareCont"
                >
                  <img
                    className="postUploaddSquareContAddImg"
                    src="./images/add.png"
                    alt="addIcon"
                  />
                </div>
              )}
            </div>

            <section className="uploadPostContainerrrrSection  uploadPostContainerrrrSectionBoxShadow">
              <div className="uploadPostContainerrrr">
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
                  <div
                    className={
                      textAreaIsClick
                        ? "navbarUploadPostOuterBoxContainer"
                        : "UploadPostOuterBoxContainerNotExpanded"
                    }
                  >
                    <textarea
                      style={{ borderRadius: "30px" }}
                      onClick={() => setTextAreaIsClick(true)}
                      onChange={(e) => setNewPostText(e.target.value)}
                      name="postText"
                      id={
                        textAreaIsClick
                          ? "postTextContainerExpanded"
                          : "postTextContainer"
                      }
                      rows="3"
                      value={newPostText}
                      placeholder="What Would You Like To Post?"
                    ></textarea>
                    <img
                      style={{
                        display: "inline-flex",
                        position: "absolute",
                        right: " 23px",
                        top: "14px",
                        cursor:"pointer",
                      }}
                      src="./images/right-arraow-bg-blue.png"
                    />

                    {/* <img
                      onClick={() => setTextAreaIsClick((current) => !current)}
                      className={
                        textAreaIsClick
                          ? "expandTextAreaIconExpanded"
                          : "expandTextAreaIcon"
                      }
                      src={expandTextAreaIcon}
                      alt="expandTextarea"
                    /> */}
                    {/* <GrAddCircle
                      onClick={() => setTextAreaIsClick((current) => !current)}
                      className={
                        textAreaIsClick
                          ? "expandTextAreaIconExpanded"
                          : "expandTextAreaIcon"
                      }
                    /> */}
                    {tempImageURL ? (
                      <div className="communityPostImage-cont">
                        <img
                          className="communityPostImage"
                          src={tempImageURL}
                          alt="postFile"
                        />
                        <div className="edit_Delete_Btn">
                          <RxCrossCircled
                            onClick={RemoveFile}
                            className="delete_Btn"
                          />
                          <FiEdit onClick={chooseFile} className="edit_Btn" />
                        </div>
                      </div>
                    ) : null}
                    {textAreaIsClick ? (
                      <div className="addImageandUploadPostIcon uploadNewPostaddImageandUploadPostIcon">
                        {/* <img
                          onClick={chooseFile}
                          className="addImageInCommunityIcon"
                          src="./images/add-image-icon.png"
                          alt="addImageIcon"
                        /> */}
                        {/* <MdOutlineAddPhotoAlternate
                          className="addImageInCommunityReactIcon"
                          onClick={chooseFile}
                        /> */}
                        <button
                          onClick={uploadImageToFireBase}
                          className="uploadPostIconButton"
                        >
                          Post
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="post_assets_icon_main">
                    <div
                      className="post_assets_icon_main_div"
                      onClick={chooseFile}
                    >
                      <BsImages className="assest_icon" />
                      <span className="icon_text">Images</span>
                    </div>
                    <div className="post_assets_icon_main_div">
                      <MdPoll className="assest_icon" />
                      <span className="icon_text">Polls</span>
                    </div>
                    <div className="post_assets_icon_main_div">
                      <MdVideoCameraBack className="assest_icon" />
                      <span className="icon_text">Video</span>
                    </div>
                    <div className="post_assets_icon_main_div">
                      <RiFileSearchLine className="assest_icon" />
                      <span className="icon_text">Files</span>
                    </div>
                    <div className="post_assets_icon_main_div">
                      <MdLocationOn className="assest_icon" />
                      <span className="icon_text">Location</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* <section
            className={
              width > 600 && newScoll > 212
                ? "sortOptionBigContainer sortOptionBigContainerScrolled"
                : width < 600 && newScoll > 382
                ? "sortOptionBigContainer sortOptionBigContainerScrolledd"
                : "sortOptionBigContainer"
            }
          > */}
          {/* FURTHER SORT POST SECTION */}

          {/* <SortingNavbarOldest setfurtherSortOptionClick={setfurtherSortOptionClick} sortOptionSelected={sortOptionSelected} furtherSortOptionClick={furtherSortOptionClick} setSortOptionSelected={setSortOptionSelected} setSortOptionClick={setSortOptionClick} sortOptionClick={sortOptionClick} /> */}

          {/* <SortingNavbarTwoOption
              setSortOptionSelected={setSortOptionSelected}
              setfurtherSortOptionClick={setfurtherSortOptionClick}
              sortOptionSelected={sortOptionSelected}
              sortOptionClick={sortOptionClick}
              setSortOptionClick={setSortOptionClick}
            />
          </section> */}

          {/* community navbar */}

          {/* POST SECTION */}

          <div className="infiniteScrollOuterDiv">
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
                {displayPosts.map((item, index) => {
                  return ( 
                    <PostCard
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
            </InfiniteScroll>
          </div>
        </section>

        {/* COMMUNITY NEWS SECTION */}
        {width > 1180 ? (
          <section id="communityNewsSection">
            <div
              style={{ overflowY: "auto" }}
              className="communityNewsSectionContainer"
            >
              <h3 className="communityNewsSectionHeading">Trending News</h3>
              {!newsData && (
                <div>
                  <NewSkeleton cards={3} />
                </div>
              )}
              {seeAllNewsIsClicked ? (
                <>
                  {newsData?.map((news) => {
                    return (
                      <>
                        <div
                          className="communityNewsSectionNewsCont"
                          onClick={() => setSingleNews(news)}
                          key={news.url}
                        >
                          <div className="communityNewsSectionNewsImageCont">
                            <img
                              className="communityNewsSectionNewsImage"
                              src={news?.image?.thumbnail?.contentUrl}
                              alt="newsImg"
                            />
                          </div>
                          <p className="communityNewsSectionNewsInfo">
                            {news.description.slice(0, 60)}....
                          </p>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                newsData?.slice(0, 4).map((news) => {
                  return (
                    <>
                      <div
                        className="communityNewsSectionNewsCont"
                        onClick={() => setSingleNews(news)}
                        key={news.url}
                      >
                        <div className="communityNewsSectionNewsImageCont">
                          <img
                            className="communityNewsSectionNewsImage"
                            src={news?.image?.thumbnail?.contentUrl}
                            alt="newsImg"
                          />
                        </div>
                        <p className="communityNewsSectionNewsInfo">
                          {news.description.slice(0, 60)}....
                        </p>
                      </div>
                    </>
                  );
                })
              )}
              {seeAllNewsIsClicked ? null : (
                <button
                  onClick={() => setSeeAllNewsIsClicked(true)}
                  className="communityNewsSectionContainerMoreNewsButton"
                >
                  See All
                </button>
              )}
            </div>

            {/* ARTICLE SECTION  */}
            {/* <div className="communityNewsSectionContainer">
              <h3 className="communityNewsSectionHeading">Articles</h3>
              {blogArray.length === 0 && (
                <div>
                  <NewSkeleton cards={4} />
                </div>
              )}
              {blogArray?.map((article) => {
                return (
                  <>
                    <div
                      className="communityArticleSectionArticleCont"
                      onClick={() => {
                        window.open(
                          `https://reverr.io/blog/${article.id}`,
                          "_blank"
                        );
                      }}
                      key={article.id}
                    >
                      <div className="communityArticleSectionArticleImageCont">
                        <img
                          className="communityArticleSectionArticleImage"
                          src={article?.image?.imageUrl}
                          alt="newsImg"
                        />
                      </div>
                      <p className="communityArticleSectionArticleInfo">
                        {article?.body.slice(0, 61)}....
                      </p>
                    </div>
                  </>
                );
              })}
            </div> */}
          </section>
        ) : null}
        {singleNews ? (
          <CommunityNews
            singleNews={singleNews}
            setSingleNews={setSingleNews}
          />
        ) : null}
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

export default CommunityFinal;
