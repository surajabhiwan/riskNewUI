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

const HomeTableHeaderNft = ({ tab, heading }) => {
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
      key: encryption(data),
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
      key: encryption(data),
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
      key: encryption(data),
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
      key: encryption(data),
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
    <div className="w-full">
      <div className="flex mt-3 px-2 w-full glowClassDiv items-center justify-between">
        {/* Left Section - Name */}
        <div className="flex items-center justify-start w-1/2">
          <div className="text-white font-semibold flex justify-center items-center sm:text-sm text-xs ml-4">
            #
          </div>
          <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs ml-4">
            Name
          </div>
        </div>

        {/* Right Section - Price */}
        <div className="flex items-center justify-end w-1/2">
          <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs ml-4">
            {tab ? "Price" : "Floor Price"}
          </div>

          {/* MarketCap - Only when heading is "TopRanking" */}
          {heading === "TopRanking" && (
            <div
              id="marketCap"
              className="flex items-center justify-end transition-all duration-300 gap-2 hover:mt-[-8px] ml-8"
            >
              <div className="text-white font-normal flex justify-center items-center">
                MarketCap
              </div>
              {/* <div
                className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300 ${
                  rotationMarket ? "rotate-180" : ""
                }`}
              >
                <SVG.Arrow />
              </div> */}
            </div>
          )}
          {/* Volume Section */}
          {heading === "Volume" && (
            <div className="flex items-center justify-end transition-all duration-300 gap-2 hover:mt-[-8px] ml-8">
              <div className="text-white font-normal flex justify-center items-center">
                Volume
              </div>
              {/* Left Section - Volume Label */}
              <div className="w-1/2"></div>

              {/* Right Section - Volume Details */}
              {/* <div className="w-1/2 flex items-center justify-end">
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
              className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300 ${
                rotationVolume ? "rotate-180" : ""
              }`}
            >
              <SVG.Arrow />
            </div>
          </div> */}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      {/* <div className="w-full h-[1px] mt-2 bg-[#232323]"></div> */}
    </div>
  );
};

export default HomeTableHeaderNft;
