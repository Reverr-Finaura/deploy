import React,{ useState } from 'react'
import "./NavbarFinal.css"
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
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';


const NavBarFinal = () => {
  const user = useSelector((state)=>state.user);

const[isSettingButtonClick,setIsSettingbuttonClick]=useState(false)
const[isRequestsButtonClick,setRequestsbuttonClick]=useState(false)
  const navigate=useNavigate()
    const dispatch = useDispatch();
    const chat = useSelector(selectChat);
    const userDoc=useSelector((state)=>state.userDoc)
    const [userDocList,setUserDocList]=useState([])


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
    await updateDoc(userWhoRequestedFollowDocRef,{sendRequests:userWhoRequestedNewsendRequestArray,network:userWhoRequestedNewNetworkArray})
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

  return (
    <>
    <section id='navbar-final'>
    <ToastContainer/>
        <div onClick={()=>navigate("/")} className='navbar-brand-logo-img-cont'>
        <img className='navbar-final-brand-logo-img' src="./images/Frame 6266720.png" alt="brand-logo"/>
        </div>
        <div className='navbar-icons-cont'>
        {/* <div className='navbar-topp-social-icon'><img onClick={() => {
              dispatch(showChat());
            }}  className='nabar-final-msg-cont' src="./images/Vector (2).png" alt="nav-icons" /></div> */}

            <div onClick={()=>setRequestsbuttonClick(current=>!current)} className='navbar-topp-social-icon'>
            {userDoc?.receivedRequests?.length===0?<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64.png" alt="nav-icons" />:<img className='nabar-final-requestIcon-cont' src="./images/icons8-alarm-64 (1).png" alt="nav-icons" />}
            {isRequestsButtonClick?
            <div className='notifiction-dropdown-cont'>
            {userDoc?.receivedRequests?.length===0?<p className='notifiction-dropdown-Request-Cont'>No Requests</p>:null}
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
            <div className='navbar-topp-social-icon'><img onClick={()=>navigate("/userprofile")} className='nabar-final-userProfile-cont' src="./images/carbon_user-avatar-filled.png" alt="nav-icons" /></div>
        </div>

    </section>
    {chat && <Chat />}
    </>
  )
}

export default NavBarFinal