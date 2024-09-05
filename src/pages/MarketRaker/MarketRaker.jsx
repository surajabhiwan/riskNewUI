import React, { useCallback, useEffect, useState } from "react";
import styles from "./MarketRaker.module.css";
import BullBearProgress from "./BullBearProgress/BullBearProgress";
import axios from "axios";
import { ip } from "../../baseurl/baseurl";

const MarketRaker = () => {
  const [cards, setCards] = useState([]);
  const [bullPercentage, setBullPercentage] = useState("0.00");
  const [bearPercentage, setBearPercentage] = useState("0.00");

  const userId = "66d9993d33d1d754a435aea2"; // Replace with actual logged-in user ID

  // Fetch card data from API
  const fetchCardData = useCallback(async () => {
    try {
      const response = await axios.post(
        `${ip}/api/market-raker/user_token_list`,
        { user_id: userId }
      );
      const newCards = response.data.data.tokens;
      setCards((prevCards) => [...prevCards, ...newCards]);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [userId]);

  // Fetch bull and bear data from API
  const fetchBullBearData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ip}/api/market-raker/get_market_direction/${userId}`
      );
      const { bullPercentage, bearPercentage } = response.data;
      setBullPercentage(bullPercentage);
      setBearPercentage(bearPercentage);
    } catch (error) {
      console.error("Error fetching bull and bear data:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchCardData();
    fetchBullBearData();
  }, [fetchCardData, fetchBullBearData]);

  console.log("cards for user list added", cards);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Weekly Indicators</h1>
      <h2 className={styles.subheading}>Bull market Winning!</h2>
      <BullBearProgress
        bullPercentage={bullPercentage}
        bearPercentage={bearPercentage}
      />
      <div className={styles.grid}>
        {cards?.map((card) => (
          <div key={card._id} className={styles.card}>
            <div>
              <img src={card.image} alt={card.ticker} width="34" height="39" />
            </div>
            <div>
              <h3 className={styles.cardTitle}>{card.ticker}</h3>
              <p className={styles.cardDescription}>
                ${card.price.toFixed(2)} - Liquidity: $
                {card.liquidity.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketRaker;
