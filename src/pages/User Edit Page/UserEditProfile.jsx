import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal'
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import "./UserEditProfile.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { db,storage } from '../../firebase';
import { updateDoc,doc, collection, query, getDocs, setDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { setUserDoc } from '../../features/userDocSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUserFundingDoc } from '../../features/userFundingDocSlice';
import {IoMdAddCircleOutline} from "react-icons/io"

const UserEditProfile = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

    const user=useSelector((state)=>state.user)
    const userDoc=useSelector((state)=>state.userDoc)
    const userFundingDoc=useSelector((state)=>state.userFundingDoc)

console.log("userDoc",userDoc)
console.log("userFundingDoc",userFundingDoc)


    const [width, setWidth] = useState(window.innerWidth);
    const[meta,setMeta]=useState([])
    console.log("meta",meta)    
    const[imageUpload,setImageUpload]=useState(null)
    const[tempImageURL,setTempImageURL]=useState(null)
    const[userDefaultImage,setUserDefaultImage]=useState(userDoc?.image)
    const[startUpDocumentUpload,setStartUpDocumentUpload]=useState(null)
    const [userDefaultstartUpDocumentName,setUserDefaultStartUpDocumentName]=useState(userFundingDoc?.UploadedFileName)
    const [userDefaultstartUpDocumentURL,setUserDefaultStartUpDocumentURL]=useState(userFundingDoc?.UploadedFilePath)

   
    const[haveStartUpBtnClick,setHaveStartUpBtnClick]=useState(userDoc?.hasFundingProfile)

const[generalProfileInfo,setGeneralProfileInfo]=useState({fullName:userDoc?.name,dOB:userDoc?.dob,gender:userDoc?.gender,stateOfUser:userDoc?.state,country:userDoc?.country,designation:userDoc?.designation,about:userDoc?.about,phone:userDoc?.phone})
const[socialLinkInfo,setSocialLinkInfo]=useState({instaLink:userDoc?.instagramLink,facebookLink:userDoc?.facebookLink,twitterLink:userDoc?.twitterLink,linkedInLink:userDoc?.linkedinLink})
const[educationInfo,setEducationInfo]=useState({degree:"",schoolOrCollege:"",startingDate:"",lastDate:""})
const[educationFormArray,setEducationFormArray]=useState(userDoc?.education)

const[professionalInfo,setProfessionalInfo]=useState({previousOrCurrentOrganisation:"",designation:"",durationOfYears:"",yourRole:""})
const[professionalFormArray,setProfessionalFormArray]=useState(userDoc?.experience)

const[yourIndustry,setYourIndustry]=useState(userDoc?.industry)

const[startUpInfo,setStartUpInfo]=useState({startUpFullName:userFundingDoc?.FounderName,startUpProfessionalEmail:userFundingDoc?.ProfessionalEmail,startUpMobile:userFundingDoc?.ContactNumber,startUpLinkedIn:userFundingDoc?.LinkedinLink})


    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
      
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);



      // CHECK FOR USER DOC DATA
      useEffect(()=>{
        async function fetchUserDocFromFirebase(){
          const userDataRef = collection(db, "Users");
          const q = query(userDataRef);
          const querySnapshot = await getDocs(q);
         
          querySnapshot.forEach((doc) => {
           
           if(doc.id===user?.user?.email){
            dispatch(setUserDoc(doc.data())); 
           }
          }); 
        }
      fetchUserDocFromFirebase()
      },[user])

//CHECK FOR META DATA
useEffect(()=>{
    async function fetchUserDocFromFirebase(){
      const userDataRef = collection(db, "meta");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
     
      querySnapshot.forEach((doc) => {
       setMeta(doc.data().emailPhone)
      }); 
    }
  fetchUserDocFromFirebase()
  },[])

// CHECK IF USER HAS FUNDING PROFILE

useEffect(()=>{
if(userDoc?.hasFundingProfile==="No"){return;}
async function fetchUserFundingDocFromFirebase(){
    const userFundingDataRef = collection(db, "Funding");
    const q = query(userFundingDataRef);
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
     
     if(doc.id===user?.user?.email){
      dispatch(setUserFundingDoc(doc.data())); 
     }
    }); 
  }
fetchUserFundingDocFromFirebase()


},[userDoc])





      //ON IMAGE CHANGE
      function onImageChange(e){
        setImageUpload(e.target.files[0])
        const fileURL=(e.target.files[0])
        if (fileURL){

            setTempImageURL(URL.createObjectURL(fileURL))
        }
      }

    //   General Profile Info Input Change

function handleGeneralProfileInfoInputChange(e){
    const{name,value}=e.target
console.log(e.target.value)
    setGeneralProfileInfo((prev)=>{
        return {...prev,[name]:value}
    })
}


    // Social Link Form Input Change

function handleSocialLinkFormInputChange(e){
    const{name,value}=e.target

    setSocialLinkInfo((prev)=>{
        return {...prev,[name]:value}
    })
}

// Education Form Input Change

function handleEducationFormInputChange(e){
    const{name,value}=e.target

    setEducationInfo((prev)=>{
        return {...prev,[name]:value}
    })
}

//NEW EDUCATION FORM INPUT BUTTON CLICK

function addNewEducationFormInput(){
    if(educationInfo.degree===""||educationInfo.schoolOrCollege===""||educationInfo.startingDate===""||educationInfo.lastDate===""){toast.error("Kindly fill all slots");return}
console.log(educationInfo)

    setEducationFormArray((prev)=>{
        return[...prev,{...educationInfo,id:new Date().getTime()}]
    })
    setEducationInfo({degree:"",schoolOrCollege:"",startingDate:"",lastDate:""})
}


//DELETE EDUCATION FORM ICON CLICK

function handleDeleteEducationFormIconClick(id){
    const newEducationFormArray=educationFormArray?.filter((item)=>{
        return item.id!==id
    })
    setEducationFormArray(newEducationFormArray)
}


// Professional Form Input Change

function handleProfessionalFormInputChange(e){
    const{name,value}=e.target

    setProfessionalInfo((prev)=>{
        return {...prev,[name]:value}
    })
}

//NEW PROFESSIONAL FORM INPUT BUTTON CLICK

function addNewProfessionalFormInput(){
    if(professionalInfo.designation===""||professionalInfo.durationOfYears===""||professionalInfo.previousOrCurrentOrganisation===""||professionalInfo.yourRole===""){toast.error("Kindly fill all slots");return}

    setProfessionalFormArray((prev)=>{
        return[...prev,{...professionalInfo,id:new Date().getTime()}]
    })
    setProfessionalInfo({previousOrCurrentOrganisation:"",designation:"",durationOfYears:"",yourRole:""})
}


//DELETE PROFFESSIONAL FORM ICON CLICK

function handleDeleteProfessionalFormIconClick(id){
    const newProfessionalFormArray=professionalFormArray?.filter((item)=>{
        return item.id!==id
    })
    setProfessionalFormArray(newProfessionalFormArray)
}

//START UP FORM INPUT CHANGE

function handleStartUpFormInputChange(e){
    const{name,value}=e.target

    setStartUpInfo((prev)=>{
        return {...prev,[name]:value}
    })
}

// UPLOAD IMAGE TO FIREBASE

const uploadImageToFireBase=async()=>{
    if(imageUpload===null){updateUserDocInFirebase(userDefaultImage);return;}
    else if(imageUpload!==null){
    const imageReff=ref(storage,`Images/${imageUpload.name+user?.user?.email}`);
    try {
        await uploadBytes(imageReff,imageUpload)
        // toast("Successfully Uploaded image")
        fetchUrlOfUploadedImage()
    } catch (error) {
        toast.error(error.message)
    }
   
    }  
}

// GET URL OF IMAGE UPLOADED IN FIREBASE
const fetchUrlOfUploadedImage=async()=>{
 
    const imagesListRef=ref(storage,"Images/")

try {
   await listAll(imagesListRef).then((resp)=>{

    resp.items.forEach((item)=>{
        if(item._location.path_.includes(imageUpload.name+user?.user?.email)){
          
          getDownloadURL(item).then((url)=>{
                // setImageUploadedUrl(url)
                
                updateUserDocInFirebase(url)
            })
            // .then(updateUserDocInFirebase())
           
        }
       })
   })

} catch (error) {
   toast.error(error.message) 
}
}
// UPLOAD STARTUP RELEVANT FILE TO FIREBASE

const uploadStartupRelevantFilesToFirebase=async()=>{

     
    const fileReff=ref(storage,`FundingFiles/${startUpDocumentUpload.name+user?.user?.email}`);
        try {
            await uploadBytes(fileReff,startUpDocumentUpload).then(()=>{
                // toast("Successfully Uploaded Relevant Document")
            })
           
            fetchUrlOfUploadedStartupFiles()
        } catch (error) {
            toast.error(error.message)
        }

       
    }
    

  
    


// GET URL OF STARTUP FILES UPLOADED IN FIREBASE
const fetchUrlOfUploadedStartupFiles=async()=>{
    const fundingFilesListRef=ref(storage,"FundingFiles/")
   
try {
   await listAll(fundingFilesListRef).then((resp)=>{
    resp.items.forEach((item)=>{
        if(item._location.path_.includes(startUpDocumentUpload.name+user?.user?.email)){
          
            getDownloadURL(item).then((url)=>{
                // setStartupFilesUploadedUrl(url)
                uploadStartupDataToFirebase(url,startUpDocumentUpload.name+user?.user?.email)
            })
            // .then(uploadStartupDataToFirebase())
            return;
        }
       })
   })

   
   
} catch (error) {
   toast.error(error.message) 
}
}

// UPLOAD STARTUP DATA TO FIREBASE

async function uploadStartupDataToFirebase(item,itemName){
  
    await setDoc(
        doc(db, "Funding", user?.user?.email),{
ProfessionalEmail:startUpInfo.startUpProfessionalEmail,
EntityDetail:"",
Title:"",
ContactNumber:startUpInfo.startUpMobile,
Country:"",
UploadedFileName:itemName,
UploadedFilePath:item,
industry:"",
CompanyName:"",
FounderName:startUpInfo.startUpFullName,
Name:"",
LinkedinLink:startUpInfo.startUpLinkedIn,
website:"",

        }
        ).then(()=>{
            toast("Successfully Uploaded StartUp Data")
        })  
}

//UPDATE USERDOC IN FIREBASE

async function updateUserDocInFirebase(item){
    
   
    let newEducationalArray;
    let newExperienceArray;
    if(professionalInfo.previousOrCurrentOrganisation===""&&professionalInfo.designation===""&&professionalInfo.durationOfYears===""&&professionalInfo.yourRole===""&&professionalFormArray.length===0){newExperienceArray=[]}
    else if(professionalInfo.previousOrCurrentOrganisation===""&&professionalInfo.designation===""&&professionalInfo.durationOfYears===""&&professionalInfo.yourRole===""&&professionalFormArray.length!==0){newExperienceArray=[...professionalFormArray]}
    else{
        newExperienceArray= [...professionalFormArray,{...professionalInfo,id:new Date().getTime()}];
    }
    
       if(educationInfo.degree===""&&educationInfo.lastDate===""&&educationInfo.schoolOrCollege===""&&educationInfo.startingDate===""&&educationFormArray.length===0){newEducationalArray=[]}
       else if(educationInfo.degree===""&&educationInfo.lastDate===""&&educationInfo.schoolOrCollege===""&&educationInfo.startingDate===""&&educationFormArray.length!==0){
        newEducationalArray=[...educationFormArray]
       } 
       else{
        newEducationalArray=[...educationFormArray,{...educationInfo,id:new Date().getTime()}]
       }
    
       //META UPDATE
       let tempMeta=meta.map((item)=>{if(item.email===user?.user?.email){return {email:user?.user.email,phone:generalProfileInfo.phone}}
       else{return item}
    })


    
    const userDocumentRef=doc(db,"Users",user?.user?.email)
    
    toast("Processing Your Request")
   await updateDoc(userDocumentRef,{
        name: generalProfileInfo.fullName,
        dob:generalProfileInfo.dOB,
        phone:generalProfileInfo.phone,
        state:generalProfileInfo.stateOfUser,
        country:generalProfileInfo.country,
        designation:generalProfileInfo.designation,
        about: generalProfileInfo.about,
        gender:generalProfileInfo.gender,
        experience:newExperienceArray,
        education: newEducationalArray,
        linkedinLink:socialLinkInfo.linkedInLink,
        twitterLink:socialLinkInfo.twitterLink,
        facebookLink:socialLinkInfo.facebookLink,
        instagramLink:socialLinkInfo.instaLink,
        image:item,
        industry:yourIndustry,
        hasGeneralProfile:true,
        hasFundingProfile:haveStartUpBtnClick,
      })
      await updateDoc(doc(db, "meta", "emailPhone"),{emailPhone:tempMeta})
      .then(()=>{
        toast("Successfully Updated User Profile")
        navigate("/userprofile")
    }).catch((error)=>{
        toast.error(error.message)
    })
}

// UPDATE USERDOC ADD NEW IMAGE CREATE FUNDING USER BTN CLICK

async function updateUserDocAddNewImageCreateFundingUser(){
   
//     if(generalProfileInfo.country===""||generalProfileInfo.dOB===""||generalProfileInfo.fullName===""||generalProfileInfo.gender===""||generalProfileInfo.stateOfUser===""||generalProfileInfo.about===""||yourIndustry===""){toast.error("Kindly fill Mandatory(*) Fields");return;}
//     if(educationInfo.degree===""&&educationInfo.lastDate===""&&educationInfo.schoolOrCollege===""&&educationInfo.startingDate===""&&educationFormArray.length===0){
//         toast.error("Minimum One Education is Mandatory");
//         return
//     }

// if(haveStartUpBtnClick===""){toast("Kindly select Yes Or No");return;}
// else if (haveStartUpBtnClick==="No"){toast("Processing Your Request");uploadImageToFireBase();return}
// else if (haveStartUpBtnClick==="Yes"){
//   if(startUpDocumentUpload===null){toast("Processing Your Request");uploadImageToFireBase();uploadStartupDataToFirebase(userDefaultstartUpDocumentURL,userDefaultstartUpDocumentName);return}
//   else if(startUpDocumentUpload!==null){
//     toast("Processing Your Request");
//     uploadStartupRelevantFilesToFirebase();
//     uploadImageToFireBase()
//   }
// } 
toast("Processing Your Request")
uploadImageToFireBase()
}

  return (
   <>


{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}

<section id='mentor-add-profile-page'>

    <section className='profile-info-section'>
        <h1 className='profile-info-section-title'>Let’s get your profile done first!!</h1>
        <div className='imageUploadInputContainer'>
        <input onChange={onImageChange} type="file" name='imageUpload'/>
        {imageUpload!==null&&tempImageURL?<><img className="userUploadedImagePreview" src={tempImageURL} alt="user-uploaded-image" /></>:
        <>
        <div className=''>
       
       <img className='userUploadedImagePreview' src={userDefaultImage}alt="uplaod-image-icon" />

       {/* <img className='imageUploadInputContainerImage' src="./images/UserCircle.png" alt="image-upload-btn" />
       <p className='imageUploadInputContainerText'>{imageUpload!==null?imageUpload?.name:"Add Photo"}</p> */}
       </div>
        </>}
        
       
        </div>

{/* ADD FORM INPUT FORM */}

        <div className='add-profile-info-form'>
            <input onChange={handleGeneralProfileInfoInputChange} type="text" name='fullName' className='add-profile-input fullName-input' placeholder='Full Name' value={generalProfileInfo.fullName} />
            <div className='add-profile-info-form-grid'>
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='dOB' className='add-profile-input DOB-input' placeholder='Date of Birth' value={generalProfileInfo.dOB} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='gender' className='add-profile-input Gender-input' placeholder='Gender' value={generalProfileInfo.gender} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='stateOfUser' className='add-profile-input state-input' placeholder='State' value={generalProfileInfo.stateOfUser} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='country' className='add-profile-input country-input' placeholder='Country' value={generalProfileInfo.country} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='designation' className='add-profile-input fullName-input state-input' placeholder='Designation' value={generalProfileInfo.designation} />
                <input readOnly onChange={handleGeneralProfileInfoInputChange} type="text" name='phone' className='add-profile-input fullName-input country-input' placeholder='Phone Number' value={generalProfileInfo.phone} />  
            </div>
            <textarea onChange={handleGeneralProfileInfoInputChange} name="about" className='about-input' rows="4" placeholder="About" value={generalProfileInfo.about}></textarea>
        </div>

{/* HOW YOU WANT TO MEET PEOPLE */}

        <section className='how-you-want-to-meet-people'>
            <h1 className='how-you-want-to-meet-people-title'>How you want to meet people</h1>
            <div className='how-you-want-to-meet-people-form'>
                <div className='how-you-want-to-meet-people-form-input-cont'>
                <input onChange={handleSocialLinkFormInputChange} type="text" name='instaLink' className='social-link-input' placeholder='Insta Link' value={socialLinkInfo.instaLink} />
                <img className='how-you-want-to-meet-people-form-social-icon-img' src="./images/instaIcon.svg" alt="insta-icon" />
                </div>
                <div className='how-you-want-to-meet-people-form-input-cont'>
                <input onChange={handleSocialLinkFormInputChange} type="text" name='facebookLink' className='social-link-input' placeholder='Facebook Link' value={socialLinkInfo.facebookLink} />
                <img className='how-you-want-to-meet-people-form-social-icon-img' src="./images/faceBookIcon.svg" alt="insta-icon" />
                </div>
                <div className='how-you-want-to-meet-people-form-input-cont'>
                <input onChange={handleSocialLinkFormInputChange} type="text" name='twitterLink' className='social-link-input' placeholder='Twitter Link' value={socialLinkInfo.twitterLink} />
                <img className='how-you-want-to-meet-people-form-social-icon-img' src="./images/twitterIcon.svg" alt="insta-icon" />
                </div>
                <div className='how-you-want-to-meet-people-form-input-cont'>
                <input onChange={handleSocialLinkFormInputChange} type="text" name='linkedInLink' className='social-link-input' placeholder='LinkedIn Link' value={socialLinkInfo.linkedInLink} />
                <img className='how-you-want-to-meet-people-form-social-icon-img' src="./images/linkedinIcon.svg" alt="insta-icon" />
                </div>
            </div>
        </section>

{/* KNOW ABOUT YOUR EDUCATION */}

        <section id='know-about-your-education'>
        <h1 className='know-about-your-education-title'>Let’s know about your Education!</h1>  
{educationFormArray?.map((item)=>{
    return <>
    <div className='know-about-your-education-form read-only-form' key={item.id} id={item.id}>
    <div className='education-form-input readOnlyInput' ><strong>Degree :</strong> {item.degree} </div>
    <div className='education-form-input readOnlyInput' ><strong>College/School :</strong> {item.schoolOrCollege} </div>
    <div className='education-form-input readOnlyInput' ><strong>Starting Date :</strong> {item.startingDate} </div>
    <div className='education-form-input readOnlyInput' ><strong>Last Date :</strong> {item.lastDate} </div>
            <img onClick={()=>handleDeleteEducationFormIconClick(item.id)} className='delete-icon' src="./images/deleteIcon.png" alt="delete-icon" />
        </div>  
    </>
})}
        <div className='know-about-your-education-form'>
        <ToastContainer />
            <input onChange={handleEducationFormInputChange} type="text" name='degree' className='education-form-input' placeholder='Degree' value={educationInfo.degree} />
            <input onChange={handleEducationFormInputChange} type="text" name='schoolOrCollege' className='education-form-input' placeholder='College/School' value={educationInfo.schoolOrCollege}  />
            <p>Starting Date</p>
            <input onChange={handleEducationFormInputChange} type="date" name='startingDate' className='education-form-input' placeholder='Starting Date' value={educationInfo.startingDate} />
            <p>Completion Date</p>
            <input onChange={handleEducationFormInputChange} type="date" name='lastDate' className='education-form-input' placeholder='Last Date' value={educationInfo.lastDate} />
        </div>

        <div onClick={addNewEducationFormInput} className='add-more-form-image-container'>
            {/* <img className='add-more-form-image-container-image' src="./images/addMorePlusIcon.png" alt="add-more-icon" /> */}
            <IoMdAddCircleOutline className='add-more-form-image-container-image-react-icon'/>
        </div>
        </section>


      {/* PROFESSIONAL PROFILE FORM SECTION   */}


      <section id='professional-profile-section'>
        <h1 className='professional-profile-section-title'>Now let’s get your Professional Profile Done</h1>  
{professionalFormArray?.map((item)=>{
    return <>
    <div className='professional-profile-section-form read-only-form' key={item.id} id={item.id}>
    <div className='professional-profile-form-input readOnlyInput' ><strong>Previous/Current Organisation :</strong> {item.previousOrCurrentOrganisation} </div>
    <div className='professional-profile-form-input readOnlyInput' ><strong>Designation :</strong> {item.designation} </div>
    <div className='professional-profile-form-input readOnlyInput' ><strong>Duration Of Years :</strong> {item.durationOfYears} </div>
    <div className='professional-profile-form-input readOnlyInput' ><strong>Your Role :</strong> {item.yourRole} </div>
            <img onClick={()=>handleDeleteProfessionalFormIconClick(item.id)} className='delete-icon' src="./images/deleteIcon.png" alt="delete-icon" />
        </div>  
    </>
})}
        <div className='professional-profile-section-form'>
        <ToastContainer />
            <input onChange={handleProfessionalFormInputChange} type="text" name='previousOrCurrentOrganisation' className='professional-profile-form-input' placeholder='Previous/Current Organisation' value={professionalInfo.previousOrCurrentOrganisation} />
            <input onChange={handleProfessionalFormInputChange} type="text" name='designation' className='professional-profile-form-input' placeholder='Designation' value={professionalInfo.designation}  />
            <input onChange={handleProfessionalFormInputChange} type="text" name='durationOfYears' className='professional-profile-form-input' placeholder='Duration of years you worked' value={professionalInfo.durationOfYears} />
            <input onChange={handleProfessionalFormInputChange} type="text" name='yourRole' className='professional-profile-form-input' placeholder='Your Role' value={professionalInfo.yourRole} />
        </div>

        <div onClick={addNewProfessionalFormInput} className='add-more-form-image-container'>
            {/* <img className='add-more-form-image-container-image' src="./images/addMorePlusIcon.png" alt="add-more-icon" /> */}
            <IoMdAddCircleOutline className='add-more-form-image-container-image-react-icon'/>
        </div>
        </section>


        {/* WHAT IS YOUR INDUSTRY SECTION */}

        <section id='what-is-your-industry-section'>
        <h1 className='what-is-your-industry-title'>What is your Industry?</h1>
            <div className='what-is-your-industry-input'>{yourIndustry===""?"Choose Your Industry":yourIndustry}</div>

            <div className='what-is-your-industry-options-cont'>
                <div onClick={()=>setYourIndustry("Fintech")} className='what-is-your-industry-options'>Fintech</div>
                <div onClick={()=>setYourIndustry("Sales")} className='what-is-your-industry-options'>Sales</div>
                <div onClick={()=>setYourIndustry("Product Development")} className='what-is-your-industry-options pd-industry-option'>Product Development</div>
                <div onClick={()=>setYourIndustry("Research")} className='what-is-your-industry-options'>Research</div>
                <div onClick={()=>setYourIndustry("Legal")} className='what-is-your-industry-options'>Legal</div>
                <div onClick={()=>setYourIndustry("Marketing")} className='what-is-your-industry-options'>Marketing</div>
                <div onClick={()=>setYourIndustry("Fundraising")} className='what-is-your-industry-options'>Fundraising</div>
                <div onClick={()=>setYourIndustry("Realtech")} className='what-is-your-industry-options'>Realtech</div>
                <div onClick={()=>setYourIndustry("Edtech")} className='what-is-your-industry-options'>Edtech</div>
                <div onClick={()=>setYourIndustry("Medtech")} className='what-is-your-industry-options'>Medtech</div>
            </div>
        </section>


{/* DO TOU HAVE STARTUP SECTION */}

        {/* <section id='doYouHaveAStartUp'>
            <h1 className='doYouHaveAStartUp-title'>Do you have a Start-Up?</h1>
            <div className='doYouHaveAStartUp-option-container '>
                <button onClick={()=>{setHaveStartUpBtnClick("Yes")}} className={haveStartUpBtnClick==="Yes"?'selected-option':'doYouHaveAStartUp-yes-option'}>Yes*</button>
                <button onClick={()=>{setHaveStartUpBtnClick("No")}} className={haveStartUpBtnClick==="No"?'selected-option':'doYouHaveAStartUp-no-option'}>No*</button>
            </div>
{haveStartUpBtnClick==="Yes"?<>
    <div className='doYouHaveAStartUp-verification-container'>
    <ToastContainer />
                <h1 className='doYouHaveAStartUp-verification-container-title'>Start Up Verification</h1>
                <p className='doYouHaveAStartUp-verification-container-sub-text'>Upload comapany documents</p>
                <div className='doYouHaveAStartUp-verification-upload-document-cont'>
                <input id='startupDocumentUpload' onChange={(e)=>{setStartUpDocumentUpload(e.target.files[0])}} type="file" name='startupDocumentUpload'/>
                <img src="./images/uploadDocument.svg" alt="uploadDocumentIcon" />
                </div>
                <p className='mentor-add-profile-page-submit-button-sub-text'>Create a Zip file of all documents and upload</p>
                    <p className='uploadDocumentFileName'>{startUpDocumentUpload?.name}</p>
{userDefaultstartUpDocumentName!==""||userDefaultstartUpDocumentName!==undefined||userDefaultstartUpDocumentName!==null?<p className='uploadDocumentFileName'>{userDefaultstartUpDocumentName}</p>:null}
                <div className='doYouHaveAStartUp-verification-form'>
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpFullName' className='doYouHaveAStartUp-verification-form-input' placeholder='Full Name' value={startUpInfo.startUpFullName} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpProfessionalEmail' className='doYouHaveAStartUp-verification-form-input' placeholder='Professional Email' value={startUpInfo.startUpProfessionalEmail} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpMobile' className='doYouHaveAStartUp-verification-form-input' placeholder='Mobile No.' value={startUpInfo.startUpMobile} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpLinkedIn' className='doYouHaveAStartUp-verification-form-input' placeholder='LinkedIn' value={startUpInfo.startUpLinkedIn} />
                </div>
            </div>

</>:null}
            
        </section> */}
        
<div style={{display:"flex",flexDirection:"column",width:"95%"}}> 
<button onClick={updateUserDocAddNewImageCreateFundingUser} className='mentor-add-profile-page-submit-button'>Submit</button>
        <p className='mentor-add-profile-page-submit-button-sub-text'>The provided information can be edited in future</p>
        </div>
       

    </section>
</section>

   </>
  )
}

export default UserEditProfile