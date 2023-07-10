import React, { useEffect, useState } from "react";
import "./form.css";
import category from "./category.json";
import reason from "./reason.json";
import styles from "./UserEditProfileTesting.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db, getUserDocByRef } from "../../firebase";
import { setUserDoc } from "../../features/userDocSlice";
import DefaultDP from "../../images/Defaultdp.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserEditProfileTesting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const userFundingDoc = useSelector((state) => state.userFundingDoc);

  const [hasUserProfile, setHasUserProfile] = useState(true);
  const [userDocId, setUserDocId] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [reasonList, setReasonList] = useState([]);

  const connectVia = ["Video Call", "Phone Call", "At Coffee"];

  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDocId((prev) => {
          return [...prev, doc.id];
        });
        if (doc.id === user?.user?.email) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  // CHECK IF USER HAS FUNDING PROFILE

  useEffect(() => {
    if (userDoc?.hasFundingProfile === "No") {
      return;
    }
    async function fetchUserFundingDocFromFirebase() {
      const userFundingDataRef = collection(db, "Funding");
      const q = query(userFundingDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === user?.user?.email) {
          dispatch(setUserFundingDoc(doc.data()));
        }
      });
    }
    fetchUserFundingDocFromFirebase();
  }, [userDoc]);

  useEffect(() => {
    if (user && userDoc) {
      if (userDoc?.hasGeneralProfile === true) {
        setHasUserProfile(true);
        return;
      } else if (userDoc?.hasGeneralProfile === false) {
        setHasUserProfile(false);
      }
    }
  }, [userDoc]);

  //   console.log("hasUserProfile", hasUserProfile);
  //   console.log("userDoc", userDoc);

  //   -----------------------------------------------------------------

  const [formData, setFormData] = useState({
    userReason: [],
    linkedin: "",
    Vibe_Data: {
      How_To_Meet: [],
    },
  });
  const [workCount, setWorkCount] = useState(1);
  const [educationCount, setEducationCount] = useState(1);

  useEffect(() => {
    const sortedCategory = category.sort((a, b) => {
      return a.categoryName.localeCompare(b.categoryName);
    });
    setCategoryList(sortedCategory);
    setReasonList(reason);
  }, []);

  useEffect(() => {
    if (userDoc) {
      setFormData((prev) => {
        return {
          ...prev,
          Vibe_Data: {
            ...prev.Vibe_Data,
            ...userDoc?.Vibe_Data,
          },
          ...userDoc,
        };
      });
    }
  }, [userDoc]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePasswordChange = (e) => {
    if (currentPassword === userDoc?.password) {
      if (newPassword === confirmPassword) {
        setFormData((prev) => {
          return {
            ...prev,
            password: newPassword,
          };
        });
      } else {
        alert("New Password and Confirm Password do not match");
      }
    } else {
      alert("Current Password is incorrect");
    }
  };

  // Remove Same spaces Is Not Same spaces
  useEffect(() => {
    setCategoryList((prev) => {
      return prev.filter((category) => {
        return !formData?.userSpace?.includes(category.categoryName);
      });
    });
  }, [formData?.userSpace]);

  // Remove Same reasons Is Not Same reasons
  useEffect(() => {
    setReasonList((prev) => {
      return prev.filter((reason) => {
        return !formData?.userReason?.includes(reason.reason);
      });
    });
  }, [formData?.userReason]);
  const addSpace = (item) => {
    setFormData((prev) => {
      return {
        ...prev,
        userSpace: [...prev.userSpace, item.categoryName],
      };
    });
    // Remove from category list
    setCategoryList((prev) => {
      return prev.filter((category) => category !== item);
    });
  };
  const removeSpace = (item) => {
    setFormData((prev) => {
      return {
        ...prev,
        userSpace: prev.userSpace.filter((space) => space !== item),
      };
    });
    // Add to category list
    setCategoryList((prev) => {
      return [...prev, { categoryName: item, categoryImage: "" }];
    });
  };

  const addReason = (item) => {
    setFormData((prev) => {
      return {
        ...prev,
        userReason: [...prev.userReason, item.reason],
      };
    });
    // Remove from reason list
    setReasonList((prev) => {
      return prev.filter((reason) => reason !== item);
    });
  };
  const removeReason = (item) => {
    setFormData((prev) => {
      return {
        ...prev,
        userReason: prev.userReason.filter((reason) => reason !== item),
      };
    });
    // Add to reason list
    setReasonList((prev) => {
      return [...prev, { reason: item }];
    });
  };

  const handleWorkChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [name]: value,
      };

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };
  const handleWorkRemove = (index) => {
    if (workCount === 1) return;
    setFormData((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience.splice(index, 1);

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
    setWorkCount((prev) => prev - 1);
  };
  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };

      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };
  const handleEducationRemove = (index) => {
    if (educationCount === 1) return;
    setFormData((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation.splice(index, 1);

      return {
        ...prev,
        education: updatedEducation,
      };
    });
    setEducationCount((prev) => prev - 1);
  };
  const handleConnectVia = (item) => {
    const howToMeet = formData?.Vibe_Data?.How_To_Meet;

    if (Array.isArray(howToMeet) && howToMeet.includes(item)) {
      // Remove from How to Meet
      setFormData((prev) => {
        const updatedVibeData = {
          ...prev.Vibe_Data,
          How_To_Meet: prev.Vibe_Data.How_To_Meet.filter(
            (vibe) => vibe !== item
          ),
        };

        return {
          ...prev,
          Vibe_Data: updatedVibeData,
        };
      });
      return;
    }

    setFormData((prev) => {
      const updatedVibeData = {
        ...prev.Vibe_Data,
        How_To_Meet: [...(prev.Vibe_Data.How_To_Meet || []), item],
      };

      return {
        ...prev,
        Vibe_Data: updatedVibeData,
      };
    });
  };

  async function UploadData() {
    updateDoc(doc(db, "Users", user?.user?.email), {
      ...formData,
    });
    navigate("/userProfile");
  }
  // ---------------------------------------------

  return (
    <div className={styles.editWrapper}>
      <NavBarFinalDarkMode />
      <div className={styles.editContainer}>
        <div className={styles.editHeader}>
          <img
            src="/images/profileArrowLeft.svg"
            alt="Linkedin"
            onClick={() => {
              navigate("/userProfile");
            }}
          />
          <p>Edit Profile</p>
        </div>
        <div className={styles.profileImage}>
          {/* <img src="/images/UserProfileTest.png" alt="Linkedin" /> */}
          <img
            src={
              userDoc?.image && userDoc?.image !== ""
                ? userDoc.image
                : DefaultDP
            }
            alt="User_Image"
          />
        </div>
        <div className={styles.profileContent}>
          <div className={styles.personalTitle}>
            <p>Personal details</p>
            <div className="form-container">
              <form>
                <div className="form-row">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email ID"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="dob">Date Of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    value={formData.state}
                    name="state"
                    placeholder="Enter your state"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.pwdWrapper}>
          <div className={styles.contact}>
            <p>Change Password</p>
            <div className="formContainer">
              <form>
                <div className="form-row">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    placeholder="Enter your current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </form>
              <div className={styles.passwordButton}>
                <button
                  className={styles.pswdBtn}
                  onClick={handlePasswordChange}
                >
                  Save New Password
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.spacesWrapper}>
          <div className={styles.spacesTitle}>
            <p>My Spaces</p>
            <div className={styles.spacesCategory}>
              {formData?.userSpace?.map((item, index) => {
                return (
                  <button key={index}>
                    {item}
                    <img
                      src="/images/basil_cross-solid.svg"
                      alt="Cross_Icon"
                      onClick={() => {
                        removeSpace(item);
                      }}
                    />
                  </button>
                );
              })}
              {/* <button>
                FinTech
                <img src="/images/basil_cross-solid.svg" alt="Cross_Icon" />
              </button> */}
            </div>
            <div className={styles.spacesList}>
              <p>Add a New Space</p>
              <div className={styles.spacesListItem}>
                {categoryList?.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        addSpace(item);
                      }}
                    >
                      {item.categoryName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.connectWrapper}>
            <div className={styles.connectTitle}>
              <p>How do you want to connect?</p>
              <div className={styles.connectList}>
                {connectVia?.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className={
                        formData?.Vibe_Data?.How_To_Meet &&
                        formData?.Vibe_Data?.How_To_Meet?.includes(item)
                          ? styles.connectButtonActive
                          : styles.connectButton
                      }
                      onClick={() => handleConnectVia(item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.professionalWrapper}>
            <div className={styles.professionalContent}>
              <p>Professional Details</p>
              <form>
                <div className="form-row">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    value={formData?.designation}
                    name="designation"
                    placeholder="Enter your designation"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Enter your company"
                    value={formData?.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="about">About:</label>
                  <textarea
                    id="about"
                    name="about"
                    placeholder="Enter about yourself"
                    value={formData?.about}
                    onChange={handleChange}
                    className="about"
                  />
                </div>
              </form>
              <div className={styles.hereFor}>
                <div className={styles.hereForSelected}>
                  <p>I’m here for</p>
                  <div className={styles.selectedList}>
                    {formData?.userReason?.map((item, idx) => {
                      return (
                        <button className={styles.selectedButton} key={idx}>
                          {item}
                          <img
                            src="/images/basil_cross-solid.svg"
                            alt="Cross_Icon"
                            onClick={() => {
                              removeReason(item);
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.hereForList}>
                {reasonList?.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className={styles.hereForButton}
                      onClick={() => {
                        addReason(item);
                      }}
                    >
                      {item.reason}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.workWrapper}>
            <div className={styles.workContent}>
              <div className={styles.workTop}>
                <p>Work Experience</p>
                <button
                  onClick={() => {
                    setWorkCount((prev) => prev + 1);
                  }}
                >
                  Add New
                </button>
              </div>
              {Array.from({ length: workCount }, (_, index) => (
                <form key={index}>
                  <div className="form-row">
                    <label htmlFor="work_designation">Designation</label>
                    <input
                      type="text"
                      id="work_designation"
                      name="designation"
                      placeholder="designation"
                      value={formData?.experience?.[index]?.designation || ""}
                      onChange={(e) => {
                        handleWorkChange(e, index);
                      }}
                    />
                    <label htmlFor="work_company">Company</label>
                    <input
                      type="text"
                      id="work_company"
                      name="company"
                      placeholder="company"
                      value={formData?.experience?.[index]?.company || ""}
                      onChange={(e) => {
                        handleWorkChange(e, index);
                      }}
                    />
                    <label htmlFor="tenure">Tenure</label>
                    <input
                      type="text"
                      id="tenure"
                      name="tenure"
                      placeholder="tenure"
                      value={formData?.experience?.[index]?.tenure || ""}
                      onChange={(e) => {
                        handleWorkChange(e, index);
                      }}
                    />
                    <img
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "#fff",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                      }}
                      onClick={() => {
                        handleWorkRemove(index);
                      }}
                      src="
                    /images/basil_cross-solid.svg"
                      alt="Cross_Icon"
                    />
                  </div>
                </form>
              ))}
            </div>
          </div>
          <div className={styles.educationWrapper}>
            <div className={styles.educationContent}>
              <div className={styles.educationTop}>
                <p>Education</p>
                <button
                  onClick={() => {
                    setEducationCount((prev) => prev + 1);
                  }}
                >
                  Add New
                </button>
              </div>
              {Array.from({ length: educationCount }, (_, index) => (
                <form key={index}>
                  <div className="form-row">
                    <label htmlFor="institute">Name of Institute</label>
                    <input
                      type="text"
                      id="institute"
                      name="institute"
                      placeholder="institute"
                      value={formData?.education?.[index]?.institute || ""}
                      onChange={(e) => {
                        handleEducationChange(e, index);
                      }}
                    />
                    <label htmlFor="degree">Degree</label>
                    <input
                      type="text"
                      id="degree"
                      name="degree"
                      placeholder="degree"
                      value={formData?.education?.[index]?.degree || ""}
                      onChange={(e) => {
                        handleEducationChange(e, index);
                      }}
                    />
                    <label htmlFor="graduating">Graduating Year</label>
                    <input
                      type="text"
                      id="graduating"
                      name="graduating"
                      placeholder="graduating"
                      value={formData?.education?.[index]?.graduating || ""}
                      onChange={(e) => {
                        handleEducationChange(e, index);
                      }}
                    />
                    <img
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "#fff",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                      }}
                      onClick={() => {
                        handleEducationRemove(index);
                      }}
                      src="
                    /images/basil_cross-solid.svg"
                      alt="Cross_Icon"
                    />
                  </div>
                </form>
              ))}
            </div>
          </div>
          <div className={styles.educationWrapper}>
            <div className={styles.educationContent}>
              <div className={styles.educationTop}>
                <p>Contact Details</p>
                {/* <button>Add New</button> */}
              </div>
              <form>
                <div className="form-row">
                  <img src="/images/skill-icons_linkedin.svg" alt="Linkedin" />

                  <input
                    type="text"
                    id="linkedinLink"
                    name="linkedin"
                    placeholder="Enter your linkedin link"
                    value={formData?.linkedin}
                    onChange={handleChange}
                  />
                  {/* <button>Edit</button> */}
                </div>
                <div className="form-row">
                  <img src="/images/devicon_facebook.svg" alt="Facebook" />

                  <input
                    type="text"
                    id="facebookLink"
                    name="facebookLink"
                    placeholder="Enter your facebook link"
                    value={formData?.facebookLink}
                    onChange={handleChange}
                  />
                  {/* <button>Edit</button> */}
                </div>
                <div className="form-row">
                  <img src="/images/skill-icons_twitter.svg" alt="Twitter" />
                  <input
                    type="text"
                    id="twitterLink"
                    name="twitterLink"
                    placeholder="Enter your twitter link"
                    value={formData?.twitterLink}
                    onChange={handleChange}
                  />
                  {/* <button>Edit</button> */}
                </div>
              </form>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.footerContent}>
              <button
                onClick={() => {
                  navigate("/userProfile");
                }}
              >
                Cancel
              </button>
              <button onClick={UploadData}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfileTesting;
