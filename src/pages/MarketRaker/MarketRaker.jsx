import React from "react";
import styles from "./MarketRaker.module.css";
import BullBearProgress from "./BullBearProgress/BullBearProgress";

const MarketRaker = () => {
  const cardData = [
    {
      id: 1,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 2,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 3,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 4,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 5,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 6,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 7,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 8,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 9,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 10,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 11,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    {
      id: 12,
      title: "AAPL / USD",
      description: "$ 222.50",
    },
    // Add more card data as needed
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Weekly Indicators</h1>
      <h2 className={styles.subheading}>Bull market Winning!</h2>
      <BullBearProgress></BullBearProgress>
      <div className={styles.grid}>
        {cardData.map((card) => (
          <div key={card.id} className={styles.card}>
            <div>
              <svg
                width="34"
                height="39"
                viewBox="0 0 34 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.175 12.7377C25.8773 17.0171 27.1078 25.0398 33.3582 27.9838C32.0263 31.0897 30.3023 33.946 27.8549 36.3032C26.0261 38.0636 23.9167 38.5728 21.5335 37.3318C19.0692 36.0469 16.5812 36.1515 14.0628 37.2475C11.0847 38.5458 9.24575 38.2861 7.10257 35.8918C2.39366 30.6378 -0.124744 24.6014 1.00769 17.4049C1.81223 12.2892 7.50484 6.89691 14.1203 9.68579C16.4663 10.6739 18.7278 10.63 21.1346 9.68579C25.4616 7.98953 29.2611 9.10912 32.175 12.7377Z"
                  fill="white"
                />
                <path
                  d="M24.0925 0.0915527C25.039 4.35749 21.0434 9.18323 16.686 9.0416C15.6381 5.15335 19.414 0.594023 24.0925 0.0915527Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketRaker;
