import React, { useState, useEffect, useCallback } from "react";
import styles from "./MarketRakerWishlist.module.css";
import axios from "axios";
import { ip } from "../../baseurl/baseurl";

const MarketRakerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  console.log("cards", cards);
  // Search-related state
  const [searchQuery, setSearchQuery] = useState(""); // search query state
  const [searchCards, setSearchCards] = useState([]); // search results state
  const [searchPage, setSearchPage] = useState(1); // search pagination
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(true); // search result pagination flag

  // Fetch data from API for pagination
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ip}/api/market-raker/get_all_tokens?page=${page}&limit=12`
      );
      const newCards = response.data.data.tokens;

      setCards((prevCards) => [...prevCards, ...newCards]);
      setHasMore(response.data.data.page < response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch data from API for search functionality
  const fetchSearchData = useCallback(async () => {
    if (!searchQuery) return; // Skip if search query is empty
    try {
      const response = await axios.get(
        `${ip}/api/market-raker/search_tokens?ticker=${searchQuery}&page=${searchPage}`
      );
      const newSearchCards = response.data.data.tokens;

      setSearchCards((prevSearchCards) => [
        ...prevSearchCards,
        ...newSearchCards,
      ]);
      setHasMoreSearchResults(
        response.data.data.page < response.data.data.totalPages
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchQuery, searchPage]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchData();
    }
  }, [fetchSearchData]);
  const removeFromWishlist = async (id) => {
    try {
      const userId = "66d9993d33d1d754a435aea2"; // Replace with actual logged-in user ID
      const response = await axios.post(
        `${ip}/api/market-raker/remove_token_from_watchlist`,
        {
          user_id: userId,
          token_id: id,
        }
      );

      if (response.data.success) {
        console.log("Token removed from watchlist successfully");
        // Update the state to reflect the removal
        setWishlist(wishlist.filter((itemId) => itemId !== id));
      } else {
        console.error(
          "Failed to remove token from watchlist:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error removing token from watchlist:", error);
    }
  };

  const toggleWishlist = async (id) => {
    if (wishlist.includes(id)) {
      await removeFromWishlist(id);
    } else {
      setWishlist([...wishlist, id]);

      try {
        const userId = "66d9993d33d1d754a435aea2"; // Replace with actual logged-in user ID
        const response = await axios.post(
          `${ip}/api/market-raker/add_token_to_watchlist`,
          {
            user_id: userId,
            token_id: id,
          }
        );

        if (response.data.success) {
          console.log("Token added to watchlist successfully");
        } else {
          console.error(
            "Failed to add token to watchlist:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error adding token to watchlist:", error);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setWishlist([]);
    } else {
      if (searchQuery) {
        // Select all search result cards
        setWishlist(searchCards.map((card) => card._id));
      } else {
        // Select all paginated result cards
        setWishlist(cards.map((card) => card._id));
      }
    }
    setSelectAll(!selectAll);
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const loadMoreSearchResults = () => {
    if (hasMoreSearchResults) {
      setSearchPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchPage(1); // Reset search page when a new query is entered
    setSearchCards([]); // Clear previous search results
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchPage(1); // Reset search page on submit
    setSearchCards([]); // Clear search results before new search
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Discover Trading Pairs</h1>
      <h2 className={styles.subheading}>
        Add more trading pairs to your watch list
      </h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
        <input
          type="text"
          placeholder="SEARCH TRADING PAIRS"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ width: "100%", display: "flex", marginLeft: "5rem" }}>
        <button className={styles.selectAllButton} onClick={handleSelectAll}>
          {selectAll ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Display Search Results if there's a search query */}
      {searchQuery ? (
        <>
          <div className={styles.grid}>
            {searchCards.map((card) => (
              <div key={card._id} className={styles.card}>
                <div
                  className={styles.iconContainer}
                  onClick={() => toggleWishlist(card._id)}
                >
                  {wishlist.includes(card._id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="green"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="gray"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 10v-6h-2v6h-6v2h6v6h2v-6h6v-2h-6z" />
                    </svg>
                  )}
                </div>
                <div>
                  <img
                    src={card.image}
                    alt={card.ticker}
                    width="34"
                    height="39"
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
          {hasMoreSearchResults && (
            <div className={styles.viewMoreButtonContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={loadMoreSearchResults}
              >
                View More Search Results
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Display Paginated Results if no search query */}
          <div className={styles.grid}>
            {cards.map((card) => (
              <div key={card._id} className={styles.card}>
                <div
                  className={styles.iconContainer}
                  onClick={() => toggleWishlist(card._id)}
                >
                  {wishlist.includes(card._id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="green"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="gray"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 10v-6h-2v6h-6v2h6v6h2v-6h6v-2h-6z" />
                    </svg>
                  )}
                </div>
                <div>
                  <img
                    src={card.image}
                    alt={card.ticker}
                    width="34"
                    height="39"
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
          {hasMore && (
            <div className={styles.viewMoreButtonContainer}>
              <button className={styles.viewMoreButton} onClick={loadMore}>
                View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarketRakerWishlist;
