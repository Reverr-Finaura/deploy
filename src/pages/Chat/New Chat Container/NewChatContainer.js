import React from 'react'
import styles from "./NewChatContainer.module.css"
import {ImAttachment} from "react-icons/im"
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SendMessage, uploadMedia } from '../../../firebase';
import { setRedeploy } from '../../../features/reDeploySlice';
import {AiFillCloseCircle,AiOutlineSend} from "react-icons/ai"
import {BsEmojiFrown} from "react-icons/bs"




const NewChatContainer = () => {
  const currentcUser = useSelector((state) => state.userDoc);
  const[sending,setSending]=useState(false)
  const deploy=useSelector((state)=>state.deploy)
  const dispatch=useDispatch()
  const chatData=useSelector((state)=>state.chatLatest)
  const chooseFileRef = useRef(null);
  const[imgUpload,setImgUpload]=useState(null)
  const[tempImgUrl,setTempImgURL]=useState(null)
  const[newMsg,setNewMsg]=useState("")
  const chooseFile = () => {
    if (chooseFileRef.current) {
      chooseFileRef.current.click();
    }
  };

//ON IMAGE CHANGE
function onImageChange(e) {
  setImgUpload(e.target.files[0]);
  const fileURL = e.target.files[0];
  if (fileURL) {
    setTempImgURL(URL.createObjectURL(fileURL));
  }
}

const saveChatToDatabase=async(imgLink)=>{
console.log("chatData",chatData.selectedUser)
await SendMessage(currentcUser,chatData.selectedUser,newMsg,imgLink,chatData.selectedUser.bucket)
dispatch(setRedeploy(!deploy))
setTempImgURL(null)
setImgUpload(null)
setNewMsg("")
setSending(false)
}

const handleSendMessage=async()=>{
  setSending(true)
  if(newMsg===""){setSending(false);return}

if(imgUpload){
  const imgLink=await uploadMedia(imgUpload,"Messages/images")
  saveChatToDatabase(imgLink)
  return
}

saveChatToDatabase(null)

}


  return (
  <section className={styles.outerCont}>
  {imgUpload&&<div className={styles.tempImgCont}>
    <img className={styles.tempImg} src={tempImgUrl} alt="tmp" />
    <AiFillCloseCircle onClick={()=>{setTempImgURL(null);setImgUpload(null)}} className={styles.crossIcon}/>
  </div>}

   <input
            onChange={onImageChange}
            ref={chooseFileRef}
            type="file"
            hidden
            className="postImageUpload"
            accept='image/*'
          />
    <ImAttachment onClick={chooseFile} className={styles.attachmentIcon}/>
    <BsEmojiFrown className={styles.emoji} />
    <input value={newMsg} onChange={(e)=>{setNewMsg(e.target.value)}} className={styles.textInp} type="text" placeholder='Send Message...' />
    <AiOutlineSend  onClick={handleSendMessage} className={styles.sendMessageBtn}/>
  </section>
  )
}

export default NewChatContainer