import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={styles["main"]}>
      <div>404</div>
      <p>Uh-oh! The page you are looking for doesn't exist</p>
      <Link to="/" className={styles.link}>
        Click here to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
