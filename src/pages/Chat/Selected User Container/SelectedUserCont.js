import React from 'react'
import { useSelector } from 'react-redux'
import NewChatContainer from '../New Chat Container/NewChatContainer'
import UserChatContainer from '../User Chat Container/UserChatContainer'
import UserTitleCont from '../User Title Cont/UserTitleCont'
import styles from "./SelectedUserCont.module.css"

const SelectedUserCont = ({setChatUserData}) => {
  const chatData=useSelector((state)=>state.chatLatest)
  return (
    <>
    <section className={styles.outerCont}>
    {!chatData.selectedUser&&<><div className={styles.innerCont}>No Chat Selected</div></>}
    {chatData.selectedUser&&<>
       <UserTitleCont/>
       <UserChatContainer/>
       <NewChatContainer/>
    </>}
    </section>
    </>
  )
}

export default SelectedUserCont