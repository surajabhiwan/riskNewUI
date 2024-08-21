import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
// import TradingViewWidget from "../AddedComponents/HomeMiniCharts";
import {
  convertAdaToUsdApi,
  getImage,
  getImageNft,
  tableDataApi,
  topMcapApi,
  topVolumeApi,
} from "../../baseurl/baseurl";
import { Link, useSearchParams } from "react-router-dom";
import LineChart from "../AddedComponents/LineChart";
import { useSelector, useDispatch } from "react-redux";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { convertMillion } from "../../functions/functions";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { HashLink } from "react-router-hash-link";

const ChartsNFTTrending = () => {
  const [data, setData] = useState([]);
  const isLoading = useSelector((state) => state.tableREducer.loading);

  const nftData = useSelector((state) => state.tableREducer.nftTableData);
  const localData = JSON.parse(sessionStorage.getItem("cachedNftTableData"));

  useEffect(() => {
    if (localData) {
      setData(localData);
    } else {
      setData(nftData);
    }
  }, []);

  return (
    <div>
      <h1 className="text-white p-4 flex">
        <span className="p-[2px]">
          {" "}
          <SVG.HotWallets />
        </span>
        &nbsp; <span>Trending Nfts</span>{" "}
      </h1>
      <SimpleBarReact className="h-[27rem]">
        <div className="scrollbarr w-full mb-4 rounded-xl">
          {isLoading ? (
            <SkeletonTheme baseColor="#142028" highlightColor="#444">
              <p>
                <Skeleton count={10} height={50} />
              </p>
            </SkeletonTheme>
          ) : (
            <div className="rounded-lg bg-zinc-900 pt-4 pb-4 ">
              {data?.map((data, idx) => (
                <div
                  className={`cursor-pointer h-full  overflow-x-hidden `}
                  key={data?.idx}
                >
                  <div className="flex  px-2 mb-2">
                    <div className="flex items-center xl:w-1/2 w-1/2">
                      {data?.image ? (
                        <img
                          src={getImageNft + `/${data?.image}`}
                          className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                          alt="unit"
                        />
                      ) : (
                        <div
                          className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#00008B" }}
                        >
                          <span className="text-white font-medium">
                            {data?.name?.split("")[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-white font-normal flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                          {data?.name?.length > 5
                            ? data?.name?.slice(0, 5) + ".."
                            : data?.name}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end justify-center xl:w-[7%] sm:w-[10%] w-[20%]">
                      <div className="flex text-white font-normal  sm:text-sm text-xs ">
                        {convertMillion(data?.price)}₳
                      </div>
                      <div className="font-normal text-xs text-[#939393] ">
                        {/* $ {convertAdaToUsd(data?.price)} */}
                      </div>
                    </div>
                    {/* 24hr */}
                    <div
                      className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[30%] sm:w-[10%] w-[20%]`}
                    >
                      {data?.price24hChg > 0 ? <SVG.GoUp /> : <SVG.GoDown />}{" "}
                      &nbsp;
                      <p
                        className={
                          data?.price24hChg > 0
                            ? `text-[#20eb7a] sm:text-sm text-xs`
                            : `text-[#ff422b] sm:text-sm text-xs`
                        }
                      >
                        {(data?.price24hChg > 0
                          ? data?.price24hChg * 100
                          : data?.price24hChg * -100
                        )?.toFixed(2)}
                        %
                      </p>
                    </div>

                    {/* 24hr */}
                    <div
                      className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[20%] sm:w-[10%] w-[20%]p-4`}
                      title="Show live data"
                    >
                      <HashLink
                        to={
                          data?.policy
                            ? `/charts?token=${data?.name}&unit=${data?.policy}&pairID=${data?.policy}&type=nft#chartTop`
                            : "#"
                        }
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

export default ChartsNFTTrending;
