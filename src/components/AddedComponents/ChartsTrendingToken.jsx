import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
// import TradingViewWidget from "../AddedComponents/HomeMiniCharts";
import {
  getImage,
  topMarketCapTokens,
  trendingApi,
} from "../../baseurl/baseurl";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";

const ChartsTrendingToken = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTokenTabs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(trendingApi);
      const result = decryption(response?.data);
      const trendingData = result?.pageProps?.top25Tokens;
      setData(trendingData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  };

  const fetchTopMarketCapTokens = async () => {
    setIsLoading(true); // Start loading
    const data = { type: "mcap", page: 1, perPage: 20 };
    const encryptedData = { key: encryption(data ) };

    try {
      const response = await axios.post(topMarketCapTokens, encryptedData);
      const result = decryption(response?.data);
      setData((prev) => ({ ...prev, topMarketCap: result }));
    } catch (error) {
      console.error("Error fetching tokens with top market cap:", error);
    } finally {
      setIsLoading(false); // Stop loading after data is fetched
    }
  };
  useEffect(() => {
    fetchTopMarketCapTokens();
  }, []);
  const truncateAddress = (address) => {
    if (!address) return "";
    const start = address.slice(0, 2);
    const end = address.slice(-2);
    return `${start}...${end}`;
  };

  function stringToFixedNumber(inputString, decimalPlaces) {
    // Attempt to convert inputString to a number
    let number = parseFloat(inputString);

    // Check if conversion was successful
    if (isNaN(number)) {
      throw new Error("Input is not a valid number.");
    }

    // Use toFixed() to format the number to specified decimal places
    let fixedNumber = number.toFixed(decimalPlaces);

    // Return the formatted number as a string
    return fixedNumber;
  }
  return (
    <div>
      <h1 className="text-white p-4 flex">
        <span className="p-[2px]">
          {" "}
          <SVG.HotWallets />
        </span>
        &nbsp; <span>Trending tokens</span>{" "}
      </h1>
      <SimpleBarReact className="h-[22rem]">
        <div className="scrollbarr w-full mb-4 rounded-xl">
          {isLoading ? (
            <SkeletonTheme baseColor="#142028" highlightColor="#444">
              <p>
                <Skeleton count={10} height={50} />
              </p>
            </SkeletonTheme>
          ) : (
            <div className="rounded-lg bg-zinc-900 pt-4 pb-4 ">
              {data.topMarketCap?.data?.map((data, idx) => (
                <div
                  className={`cursor-pointer h-full  overflow-x-hidden `}
                  key={data?.idx}
                >
                  <div className="flex  px-2 mb-2">
                    <div className="flex items-center xl:w-1/2 w-1/2">
                      {data?.unit ? (
                        <img
                          src={`${data?.image}`}
                          className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                          alt="unit"
                        />
                      ) : (
                        <div
                          className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#00008B" }}
                        >
                          <span className="text-white font-medium">
                            {data?.ticker?.split("")[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-white font-normal flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                          {data?.ticker?.length > 5
                            ? data?.ticker?.slice(0, 5) + ".."
                            : data?.ticker}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end justify-center xl:w-[7%] sm:w-[10%] w-[20%]">
                      <div className="flex text-white font-normal  sm:text-sm text-xs ">
                        {/* {data?.price}₳ */}
                        {/* {truncateAddress(data?.price)}₳ */}
                        {stringToFixedNumber(data?.price, 2)}₳
                      </div>
                      <div className="font-normal text-xs text-[#939393] ">
                        {/* $ {convertAdaToUsd(data?.price)} */}
                      </div>
                    </div>
                    {/* 24hr */}
                    <div
                      className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[30%] sm:w-[10%] w-[20%]`}
                    >
                      &nbsp; &nbsp;
                      <p
                        className={
                          parseInt(data?.price) > 0
                            ? "text-[#20eb7a] text-[12px]"
                            : "text-[#ff422b] text-[12px]"
                        }
                      >
                        {data?.price?.toFixed(2)}
                      </p>
                    </div>

                    {/* 24hr */}
                    <div
                      className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[20%] sm:w-[10%] w-[20%]p-4`}
                      title="Show live data"
                    >
                      <HashLink
                        to={`/charts?token=${data?.ticker}&unit=${
                          data?.unit
                            ? data?.unit
                            : "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958"
                        }&pairID=${data?.pairID}&type=token#chartTop`}
                      >
                        {" "}
                        <SVG.SwapChart />
                      </HashLink>{" "}
                      &nbsp; &nbsp;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SimpleBarReact>
    </div>
  );
};

export default ChartsTrendingToken;
