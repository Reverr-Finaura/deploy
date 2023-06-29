import React from 'react'
import styles from "./MentorSkeleton.module.css"
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MentorSkeleton = ({cards}) => {
    return (
      Array(cards).fill(0).map((item,index)=>{
  return (<>
    <SkeletonTheme baseColor="#e6e4e4dc" highlightColor="grey">
      <div className={styles.card} key={index}>
          <div className={styles.cardTop}>
              <div className={styles.info}>
              <Skeleton count={3} style={{marginBottom:"1rem",width:"98%"}}/>
              </div>
              <div className={styles.cardTopUserImage}>
                  <Skeleton circle width={100} height={100}/>
              </div>
          </div> 
          <div className={styles.cardMid}>
          <Skeleton count={3} style={{marginBottom:"1rem",width:"70%"}}/>
          </div>
          <div className={styles.cardBottomTop}>
          <Skeleton count={2} style={{marginBottom:"1rem",width:"40%"}}/>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.cardPrice}>  <Skeleton count={1} style={{width:"40%"}}/></div>
            <div className={styles.cardButton}>  <Skeleton count={1} style={{width:"60%",height:"40px",marginLeft:"2rem"}}/></div>
          </div>
      </div>
  </SkeletonTheme>
    </>)
      })
    
    )
  }

export default MentorSkeleton