import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  ReciveMessage } from '../../firebase'
import styles from "./Chat.module.css"
import MessagesCont from './Messages/MessagesCont'
import SelectedUserCont from './Selected User Container/SelectedUserCont'
import { updateSelectedUserData } from '../../features/chatSlice_latest'
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";


const Chat = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const currentcUser = useSelector((state) => state.userDoc);
  const[tempId,setTempId]=useState("")
  const chatData=useSelector((state)=>state.chatLatest)
  const [Recive, setRecive] = useState([]);
  const dispatch=useDispatch()
 
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
const getChatList=async()=>{
  ReciveMessage(currentcUser, {email:chatData.selectedUser.id}, setRecive,chatData.selectedUser.bucket);
}
if(chatData.selectedUser&&tempId!==chatData.selectedUser.id){getChatList();setTempId(chatData.selectedUser.id)}   
  }, [chatData]);


useEffect(()=>{
  let finalReceive=[]
if(Recive.length>0){
Recive.map((c,idx)=>{
finalReceive.push({...c,createdAt:(c.createdAt.seconds!=="")?c.createdAt.seconds*1000:""})
})
dispatch(updateSelectedUserData(finalReceive))
}
},[Recive])


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
   <div className={styles.chat_main_Cont}>
   <div style={{width:"465px"}}>
<MessagesCont/>
</div>
<SelectedUserCont/>
   </div>
    
    </>
  )
}

export default Chat