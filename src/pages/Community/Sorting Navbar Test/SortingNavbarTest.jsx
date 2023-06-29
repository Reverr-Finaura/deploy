import React from 'react'
import "./SortingNavbarTest.css"

const SortingNavbarTest = ({setSortOptionSelected,setfurtherSortOptionClick,sortOptionSelected,sortOptionClick,setSortOptionClick}) => {
  return (
    <>
        <section
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
                className="updatedSortPostSectionUnderLine"
              ></div>
            </section>

            <section
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
            </section>
            {/* SORT POST SECTION */}
            <section
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
                className="updatedSortPostSectionUnderLine"
              ></div>
            </section>
    </>
  )
}

export default SortingNavbarTest