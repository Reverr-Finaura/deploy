import React from 'react'
import styles from "./UserTitleCont.module.css"
import {AiOutlineInfoCircle} from "react-icons/ai"
import { useSelector } from 'react-redux'

const UserTitleCont = () => {
  const chatData=useSelector((state)=>state.chatLatest)
  
  return (
    <section className={styles.outerCont}>
        <img className={styles.userImg} src={chatData.selectedUser.userImg} alt="userImg" />

        <div className={styles.userNameNStatus}>
            <h3 className={styles.userName}>{chatData.selectedUser.name}</h3>
            {/* <p className={styles.userStatus}>Online</p> */}
        </div>

        <AiOutlineInfoCircle className={styles.infoIcon}/>
    </section>
  )
}

export default UserTitleCont