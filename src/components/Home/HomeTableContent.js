import * as SVG from "../../common/Icons";
import {
  candleStickApi,
  getImage,
  getNftTimeseries,
} from "../../baseurl/baseurl";
import { Link } from "react-router-dom";
import LineChart from "../AddedComponents/LineChart";
import { useDispatch, useSelector } from "react-redux";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { convertMillion } from "../../functions/functions";
import { decryption, encryption } from "../../functions/crypto";
import axios from "axios";
import { useEffect, useState } from "react";
import { tableAction } from "../../store/slices/TableData";
import Placeholder from "../AddedComponents/Loader/Placeholder";
import { HashLink } from "react-router-hash-link";

const HomeTableContent = (props) => {
  const { dataTokenTabs, adaLive } = useSelector((state) => state.tableREducer);

  const isLoading = useSelector((state) => state.tableREducer.loadingTokenTab);

  const dispatch = useDispatch();

  console.log("ADALIVE", adaLive?.split(" ")[1]);

  console.log("tokenTabData", dataTokenTabs);

  const [imageErrors, setImageErrors] = useState([]);

  const handleImageError = (index) => {
    setImageErrors((prevErrors) => [...prevErrors, index]);
  };

  //function to get random color
  function getRandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var color = "rgb(" + red + ", " + green + ", " + blue + ")";
    return color;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#142028" highlightColor="#444">
          <p>
            <Skeleton count={10} height={50} />
          </p>
        </SkeletonTheme>
      ) : (
        dataTokenTabs?.map((data, idx) => (
          <div
            className={`cursor-pointer h-full w-full pt-3 overflow-x-hidden  hover:bg-[#3a4956] hover:bg-opacity-60 hover:rounded-lg`}
            key={idx}
            style={{ borderBottom: "1px solid grey" }}
          >
            <HashLink
              to={
                data?.unit
                  ? `/charts?token=${data?.name}&unit=${
                      data?.unit
                        ? data?.unit
                        : "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958"
                    }&pairID=${data?.pairID}&type=token#chartTop`
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

                  {!imageErrors.includes(idx) && data?.unit ? (
                    <img
                      src={getImage + `/image?unit=${data?.unit}&w=32`}
                      className="token-logo xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                      alt="unit"
                      onError={() => handleImageError(idx)}
                    />
                  ) : (
                    <div
                      className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getRandomColor()}` }}
                    >
                      <span className="text-white font-medium">
                        {data?.name?.split("")[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="text-white font-normal flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                      {data?.name}
                    </div>

                    <div className="text-[#939393] text-xs flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full">
                      {data?.subname}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end justify-center xl:w-[7%] sm:w-[10%] w-[20%]">
                  <div className="flex text-white font-normal  sm:text-sm text-xs">
                    {/* {(parseFloat(data?.price.replace(/,/g, ''))) * parseFloat(adaLive?.split(' ')[1])} ₳ */}
                    {/* {data?.price} */}
                    {(
                      parseFloat(data?.price) /
                      parseFloat(adaLive?.split(" ")[1])
                    )?.toFixed(3)}
                    ₳
                  </div>
                  <div className="font-normal text-xs text-[#939393] ">
                    {"$" + parseFloat(data?.price).toFixed(3)}
                  </div>
                </div>
                {/* 24hr */}
                <div
                  className={`flex items-center  justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] w-[20%]`}
                >
                  {parseFloat(data?.fivem?.split("%")[0]) > 0 ? (
                    <SVG.GoUp />
                  ) : (
                    <SVG.GoDown />
                  )}{" "}
                  &nbsp;
                  <p
                    className={
                      parseFloat(data?.fivem?.split("%")[0]) > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    {parseFloat(data?.fivem?.split("%")[0]) > 0
                      ? data?.fivem
                      : parseFloat(data?.fivem?.split("%")[0]) * -1 + "%"}
                  </p>
                </div>

                {/* 7 days */}
                <div
                  className={`sm:flex sm:items-center hidden justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] `}
                >
                  {parseFloat(data?.onehr?.split("%")[0]) > 0 ? (
                    <SVG.GoUp />
                  ) : (
                    <SVG.GoDown />
                  )}{" "}
                  &nbsp;
                  <p
                    className={
                      parseFloat(data?.onehr?.split("%")[0]) > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    {parseFloat(data?.onehr?.split("%")[0]) > 0
                      ? data?.onehr
                      : parseFloat(data?.onehr?.split("%")[0]) * -1 + "%"}
                  </p>
                </div>
                {/* 30days */}
                <div
                  className={`sm:flex sm:items-center hidden justify-end cursor-pointer  transition-all duration-300 xl:w-[7%] w-[10%] `}
                >
                  {parseFloat(data?.twofourhr?.split("%")[0]) > 0 ? (
                    <SVG.GoUp />
                  ) : (
                    <SVG.GoDown />
                  )}{" "}
                  &nbsp;
                  <p
                    className={
                      parseFloat(data?.twofourhr?.split("%")[0]) > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    {parseFloat(data?.twofourhr?.split("%")[0]) > 0
                      ? data?.twofourhr
                      : parseFloat(data?.twofourhr?.split("%")[0]) * -1 + "%"}
                  </p>
                </div>
                {/* MarketCap */}
                <div
                  className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 `}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {/* {convertMillion(parseFloat(data?.mcap?.replace(/[$,]/g, '')) / parseFloat(adaLive?.split(' ')[1]))} ₳ */}
                      {convertMillion(
                        parseFloat(data?.mcap) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <div className="text-[#939393] text-xs flex justify-center items-center ">
                      {"$" + parseFloat(data?.mcap).toFixed(3)}
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
                      {/* {convertMillion(parseFloat(data?.volume?.replace(/[$,]/g, '')) / parseFloat(adaLive?.split(' ')[1]))} ₳ */}
                      {console.log("Volume ", data?.volume)}
                      {convertMillion(
                        parseFloat(data?.volume) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <SVG.Progress data={data?.percentagevolumeADA} />
                  </div>
                </div>
                {/* Liquid */}
                <div
                  className={`xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[12%] gap-2`}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {/* {convertMillion(parseFloat(data?.liquidity?.replace(/[$,]/g, '')) / parseFloat(adaLive?.split(' ')[1]))} ₳ */}
                      {convertMillion(
                        parseFloat(data?.liquidity) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <SVG.Progress data={data?.percentagetotalLiquidityADA} />
                  </div>
                </div>

                <div
                  className="xl:flex xl:items-
                                     hidden justify-end   gap-2 w-1/5"
                >
                  <div className="text-white font-normal flex justify-center items-center ">
                    <LineChart timeseries={data?.timeseries} homePage={true} />
                  </div>
                </div>
              </div>
            </HashLink>
          </div>
        ))
      )}
    </>
  );
};
export default HomeTableContent;
