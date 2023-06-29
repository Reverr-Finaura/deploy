import React from 'react'

const SortingNavbarOldest = ({setfurtherSortOptionClick,sortOptionSelected,furtherSortOptionClick,setSortOptionSelected,setSortOptionClick,sortOptionClick}) => {
  return (
    <>
         {/* FURTHER SORT POST SECTION */}

            <section id="sortPostSection">
              <h2
                onClick={() => setfurtherSortOptionClick((e) => !e)}
                className="sortPostSectionHeading"
              >
                Showing:{" "}
                <span className="sortPostSectionHeadingItemName">
                  {sortOptionSelected.whose !== ""
                    ? sortOptionSelected.whose
                    : "None"}
                </span>{" "}
                <span style={{ display: "flex" }}>
                  <img
                    className={`downarrorwSortImg ${furtherSortOptionClick?'rotate-180':''}`}
                    src="./images/down-filled-triangular-arrow.png"
                    alt="downArrow"
                  />
                </span>{" "}
              </h2>
              {furtherSortOptionClick ? (
                <div className="furtherSortPostSectionOptionContainer">
                  <button
                    onClick={() => {
                      setSortOptionSelected((prev) => {
                        return { ...prev, whose: "Everything" };
                      });
                      setfurtherSortOptionClick(false);
                    }}
                    className={
                      sortOptionSelected.whose === "Everything"
                        ? "furtherSortPostSectionOptionSelected"
                        : "furtherSortPostSectionOption"
                    }
                  >
                    Everything
                  </button>
                  <button
                    onClick={() => {
                      setSortOptionSelected((prev) => {
                        return { ...prev, whose: "People You Follow" };
                      });
                      setfurtherSortOptionClick(false);
                    }}
                    className={
                      sortOptionSelected.whose === "People You Follow"
                        ? "furtherSortPostSectionOptionSelected"
                        : "furtherSortPostSectionOption"
                    }
                  >
                    People You Follow
                  </button>
                </div>
              ) : null}
            </section>

             <section id="sortPostSection">
              <h2
                onClick={() => setSortOptionClick((e) => !e)}
                className="sortPostSectionHeading sortPostSectionHeadinggg"
              >
                Sorted By:{" "}
                <span className="sortPostSectionHeadingItemName">
                  {sortOptionSelected.time !== ""
                    ? sortOptionSelected.time
                    : "None"}
                </span>{" "}
                <span style={{ display: "flex" }}>
                  <img
                    className={`downarrorwSortImg ${sortOptionClick?'rotate-180':''}`}
                    src="./images/down-filled-triangular-arrow.png"
                    alt="downArrow"
                  />
                </span>
              </h2>
              {sortOptionClick ? (
                <div className="sortPostSectionOptionContainer">
                  <button
                    onClick={() => {
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Popular Now" };
                      });
                      setSortOptionClick(false);
                    }}
                    className={
                      sortOptionSelected.time === "Popular Now"
                        ? "sortPostSectionOptionSelected"
                        : "sortPostSectionOption"
                    }
                  >
                    <span>Popular Now</span>
                  </button>
                  <button
                    onClick={() => {
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Newest" };
                      });
                      setSortOptionClick(false);
                    }}
                    className={
                      sortOptionSelected.time === "Newest"
                        ? "sortPostSectionOptionSelected"
                        : "sortPostSectionOption"
                    }
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => {
                      setSortOptionSelected((prev) => {
                        return { ...prev, time: "Oldest" };
                      });
                      setSortOptionClick(false);
                    }}
                    className={
                      sortOptionSelected.time === "Oldest"
                        ? "sortPostSectionOptionSelected"
                        : "sortPostSectionOption"
                    }
                  >
                    Oldest
                  </button>
                </div>
              ) : null}
            </section>
    </>
  )
}

export default SortingNavbarOldest