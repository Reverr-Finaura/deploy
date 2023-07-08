import React from 'react'
import styles from "./UserSearch.module.css"
import {BiSearchAlt2} from "react-icons/bi"

const UserSearch = () => {
  return (
    <section className={styles.outerCont}>
        <input className={styles.input} type="text" name="search" placeholder='Search' />
        <BiSearchAlt2 className={styles.searchicon}/>
    </section>
  )
}

export default UserSearch