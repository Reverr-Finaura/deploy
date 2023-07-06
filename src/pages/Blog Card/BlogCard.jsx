import React from "react";
import "./BlogCard.css";

const BlogCard = ({ item }) => {
  return (
    <>
      <div
        onClick={() => {
          window.open(`https://reverr.io/blog/${item.id}`, "_blank");
        }}
        className="blog-item-cont"
      >
        <div className="blog-item-cont-left-box">
          <img
            className="blog-item-left-cont-img"
            src={item?.image.imageUrl}
            alt={item?.image.imageName}
          />
        </div>
        <div className="blog-item-cont-right-box">
          <p className="blog-item-date">{item?.publishedOn}</p>
          <h4 className="blog-item-title">{item?.heading}</h4>
          <p className="blog-item-para">{item?.body.slice(0, 60)}.... </p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
