import React from "react";
import styles from "./BullBearProgress.module.css";

const BullBearProgress = ({ bullPercentage, bearPercentage }) => {
  console.log("bull percentage receiving", bullPercentage);
  console.log("bear percentage receiving", bearPercentage);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.bull} style={{ width: `${bullPercentage}%` }}>
        {bullPercentage}%
      </div>
      <div className={styles.bear} style={{ width: `${bearPercentage}%` }}>
        {bearPercentage}%
      </div>
    </div>
  );
};

export default BullBearProgress;
