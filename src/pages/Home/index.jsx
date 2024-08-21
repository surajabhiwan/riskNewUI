/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Home.css";
import { decryption, encryption } from "../../functions/crypto";
import axios from "axios";
import {
  getAdsHome,
  getAdsPortfolio,
  getNftImage,
  viewBannerImage,
  getImage,
  getNftTimeseries,
  topNftAPi,
  getImageNft,
} from "../../baseurl/baseurl";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as SVG from "../../common/Icons";

import { useDispatch } from "react-redux";

import { getTableDataForHome, tableAction } from "../../store/slices/TableData";
import { convertMillion } from "../../functions/functions";
import SwapDex from "../../components/AddedComponents/Swap";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  const [bannerData, setBannerData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [type, setActiveTab] = useState("token"); // State to track active tab
  const [typeBool, setTypeBool] = useState(true); // State to track active tab
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { adaLive } = useSelector((state) => state.tableREducer);
  const [data, setData] = useState([]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval); // Clean up the interval on component unmount
  }, [bannerData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const fetchAds = async () => {
    try {
      console.log("resultAds starting");
      const response = await axios.get(getAdsHome);
      console.log("resultAds", response);
      const result = decryption(response?.data);
      setBannerData(result?.searchedAds);
      console.log("banner data to shown", bannerData);
    } catch (e) {
      console.log("Error fetching ads:", e);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  console.log("banner data to shown", bannerData);

  const renderCardsForTab = () => {
    if (type === "token") {
      return (
        <div className="tokenAndNftInnerDiv">
          {data?.map((data) => {
            return (
              <>
                <Link
                  to={
                    data?.unit || data?.policy
                      ? `/charts?token=${data?.name}&unit=${
                          type === "token" ? data?.unit : data?.policy
                        }&pairID=${data?.policy}&type=${type}`
                      : "#"
                  }
                >
                  <div className="card">
                    <div className="cardInfo">
                      <div className="cardImg">
                        {type === "token" && data?.unit ? (
                          <img
                            width={100}
                            height={100}
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
                            width={100}
                            height={100}
                            style={{ borderRadius: "50%" }}
                            src={
                              data?.image
                                ? `${getImageNft}/${data?.image}`
                                : data?.logo
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
                      </div>
                      <div className="cardNameAndPriceDiv">
                        <div className="cardPrice">
                          <div className="ml-2">
                            <p className="text-white text-xl  font-normal max-2xl:max-w-[80px] truncate float-left">
                              {data?.name?.length > 18
                                ? data?.name.slice(0, 17) + "..."
                                : data?.name}
                            </p>
                            {type === "nft" ? (
                              <p className="text-[#FFFFFF] text-3xl font-normal ">
                                Floor: {data?.price} ₳
                              </p>
                            ) : (
                              <p className="text-[#FFFFFF] text-3xl font-normal ">
                                {(
                                  parseFloat(
                                    data?.price?.replace(/[$,]/g, "")
                                  ) / parseFloat(adaLive?.split(" ")[1])
                                )?.toFixed(5)}{" "}
                                ₳
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="cardSymbol"></div>
                    </div>
                    <div className="cardChart">
                      <div className="flex items-center justify-start">
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
                      <div className="flex items-center justify-end">
                        {type === "nft" ? (
                          <p>
                            {data?.price24hChg > 0 ? (
                              <SVG.GoUp />
                            ) : (
                              <SVG.GoDown />
                            )}{" "}
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
                              ? parseFloat(data?.twofourhr?.split("%")[0]) *
                                  -1 +
                                "%"
                              : data?.twofourhr}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
          <div className="card">
            <div className="viewDetailsDiv">
              <h4
                onClick={() => {
                  navigate("/viewAllAssets");
                }}
                style={{ cursor: "pointer" }}
              >
                View All Assets
              </h4>
            </div>
          </div>
        </div>
      );
    } else if (type === "nft") {
      return (
        <div className="tokenAndNftInnerDiv">
          {data?.map((data) => {
            return (
              <>
                <Link
                  to={
                    data?.unit || data?.policy
                      ? `/charts?token=${data?.name}&unit=${
                          type === "token" ? data?.unit : data?.policy
                        }&pairID=${data?.policy}&type=${type}`
                      : "#"
                  }
                >
                  <div className="card">
                    <div className="cardInfo">
                      <div className="cardImg">
                        {type === "token" && data?.unit ? (
                          <img
                            width={100}
                            height={100}
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
                            width={100}
                            height={100}
                            style={{ borderRadius: "50%" }}
                            src={
                              data?.image
                                ? `${getImageNft}/${data?.image}`
                                : data?.logo
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
                      </div>
                      <div className="cardNameAndPriceDiv">
                        <div className="cardName">{data?.name}</div>
                        <div className="cardPrice">
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
                                  parseFloat(
                                    data?.price?.replace(/[$,]/g, "")
                                  ) / parseFloat(adaLive?.split(" ")[1])
                                )?.toFixed(5)}{" "}
                                ₳
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="cardSymbol">
                        <div className="flex items-center justify-end">
                          {type === "nft" ? (
                            <p>
                              {data?.price24hChg > 0 ? (
                                <SVG.GoUp />
                              ) : (
                                <SVG.GoDown />
                              )}{" "}
                            </p>
                          ) : (
                            <p>
                              {" "}
                              {parseFloat(data?.twofourhr?.split("%")[0]) >
                              0 ? (
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
                                ? parseFloat(data?.twofourhr?.split("%")[0]) *
                                    -1 +
                                  "%"
                                : data?.twofourhr}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
          <div className="card">
            <div className="viewDetailsDiv">
              <h4
                onClick={() => {
                  navigate("/viewAllAssets");
                }}
                style={{ cursor: "pointer" }}
              >
                View All Assets
              </h4>
            </div>
          </div>
        </div>
      );
    }
  };

  const { nftTableData } = useSelector((state) => state.tableREducer);

  /*get tab status for home token/nft*/
  const tab = useSelector((state) => state.tableREducer.tokenScreen);
  const trendingNfts = useSelector((state) => state.tableREducer.trendingNftt);
  console.log("list of treding NFTs iamsun", trendingNfts);
  const tableDataForTrendingToken = useSelector(
    (state) => state.tableREducer.trendingToken
  );
  console.log("tableDataForTrendingToken new", tableDataForTrendingToken);
  // const isLoading = useSelector((state) => state.tableREducer.loading)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTableDataForHome());
    dispatch(tableAction.getTrendingNft(trendingNfts));
  }, []);

  const fetchTableDataNft = async () => {
    setIsLoading(true);
    try {
      // Check if data is available in local storage
      const cachedData = sessionStorage.getItem("cachedNftTableData");
      if (cachedData) {
        // setNftTableData(JSON.parse(cachedData));
        // dispatch(tableAction.setNftTableData(JSON.parse(cachedData)))
        dispatch(tableAction.getTrendingNft(JSON.parse(cachedData)));
      } else {
        // If not available in local storage, fetch from API
        const encryptedData = {
          key: encryption({ ranking: "marketCap", items: 7 }),
        };
        const response = await axios.post(topNftAPi, encryptedData);
        const result = decryption(response?.data);
        let nftData = result?.NFTTopRankers.filter(
          (nft) => nft.name !== "[Deprecated] Budz"
        );
        // let nftData = result?.NFTTopRankers;
        const maxVolume24 = Math.max(...nftData.map((item) => item?.volume24h));

        // Fetch time series and image for each NFT concurrently
        const nftsWithTimeSeriesAndImages = await Promise.all(
          nftData.map(async (nft) => {
            const data = { policyId: nft?.policy };
            const encData = {
              key: encryption(data),
            };
            const timeSeriesResponse = await axios.post(
              getNftTimeseries,
              encData
            );
            const res = decryption(timeSeriesResponse?.data);
            const timeseries = res?.timeseries;
            const encryptedData = encryption({ policyId: nft?.policy });
            const imageResponse = await axios.post(getNftImage, {
              key: encryptedData,
            });

            const result = decryption(imageResponse?.data);
            const image = result?.NFTMetaData?.image;

            const percentagevolume24 = (nft?.volume24h / maxVolume24) * 100;
            return { ...nft, timeseries, image, percentagevolume24 };
          })
        );

        // Set state with fetched data
        // setNftTableData(nftsWithTimeSeriesAndImages);
        // dispatch(tableAction.setNftTableData(nftsWithTimeSeriesAndImages))
        dispatch(tableAction.getTrendingNft(nftsWithTimeSeriesAndImages));
        // Cache the fetched data in local storage
        // sessionStorage.setItem('cachedNftTableData', JSON.stringify(nftsWithTimeSeriesAndImages));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  };

  // Function to fetch table data for NFTs
  const fetchTableDataNftt = async () => {
    dispatch(tableAction.setNftTableLOading(true));
    try {
      // Check if data is available in local storage
      const cachedData = sessionStorage.getItem("cachedNftTableData");
      if (cachedData) {
        // setNftTableData(JSON.parse(cachedData));
        dispatch(tableAction.setNftTableData(JSON.parse(cachedData)));
        dispatch(tableAction.getTrendingNft(JSON.parse(cachedData)));
      } else {
        // If not available in local storage, fetch from API
        const encryptedData = {
          key: encryption({ ranking: "marketCap", items: 51 }),
        };
        const response = await axios.post(topNftAPi, encryptedData);
        const result = decryption(response?.data);
        let nftData = result?.NFTTopRankers.filter(
          (nft) => nft.name !== "[Deprecated] Budz"
        );
        // let nftData = result?.NFTTopRankers;
        const maxVolume24 = Math.max(...nftData.map((item) => item?.volume24h));

        // Fetch time series and image for each NFT concurrently
        const nftsWithTimeSeriesAndImages = await Promise.all(
          nftData.map(async (nft) => {
            const data = { policyId: nft?.policy };
            const encData = {
              key: encryption(data),
            };
            const timeSeriesResponse = await axios.post(
              getNftTimeseries,
              encData
            );
            const res = decryption(timeSeriesResponse?.data);
            const timeseries = res?.timeseries;
            const encryptedData = encryption({ policyId: nft?.policy });
            const imageResponse = await axios.post(getNftImage, {
              key: encryptedData,
            });

            const result = decryption(imageResponse?.data);
            const image = result?.NFTMetaData?.image;

            const percentagevolume24 = (nft?.volume24h / maxVolume24) * 100;
            return { ...nft, timeseries, image, percentagevolume24 };
          })
        );

        // Set state with fetched data
        // setNftTableData(nftsWithTimeSeriesAndImages);
        dispatch(tableAction.setNftTableData(nftsWithTimeSeriesAndImages));
        dispatch(tableAction.getTrendingNft(nftsWithTimeSeriesAndImages));
        // Cache the fetched data in local storage
        sessionStorage.setItem(
          "cachedNftTableData",
          JSON.stringify(nftsWithTimeSeriesAndImages)
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
    dispatch(tableAction.setNftTableLOading(false));
  };
  useEffect(() => {
    fetchTableDataNftt();
    // nftTableLoading
  }, []);

  useEffect(() => {
    fetchTableDataNft();
  }, []);

  useEffect(() => {
    if (type === "nft") {
      setData(trendingNfts.slice(0, 8));
    } else if (type === "token") {
      setData(tableDataForTrendingToken?.slice(0, 8));
    }
  }, [type, tableDataForTrendingToken, trendingNfts]);

  return (
    <div>
      <div className="HeadingDiv">
        <h3>Welcome</h3>
        <h1 className="headingMain">Risk Wise Pro</h1>
        <a href="#swapId">
          <button className="headingSwapperBtn">Swapper</button>
        </a>
      </div>

      <div className="advertisingDiv">
        <div className="advertisingInnerDiv">
          {bannerData?.map((slide, index) => (
            <div
              key={index}
              className={`advertisingSlide ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <a href={slide?.url} target="_blank" rel="noreferrer">
                <div className="advertisingPhoto">
                  <img
                    src={viewBannerImage + `${slide?.mediaUrl}`}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </a>
              <div className="advertisingCaption">{slide?.title}</div>
              <div className="advertisingCaption2">{slide?.description}</div>
            </div>
          ))}
        </div>

        <div className="dotsDiv">
          {bannerData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="tokenAndNftOuterDiv">
        <div className="flex justify-left items-center bg-[#142028] rounded-xl  h-fit mt-2 my-2">
          <span
            onClick={() => {
              setActiveTab("token");
              setTypeBool(true);
            }}
            id="market"
            className={`flex items-center duration-300 cursor-pointer lg:px-4 px-2 lg:py-1 py-1  text-[#939393] lg:text-sm text-xs  lg:h-8 hover:text-[#fff] ${
              typeBool ? "text-white rounded-lg bg-[#3a4956]" : ""
            } `}
          >
            Tokens
          </span>
          <span
            onClick={() => {
              setActiveTab("nft");
              setTypeBool(false);
            }}
            id="pro"
            className={`flex items-center duration-300 cursor-pointer  lg:px-4 px-2 lg:py-1 py-1 text-[#939393]   lg:text-sm text-xs justify-center  hover:text-[#fff] ${
              !typeBool ? "text-white rounded-lg bg-[#3a4956]" : ""
            }`}
          >
            NFTs
          </span>
        </div>

        {renderCardsForTab()}
      </div>

      <div className="swapDeskDiv">
        <h1 className="swapHeading">Want to try Swapper ?</h1>
        <div className="swapBgdiv" id="swapId">
          <div className="swapBg">
            <img src="./swapBg.png" alt="" />
          </div>
          <div className="swapDeskDivInner">
            <SwapDex></SwapDex>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
