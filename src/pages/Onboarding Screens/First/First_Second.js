import React, { useRef, useState } from 'react'
import styles from "../OnboardingScreen.module.css"
import img2 from "../../../images/upload image ui.svg"
import ScreenStatusIndicator from '../Screen Status Indicator/ScreenStatusIndicator'
import logo from "../../../images/Frame 6267154.png"
import imgUpload from "../../../images/Ellipse 401.svg"
import camera from "../../../images/Camera.svg"
import { Fragment } from 'react'
import First_Third from './First_Third'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import {setProfileImg,setAbout} from "../../../features/onboardingSlice"
const First_Second = () => {
  const dispatch=useDispatch()
    const chooseFileRef = useRef(null);
    const[isClick,setIsClick]=useState(false)
    const [imageUpload, setImageUpload] = useState(null);
    const [tempImageURL, setTempImageURL] = useState(null);
    const[about,setAboutt]=useState("")
    
    const chooseFile = () => {
        if (chooseFileRef.current) {
          chooseFileRef.current.click();
        }
      };

//ON IMAGE CHANGE
function onImageChange(e) {
    setImageUpload(e.target.files[0]);
    const fileURL = e.target.files[0];
    if (fileURL) {
      setTempImageURL(URL.createObjectURL(fileURL));
    }
  }

const handleNext=()=>{
  if(!imageUpload){toast.error("Upload Your Image");return}
  if(about===""){toast.error("Fill about field");return}
  dispatch(setProfileImg(imageUpload))
  dispatch(setAbout(about))
  setIsClick(true)
}

  return (
    <>
    <ToastContainer/>
    {!isClick&&<>
    <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type="file"
            hidden
            className="postImageUpload"
            accept="image/png, image/gif, image/jpeg"
            required
          />
        <section className={styles.outerCont}>
    <div className={styles.top}>
    <img src={logo} alt="logo" />
    <ScreenStatusIndicator pageNo={2}/>
    </div>
    <div className={styles.dataCont}>
        <div className={styles.left}>
            <h1 className={styles.heading1}>Personal Profile</h1>
            <div onClick={chooseFile} className={styles.imageUpload}>
                {!tempImageURL&&<Fragment>
                <img src={imgUpload} alt="upload" />
                <p>Upload your photo*</p>
                <img className={styles.cameraImage} src={camera} alt="camera" />
                </Fragment>}
                {tempImageURL&&<img src={tempImageURL} alt="userImage" />}
            </div>
        </div>
        <div className={styles.right}>
            <img className={styles.imageForShow} src={img2} alt="img" />
        </div>
    </div>
    <div className={styles.aboutCont}>
        <h1>Tell us About you*</h1>
        <textarea onChange={(e)=>setAboutt(e.target.value)} rows="3" type="text" placeholder='write about yourself ' value={about} />
    </div>
    <div className={styles.btnCont}>
        <button onClick={handleNext}>Next</button>
    </div>
   </section>
   </>}
   {
    isClick&&<><First_Third/></>
   }
    </>
  )
}

export default First_Second