import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TableDataComp.module.css"; // Ensure you have CSS modules setup
import {
  topLiquidityTokens,
  topMarketCapTokens,
  topRankingNfts,
  topVolumeCollection,
  topVolumeTokens,
} from "../../baseurl/baseurl";
import { decryption, encryption } from "../../functions/crypto";
import HomeTableContent from "../../components/Home/HomeTableContent";
import NftDataTable from "../../components/AddedComponents/NftDataTable";
import HomeTableHeaderToken from "../../components/Home/HomeTableHeaderToken";
import HomeTableHeaderNft from "../../components/Home/HomeTableHeaderNft";
const TableDataComp = (tab) => {
  const [activeTab, setActiveTab] = useState("token");
  const [tokenData, setTokenData] = useState({
    topMarketCap: [],
    topLiquidity: [],
    topVolume: [],
  });
  console.log("tab iamsun", tab);
  const [nftData, setNftData] = useState({ topVolume: [], topRankings: [] });

  console.log("token data iamsun", tokenData.topMarketCap);
  console.log("token data iamsun topLiquidity", tokenData.topLiquidity);

  console.log("token data iamsun topVolume", tokenData.topVolume);

  // Fetch functions
  const fetchTopMarketCapTokens = async () => {
    const data = { type: "mcap", page: 1, perPage: 20 };
    const encryptedData = { key: encryption({ query: data }) };

    try {
      console.log("Fetching top market cap tokens...");
      const response = await axios.post(topMarketCapTokens, encryptedData);
      console.log("Response for top market cap tokens:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for top market cap tokens:", result);
      setTokenData((prev) => ({ ...prev, topMarketCap: result }));
    } catch (error) {
      console.error("Error fetching tokens with top market cap:", error);
    }
  };

  const fetchTopLiquidityTokens = async () => {
    const data = { page: 1, perPage: 10 };
    const encryptedData = { key: encryption({ query: data }) };

    try {
      console.log("Fetching top liquidity tokens...");
      const response = await axios.post(topLiquidityTokens, encryptedData);
      console.log("Response for top liquidity tokens:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for top liquidity tokens:", result);
      setTokenData((prev) => ({ ...prev, topLiquidity: result }));
    } catch (error) {
      console.error("Error fetching tokens with top liquidity:", error);
    }
  };

  const fetchTopVolumeTokens = async () => {
    const data = { timeframe: "24h", page: 1, perPage: 20 };
    const encryptedData = { key: encryption({ query: data }) };

    try {
      console.log("Fetching top volume tokens...");
      const response = await axios.post(topVolumeTokens, encryptedData);
      console.log("Response for top volume tokens:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for top volume tokens:", result);
      setTokenData((prev) => ({ ...prev, topVolume: result }));
    } catch (error) {
      console.error("Error fetching tokens with top volume:", error);
    }
  };

  const fetchTopNFTVolume = async () => {
    const data = { timeframe: "24h", page: 1, perPage: 10 };
    const encryptedData = { key: encryption({ query: data }) };

    try {
      console.log("Fetching top NFT collections by trading volume...");
      const response = await axios.post(topVolumeCollection, encryptedData);
      console.log("Response for top NFT volume collections:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for top NFT volume collections:", result);
      setNftData((prev) => ({ ...prev, topVolume: result }));
    } catch (error) {
      console.error(
        "Error fetching top NFT collections by trading volume:",
        error
      );
    }
  };

  const fetchNFTTopRankings = async () => {
    const data = { ranking: "marketCap", items: 25 };
    const encryptedData = { key: encryption({ query: data }) };

    try {
      console.log("Fetching NFT top rankings...");
      const response = await axios.post(topRankingNfts, encryptedData);
      console.log("Response for NFT top rankings:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for NFT top rankings:", result);
      setNftData((prev) => ({ ...prev, topRankings: result }));
    } catch (error) {
      console.error("Error fetching NFT top rankings:", error);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    console.log(`Active tab: ${activeTab}`);
    if (activeTab === "token") {
      fetchTopMarketCapTokens();
      fetchTopLiquidityTokens();
      fetchTopVolumeTokens();
    } else if (activeTab === "nft") {
      fetchTopNFTVolume();
      fetchNFTTopRankings();
    }
  }, [activeTab]);

  // Render table function

  const renderTableSample = (data) => (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ticker}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderTable = (data) => (
    <div>
      <HomeTableHeaderToken tab={tab}></HomeTableHeaderToken>

      <HomeTableContent data={data}></HomeTableContent>
    </div>
  );
  const renderTableNft = (data) => (
    <div>
      <HomeTableHeaderNft tab={tab}></HomeTableHeaderNft>
      <NftDataTable data={data}></NftDataTable>
    </div>
  );
  // Render cards
  const renderCards = () => {
    // if (activeTab === "token") {
    if (tab.tab) {
      return (
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            {/* {renderTableSample(tokenData.topMarketCap.data)} */}
            {renderTable(tokenData.topMarketCap?.data)}
          </div>
          <div className={styles.card}>
            {renderTable(tokenData.topLiquidity?.data)}
          </div>
          <div className={styles.card}>
            {renderTable(tokenData.topVolume?.data)}
          </div>
        </div>
      );
      // } else if (activeTab === "nft") {
    } else if (!tab.tab) {
      return (
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            {renderTableNft(nftData.topVolume.data)}
          </div>
          <div className={styles.card}>
            {renderTableNft(nftData.topRankings.data)}
          </div>
          {/* Render a hidden card for layout purposes */}
          <div className={styles.card} style={{ visibility: "hidden" }}></div>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.toggleButtons}>
        <button
          className={activeTab === "token" ? styles.active : ""}
          onClick={() => setActiveTab("token")}
        >
          Token
        </button>
        <button
          className={activeTab === "nft" ? styles.active : ""}
          onClick={() => setActiveTab("nft")}
        >
          NFT
        </button>
      </div> */}
      {renderCards()}
    </div>
  );
};

export default TableDataComp;
