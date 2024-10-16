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

const NftDataTable = ({ data, heading }) => {
  console.log("heading for home table NFT ", heading);
  console.log("data for nft with heading", data);

  // const [isLoading, setIsLoading] = useState(false);
  // const [nftTableData, setNftTableData] = useState([]);
  // const dispatch = useDispatch()
  const nftData = useSelector((state) => state.tableREducer.nftTableData);
  const isLoading = useSelector((state) => state.tableREducer.nftTableLoading);
  console.log("nftData iamsun", nftData);
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
          <p>
            <Skeleton count={10} height={50} />
          </p>
        </SkeletonTheme>
      ) : (
        data?.map((data, idx) => (
          <div
            className={`w-full p-3 flex items-center border-b border-gray-600 hover:bg-gray-700 hover:rounded-lg cursor-pointer `}
            key={idx}
            style={{ borderBottom: "1px solid grey" }}
          >
            <HashLink
              to={
                data?.policy
                  ? `/charts?token=${data?.name}&unit=${data?.policy}&pairID=${data?.policy}&type=nft#chartTop`
                  : "#"
              }
              className="flex w-full"
            >
              <div className="flex items-center space-x-4 w-full justify-between ">
                <div className="text-white font-semibold text-sm flex items-center">
                  {idx + 1}
                </div>
                {/* <img
                  // src={
                  //   data?.image
                  //     ? getImageNft + `/${data?.image}`
                  //     : dummyNftImage
                  // }
                  src={data?.image}
                  className="w-8 h-8 rounded-full"
                  alt="unit"
                /> */}
                {!imageErrors.includes(idx) && data?.policy ? (
                  <img
                    // src={`${getImage}/image?unit=${item?.unit}&w=32`}
                    src={`${data?.image}`}
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
                      {data?.name?.[0]}
                    </span>
                  </div>
                )}
                <div className="text-white w-full font-normal flex justify-left items-center ml-4 sm:text-sm text-xs">
                  {data?.name}
                </div>
                {/* Price */}
                <div className="flex flex-col items-end justify-center  ">
                  <div className="flex text-white font-normal  sm:text-sm text-xs">
                    {convertMillion(data?.price)}₳
                  </div>
                </div>

                {/* MarketCap */}
                {heading === "TopRanking" && (
                  <div
                    className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  gap-2`}
                  >
                    <div className="flex flex-col items-end">
                      <div className="text-white font-normal flex justify-center items-center ">
                        {convertMillion(data?.marketCap)}₳{" "}
                      </div>
                    </div>
                  </div>
                )}
                {/* Volume */}
                {heading === "Volume" && (
                  <div
                    id="volume"
                    className={`xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2`}
                  >
                    <div className="flex flex-col items-end">
                      <div className="text-white font-normal flex justify-center items-center ">
                        {convertMillion(data?.volume)}₳{" "}
                      </div>
                      <SVG.Progress data={data?.percentagevolume24} />
                    </div>
                  </div>
                )}
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
