import React from 'react'
import styles from "./NewsSkeleton.module.css"
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NewSkeleton = ({cards}) => {
    return (
      Array(cards).fill(0).map((item,index)=>{
  return (<>
    <SkeletonTheme baseColor="rgb(0, 12, 31)" highlightColor="#fff">
      <div className={styles.card} key={index}>
          <div className={styles.cardTop}>
              <div className={styles.cardTopUserImage}>
                  <Skeleton style={{borderRadius:"8px"}} width={80} height={80}/>
              </div>
              <div className={styles.info}>
              <Skeleton count={3} style={{marginBottom:"1rem",width:"98%"}}/>
              </div>
          </div> 
      </div>
  </SkeletonTheme>
    </>)
      })
    
    )
  }

export default NewSkeleton