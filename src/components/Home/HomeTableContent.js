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

const HomeTableContent = ({ data }) => {
  const { dataTokenTabs, adaLive } = useSelector((state) => state.tableREducer);
  const isLoading = useSelector((state) => state.tableREducer.loadingTokenTab);
  const dispatch = useDispatch();

  const [imageErrors, setImageErrors] = useState([]);

  const handleImageError = (index) => {
    setImageErrors((prevErrors) => [...prevErrors, index]);
  };

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#142028" highlightColor="#444">
          <Skeleton count={10} height={50} />
        </SkeletonTheme>
      ) : (
        data?.map((item, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center border-b border-gray-600 hover:bg-gray-700 hover:rounded-lg cursor-pointer "
          >
            <HashLink
              to={
                item?.unit
                  ? `/charts?token=${item?.name}&unit=${
                      item?.unit || "default-unit"
                    }&pairID=${item?.pairID}&type=token#chartTop`
                  : "#"
              }
              className="flex w-full"
            >
              <div className="flex items-center space-x-4 w-full justify-between">
                <div className="text-white font-semibold text-sm flex items-center">
                  {idx + 1}
                </div>
                <div className="flex items-center justify-center gap-3">
                  {!imageErrors.includes(idx) && item?.unit ? (
                    <img
                      src={`${getImage}/image?unit=${item?.unit}&w=32`}
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
                  <span className="text-white text-sm truncate">
                    {item?.ticker}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs truncate">
                    {item?.subname}
                  </span>
                </div>
                <div className="ml-auto text-right flex flex-col">
                  <span className="text-white text-sm">
                    {(
                      parseFloat(item?.price) /
                      parseFloat(adaLive?.split(" ")[1])
                    ).toFixed(3)}{" "}
                    ₳
                  </span>
                  <span className="text-gray-400 text-xs">
                    {"$" + parseFloat(item?.price).toFixed(3)}
                  </span>
                </div>
                <div
                  className={
                    "xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 "
                  }
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-sm flex justify-center items-center ">
                      {convertMillion(
                        parseFloat(item?.mcap) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <div className="text-[#939393] text-xs flex justify-center items-center ">
                      {"$" + parseFloat(item?.mcap).toFixed(3)}
                    </div>
                  </div>
                </div>
                {/* {/ Volume /} */}
                {/* <div
                  id="volume"
                  className={xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2 }
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {console.log("Volume ", data?.volume)}
                      {convertMillion(
                        parseFloat(data?.volume) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <SVG.Progress data={data?.percentagevolumeADA} />
                  </div>
                </div> */}
                {/* {/ Liquid /} */}
                {/* <div
                  className={xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[12%] gap-2}
                >
                  <div className="flex flex-col items-end">
                    <div className="text-white font-normal flex justify-center items-center ">
                      {convertMillion(
                        parseFloat(data?.liquidity) /
                          parseFloat(adaLive?.split(" ")[1])
                      )}{" "}
                      ₳
                    </div>
                    <SVG.Progress data={data?.percentagetotalLiquidityADA} />
                  </div>
                </div> */}

                {/* <div className="ml-auto flex flex-col items-end">
                  <LineChart timeseries={item?.timeseries} homePage={true} />
                </div> */}
              </div>
            </HashLink>
          </div>
        ))
      )}
    </>
  );
};

export default HomeTableContent;
