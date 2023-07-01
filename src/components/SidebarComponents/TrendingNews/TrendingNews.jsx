import React, { useEffect, useState } from "react";
import axios from "axios";
import NewSkeleton from "../../../components/Post Skeleton/News Skeleton/NewSkeleton";
import styles from "./TrendingNews.module.css";

function TrendingNews() {
  const [newsData, setNewsData] = useState();
  const [seeAllNewsIsClicked, setSeeAllNewsIsClicked] = useState(false);

  //FETCH LATEST NEWS
  const options = {
    method: "GET",
    url: "https://api.bing.microsoft.com/v7.0/news/search",
    params: { q: "startup", safeSearch: "Off", textFormat: "Raw" },
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "bd03e8f8f29b46479ee4c2004280308f",
    },
  };

  async function getNews() {
    try {
      await axios.request(options).then((res) => {
        setNewsData(res.data.value);
        // console.log("start");
        // console.log(res.data.value);
        // console.log("end");
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getNews();
  }, []);


  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          <span style={{ color: "#ffffff" }}>Trending</span>
          <span style={{ color: "#00B3FF" }}>&nbsp;News</span>
        </p>
        {seeAllNewsIsClicked ? (
          <span onClick={() => setSeeAllNewsIsClicked(false)}>Collapse</span>
        ) : (
          <span onClick={() => setSeeAllNewsIsClicked(true)}>View more</span>
        )}
      </div>

      {!newsData && <NewSkeleton cards={3} />}

      {seeAllNewsIsClicked
        ? newsData?.map((item, index) => (
            <div key={index} className={styles.newsCard}>
              <img src={item?.image?.thumbnail?.contentUrl} alt={"img"} />
              <div>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>
                  {item?.datePublished?.slice(11, 16) +
                    "  on " +
                    item?.datePublished?.slice(0, 10)}
                </text>
                <text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.name}
                </text>
                <text style={{ color: "#ffffff", fontSize: 8, marginTop: 5 }}>
                  {item?.provider[0]?.name}
                </text>
              </div>
            </div>
          ))
        : newsData?.slice(0, 4).map((item, index) => (
            <div key={index} className={styles.newsCard}>
              <img src={item?.image?.thumbnail?.contentUrl} alt={"img"} />
              <div>
                <text style={{ color: "#A7A7A7", fontSize: 8 }}>
                  {item?.datePublished?.slice(11, 16) +
                    "  on " +
                    item?.datePublished?.slice(0, 10)}
                </text>
                <text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item?.name}
                </text>
                <text style={{ color: "#ffffff", fontSize: 8, marginTop: 5 }}>
                  {item?.provider[0]?.name}
                </text>
              </div>
            </div>
          ))}
    </div>
  );
}

export default TrendingNews;
