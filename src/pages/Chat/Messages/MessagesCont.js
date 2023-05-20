import React, { useState } from 'react'
import ChatsContainer from '../Chats Container/ChatsContainer'
import UserSearch from '../User Search/UserSearch'
import styles from "./MessagesCont.module.css"

const MessagesCont = () => {
  const[sorter,setSorter]=useState("Newest")
  return (
   <section className={styles.outerCont}>
    <h1 className={styles.title}>Messsages</h1>
  
    {/* <UserSearch/> */}
    <div className={styles.sorterCont}>
    <p className={styles.sorterText}>Sort by</p>
    <div className={styles.messageSorterCont}>
      <select onChange={(e)=>setSorter(e.target.value)} className={styles.sorter} name="sortBy" value={sorter}>
        <option className={styles.options} value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>
    </div>

    <ChatsContainer sorter={sorter}/>
   </section>
  )
}

export default MessagesCont