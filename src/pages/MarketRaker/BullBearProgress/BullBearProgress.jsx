import React from "react";
import styles from "./BullBearProgress.module.css";

const BullBearProgress = () => {
  const data = [
    { type: "bull" },
    { type: "bull" },
    { type: "bull" },
    { type: "bull" },
    { type: "bear" },
    { type: "bear" },
    { type: "bear" },
    { type: "bear" },
    { type: "bear" },
    { type: "bear" },
  ];

  const bullCount = data.filter((item) => item.type === "bull").length;
  const bearCount = data.filter((item) => item.type === "bear").length;
  const totalCount = data.length;

  const bullPercentage = ((bullCount / totalCount) * 100).toFixed(1);
  const bearPercentage = ((bearCount / totalCount) * 100).toFixed(1);

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
