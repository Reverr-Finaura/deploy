import React from 'react'
import styles from "./SortingNavbarTwoOptions.module.css"


const SortingNavbarTwoOption = ({setSortOptionSelected,setfurtherSortOptionClick,sortOptionSelected,sortOptionClick,setSortOptionClick}) => {
  return (
    <>
        <section
        className={styles.outerCont}
              onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev,whose:"Everything", time: "Popular Now" };
                      });
                      setSortOptionClick(false);
                    }}
              id="updatedSortPostSection"
            >
              Popular
              <div
                style={{
                  display:
                  sortOptionSelected.time === "Popular Now"&& sortOptionSelected.whose==="Everything" ? "" : "none",
                }}
                className={styles.updatedSortPostSectionUnderLine}
              ></div>
            </section>

            {/* <section
              onClick={() => {
                setSortOptionSelected((prev) => {
                  return { ...prev,time: "Newest", whose: "People You Follow" };
                });
                setfurtherSortOptionClick(false);
              }}
              id="updatedSortPostSection"
            >
              Following
              <div
                style={{
                  display:
                    sortOptionSelected.whose === "People You Follow"
                      ? ""
                      : "none",
                }}
                className="updatedSortPostSectionUnderLine"
              ></div>
            </section> */}
            {/* SORT POST SECTION */}
            <section
            className={styles.outerCont}
              onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev,whose:"Everything", time: "Newest" };
                      });
                      setSortOptionClick(false);
                    }}
              id="updatedSortPostSection"
            >
              Recent
              <div
                style={{
                  display:
                  sortOptionSelected.time === "Newest"&& sortOptionSelected.whose==="Everything"
                      ? ""
                      : "none",
                }}
                className={styles.updatedSortPostSectionUnderLine}
              ></div>
            </section>
    </>
  )
}

export default SortingNavbarTwoOption