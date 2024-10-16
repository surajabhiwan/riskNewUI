import React, { useCallback, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./MarketRaker.module.css";
import BullBearProgress from "./BullBearProgress/BullBearProgress";
import axios from "axios";
import { ip } from "../../baseurl/baseurl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarketRaker = () => {
  const [cards, setCards] = useState([]);
  const [bullRatio, setBullRatio] = useState(0); // Store bull ratio as number
  const [bearRatio, setBearRatio] = useState(0); // Store bear ratio as number
  const [loading, setLoading] = useState(true); // Add loading state
  const userId = localStorage.getItem("userId");

  // Fetch card data from API
  const fetchCardData = useCallback(async () => {
    try {
      const response = await axios.post(
        `${ip}/api/market-raker/user_token_list`,
        { user_id: userId }
      );
      console.log("saved cards", response);
      const newCards = response.data.data.tokens;
      setCards(newCards);
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

      let { bullPercentage, bearPercentage } = response.data;

      console.log(
        "API Response: bullPercentage =",
        bullPercentage,
        ", bearPercentage =",
        bearPercentage
      );

      // Convert the percentages to numbers
      bullPercentage = parseFloat(bullPercentage);
      bearPercentage = parseFloat(bearPercentage);

      // Calculate the total and the ratios
      const total = bullPercentage + bearPercentage;

      if (total > 0) {
        // Normalize the bull and bear values to sum to 100, and round to 2 decimal places
        const bullRatio = ((bullPercentage / total) * 100).toFixed(2);
        const bearRatio = ((bearPercentage / total) * 100).toFixed(2);
        console.log("bullRatio", bullRatio);
        console.log("bearRatio", bearRatio);

        // Set the ratios
        setBullRatio(bullRatio);
        setBearRatio(bearRatio);
      } else {
        // Handle the case where total is 0
        setBullRatio(0);
        setBearRatio(0);
      }

      // Set loading to false once data is fetched
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bull and bear data:", error);
      setLoading(false); // Also set loading to false on error
    }
  }, [userId]);

  // Remove token from wishlist
  const removeFromWishlist = async (id) => {
    const loadingToastId = toast.loading("Removing token from watchlist...");

    try {
      const response = await axios.post(
        `${ip}/api/market-raker/remove_token_from_watchlist`,
        {
          user_id: userId,
          token_id: id,
        }
      );

      if (response.data.success) {
        toast.update(loadingToastId, {
          render: "Token removed from watchlist successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Update cards state
        setCards((prevCards) => prevCards.filter((card) => card._id !== id));

        // Fetch bull and bear data again to refresh progress
        fetchBullBearData();
      } else {
        toast.update(loadingToastId, {
          render: "Failed to remove token from watchlist.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        console.error(
          "Failed to remove token from watchlist:",
          response.data.message
        );
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: "Error removing token from watchlist.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Error removing token from watchlist:", error);
    }
  };

  // Determine the heading based on percentages
  const getHeadingStyle = () => {
    const bull = parseFloat(bullRatio);
    const bear = parseFloat(bearRatio);

    if (bull > bear) {
      return { color: "green", text: "Bull Market Winning!" };
    } else if (bear > bull) {
      return { color: "red", text: "Bear Market Winning!" };
    } else {
      return { color: "grey", text: "Bull and Bear Markets are Even!" };
    }
  };

  const { color, text } = getHeadingStyle();

  useEffect(() => {
    fetchCardData();
    fetchBullBearData();
  }, [fetchCardData, fetchBullBearData]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Weekly Indicators</h1>
      {loading ? (
        <div className={styles.spinner}></div> // Show spinner while loading
      ) : cards.length === 0 ? (
        <h2 className={styles.subheading} style={{ color: "grey" }}>
          No tokens available.
        </h2>
      ) : (
        <>
          <h2 className={styles.subheading} style={{ color }}>
            {text}
          </h2>
          {/* Display bull and bear data */}
          <BullBearProgress
            bullPercentage={bullRatio}
            bearPercentage={bearRatio}
          />
          <div className={styles.grid}>
            {cards.map((card) => (
              <div key={card._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <img
                    src={card.image}
                    alt={card.ticker}
                    width="34"
                    height="39"
                  />
                  <FaTrash
                    className={styles.deleteIcon}
                    onClick={() => removeFromWishlist(card._id)}
                  />
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
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{ top: "5rem" }}
      />
    </div>
  );
};

export default MarketRaker;
