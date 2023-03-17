import React, { useEffect, useState, useRef } from "react";
import KnowledgeNavbar from "../../components/KnowledgeNavbar/KnowledgeNavbar";
import NavBarFinal from "../../components/Navbar/NavBarFinal";
import SidebarFinal from "../../components/Sidebar Final/SidebarFinal";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import "./GetFundedPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Funding Inputs/Input";
import uploadIcon from "../../images/Upload.png";

const GetFundedPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [width, setWidth] = useState(window.innerWidth);
  const [pitchDeckFile, setPitchDeckFile] = useState(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [getFundedInput, setGetFundedInput] = useState({
    Name: "",
    Email: "",
    Phone: "",
    StartUpName: "",
    WebsiteLink: "",
  });
  const chooseFileRef = useRef(null);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPitchDeckFile(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setPitchDeckFile(e.dataTransfer.files[0]);
    }
  };

  const handleGetFundedInputChange = (e) => {
    const { name, value } = e.target;

    setGetFundedInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // UPLOAD STARTUP RELEVANT FILE TO FIREBASE
  const uploadPitchDeckDocument = async () => {
    toast("Processing Your Request");
    const fileReff = ref(
      storage,
      `FundingFiles/${pitchDeckFile.name + user?.user?.email}`
    );
    try {
      await uploadBytes(fileReff, pitchDeckFile).then(() => {
        // toast("Successfully Uploaded Relevant Document")
      });

      fetchUrlOfuploadPitchDeckDocument();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // GET URL OF STARTUP FILES UPLOADED IN FIREBASE
  const fetchUrlOfuploadPitchDeckDocument = async () => {
    const fundingFilesListRef = ref(storage, "FundingFiles/");

    try {
      await listAll(fundingFilesListRef).then((resp) => {
        resp.items.forEach((item) => {
          if (
            item._location.path_.includes(
              pitchDeckFile.name + user?.user?.email
            )
          ) {
            getDownloadURL(item).then((url) => {
              createFundingDatabase(
                url,
                pitchDeckFile.name + user?.user?.email
              );
            });
            return;
          }
        });
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  async function createFundingDatabase(url, itemName) {
    try {
      await setDoc(doc(db, "Funding", user?.user?.email), {
        ProfessionalEmail: getFundedInput.Email,
        ContactNumber: getFundedInput.Phone,
        UploadedFileName: itemName,
        UploadedFilePath: url,
        CompanyName: getFundedInput.StartUpName,
        FounderName: getFundedInput.Name,
        website: getFundedInput.WebsiteLink,
      });
      toast("Sucessfully Applied");
      setTimeout(() => {
        updateUserFirebaseDatabase();
      }, 1000);
    } catch (error) {
      toast(error.message);
    }
  }

  async function updateUserFirebaseDatabase() {
    try {
      const userDocumentRef = doc(db, "Users", user?.user?.email);
      await updateDoc(userDocumentRef, {
        applyForFundingId: user?.user?.email,
        hasFundingProfile: "Yes",
      });

      toast("Updated User Doc");
      setGetFundedInput({
        Name: "",
        Email: "",
        Phone: "",
        StartUpName: "",
        WebsiteLink: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast(error.message);
    }
  }

  const applyForGetFunded = () => {
    if (
      getFundedInput.Name === "" ||
      getFundedInput.Email === "" ||
      getFundedInput.Phone === "" ||
      getFundedInput.StartUpName === ""
    ) {
      toast("Kindly Fill Mandatory Fields");
      return;
    }
    if (pitchDeckFile === null) {
      toast("Kindly Upload PitchDeck File");
      return;
    }

    toast("Processing Your Request");
    uploadPitchDeckDocument();
  };

  return (
    <>
      {width >= 600 ? (
        <>
          <SidebarFinal />
          <NavBarFinal />
        </>
      ) : (
        <>
          <PhnSidebar />
          <KnowledgeNavbar />
        </>
      )}

      <section id="getFundingPage">
        <img
          className="getFundingPageOuterIcon1"
          src="/images/fundingIcon2.png"
          alt=""
        />
        <img
          className="getFundingPageOuterIcon2"
          src="/images/fundingIcon1.png"
          alt=""
        />
        <h1 className="getFundedMainTitle">
          Apply For <span>Funding Now</span>{" "}
        </h1>
        <div className="getFundingPageOuter">
          <h1 className="getFundingPageTitle">Fill Up The Form</h1>
          <hr />
          <div>
            <div className="getFundingPageForm">
              <Input
                onChange={handleGetFundedInputChange}
                type="text"
                name="Name"
                label={"Your Name*"}
                placeholder="Enter here"
                value={getFundedInput.Name}
              />
              <Input
                onChange={handleGetFundedInputChange}
                type="text"
                name="StartUpName"
                label="Start-Up Name*"
                placeholder="Enter here"
                value={getFundedInput.StartUpName}
              />
              <div className="input_flex">
                <Input
                  onChange={handleGetFundedInputChange}
                  type="text"
                  name="Email"
                  label="Email*"
                  placeholder="xyz@gmail.com"
                  value={getFundedInput.Email}
                />
                <Input
                  onChange={handleGetFundedInputChange}
                  type="text"
                  name="Phone"
                  label="Phone No*"
                  placeholder="+91 -"
                  value={getFundedInput.Phone}
                />
              </div>

              <Input
                onChange={handleGetFundedInputChange}
                type="text"
                name="WebsiteLink"
                label="Website Link"
                placeholder="https://samplelink.com"
                value={getFundedInput.WebsiteLink}
              />
              <label className="uploadPitchLabel">Pitch Deck*</label>
              <div className="uploadPitchDeckContainer">
                <div
                  className="form-file-upload"
                  onDragEnter={handleDrag}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    onChange={(e) => setPitchDeckFile(e.target.files[0])}
                    ref={chooseFileRef}
                    type="file"
                    hidden
                    id="pitchdeckInputUpload"
                  />
                  <label
                    htmlFor="pitchdeckInputUpload"
                    className={`upload-label-main ${
                      dragActive ? "drag-active" : ""
                    }`}
                  >
                    <p>Drag Or Upload File Here</p>
                    <img src={uploadIcon} />
                    <span>
                      {pitchDeckFile ? pitchDeckFile.name : "Click Here"}
                    </span>
                  </label>
                  {dragActive && (
                    <div
                      id="drag-file-element"
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            <div className="btn_flex_div">
              <button
                onClick={applyForGetFunded}
                className="getFundedPageApplyButton"
              >
                Apply Now
              </button>
              <button
                onClick={() => navigate("/start-up")}
                className="getFundingPage_CheckYourScoreCont_btn"
              >
                Check Your Score
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetFundedPage;
