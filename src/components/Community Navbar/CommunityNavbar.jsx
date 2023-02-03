import React,{ useEffect, useState } from 'react'
import "./CommunityNavbar.css"
import { useDispatch, useSelector } from "react-redux";
import { selectChat, showChat } from "../../features/chatSlice";
import { useNavigate } from 'react-router-dom';
import Chat from "../Chat/Chat";
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { logout, selectUser } from '../../features/userSlice';
import { remove } from '../../features/newUserSlice';
import { removeUserDoc, setUserDoc } from '../../features/userDocSlice';
import { removeUserFundingDoc } from '../../features/userFundingDocSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import brandImg from "../../images/Frame 6266720.png"
import brandImgLight from "../../images/Reverr Light.png"
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import {VscBellDot} from "react-icons/vsc"
import {FaLightbulb} from "react-icons/fa"
import { setTheme } from '../../features/themeSlice';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import userIcon from "../../images/userIcon.png"

const CommunityNavbar = ({setNavbarPostButtonClick}) => {
  const user = useSelector((state)=>state.user);

const[isSettingButtonClick,setIsSettingbuttonClick]=useState(false)
  const navigate=useNavigate()
    const dispatch = useDispatch();
    const chat = useSelector(selectChat);
    const[scroll,setScroll]=useState(0)
    const userDoc=useSelector((state)=>state.userDoc)
    const[isRequestsButtonClick,setRequestsbuttonClick]=useState(false)
    const [userDocList,setUserDocList]=useState([])
    const[notificationList,setNotificationList]=useState([])
    const theme=useSelector((state)=>state.themeColor)


    window.onscroll = () => {
        setScroll(window.scrollY)
    }

//CHECK FOR THEME
useEffect(()=>{
  document.body.className=theme
  },[theme])
  
  //TOGGLE THEME
  const toggleTheme=()=>{
    if(theme==="light-theme"){dispatch(setTheme("dark-theme"))}
    else{dispatch(setTheme("light-theme"))}
  }

//CHECK FOR NOTIFICATION
useEffect(()=>{
  async function fetchNotificationFromFirebase(){
    const userDataRef = collection(db, "Users"); 
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
  if(userDoc?.notification?.includes(doc.id)){
    setNotificationList((prev)=>{
      return [...prev,{...doc.data(),id:doc.id}]
    })
  }
    })
  }
  fetchNotificationFromFirebase()
  },[isRequestsButtonClick])

// CHECK FOR USER DOC LIST WHO HAS REQUESTED FOLLOW
useEffect(()=>{
  async function fetchUserDocListFromFirebase(){
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
      if(userDoc?.receivedRequests.includes(doc.id))
      setUserDocList((prev)=>{
        return [...prev,{...doc.data(),id:doc.id}]
      })
    }); 
   
  }
fetchUserDocListFromFirebase()
},[isRequestsButtonClick])

//HANDLE ACCEPT FOLLOW REQUEST
const handleAcceptFollowRequest=async(id)=>{
  const userData=[]
//GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
const userRef = collection(db, "Users");
      const q = query(userRef);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => { 
            if(doc.id===id)
            {userData.push({...doc.data(),id:doc.id})}
          });
          
acceptFollowRequest(id,userData[0])

        }
//ACCEPT FOLLOW REQUEST
const acceptFollowRequest=async (id,userData)=>{
  let notificationArray
  if(!userDoc.notification){notificationArray=[]}
  else{notificationArray=userDoc.notification}
  const newNotificationArray=[...notificationArray,userDoc.email]
  const newReceivedRequestsArray=userDoc.receivedRequests.filter((item)=>{
    return item!==id
  })
  const newNetworkArray=userDoc.network.concat([id])
  
  const userDocumentRef=doc(db,"Users",userDoc.email)

  const userWhoRequestedFollowDocRef=doc(db,"Users",id)
  const userWhoRequestedNewNetworkArray=userData.network.concat([userDoc.email])
  const userWhoRequestedNewsendRequestArray=userData.sendRequests.filter((item)=>{
    return item!==user?.user?.email
  })
  const updatedUserDoc={...userDoc,receivedRequests:newReceivedRequestsArray,network:newNetworkArray}
console.log("userWhoRequestedNewNetworkArray",userWhoRequestedNewNetworkArray)
  try {
    await updateDoc(userDocumentRef,{receivedRequests:newReceivedRequestsArray,network:newNetworkArray})
    await updateDoc(userWhoRequestedFollowDocRef,{sendRequests:userWhoRequestedNewsendRequestArray,network:userWhoRequestedNewNetworkArray,notification:newNotificationArray})
  toast("Accepted Follow Request")
  dispatch(setUserDoc(updatedUserDoc))
  } catch (error) {
    console.log(error.message)
  }
  }


//HANDLE REJECT FOLLOW REQUEST
const handleRejectFollowRequest=async(id)=>{
  const userData=[]
  //GET DATA OF USER WHO HAS REQUESTED FOLLOW REQUEST
const userRef = collection(db, "Users");
const q = query(userRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
      if(doc.id===id)
      {userData.push({...doc.data(),id:doc.id})}
    });
rejectFollowRequest(id,userData[0])
}
//REJECT FOLLOW REQUEST
const rejectFollowRequest=async (id,userData)=>{
  const newReceivedRequestsArray=userDoc.receivedRequests.filter((item)=>{
    return item!==id
  })
  const userDocumentRef=doc(db,"Users",userDoc.email)
  const userWhoRequestedFollowDocRef=doc(db,"Users",id)
 const userWhoRequestedNewsendRequestArray=userData.sendRequests.filter((item)=>{
    return item!==user?.user?.email
  })
  const updatedUserDoc={...userDoc,receivedRequests:newReceivedRequestsArray}

  try {
    await updateDoc(userDocumentRef,{receivedRequests:newReceivedRequestsArray})
    await updateDoc(userWhoRequestedFollowDocRef,{sendRequests:userWhoRequestedNewsendRequestArray})
  toast("Rejected Follow Request")
  dispatch(setUserDoc(updatedUserDoc))
  } catch (error) {
    console.log(error.message)
  }
  
}

//HANDLE DELETE NOTIFICATION

const handleDeleteNotification=async(id)=>{
  const newNotificationList=notificationList.filter((item)=>{
    return item.id!==id
  })
  const userDocumentRef=doc(db,"Users",userDoc.email)
  const updatedUserDoc={...userDoc,notification:newNotificationList}
  try {
    await updateDoc(userDocumentRef,{notification:newNotificationList})
    dispatch(setUserDoc(updatedUserDoc))
  } catch (error) {
    console.log(error.message)
  }
  }


  return (
    <>
    <section id='navbar-final'>
    <ToastContainer/>
        <div onClick={()=>navigate("/")} className='navbar-brand-logo-img-cont'>
        <img className='navbar-final-brand-logo-img' src={theme==="light-theme"?brandImg:brandImgLight} alt="brand-logo"/>
        </div>
        <div className='navbar-icons-cont'>
        {/* <div className='navbar-topp-social-icon' onClick={toggleTheme}>
        <FaLightbulb className='navbar-changeThemeIcon'/>
        </div> */}
        <div className='navbar-themeToggler'>
        <DarkModeToggle
      mode={theme==="dark-theme"?"dark":"light"}
      // dark="dark"
      // light="Light" 
      size="sm"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#334155"
      activeTrackColorOnHover="#1e293b"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#1e293b"
      activeThumbColor="#e2e8f0"
      onChange={toggleTheme}
    />
    </div>
        {scroll>150?
        <div onClick={()=>setNavbarPostButtonClick(current=>!current)} className='navbar-topp-social-icon'>
        <div id='postUploaddSquareCont' className='NavbarPostUploaddSquareCont'><img className='NavbarPostUploaddSquareContAddImg' src="./images/add.png" alt="addIcon" /></div>
        </div>:null}
        <div onClick={()=>setRequestsbuttonClick(current=>!current)} className='navbar-topp-social-icon'>
            {/* {userDoc?.receivedRequests?.length===0&&userDoc?.notification?.length===0?<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64.png" alt="nav-icons" />:<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64 (1).png" alt="nav-icons" />} */}
            <VscBellDot className={userDoc?.receivedRequests?.length===0&&userDoc?.notification?.length===0?'nabar-final-notificationBell':"nabar-final-notificationBell1"}/>
        {isRequestsButtonClick?
            <div className='notifiction-dropdown-cont'>
            {userDoc?.receivedRequests?.length===0&&userDoc?.notification?.length===0?<p className='notifiction-dropdown-Request-Cont'>No New Notification</p>:null}
            {userDoc?.notification?.map((item)=>{
              return <>
              <p className='notifiction-dropdown-Request-Cont' key={item}>
            <span style={{height:"fit-content"}}><img className='notifiction-dropdown-Request-image' src={notificationList?.filter((e)=>{
              return e.id===item})[0]?.image} alt="requestUsrImg" /></span>
            <span className='notifiction-dropdown-Request-name'>{notificationList?.filter((e)=>{
              return e.id===item})[0]?.name}</span> has accepted your follow request
            <span onClick={()=>handleDeleteNotification(item)} className='notifiction-dropdown-Request-reject'>❌</span></p> 
              </>
            })}
           { userDoc?.receivedRequests?.map((item)=>{
            return <>
            <p className='notifiction-dropdown-Request-Cont' key={item}>
            <span style={{height:"fit-content"}}><img className='notifiction-dropdown-Request-image' src={userDocList?.filter((e)=>{
              return e.id===item})[0]?.image} alt="requestUsrImg" /></span>
            <span className='notifiction-dropdown-Request-name'>{userDocList?.filter((e)=>{
              return e.id===item})[0]?.name}</span> wants to follow you <span onClick={()=>handleAcceptFollowRequest(item)} className='notifiction-dropdown-Request-accept'>✅</span>
            <span onClick={()=>handleRejectFollowRequest(item)} className='notifiction-dropdown-Request-reject'>❌</span></p>
            </>
           })}
            </div>
            :null}
            </div>
            <div onClick={()=>setIsSettingbuttonClick(current=>!current)} className='navbar-topp-social-icon setting-social-icon-cont'><img className='nabar-final-setting-cont' src="./images/Vector (3).png" alt="nav-icons" />
            {isSettingButtonClick?
              <div className='setting-dropdown-cont'>
              <button onClick={()=>navigate("/change-user-password")} className='setting-dropdown-button'>Change Password</button>
              <button onClick={()=>navigate("/user-edit-profile")} className='setting-dropdown-button'>Edit Profile</button>
              <button onClick={user ? () => signOut(auth).then(() => {dispatch(logout());dispatch(remove());dispatch(removeUserDoc());dispatch(removeUserFundingDoc())})
                    .then(() => {
                      toast.success("Sucessfully logged out");
                      navigate("/");
                    })
              : () => navigate("/login")
          } className='setting-dropdown-button'>Logout</button>
            </div>:null}
            </div>
            <div className='navbar-topp-social-icon'><img onClick={()=>navigate("/userprofile")} className='nabar-final-userProfile-cont userIconNavbarFinl' src={userIcon} alt="nav-icons" /></div>
        </div>

    </section>
    {chat && <Chat />}
    </>
  )
}

export default CommunityNavbar