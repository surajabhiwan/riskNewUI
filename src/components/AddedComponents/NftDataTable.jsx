import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import {
  getImageNft,
  getNftImage,
  getNftTimeseries,
  topNftAPi,
} from "../../baseurl/baseurl";
import { Link } from "react-router-dom";
import axios from "axios";
import LineChart from "../AddedComponents/LineChart";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { convertMillion } from "../../functions/functions";

import dummyNftImage from "../../assests/AddedImages/nftPlaceholder.webp";
import { decryption, encryption } from "../../functions/crypto";
import { useDispatch, useSelector } from "react-redux";
import { tableAction } from "../../store/slices/TableData";
import { HashLink } from "react-router-hash-link";

const NftDataTable = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [nftTableData, setNftTableData] = useState([]);
  // const dispatch = useDispatch()
  const nftData = useSelector((state) => state.tableREducer.nftTableData);
  const isLoading = useSelector((state) => state.tableREducer.nftTableLoading);
  console.log("nftData iamsun", nftData);
  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#142028" highlightColor="#444">
          <p>
            <Skeleton count={10} height={50} />
          </p>
        </SkeletonTheme>
      ) : (
        nftData?.map((data, idx) => (
          <div
            className={`cursor-pointer h-full w-full pt-3 overflow-x-hidden  hover:bg-[#3a4956] hover:bg-opacity-60 hover:rounded-lg`}
            key={idx}
            style={{ borderBottom: "1px solid grey" }}
          >
            <HashLink
              to={
                data?.policy
                  ? `/charts?token=${data?.name}&unit=${data?.policy}&pairID=${data?.policy}&type=nft#chartTop`
                  : "#"
              }
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
                    src={
                      data?.image
                        ? getImageNft + `/${data?.image}`
                        : dummyNftImage
                    }
                    className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                    alt="unit"
                  />
                  <div className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs">
                    {data?.name}
                  </div>
                </div>
                {/* Price */}
                <div className="flex flex-col items-end justify-center xl:w-[7%] sm:w-[10%] w-[20%]">
                  <div className="flex text-white font-normal  sm:text-sm text-xs ">
                    {convertMillion(data?.price)}₳
                  </div>
                  <div className="font-normal text-xs text-[#939393] ">
                    {/* {data?.price.toFixed(4)}₳ */}
                  </div>
                </div>
                {/* 24hr */}
                <div
                  className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] w-[20%]`}
                >
                  {data?.price24hChg > 0 ? <SVG.GoUp /> : <SVG.GoDown />} &nbsp;
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
                {/* 7 days */}
                <div
                  className={`sm:flex sm:items-center hidden justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] `}
                >
                  {data?.price7dChg > 0 ? <SVG.GoUp /> : <SVG.GoDown />} &nbsp;
                  <p
                    className={
                      data?.price7dChg > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    {" "}
                    {(data?.price7dChg > 0
                      ? data?.price7dChg * 100
                      : data?.price7dChg * -100
                    )?.toFixed(2)}
                    %
                  </p>
                </div>
                {/* 30days */}
                <div
                  className={`sm:flex sm:items-center hidden justify-end cursor-pointer  transition-all duration-300 xl:w-[7%] w-[10%] `}
                >
                  {data?.price30dChg > 0 ? <SVG.GoUp /> : <SVG.GoDown />} &nbsp;
                  <p
                    className={
                      data?.price30dChg > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    {" "}
                    {(data?.price30dChg > 0
                      ? data?.price30dChg * 100
                      : data?.price30dChg * -100
                    )?.toFixed(2)}
                    %
                  </p>
                </div>
                {/* MarketCap */}
                <div
                  className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 `}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {convertMillion(data?.marketCap)}₳{" "}
                    </div>
                    <div className="text-[#939393] text-xs flex justify-center items-center ">
                      {convertMillion(data?.marketCap)} ₳{" "}
                    </div>
                  </div>
                </div>
                {/* Volume */}
                <div
                  id="volume"
                  className={`xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2 `}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {convertMillion(data?.volume24h)}₳{" "}
                    </div>
                    <SVG.Progress data={data?.percentagevolume24} />
                  </div>
                </div>
                {/* Liquid */}
                {/* <div
                                    className={`xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[12%] gap-2`}
                                >
                                    <div className="flex flex-col items-end">
                                        <div className="text-white font-normal flex justify-center items-center ">
                                        {((data?.listings / data?.supply) * 100)?.toFixed(2)}%
                                        </div>
                                        
                                    </div>
                                </div> */}
                <div
                  className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 `}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {((data?.listings / data?.supply) * 100)?.toFixed(2)}%
                    </div>
                    <div className="text-[#939393] text-xs flex justify-center items-center ">
                      {`${data?.listings} of ${data?.supply}`}
                    </div>
                  </div>
                </div>

                <div
                  className="xl:flex xl:items-
                                     hidden justify-end   gap-2 w-1/5"
                >
                  <div className="text-white font-normal flex justify-center items-center ">
                    <LineChart timeseries={data?.timeseries} homePage={false} />
                  </div>
                </div>
              </div>
            </HashLink>

            {/* <div className="w-full h-[1px] bg-[#232323]"></div> */}
          </div>
        ))
      )}
    </>
  );
};

export default NftDataTable;
