import React, { useState } from 'react'
import ChatsContainer from '../Chats Container/ChatsContainer'
import styles from "./MessagesCont.module.css"
import { useSelector } from 'react-redux'

const MessagesCont = () => {
  const[sorter,setSorter]=useState("Newest")

  return (
  
   <section className={styles.outerCont}>
    <div>
      <h2 className={styles.message}>Messages</h2>
    </div>
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