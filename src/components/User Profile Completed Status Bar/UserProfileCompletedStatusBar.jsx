import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { setUserDoc } from '../../features/userDocSlice'
import { db } from '../../firebase'
import "./UserProfileCompletedStatusBar.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UserProfileCompletedStatusBar = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
const userDoc=useSelector((state)=>state.userDoc)



    const [profileCompletionProgress,setProfileCompletionProgress]=useState(0)




// CHECK FOR USER PROFILE PROGRESS BAR
useEffect(()=>{


function checkForUserProfileProgress(){
let aboutPerc=9.09
let countryPerc=9.09
let dobPerc=9.09
let educationPerc=9.09
let experiencePerc=9.09
let socialLinkPerc=9.09
let genderPerc=9.09
let imagePerc=9.09
let industryPerc=9.09
let statePerc=9.09
let namePerc=9.09
let percentComplete=0
    
    if(userDoc?.about?.length!==0){percentComplete+=aboutPerc}
    
    if(userDoc?.country?.length!==0){percentComplete+=countryPerc}
    
    if (userDoc?.dob?.length!==0){percentComplete+=dobPerc}
    
    if (userDoc?.education?.length!==0){percentComplete+=educationPerc}
    
    if(userDoc?.experience?.length!==0){percentComplete+=experiencePerc}
    
    if(userDoc?.facebookLink?.length!==0||userDoc?.instagramLink?.length!==0||userDoc?.linkedinLink?.length!==0||userDoc?.twitterLink?.length!==0){percentComplete+=socialLinkPerc}
    
    if(userDoc?.gender?.length!==0){percentComplete+=genderPerc}
    
    if(userDoc?.image?.length!==0){percentComplete+=imagePerc}
    
    if(userDoc?.industry?.length!==0){percentComplete+=industryPerc}
    
    if(userDoc?.name?.length!==0){percentComplete+=namePerc}
    
    if(userDoc?.state?.length!==0){percentComplete+=statePerc}
 
    setProfileCompletionProgress(Math.ceil(percentComplete))
    
}
checkForUserProfileProgress()
},[userDoc])
useEffect(()=>{
  setProfileCompletionProgress(0)
},[])


// CHECK FOR USER DOC DATA
// useEffect(()=>{
//     async function fetchUserDocFromFirebase(){
//       const userDataRef = collection(db, "Users");
//       const q = query(userDataRef);
//       const querySnapshot = await getDocs(q);
     
//       querySnapshot.forEach((doc) => {
        
//        if(doc.id===user?.user?.email){
//         dispatch(setUserDoc(doc.data())); 
//        }
//       }); 
//     }
//   fetchUserDocFromFirebase()
//   },[user])



  return (
   <>
<div className="userProfileCompletionIndicatorContainerAndButtonCont">
    {/* <div class="userProfileCompletionIndicatorContainer">
    <div className="userProfileCompletionIndicatorContainer-outer">
      <div className="userProfileCompletionIndicatorContainer-inner">
      <p className="userProfileCompletionIndicator-first">Profile</p>
        <p className="userProfileCompletionIndicator-second">{profileCompletionProgress}%</p>
        <p className="userProfileCompletionIndicator-third">Complete</p>
      </div>
    </div>
  
</div> */}
<div className='userProfileCompletionIndicatorContainer'>
<CircularProgressbarWithChildren  styles={buildStyles({pathColor: '#2A72DE',})} value={profileCompletionProgress}>
  <p className="userProfileCompletionIndicator-first">Profile</p>
        <p className="userProfileCompletionIndicator-second">{profileCompletionProgress}%</p>
        <p className="userProfileCompletionIndicator-third">Complete</p>
</CircularProgressbarWithChildren>
</div>
{profileCompletionProgress===100?null:<button onClick={()=>navigate("/user-edit-profile")} className="Complete-userProfileButton">Complete Now</button>}

</div>
   </>
  )
}

export default UserProfileCompletedStatusBar