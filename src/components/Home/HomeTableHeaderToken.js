import { useDispatch, useSelector } from "react-redux";
import * as SVG from "../../common/Icons";
import { useState } from "react";
import { tableAction } from "../../store/slices/TableData";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";
import {
  topLiquidityTokens,
  topMarketCapTokens,
  topRankingNfts,
  topVolumeCollection,
  topVolumeTokens,
} from "../../baseurl/baseurl";

const HomeTableHeaderToken = ({ tab, heading }) => {
  console.log("heading received from parent", heading);
  const { data, nftTableData } = useSelector((state) => state.tableREducer);

  const [rotation, setRotation] = useState(false);
  const [rotationd, setRotationd] = useState(false);
  const [rotationm, setRotationm] = useState(false);
  const [rotationMarket, setRotationMarket] = useState(false);
  const [rotationVolume, setRotationVolume] = useState(false);
  const [rotationLiquidity, setRotationLiquidity] = useState(false);

  const dispatch = useDispatch();

  const rotateComponent = () => setRotation(!rotation);
  const rotatedComponent = () => setRotationd(!rotationd);
  const rotatemComponent = () => setRotationm(!rotationm);
  const rotateMarketComponent = () => setRotationMarket(!rotationMarket);
  const rotateVloumeComponent = () => setRotationVolume(!rotationVolume);
  const rotateLiquidityComponent = () =>
    setRotationLiquidity(!rotationLiquidity);

  const handleSortThirty = (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            return (
              parseInt(a.thirty?.split("%")[0]) -
              parseInt(b.thirty?.split("%")[0])
            );
          } else {
            return (
              parseInt(b.thirty?.split("%")[0]) -
              parseInt(a.thirty?.split("%")[0])
            );
          }
        });
        dispatch(tableAction.getTokenTabs(sortData));
      }
    } else if (!tab) {
      console.log("tab____", nftTableData);
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            return a.price30dChg - b.price30dChg;
          } else {
            return b.price30dChg - a.price30dChg;
          }
        });
        dispatch(tableAction.setNftTableData(sortData));
      }
    }
  };

  const handleSortTwoFour = (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            return (
              parseInt(a.fivem?.split("%")[0]) -
              parseInt(b.fivem?.split("%")[0])
            );
          } else {
            return (
              parseInt(b.fivem?.split("%")[0]) -
              parseInt(a.fivem?.split("%")[0])
            );
          }
        });
        dispatch(tableAction.getTokenTabs(sortData));
      }
    } else if (!tab) {
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            return a.price24hChg - b.price24hChg;
          } else {
            return b.price24hChg - a.price24hChg;
          }
        });
        dispatch(tableAction.setNftTableData(sortData));
      }
    }
  };

  const handleSortSeven = (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            return (
              parseInt(a.onehr?.split("%")[0]) -
              parseInt(b.onehr?.split("%")[0])
            );
          } else {
            return (
              parseInt(b.onehr?.split("%")[0]) -
              parseInt(a.onehr?.split("%")[0])
            );
          }
        });
        dispatch(tableAction.getTokenTabs(sortData));
      }
    } else if (!tab) {
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            // return a.price7dChg - b.price7dChg;
            return (
              parseInt(a.twofourhr?.split("%")[0]) -
              parseInt(b.twofourhr?.split("%")[0])
            );
          } else {
            // return b.price7dChg - a.price7dChg
            return (
              parseInt(b.twofourhr?.split("%")[0]) -
              parseInt(a.twofourhr?.split("%")[0])
            );
          }
        });
        dispatch(tableAction.setNftTableData(sortData));
      }
    }
  };

  const handleSortMarket = async (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            // return parseInt(a.marketCapADA?.split('%')[0]) - parseInt(b.marketCapADA?.split('%')[0])
            return (
              parseFloat(a.mcap.replace(/[$,]/g, "")) -
              parseFloat(b.mcap.replace(/[$,]/g, ""))
            );
          } else {
            // return parseInt(b.marketCapADA?.split('%')[0]) - parseInt(a.marketCapADA?.split('%')[0])
            return (
              parseFloat(b.mcap.replace(/[$,]/g, "")) -
              parseFloat(a.mcap.replace(/[$,]/g, ""))
            );
          }
        });
        const result = await fetchTopMarketCapTokens();
        console.log("result from new api ", result);
        console.log("result from old api", sortData);
        dispatch(tableAction.getTokenTabs(result?.data));
      }
    } else if (!tab) {
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            return a.marketCap - b.marketCap;
          } else {
            return b.marketCap - a.marketCap;
          }
        });
        const result = await fetchNFTTopRankings();
        console.log("result from new fetchNFTTopRankings", result);
        console.log("result from old fetchNFTTopRankings", sortData);
        dispatch(tableAction.setNftTableData(result?.data));
      }
    }
  };

  const handleSortVolume = async (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            // return a.volumeADA - b.volumeADA;
            return (
              parseFloat(a.volume.replace(/[$,]/g, "")) -
              parseFloat(b.volume.replace(/[$,]/g, ""))
            );
          } else {
            // return b.volumeADA - a.volumeADA;
            return (
              parseFloat(b.volume.replace(/[$,]/g, "")) -
              parseFloat(a.volume.replace(/[$,]/g, ""))
            );
          }
        });
        const result = await fetchTopVolumeTokens();
        console.log(
          "result from new api for top handleSortVolume tokens",
          result
        );
        console.log(
          "result from old api for top handleSortVolume tokens",
          sortData
        );
        dispatch(tableAction.getTokenTabs(result?.data));
      }
    } else if (!tab) {
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            return a.volume24h - b.volume24h;
          } else {
            return b.volume24h - a.volume24h;
          }
        });
        const result = await fetchTopNFTVolume();
        console.log(
          "result from new api for top handleSortVolume nfts",
          result
        );
        console.log(
          "result from old api for top handleSortVolume nfts",
          sortData
        );
        dispatch(tableAction.setNftTableData(result?.data));
      }
    }
  };

  const handleSortLiquidity = async (sortType) => {
    if (tab) {
      if (data) {
        const sortData = data.slice()?.sort((a, b) => {
          if (sortType === "asc") {
            return a.liquidity - b.liquidity;
            // return parseFloat(a.liquidity.replace(/[$,]/g, '')) - parseFloat(b.liquidity.replace(/[$,]/g, ''))
          } else {
            return b.liquidity - a.liquidity;
            // return parseFloat(b.liquidity.replace(/[$,]/g, '')) - parseFloat(a.liquidity.replace(/[$,]/g, ''))
          }
        });
        const result = await fetchTopLiquidityTokens();
        console.log("result from new api for top Liquidity tokens", result);
        console.log("result from old api for top liquidity tokens", sortData);
        dispatch(tableAction.getTokenTabs(result.data));
      }
    } else if (!tab) {
      if (nftTableData) {
        const sortData = nftTableData?.slice().sort((a, b) => {
          if (sortType === "asc") {
            return a.listings - b.listings;
          } else {
            return b.listings - a.listings;
          }
        });
        dispatch(tableAction.setNftTableData(sortData));
      }
    }
  };

  // New functions for new api
  const fetchTopMarketCapTokens = async () => {
    const data = {
      type: "mcap", // or 'fdv'
      page: 1,
      perPage: 20,
    };
    const encryptedData = {
      key: encryption({
        query: data,
      }),
    };

    try {
      console.log("function runnning new ");
      const response = await axios.post(topMarketCapTokens, encryptedData);
      const result = decryption(response?.data);
      console.log("data for top market caps from digvijay encrypted", result); // handle the response data

      console.log("data for top market caps from digvijay response", response); // handle the response data
      return result;
    } catch (error) {
      console.error("Error fetching tokens with top market cap:", error);
    }
  };
  const fetchTopLiquidityTokens = async () => {
    const data = {
      page: 1,
      perPage: 10,
    };

    const encryptedData = {
      key: encryption({
        query: data,
      }),
    };

    try {
      console.log("Fetching top liquidity tokens...");
      const response = await axios.post(topLiquidityTokens, encryptedData);
      const result = decryption(response?.data);
      console.log("Decrypted data for top liquidity tokens:", result);
      console.log("Raw response data:", response);

      return result;
    } catch (error) {
      console.error("Error fetching tokens with top liquidity:", error);
    }
  };
  const fetchTopVolumeTokens = async () => {
    const data = {
      timeframe: "24h", // default timeframe
      page: 1,
      perPage: 20,
    };

    const encryptedData = {
      key: encryption({
        query: data,
      }),
    };

    try {
      console.log("Fetching top volume tokens...");
      const response = await axios.post(topVolumeTokens, encryptedData);
      const result = decryption(response?.data);
      console.log("Decrypted data for top volume tokens:", result);
      console.log("Raw response data:", response);

      return result;
    } catch (error) {
      console.error("Error fetching tokens with top volume:", error);
    }
  };

  const fetchTopNFTVolume = async () => {
    const data = {
      timeframe: "24h", // default timeframe
      page: 1,
      perPage: 10,
    };

    const encryptedData = {
      key: encryption({
        query: data,
      }),
    };

    try {
      console.log("Fetching top NFT collections by trading volume...");
      const response = await axios.post(topVolumeCollection, encryptedData);
      const result = decryption(response?.data);
      console.log("Decrypted data for top NFT collections:", result);
      console.log("Raw response data:", response);

      return result;
    } catch (error) {
      console.error(
        "Error fetching top NFT collections by trading volume:",
        error
      );
    }
  };

  const fetchNFTTopRankings = async () => {
    const data = {
      ranking: "marketCap", // specify the ranking criteria: "marketCap", "volume", "gainers", or "losers"
      items: 25, // default number of items
    };

    const encryptedData = {
      key: encryption({
        query: data,
      }),
    };

    try {
      console.log("Fetching NFT top rankings...");
      const response = await axios.post(topRankingNfts, encryptedData);
      const result = decryption(response?.data);
      console.log("Decrypted data for NFT top rankings:", result);
      console.log("Raw response data:", response);

      return result;
    } catch (error) {
      console.error("Error fetching NFT top rankings:", error);
    }
  };

  return (
    <div className="">
      <div className="flex mt-3 px-2  w-full glowClassDiv  items-center justify-between">
        <div className="flex items-center justify-between ">
          {/* <div className="flex w-3 h-3 items-center justify-center" >
            <SVG.WatchList />
          </div> */}
          <div className="text-white font-semibold flex justify-center items-center ml-4 sm:text-sm text-xs">
            #
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs">
            Name
          </div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-end ">
          <div className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs">
            {tab ? "Price" : "Floor Price"}{" "}
          </div>
        </div>
        {/* 24hr
        <div
          id="24h"
          onClick={() => {
            rotateComponent();
            handleSortTwoFour(rotation ? "asc" : "dsc");
          }}
          className={`flex items-center  justify-end cursor-pointer transition-all duration-300 hover:mt-[-8px] xl:w-[7%] sm:w-[10%] w-[20%]`}
        >
          <div className="text-white font-normal sm:text-sm text-xs">
            {tab ? "1h" : "24h"}{" "}
          </div>
          <div
            className={`text-white font-normal ml-0 transition-all duration-300 ${
              rotation ? " rotate-180" : ""
            }`}
          >
            <SVG.Arrow />{" "}
          </div>
        </div>
        {/* 7 days */}
        {/* <div
          onClick={() => {
            rotatemComponent();
            handleSortSeven(rotationm ? "asc" : "dsc");
          }}
          id="7d"
          className={`sm:flex sm:items-center hidden justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] w-0 hover:mt-[-8px]`}
        >
          <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs">
            {tab ? "24h" : "7d"}{" "}
          </div>
          <div
            className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300 ${
              rotationm ? " rotate-180" : ""
            }`}
          >
            <SVG.Arrow />{" "}
          </div>
        </div> */}
        {/* 30days */}
        {/* <div
          onClick={() => {
            rotatedComponent();
            handleSortThirty(rotationd ? "asc" : "dsc");
          }}
          id="30d"
          className={`sm:flex sm:items-center hidden justify-end cursor-pointer  transition-all duration-300 xl:w-[7%] sm:w-[10%] w-0 hover:mt-[-8px]`}
        >
          <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs">
            {tab ? "7d" : "30d"}{" "}
          </div>
          <div
            className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300 ${
              rotationd ? " rotate-180" : ""
            }`}
          >
            <SVG.Arrow />{" "}
          </div>
        </div> */}

        {/* MarketCap */}
        {heading === "MarketCap" && (
          <div
            onClick={() => {
              rotateMarketComponent();
              handleSortMarket(rotationMarket ? "asc" : "dsc");
            }}
            id="marketCap"
            className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  gap-2 hover:mt-[-8px]`}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              MarketCap{" "}
            </div>
            {/* <div className="text-white font-normal flex justify-center items-center" title={tab ? "Circulating supply * price " : "Current on-chain * current price"}><SVG.Alert /></div> */}
            <div
              className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300 ${
                rotationMarket ? " rotate-180" : ""
              }`}
            >
              <SVG.Arrow />{" "}
            </div>
          </div>
        )}

        {/* Volume */}
        {heading === "Volume" && (
          <div
            onClick={() => {
              rotateVloumeComponent();
              handleSortVolume(rotationVolume ? "asc" : "dsc");
            }}
            id="volume"
            className={`xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2 hover:mt-[-8px]`}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              Volume{" "}
            </div>
            <div
              className="text-white font-normal flex justify-center items-center"
              title={
                tab
                  ? "Amount of ADA that has been traded with this token in last 24h"
                  : "Total trading volume in last 24h"
              }
            >
              <SVG.Alert />
            </div>
            <div
              className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300  ${
                rotationVolume ? "rotate-180" : ""
              }`}
            >
              <SVG.Arrow />
            </div>
          </div>
        )}

        {/* Liquid */}
        {heading === "Liquidy" && (
          <div
            onClick={() => {
              rotateLiquidityComponent();
              handleSortLiquidity(rotationLiquidity ? "asc" : "dsc");
            }}
            id="liquididy"
            className={`xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[12%] gap-2 hover:mt-[-8px]  `}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              {tab ? "Liquidity" : "%Items Listed"}{" "}
            </div>
            <div
              className="text-white font-normal flex justify-center items-center "
              title={
                tab
                  ? "Total amount of ADA in liquidity for this token across all DEXs"
                  : ""
              }
            >
              {tab ? <SVG.Alert /> : ""}{" "}
            </div>
            <div
              className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300  ${
                rotationLiquidity ? " rotate-180" : ""
              }`}
            >
              <SVG.Arrow />{" "}
            </div>
          </div>
        )}

        {/* <div className="xl:flex xl:items-center hidden justify-end   gap-2 w-1/5">
          <div className="text-white font-normal flex justify-center items-center  ">
            {tab ? "Last 7 Days" : "Last 7 Days"}{" "}
          </div>
        </div> */}
      </div>
      {/* <div className="w-full h-[1px] mt-2 bg-[#232323]"></div> */}
    </div>
  );
};

export default HomeTableHeaderToken;
