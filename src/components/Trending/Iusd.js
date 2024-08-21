import { useEffect, useState } from "react";
import { getImage, getImageNft, getNftImage } from "../../baseurl/baseurl";
import * as SVG from "../../common/Icons";
import nftPlaceholder from "../../assests/AddedImages/nftPlaceholder.webp";
import { Link } from "react-router-dom";
import { convertMillion } from "../../functions/functions";
import { useSelector } from "react-redux";

const Iusd = ({ trendingToken, trendingNfts, type, part }) => {
  const [data, setData] = useState([]);

  const { adaLive } = useSelector((state) => state.tableREducer);

  useEffect(() => {
    if (type === "nft" && part === "first") {
      setData(trendingNfts.slice(0, 3));
    } else if (type === "nft" && part === "second") {
      setData(trendingNfts.slice(3, 6));
    } else if (type === "token" && part === "first") {
      setData(trendingToken?.slice(0, 3));
    } else if (type === "token" && part === "second") {
      setData(trendingToken?.slice(3, 6));
    }
  }, [type, part, trendingToken, trendingNfts]);
  console.log("trendingNftsQ", trendingNfts);

  return (
    <>
      {data?.map((data, idx) => (
        <Link
          to={
            data?.unit || data?.policy
              ? `/charts?token=${data?.name}&unit=${
                  type === "token" ? data?.unit : data?.policy
                }&pairID=${data?.policy}&type=${type}`
              : "#"
          }
        >
          <div
            id="iusd"
            className={`flex items-center justify-between w-full cursor-pointer p-2 transition-all duration-300 transform hover:bg-[#3a4956] hover:bg-opacity-60 rounded-lg hover:rounded-lg`}
            key={data?.unit}
          >
            <div className="flex items-center">
              <p className="text-[#939393]">
                {part === "second" ? idx + 4 : idx + 1}
              </p>
              {type === "token" && data?.unit ? (
                <img
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                  src={
                    data?.name === "SNEK"
                      ? `${getImage}/image?unit=279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b`
                      : data?.unit
                      ? `${getImage}/image?unit=${data?.unit}`
                      : data?.imgSrc
                  }
                  className="ml-2 logo"
                  alt="riskWise"
                />
              ) : type === "nft" && data?.logo ? (
                <img
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                  src={
                    data?.image ? `${getImageNft}/${data?.image}` : data?.logo
                  }
                  className="ml-2 logo"
                  alt="riskWise"
                />
              ) : (
                <div
                  className="xl:w-10 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 ml-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#00008B" }}
                >
                  <span className="text-white font-medium">
                    {data?.name?.split("")[0]}
                  </span>
                </div>
              )}
              <div className="ml-2">
                <p className="text-white text-sm font-normal max-2xl:max-w-[80px] truncate">
                  {data?.name?.length > 18
                    ? data?.name.slice(0, 17) + "..."
                    : data?.name}
                </p>
                {type === "nft" ? (
                  <p className="text-[#939393] text-sm font-normal">
                    Floor: {data?.price} ₳
                  </p>
                ) : (
                  <p className="text-[#939393] text-sm font-normal">
                    {(
                      parseFloat(data?.price?.replace(/[$,]/g, "")) /
                      parseFloat(adaLive?.split(" ")[1])
                    )?.toFixed(5)}{" "}
                    ₳
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-end">
                {type === "nft" ? (
                  <p>
                    {data?.price24hChg > 0 ? <SVG.GoUp /> : <SVG.GoDown />}{" "}
                  </p>
                ) : (
                  <p>
                    {" "}
                    {parseFloat(data?.twofourhr?.split("%")[0]) > 0 ? (
                      <SVG.GoUp />
                    ) : (
                      <SVG.GoDown />
                    )}
                  </p>
                )}
                {type === "nft" ? (
                  <p
                    className={
                      data?.price24hChg > 0
                        ? `text-[#20eb7a] sm:text-sm text-xs`
                        : `text-[#ff422b] sm:text-sm text-xs`
                    }
                  >
                    &nbsp;{" "}
                    {(data?.price24hChg > 0
                      ? data?.price24hChg * 100
                      : data?.price24hChg * -100
                    )?.toFixed(2)}
                    %
                  </p>
                ) : (
                  <p
                    className={
                      parseFloat(data?.twofourhr?.split("%")[0]) > 0
                        ? `text-[#20eb7a] text-sm font-normal ml-1`
                        : `text-[#ff422b] text-sm font-normal ml-1`
                    }
                  >
                    {/* {data?.twofourHr}%</p> */}
                    {data?.twofourhr?.split(" ")[0] === "--"
                      ? "-0%"
                      : parseFloat(data?.twofourhr?.split("%")[0]) < 0
                      ? parseFloat(data?.twofourhr?.split("%")[0]) * -1 + "%"
                      : data?.twofourhr}
                  </p>
                )}
              </div>
              {type === "nft" ? (
                <p className="text-[#939393] text-sm font-normal">
                  {" "}
                  {convertMillion(data?.marketCap)} ₳
                </p>
              ) : (
                <p className="text-[#939393] text-sm font-normal">
                  {" "}
                  {convertMillion(
                    parseFloat(data?.mcap?.replace(/[$,]/g, "")) /
                      parseFloat(adaLive?.split(" ")[1])
                  )}{" "}
                  ₳
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
export default Iusd;
