// LoadingSkeleton.js
import React from "react";
import styles from "./LoadingSkeleton.module.css"; // Add your own styles

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonBull}></div>
      <div className={styles.skeletonBear}></div>
    </div>
  );
};

export default LoadingSkeleton;
