import React from 'react'
import styles from "./Style.module.css"

const NoFollowingCard = ({setSortOptionSelected,setSortOptionClick}) => {
  return (
   <>
    <div className={styles.outerCont}>
        <p className={styles.topText}>You Dont Seem To Follow Anyone</p>
        <p className={styles.middText}>Why Dont You Discover More</p>
        <div style={{display:"flex"}}>
        <button onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev,whose:"Everything", time: "Newest" };
                      });
                      setSortOptionClick(false);
                    }} className={styles.button}>Discover</button>
        </div>
        
    </div>
   </>
  )
}

export default NoFollowingCard