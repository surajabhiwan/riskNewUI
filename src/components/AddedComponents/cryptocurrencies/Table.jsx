import { useEffect, useState } from "react";
import * as SVG from "../../../common/Icons";
import { convertMillion } from "../../../functions/functions";
import axios from "axios";
import { cryptoCurrenciesList, cryptoIcon } from "../../../baseurl/baseurl";
import { decryption } from "../../../functions/crypto";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(cryptoCurrenciesList);
      const result = decryption(response?.data);
      console.log("resultXX", result);
      const finalData = result?.walletTrend?.data;
      setData(finalData);

      const cryptoDataWithIcons = await Promise.all(
        finalData?.map(async (crypto) => {
          const logoIconResponse = await axios.get(cryptoIcon, {
            params: {
              id: `${crypto?.id}`,
            },
          });
          const res = decryption(logoIconResponse?.data);
          const icon = res?.cryptoInfo?.logo;
          return { ...crypto, icon: icon };
        })
      );
      setData(cryptoDataWithIcons);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("token list iamsun final", data);

  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#142028" highlightColor="#444">
          <p>
            <Skeleton count={15} height={50} />
          </p>
        </SkeletonTheme>
      ) : (
        data?.map((data, idx) => (
          <div
            className={`cursor-pointer h-full w-full pt-3 overflow-x-hidden  hover:bg-[#3a4956] hover:bg-opacity-60 hover:rounded-lg`}
            key={data?.idx}
            style={{ borderBottom: "1px solid grey" }}
          >
            <div className="flex  px-2 mb-3  w-full">
              <div className="flex items-center xl:w-1/5 w-3/5">
                {/* <div className="flex w-3 h-3 items-center justify-center sm:text-sm text-xs">
                                      <SVG.WatchList />
                                    </div> */}
                <div className="text-white font-semibold flex justify-center items-center ml-4 sm:text-sm text-xs">
                  {idx + 1}
                </div>
                <img
                  src={data?.icon}
                  className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                  alt="icon"
                />
                <div>
                  <div className="text-white font-normal flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                    {data?.name}
                  </div>

                  <div className="text-[#939393] text-xs flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                    {data?.subcategory}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end justify-center xl:w-[7%] sm:w-[10%] w-[20%]">
                <div className="flex text-white font-normal  sm:text-sm text-xs ">
                  {data?.quote?.USD?.price?.toFixed(3)} $
                </div>
                <div className="font-normal text-xs text-[#939393] ">
                  {/* $ {convertAdaToUsd(data?.price)} */}
                </div>
              </div>

              {/* 1hr */}
              <div
                className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] w-[20%]`}
              >
                {data?.quote?.USD?.percent_change_1h > 0 ? (
                  <SVG.GoUp />
                ) : (
                  <SVG.GoDown />
                )}{" "}
                &nbsp;
                <p
                  className={
                    data?.quote?.USD?.percent_change_1h > 0
                      ? `text-[#20eb7a] sm:text-sm text-xs`
                      : `text-[#ff422b] sm:text-sm text-xs`
                  }
                >
                  {data?.quote?.USD?.percent_change_1h > 0
                    ? data?.quote?.USD?.percent_change_1h?.toFixed(2)
                    : (data?.quote?.USD?.percent_change_1h * -1).toFixed(2)}
                  %
                </p>
              </div>
              {/* 24 days */}
              <div
                className={`sm:flex sm:items-center hidden justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] `}
              >
                {data?.quote?.USD?.percent_change_24h > 0 ? (
                  <SVG.GoUp />
                ) : (
                  <SVG.GoDown />
                )}{" "}
                &nbsp;
                <p
                  className={
                    data?.quote?.USD?.percent_change_24h > 0
                      ? `text-[#20eb7a] sm:text-sm text-xs`
                      : `text-[#ff422b] sm:text-sm text-xs`
                  }
                >
                  {" "}
                  {data?.quote?.USD?.percent_change_24h > 0
                    ? data?.quote?.USD?.percent_change_24h?.toFixed(2)
                    : (data?.quote?.USD?.percent_change_24h * -1).toFixed(2)}
                  %
                </p>
              </div>
              {/* 7 days */}
              <div
                className={`sm:flex sm:items-center hidden justify-end cursor-pointer  transition-all duration-300 xl:w-[7%] w-[10%] `}
              >
                {data?.quote?.USD?.percent_change_7d > 0 ? (
                  <SVG.GoUp />
                ) : (
                  <SVG.GoDown />
                )}{" "}
                &nbsp;
                <p
                  className={
                    data?.quote?.USD?.percent_change_7d > 0
                      ? `text-[#20eb7a] sm:text-sm text-xs`
                      : `text-[#ff422b] sm:text-sm text-xs`
                  }
                >
                  {data?.quote?.USD?.percent_change_7d > 0
                    ? data?.quote?.USD?.percent_change_7d?.toFixed(2)
                    : (data?.quote?.USD?.percent_change_7d * -1).toFixed(2)}
                  %
                </p>
              </div>
              {/* MarketCap */}
              <div
                className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 `}
              >
                <div className="flex flex-col items-end">
                  <div className="text-white font-normal flex justify-center items-center ">
                    $ {convertMillion(data?.quote?.USD?.market_cap)}
                  </div>
                  {/* <div className="text-[#939393] text-xs flex justify-center items-center ">
                                        $ {convertMillion(data?.quote?.USD?.market_cap)}{" "}
                                    </div> */}
                </div>
              </div>
              {/* Volume */}
              <div
                id="volume"
                className={`xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2 `}
              >
                <div className="flex flex-col items-end">
                  <div className="text-white font-normal flex justify-center items-center ">
                    $ {convertMillion(data?.quote?.USD?.volume_24h)}{" "}
                  </div>
                  {/* <SVG.Progress data={data?.data?.quote?.USD?.market_cap} /> */}
                </div>
              </div>
              {/* Liquid */}
              <div
                className={`xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[21%] gap-2`}
              >
                <div className="flex flex-col items-end">
                  <div className="text-white font-normal flex justify-center items-center ">
                    {convertMillion(data?.circulating_supply)} {data?.symbol}
                  </div>
                  {/* <SVG.Progress data={data?.percentagetotalLiquidityADA?.toFixed()}/> */}
                </div>
              </div>
              {/* <div className="xl:flex xl:items-center hidden justify-end   gap-2 w-1/5">
                                <div className="text-white font-normal flex justify-center items-center "><LineChart timeseries={data?.timeseries}/></div>
                            </div> */}
            </div>
          </div>
        ))
      )}
    </>
  );
};
export default Table;
