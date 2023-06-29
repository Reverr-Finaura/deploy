import React from "react";
import styles from "./Filter.module.css";

const Filter = ({ visible }) => {
  const options = [
    "All",
    "Recommend",
    "Popular",
    "Best-Seller",
    "Bitcoin",
    "Recent",
    "Crypto",
    "Start-up",
    "Legal",
    "Marketing",
    "Fundraising",
    "Product Developement",
  ];
  return (
    <div className={styles.filter_menu} style={{ display: !visible && "none" }}>
      <p>All</p>
      <p>Recommend</p>
      <p>Popular</p>
      <p>Best-Seller</p>
      <p>Bitcoin</p>
      <p>Recent</p>
      <p>Crypto</p>
      <p>Start-up</p>
      <p>Legal</p>
      <p>Marketing</p>
      <p>Fundraising</p>
      <p>Product Developement</p>
    </div>
  );
};

export default Filter;
