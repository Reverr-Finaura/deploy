import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal'
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import "./UserAddProfile.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UserAddProfile = () => {

    const [width, setWidth] = useState(window.innerWidth);    
    const[imageUpload,setImageUpload]=useState(null)
    const[startUpDocumentUpload,setStartUpDocumentUpload]=useState(null)
    const[haveStartUp,setHaveStartUp]=useState(true)

    console.log(startUpDocumentUpload)

const[generalProfileInfo,setGeneralProfileInfo]=useState({fullName:"",dOB:"",gender:"",stateOfUser:"",country:"",about:""})
const[socialLinkInfo,setSocialLinkInfo]=useState({instaLink:"",facebookLink:"",twitterLink:"",linkedInLink:""})
const[educationInfo,setEducationInfo]=useState({degree:"",schoolOrCollege:"",startingDate:"",lastDate:""})
const[educationFormArray,setEducationFormArray]=useState([])

const[professionalInfo,setProfessionalInfo]=useState({previousOrCurrentOrganisation:"",designation:"",durationOfYears:"",yourRole:""})
const[professionalFormArray,setProfessionalFormArray]=useState([])

const[yourIndustry,setYourIndustry]=useState("")

const[startUpInfo,setStartUpInfo]=useState({startUpFullName:"",startUpProfessionalEmail:"",startUpMobile:"",startUpLinkedIn:""})


    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);

    //   General Profile Info Input Change

function handleGeneralProfileInfoInputChange(e){
    const{name,value}=e.target

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

    setEducationFormArray((prev)=>{
        return[...prev,{...educationInfo,id:new Date().getTime()}]
    })
    setEducationInfo({degree:"",schoolOrCollege:"",startingDate:"",lastDate:""})
}


//DELETE EDUCATION FORM ICON CLICK

function handleDeleteEducationFormIconClick(id){
    const newEducationFormArray=educationFormArray.filter((item)=>{
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
    const newProfessionalFormArray=professionalFormArray.filter((item)=>{
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

  return (
   <>


{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}

<section id='mentor-add-profile-page'>

    <section className='profile-info-section'>
        <h1 className='profile-info-section-title'>Let’s get your profile done first!!</h1>
        <div className='imageUploadInputContainer'>
        <input onChange={(e)=>{setImageUpload(e.target.files[0])}} type="file" name='imageUpload'/>
        <div className='imageUploadInputContainerImageContainer'>
        <img className='imageUploadInputContainerImage' src="./images/UserCircle.png" alt="image-upload-btn" />
        <p className='imageUploadInputContainerText'>{imageUpload!==null?imageUpload?.name:"Add Photo"}</p>
        </div>
        </div>

{/* ADD FORM INPUT FORM */}

        <div className='add-profile-info-form'>
            <input onChange={handleGeneralProfileInfoInputChange} type="text" name='fullName' className='add-profile-input fullName-input' placeholder='Full Name' value={generalProfileInfo.fullName} />
            <div className='add-profile-info-form-grid'>
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='dOB' className='add-profile-input DOB-input' placeholder='Date of Birth' value={generalProfileInfo.dOB} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='gender' className='add-profile-input Gender-input' placeholder='Gender' value={generalProfileInfo.gender} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='stateOfUser' className='add-profile-input state-input' placeholder='State' value={generalProfileInfo.stateOfUser} />
                <input onChange={handleGeneralProfileInfoInputChange} type="text" name='country' className='add-profile-input country-input' placeholder='Country' value={generalProfileInfo.country} />
            </div>
            <textarea onChange={handleGeneralProfileInfoInputChange} name="about" className='add-profile-input about-input' rows="5" placeholder="About" value={generalProfileInfo.about}></textarea>
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
{educationFormArray.map((item)=>{
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
            <input onChange={handleEducationFormInputChange} type="text" name='startingDate' className='education-form-input' placeholder='Starting Date' value={educationInfo.startingDate} />
            <input onChange={handleEducationFormInputChange} type="text" name='lastDate' className='education-form-input' placeholder='Last Date' value={educationInfo.lastDate} />
        </div>

        <div onClick={addNewEducationFormInput} className='add-more-form-image-container'>
            <img src="./images/addMorePlusIcon.png" alt="add-more-icon" />
        </div>
        </section>


      {/* PROFESSIONAL PROFILE FORM SECTION   */}


      <section id='professional-profile-section'>
        <h1 className='professional-profile-section-title'>Now let’s get your Professional Profile Done</h1>  
{professionalFormArray.map((item)=>{
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
            <input onChange={handleProfessionalFormInputChange} type="text" name='previousOrCurrentOrganisation' className='professional-profile-form-input' placeholder='Previous Organisation you worked with' value={professionalInfo.previousOrCurrentOrganisation} />
            <input onChange={handleProfessionalFormInputChange} type="text" name='designation' className='professional-profile-form-input' placeholder='Designation' value={professionalInfo.designation}  />
            <input onChange={handleProfessionalFormInputChange} type="text" name='durationOfYears' className='professional-profile-form-input' placeholder='Duration of years you worked' value={professionalInfo.durationOfYears} />
            <input onChange={handleProfessionalFormInputChange} type="text" name='yourRole' className='professional-profile-form-input' placeholder='Your Role' value={professionalInfo.yourRole} />
        </div>

        <div onClick={addNewProfessionalFormInput} className='add-more-form-image-container'>
            <img src="./images/addMorePlusIcon.png" alt="add-more-icon" />
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


        <section id='doYouHaveAStartUp'>
            <h1 className='doYouHaveAStartUp-title'>Do you have a Start-Up?</h1>
            <div className='doYouHaveAStartUp-option-container'>
                <button onClick={()=>setHaveStartUp(true)} className='doYouHaveAStartUp-yes-option'>Yes</button>
                <button onClick={()=>setHaveStartUp(false)} className='doYouHaveAStartUp-no-option'>No</button>
            </div>
{haveStartUp?<>
    <div className='doYouHaveAStartUp-verification-container'>
                <h1 className='doYouHaveAStartUp-verification-container-title'>Start Up Verification</h1>
                <p className='doYouHaveAStartUp-verification-container-sub-text'>Upload comapany documents</p>
                <div className='doYouHaveAStartUp-verification-upload-document-cont'>
                <input id='startupDocumentUpload' onChange={(e)=>{setStartUpDocumentUpload(e.target.files[0])}} type="file" name='startupDocumentUpload'/>
                <img src="./images/uploadDocument.svg" alt="uploadDocumentIcon" />
                </div>
                    <p className='uploadDocumentFileName'>{startUpDocumentUpload?.name}</p>

                <div className='doYouHaveAStartUp-verification-form'>
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpFullName' className='doYouHaveAStartUp-verification-form-input' placeholder='Full Name' value={startUpInfo.startUpFullName} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpProfessionalEmail' className='doYouHaveAStartUp-verification-form-input' placeholder='Professional Email' value={startUpInfo.startUpProfessionalEmail} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpMobile' className='doYouHaveAStartUp-verification-form-input' placeholder='Mobile No.' value={startUpInfo.startUpMobile} />
                    <input onChange={handleStartUpFormInputChange} type="text" name='startUpLinkedIn' className='doYouHaveAStartUp-verification-form-input' placeholder='LinkedIn' value={startUpInfo.startUpLinkedIn} />
                </div>
            </div>

</>:null}
            
        </section>

<div style={{display:"flex",flexDirection:"column",width:"95%"}}> 
<button className='mentor-add-profile-page-submit-button'>Submit</button>
        <p className='mentor-add-profile-page-submit-button-sub-text'>The provided information can be edited in future</p>
        </div>
       

    </section>
</section>

   </>
  )
}

export default UserAddProfile