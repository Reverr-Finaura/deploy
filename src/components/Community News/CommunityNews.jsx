import React from "react";
import styles from "./News.module.css";

const CommunityNews = ({ singleNews, setSingleNews }) => {
  console.log("singleNews", singleNews);

  return (
    <section className={styles.outerCont}>
      <div className={styles.innerCont}>
        <div className={styles.closeImg}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setSingleNews(null)}
            src="./images/icons8-cancel-48.png"
            alt="close"
          />
        </div>
        <section className={styles.newsCont}>
          <div
            onClick={() => window.open(singleNews?.url, "_blank")}
            className={styles.newsHeading}
          >
            <div className={styles.newsImageCont}>
              <img
                className={styles.newsImage}
                src={singleNews.image.thumbnail.contentUrl}
                alt="newsImage"
              />
            </div>
            <h1 className={styles.newsHeadingInfo}>{singleNews?.name}</h1>
          </div>
          <p className={styles.newsInfo}>{singleNews?.description}</p>
          <div className={styles.visitButtonCont}>
            <button
              onClick={() => window.open(singleNews?.url, "_blank")}
              className={styles.visitLink}
            >
              VISIT
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CommunityNews;
