import React from 'react'
import "./SortingNavbar.css"

const SortingNavbar = ({setSortOptionSelected,setfurtherSortOptionClick,sortOptionSelected,sortOptionClick,setSortOptionClick}) => {
  return (
    <>
<section
              onClick={() => {
                setSortOptionSelected((prev) => {
                  return { ...prev, whose: "Everything" };
                });
                setfurtherSortOptionClick(false);
              }}
              id="updatedSortPostSection"
            >
              Discover
              <div
                style={{
                  display:
                    sortOptionSelected.whose === "Everything" ? "" : "none",
                }}
                className="updatedSortPostSectionUnderLine"
              ></div>
            </section>

            <section
              onClick={() => {
                setSortOptionSelected((prev) => {
                  return { ...prev, whose: "People You Follow" };
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
              onClick={() => setSortOptionClick((e) => !e)}
              id="updatedSortPostSection"
            >
              {sortOptionSelected.time === "Popular Now"
                ? "Popular"
                : sortOptionSelected.time === "Newest"
                ? "Latest"
                : sortOptionSelected.time}
              {sortOptionClick ? (
                <section
                  style={{
                    right:
                      sortOptionSelected.time === "Newest" ||
                      sortOptionSelected.time === "Oldest"
                        ? "-40px"
                        : "-20px",
                  }}
                  className="dropDownSortOptionCont"
                >
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Popular Now" };
                      });
                      setSortOptionClick(false);
                    }}
                    className="dropDownSortOptionContOptions"
                  >
                    Popular
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Newest" };
                      });
                      setSortOptionClick(false);
                    }}
                    className="dropDownSortOptionContOptions"
                  >
                    Latest
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Oldest" };
                      });
                      setSortOptionClick(false);
                    }}
                    className="dropDownSortOptionContOptions"
                  >
                    Oldest
                  </p>
                </section>
              ) : null}
            </section>
    </>
  )
}

export default SortingNavbar