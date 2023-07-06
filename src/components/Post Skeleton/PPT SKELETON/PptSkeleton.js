import React from "react";
import styles from "./PptSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PptSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <>
          <SkeletonTheme baseColor="#e6e4e4dc" highlightColor="grey">
            <div className={styles.card} key={index}>
              <div className={styles.cardTop}>
                <Skeleton
                  className={styles.cardTopUserImage}
                  width={355}
                  height={200}
                />
              </div>
              <div className={styles.cardBottomTop}>
                <Skeleton
                  count={1}
                  style={{ marginBottom: "1rem", width: "40%" }}
                />
              </div>
              <div className={styles.tagCont}>
                <div className={styles.tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "100%", height: "10px" }}
                  />
                </div>
                <div className={styles.tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "100%", height: "10px" }}
                  />
                </div>
                <div className={styles.tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "100%", height: "10px" }}
                  />
                </div>
              </div>
              <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                  {" "}
                  <Skeleton
                    count={1}
                    style={{ width: "60%", height: "40px", marginLeft: "2rem" }}
                  />
                </div>
                <div className={styles.cardButton}>
                  {" "}
                  <Skeleton
                    count={1}
                    style={{ width: "60%", height: "40px", marginLeft: "2rem" }}
                  />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </>
      );
    });
};

export default PptSkeleton;
