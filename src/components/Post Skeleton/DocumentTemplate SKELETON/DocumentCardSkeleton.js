import React from "react";
import styles from "./DocumentTemplateSkeleton.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DocumentCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <>
          <SkeletonTheme baseColor="#e6e4e4dc" highlightColor="grey">
            <div key={index} className={styles.documentCard}>
              <div className={styles.DocumentCard_top}>
                <div className={styles.logoIcon}>
                  <Skeleton className={styles.logoImage} />
                </div>
                <span className={styles.DocumentCard_title}>
                  <Skeleton count={1} style={{ width: "100%" }} />
                </span>
              </div>
              <div className={styles.DocumentCard_description}>
                <Skeleton
                  count={3}
                  style={{ marginBottom: "1rem", width: "100%" }}
                />
              </div>

              <div className={styles.DocumentCard_lower}>
                <div className={styles.documentCard_tag}>
                  <Skeleton
                    count={1}
                    style={{ width: "100%", height: "10px" }}
                  />
                </div>
                <div className={styles.button_div}>
                  <button className={styles.edit_btn}>
                    <Skeleton
                      count={1}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </button>
                  <button className={styles.download_btn}>
                    <Skeleton
                      count={1}
                      style={{ width: "100%", height: "10px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </>
      );
    });
};

export default DocumentCardSkeleton;
