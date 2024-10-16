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








  return (
    <div className="">
      <div className="flex mt-3 px-2  w-full glowClassDiv  items-center ">
        <div className="flex items-center justify-between ">
          {/* <div className="flex w-3 h-3 items-center justify-center" >
            <SVG.WatchList />
          </div> */}
          <div
            className="text-white font-semibold flex justify-center items-center ml-4 sm:text-sm text-xs"
            style={{ marginRight: "5rem" }}
          >
            #
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div
            className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs"
            style={{ marginRight: "8rem" }}
          >
            Name
          </div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-end ">
          <div
            className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs"
            style={{ marginRight: "7rem" }}
          >
            {tab ? "Price" : "Floor Price"}{" "}
          </div>
        </div>
       

        {/* MarketCap */}
        {heading === "MarketCap" && (
          <div
            // onClick={() => {
            //   rotateMarketComponent();
            //   handleSortMarket(rotationMarket ? "asc" : "dsc");
            // }}
            id="marketCap"
            className={`xl:flex xl:items-center hidden justify-end transition-all duration-300  gap-2 hover:mt-[-8px]`}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              MarketCap{" "}
            </div>
            {/* <div className="text-white font-normal flex justify-center items-center" title={tab ? "Circulating supply * price " : "Current on-chain * current price"}><SVG.Alert /></div> */}
            {/* <div
              className={`text-white font-normal flex justify-center items-center ml-0 transition-all duration-300 ${
                rotationMarket ? " rotate-180" : ""
              }`}
            >
              <SVG.Arrow />{" "}
            </div> */}
          </div>
        )}

        {/* Volume */}
        {heading === "Volume" && (
          <div
            // onClick={() => {
            //   rotateVloumeComponent();
            //   handleSortVolume(rotationVolume ? "asc" : "dsc");
            // }}
            id="volume"
            className={`xl:flex xl:items-center hidden justify-end  transition-all duration-300  w-[12%] gap-2 hover:mt-[-8px]`}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              Volume{" "}
            </div>
            {/* <div
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
            </div> */}
          </div>
        )}

        {/* Liquid */}
        {heading === "Liquidy" && (
          <div
            // onClick={() => {
            //   rotateLiquidityComponent();
            //   handleSortLiquidity(rotationLiquidity ? "asc" : "dsc");
            // }}
            id="liquididy"
            className={`xl:flex xl:items-center hidden  justify-end  transition-all duration-300 w-[12%] gap-2 hover:mt-[-8px]  `}
          >
            <div className="text-white font-normal flex justify-center items-center ">
              {tab ? "Liquidity" : "%Items Listed"}{" "}
            </div>
            {/* <div
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
            </div> */}
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
