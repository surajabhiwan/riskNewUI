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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { decryption, encryption } from "../../functions/crypto";
import HomeTableContent from "../../components/Home/HomeTableContent";
import NftDataTable from "../../components/AddedComponents/NftDataTable";
import HomeTableHeaderToken from "../../components/Home/HomeTableHeaderToken";
import HomeTableHeaderNft from "../../components/Home/HomeTableHeaderNft";
import { convertMillion } from "../../functions/functions";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
const TableDataComp = (tab) => {
  const [imageErrors, setImageErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New isLoading state
  const handleImageError = (index) => {
    setImageErrors((prevErrors) => [...prevErrors, index]);
  };
  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }
  function formatPriceWithCustomSubscript(value) {
    // Convert exponent digits to subscript
    const toSubscript = (num) =>
      num.toString().replace(/\d/g, (digit) => "₀₁₂₃₄₅₆₇₈₉"[digit]);

    if (value < 0.001) {
      // Scale value up to avoid e notation
      const scaledValue = (value * 1_000_000).toFixed(6).toString();

      // Get the significant part of the scaled value
      const significantPart = scaledValue.split(".")[1]; // Get digits after the decimal point
      const trimmedSignificant = significantPart.replace(/^0+/, ""); // Remove leading zeros

      // Format as 0.0₆ + significant part, taking only the first three digits of trimmed significant
      return `0.0${toSubscript(6)}${trimmedSignificant.slice(0, 3)} ₳`;
    } else {
      return value.toFixed(3) + "₳"; // Regular values with 3 decimal places
    }
  }

  const [activeTab, setActiveTab] = useState(tab);
  const [tokenData, setTokenData] = useState({
    topMarketCap: [],
    topLiquidity: [],
    topVolume: [],
  });
  console.log("tab iamsun", tab);
  const [nftData, setNftData] = useState({ topVolume: [], topRankings: [] });
  const { dataTokenTabs, adaLive } = useSelector((state) => state.tableREducer);

  console.log("nftData data iamsun", nftData);
  console.log("token data iamsun", tokenData.topMarketCap);
  console.log("token data iamsun topLiquidity", tokenData.topLiquidity);

  console.log("token data iamsun topVolume", tokenData.topVolume);
  const navigate = useNavigate(); // Use useNavigate for React Router v6

  // Handler for row clicks
  const handleRowClick = (item, heading) => {
    console.log("heading", heading);
    console.log("item", item);

    let url =
      item?.unit || item?.policy
        ? `/charts?token=${
            heading === "nft" ? item?.name : item?.ticker
          }&unit=${heading === "nft" ? item?.policy : item?.unit}&pairID=${
            item?.policy
          }&type=${heading}`
        : "#"; // Default URL

    // if (heading === "token") {
    //   url = item?.unit
    //     ? `/charts?token=${item?.ticker}&unit=${
    //         item?.unit || "default-unit"
    //       }&pairID=${item?.pairID}&type=token#chartTop`
    //     : "#";
    // } else if (heading === "nft") {
    //   url = item?.policy
    //     ? `/charts?token=${item?.name}&unit=${item?.policy}&pairID=${item?.policy}&type=nft#chartTop`
    //     : "#";
    // }

    console.log("url going", url);
    navigate(url); // Use navigate function for redirection
  };
  // Fetch functions
  const fetchTopMarketCapTokens = async () => {
    setIsLoading(true); // Start loading
    const data = { type: "mcap", page: 1, perPage: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topMarketCapTokens, encryptedData);
      const result = decryption(response?.data);
      setTokenData((prev) => ({ ...prev, topMarketCap: result }));
    } catch (error) {
      console.error("Error fetching tokens with top market cap:", error);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const fetchTopLiquidityTokens = async () => {
    setIsLoading(true); // Start loading
    const data = { page: 2, perPage: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topLiquidityTokens, encryptedData);
      const result = decryption(response?.data);
      setTokenData((prev) => ({ ...prev, topLiquidity: result }));
    } catch (error) {
      console.error("Error fetching tokens with top liquidity:", error);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const fetchTopVolumeTokens = async () => {
    setIsLoading(true); // Start loading
    const data = { timeframe: "24h", page: 2, perPage: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topVolumeTokens, encryptedData);
      const result = decryption(response?.data);
      setTokenData((prev) => ({ ...prev, topVolume: result }));
    } catch (error) {
      console.error("Error fetching tokens with top volume:", error);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const fetchTopNFTVolume = async () => {
    setIsLoading(true); // Start loading
    const data = { timeframe: "24h", page: 1, perPage: 20 };
    // const encryptedData = { key: encryption({ timeframe: "24h", page: 1, perPage: 20 }) };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topVolumeCollection, encryptedData);
      const result = decryption(response?.data);
      setNftData((prev) => ({ ...prev, topVolume: result }));
    } catch (error) {
      console.error(
        "Error fetching top NFT collections by trading volume:",
        error
      );
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  const fetchNFTTopRankings = async () => {
    setIsLoading(true); // Start loading
    const data = { ranking: "marketCap", items: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topRankingNfts, encryptedData);
      const result = decryption(response?.data);
      setNftData((prev) => ({ ...prev, topRankings: result }));
    } catch (error) {
      console.error("Error fetching NFT top rankings:", error);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    if (tab.tab) {
      setActiveTab("token");
      console.log("token calling", tab);
    } else if (!tab?.tab) {
      console.log("nft calling");
      setActiveTab("nft");
    }
  }, [tab]);
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
  // const renderTable = (data, heading) => (
  //   <div>
  //     <HomeTableHeaderToken tab={tab} heading={heading}></HomeTableHeaderToken>

  //     <HomeTableContent data={data} heading={heading}></HomeTableContent>
  //   </div>
  // );

  // const renderTableNft = (data, heading) => (
  //   <div>
  //     <HomeTableHeaderNft tab={tab} heading={heading}></HomeTableHeaderNft>
  //     <NftDataTable data={data} heading={heading}></NftDataTable>
  //   </div>
  // );

  // const renderTable = (
  //   data,
  //   heading,
  //   imageErrors,
  //   handleImageError,
  //   adaLive,
  //   rowHeading
  // ) => (
  //   <div>
  //     <table className={styles.table}>
  //       <thead>
  //         <tr>
  //           <th className={styles.index}>#</th> {/* Index heading */}
  //           <th>Name</th>
  //           <th>Price</th>
  //           <th>{heading}</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {isLoading ? (
  //           <SkeletonTheme baseColor="#142028" highlightColor="#444">
  //             <Skeleton count={10} height={50} />
  //           </SkeletonTheme>
  //         ) : (
  //           data?.map((item, idx) => (
  //             <tr
  //               key={idx}
  //               className={styles.tableRow}
  //               onClick={() => handleRowClick(item, rowHeading)}
  //             >
  //               <td className={styles.index}>{idx + 1}</td> {/* Row index */}
  //               <td>
  //                 <div className="flex items-center gap-3">
  //                   {!imageErrors.includes(idx) && item?.unit ? (
  //                     <img
  //                       src={`${item?.image}`}
  //                       className="w-8 h-8 rounded-full"
  //                       alt="unit"
  //                       onError={() => handleImageError(idx)}
  //                     />
  //                   ) : (
  //                     <div
  //                       className="w-8 h-8 rounded-full flex items-center justify-center"
  //                       style={{ backgroundColor: getRandomColor() }}
  //                     >
  //                       <span className="text-white font-medium">
  //                         {item?.ticker?.[0]}
  //                       </span>
  //                     </div>
  //                   )}
  //                   <span>{item?.ticker}</span>
  //                 </div>
  //               </td>
  //               <td>{"$" + parseFloat(item?.price).toFixed(3)}</td>
  //               {heading === "MarketCap" && (
  //                 <td>{parseFloat(item?.mcap).toFixed(3) + "₳"}</td>
  //               )}
  //               {heading === "Volume" && (
  //                 <td>{parseFloat(item?.volume).toFixed(2) + "₳"}</td>
  //               )}
  //               {heading === "Liquidy" && (
  //                 <td>{parseFloat(item?.liquidity).toFixed(2) + "₳"}</td>
  //               )}
  //             </tr>
  //           ))
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );
  const renderTable = (
    data,
    heading,
    imageErrors,
    handleImageError,
    adaLive,
    rowHeading
  ) => (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.index}>#</th> {/* Index heading */}
            <th>Name</th>
            <th>Price</th>
            <th>{heading}</th>
          </tr>
        </thead>
      </table>
      <div className={styles.scrollableBody}>
        <table className={styles.table}>
          <tbody>
            {isLoading
              ? // Render skeleton for each row
                Array.from({ length: 20 }).map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={30} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={150} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={70} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={100} />
                      </SkeletonTheme>
                    </td>
                  </tr>
                ))
              : // Render actual data rows when not loading
                data?.map((item, idx) => (
                  <tr
                    key={idx}
                    className={styles.tableRow}
                    onClick={() => handleRowClick(item, "token")}
                  >
                    <td className={styles.index}>{idx + 1}</td>{" "}
                    {/* Row index */}
                    <td>
                      <div className="flex items-center gap-3">
                        {!imageErrors.includes(idx) && item?.unit ? (
                          <img
                            src={`${item?.image}`}
                            className="w-8 h-8 rounded-full"
                            alt="unit"
                            onError={() => handleImageError(idx)}
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            <span className="text-white font-medium">
                              {item?.ticker?.[0]}
                            </span>
                          </div>
                        )}
                        <span>{item?.ticker}</span>
                      </div>
                    </td>
                    <td>
                      {formatPriceWithCustomSubscript(parseFloat(item?.price))}
                    </td>
                    {heading === "MarketCap" && (
                      <td>{parseFloat(item?.mcap).toFixed(3) + "₳"}</td>
                    )}
                    {heading === "Volume" && (
                      <td>{parseFloat(item?.volume).toFixed(2) + "₳"}</td>
                    )}
                    {heading === "Liquidity" && (
                      <td>{parseFloat(item?.liquidity).toFixed(2) + "₳"}</td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTableNft = (
    data,
    heading,
    imageErrors,
    handleImageError,
    rowHeading
  ) => (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.index}>#</th> {/* Index heading */}
            <th>Name</th>
            <th>Price</th>
            <th>{heading}</th>
          </tr>
        </thead>
      </table>
      <div className={styles.scrollableBody}>
        <table className={styles.table}>
          <tbody>
            {isLoading
              ? // Render skeleton for each row
                Array.from({ length: 20 }).map((_, idx) => (
                  <tr key={idx}>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={30} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={150} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={70} />
                      </SkeletonTheme>
                    </td>
                    <td>
                      <SkeletonTheme baseColor="#142028" highlightColor="#444">
                        <Skeleton height={20} width={100} />
                      </SkeletonTheme>
                    </td>
                  </tr>
                ))
              : // Render actual data rows when not loading
                data?.map((item, idx) => (
                  <tr
                    key={idx}
                    className={styles.tableRow}
                    onClick={() => handleRowClick(item, "nft")}
                  >
                    <td className={styles.index}>{idx + 1}</td>{" "}
                    {/* Row index */}
                    <td>
                      <div className="flex items-center gap-3">
                        {!imageErrors.includes(idx) && item?.policy ? (
                          <img
                            src={`${item?.image}`}
                            className="w-8 h-8 rounded-full"
                            alt="unit"
                            onError={() => handleImageError(idx)}
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            <span className="text-white font-medium">
                              {item?.name?.[0]}
                            </span>
                          </div>
                        )}
                        <span>{item?.name}</span>
                      </div>
                    </td>
                    <td>
                      {formatPriceWithCustomSubscript(
                        parseFloat(item?.price.toFixed(2))
                      )}
                    </td>
                    <td>
                      {heading === "TopRanking"
                        ? convertMillion(item?.marketCap)
                        : convertMillion(item?.volume)}
                      ₳
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // const renderTableNft = (
  //   data,
  //   heading,
  //   imageErrors,
  //   handleImageError,
  //   rowHeading
  // ) => (
  //   <div>
  //     <table className={styles.table}>
  //       <thead>
  //         <tr>
  //           <th className={styles.index}>#</th> {/* Index heading */}
  //           <th>Name</th>
  //           <th>Price</th>
  //           <th>{heading}</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {isLoading ? (
  //          <SkeletonTheme baseColor="#142028" highlightColor="#444">
  //          <Skeleton count={10} height={50} width="100%" />
  //        </SkeletonTheme>

  //         ) : (
  //           data?.map((item, idx) => (
  //             <tr
  //               key={idx}
  //               className={styles.tableRow}
  //               onClick={() => handleRowClick(item, rowHeading)}
  //             >
  //               <td className={styles.index}>{idx + 1}</td> {/* Row index */}
  //               <td>
  //                 <div className="flex items-center gap-3">
  //                   {!imageErrors.includes(idx) && item?.policy ? (
  //                     <img
  //                       src={`${item?.image}`}
  //                       className="w-8 h-8 rounded-full"
  //                       alt="unit"
  //                       onError={() => handleImageError(idx)}
  //                     />
  //                   ) : (
  //                     <div
  //                       className="w-8 h-8 rounded-full flex items-center justify-center"
  //                       style={{ backgroundColor: getRandomColor() }}
  //                     >
  //                       <span className="text-white font-medium">
  //                         {item?.name?.[0]}
  //                       </span>
  //                     </div>
  //                   )}
  //                   <span>{item?.name}</span>
  //                 </div>
  //               </td>
  //               <td>{convertMillion(item?.price)} ₳</td>
  //               <td>
  //                 {heading === "TopRanking"
  //                   ? convertMillion(item?.marketCap)
  //                   : convertMillion(item?.volume)}
  //                 ₳
  //               </td>
  //             </tr>
  //           ))
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  const renderCards = () => {
    return (
      <div className={styles.cardsContainer}>
        {activeTab === "token" ? (
          <>
            <div className={styles.card}>
              {renderTable(
                tokenData.topMarketCap?.data,
                "MarketCap",
                imageErrors,
                handleImageError,
                adaLive,
                "token"
              )}
            </div>
            <div className={styles.card}>
              {renderTable(
                tokenData.topLiquidity?.data,
                "Liquidity",
                imageErrors,
                handleImageError,
                adaLive,
                "token"
              )}
            </div>
            <div className={styles.card}>
              {renderTable(
                tokenData.topVolume?.data,
                "Volume",

                imageErrors,
                handleImageError,
                adaLive,
                "token"
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.card}>
              {renderTableNft(
                nftData.topVolume?.data,
                "Volume",

                imageErrors,
                handleImageError,
                adaLive,
                "nft"
              )}
            </div>
            <div className={styles.card}>
              {renderTableNft(
                nftData.topRankings?.data,
                "TopRanking",

                imageErrors,
                handleImageError,
                adaLive,
                "nft"
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  // Render cards

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
