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

const GetFundedPage = () => {
  const user = useSelector((state) => state.user);
  const [width, setWidth] = useState(window.innerWidth);
  const [pitchDeckFile, setPitchDeckFile] = useState(null);
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
        <ToastContainer />
        <h1 className="getFundingPageTitle">Funding Form</h1>

        <div className="getFundingPageForm">
          <input
            onChange={handleGetFundedInputChange}
            type="text"
            name="Name"
            placeholder="Name*"
            className="getFundingPageFormInput"
            value={getFundedInput.Name}
          />
          <input
            onChange={handleGetFundedInputChange}
            type="text"
            name="Email"
            placeholder="Email*"
            className="getFundingPageFormInput"
            value={getFundedInput.Email}
          />
          <input
            onChange={handleGetFundedInputChange}
            type="text"
            name="Phone"
            placeholder="Phone No.*"
            className="getFundingPageFormInput"
            value={getFundedInput.Phone}
          />
          <input
            onChange={handleGetFundedInputChange}
            type="text"
            name="StartUpName"
            placeholder="StartUp Name*"
            className="getFundingPageFormInput"
            value={getFundedInput.StartUpName}
          />
          <input
            onChange={handleGetFundedInputChange}
            type="text"
            name="WebsiteLink"
            placeholder="Website Link"
            className="getFundingPageFormInput"
            value={getFundedInput.WebsiteLink}
          />
          <div className="uploadPitchDeckContainer">
            <input
              type="text"
              name="PitchDeck"
              placeholder="PitchDeck*"
              className="getFundingPageFormInput pitchDeckUploadDocument"
              value={pitchDeckFile?.name}
            />
            <button onClick={chooseFile} className="pitchDeckUploadButton">
              Select
            </button>
            <input
              onChange={(e) => setPitchDeckFile(e.target.files[0])}
              ref={chooseFileRef}
              type="file"
              hidden
              className="pitchdeckInputUpload"
            />
          </div>
          <button
            onClick={applyForGetFunded}
            className="getFundedPageApplyButton"
          >
            Apply
          </button>
        </div>
      </section>
    </>
  );
};

export default GetFundedPage;
