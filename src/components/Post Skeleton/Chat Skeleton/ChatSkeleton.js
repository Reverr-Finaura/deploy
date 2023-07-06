import React from "react";
import styles from "./ChatSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => {
      return (
        <>
          <SkeletonTheme baseColor="#e6e4e4dc" highlightColor="grey">
          <div key={index} className={styles.outerCont}>
          <Skeleton circle width={50} height={50}/>

            <div className={styles.userCont}>
            <Skeleton
                    count={1}
                    style={{ width: "50%", height: "10px" }}
                  />
            
            <Skeleton
                    count={1}
                    style={{ width: "80%", height: "10px" }}
                  />
            </div>

            <div className={styles.time}>
            <Skeleton
                    count={1}
                    style={{ width: "100%", height: "10px" }}
                  />
            </div>
          </div>
          </SkeletonTheme>
        </>
      );
    });
};

export default ChatSkeleton;
