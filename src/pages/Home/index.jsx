/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  useState,
} from "react";
import { debounce } from "lodash";
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
  topTenNfts,
  topTenTokens,
} from "../../baseurl/baseurl";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as SVG from "../../common/Icons";

import { useDispatch } from "react-redux";

import { getTableDataForHome, tableAction } from "../../store/slices/TableData";
import { convertMillion } from "../../functions/functions";
import { CHARTS } from "../../routes/routes";
// import SwapDex from "../../components/AddedComponents/Swap";
// import Footer from "../../components/Footer/Footer";
// Lazy load components
const SwapDex = React.lazy(() =>
  import("../../components/AddedComponents/Swap")
);

const Footer = React.lazy(() => import("../../components/Footer/Footer"));

const Home = () => {
  const [bannerData, setBannerData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [type, setActiveTab] = useState("nft"); // State to track active tab
  const [typeBool, setTypeBool] = useState(true); // State to track active tab
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tokensTenData, setTenTokenData] = useState(false);
  const [nftTenData, setTenNftData] = useState(false);
  console.log("tokensTenData 10", tokensTenData?.topMarketCap?.data);
  console.log("nftTenData 10", nftTenData?.topMarketCap?.data);
  console.log("type", type);

  const { adaLive } = useSelector((state) => state.tableREducer);
  const [data, setData] = useState([]);
  console.log("data received for isLoading", isLoading);

  // Slide interval for banner
  useEffect(() => {
    if (bannerData.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(slideInterval); // Clean up the interval on component unmount
    }
  }, [bannerData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchAds = useCallback(async () => {
    try {
      console.log("Fetching ads...");
      const response = await axios.get(getAdsHome);
      const result = decryption(response?.data);

      // Update bannerData only if it's different
      if (JSON.stringify(result?.searchedAds) !== JSON.stringify(bannerData)) {
        setBannerData(result?.searchedAds || []);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }, [bannerData]);

  // Only fetch ads once when the component mounts
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);
  function formatPriceWithCustomSubscript(value) {
    // Convert exponent digits to subscript
    const toSubscript = (num) =>
      num.toString().replace(/\d/g, (digit) => "₀₁₂₃₄₅₆₇₈₉"[digit]);

    if (value < 0.001) {
      // Scale value up to avoid e notation
      const scaledValue = (value * 1_000_000).toFixed(6).toString();

      // Get the significant part of the scaled value
      const significantPart = scaledValue.split(".")[1]; // Get digits after the decimal point
      const trimmedSignificant = significantPart.replace(/^0+/, ""); // Remove leading zeros

      // Format as 0.0₆ + significant part, taking only the first three digits of trimmed significant
      return `0.0${toSubscript(6)}${trimmedSignificant.slice(0, 3)} ₳`;
    } else {
      return value.toFixed(3) + "₳"; // Regular values with 3 decimal places
    }
  }
  // const RenderCardsForTab = () => {
  //   console.log("renderCardsFor tab running");
  //   if (!data || data.length === 0) {
  //     return <div>No Data Available</div>; // You can show a message or a skeleton loader
  //   }
  //   return (
  //     <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
  //       {data?.map((data, index) => {
  //         return (
  //           <div key={index}>
  //             <Link
  //               to={
  //                 data?.unit || data?.policy
  //                   ? `/charts?token=${
  //                       type === "nft" ? data?.name : data?.ticker
  //                     }&unit=${
  //                       type === "nft" ? data?.policy : data?.unit
  //                     }&pairID=${data?.policy}&type=${type}`
  //                   : "#"
  //               }
  //               key={index}
  //             >
  //               <div className="card">
  //                 <div className="cardInfo">
  //                   <div className="cardImg">
  //                     {type === "token" && data?.unit ? (
  //                       // <img
  //                       //   style={{ borderRadius: "50%" }}
  //                       //   src={data?.image}
  //                       //   className="ml-2 logo"
  //                       //   alt="riskWise"
  //                       // />
  //                       data?.unit ? (
  //                         <img
  //                           style={{ borderRadius: "50%" }}
  //                           src={data?.image}
  //                           className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px] logo"
  //                           alt="riskWise"
  //                         />
  //                       ) : (
  //                         <div
  //                           className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px]"
  //                           style={{
  //                             width: "40px",
  //                             height: "40px",
  //                             borderRadius: "50%",
  //                             backgroundColor: "#00008B",
  //                             display: "flex",
  //                             alignItems: "center",
  //                             justifyContent: "center",
  //                           }}
  //                         >
  //                           <span className="text-white font-medium">
  //                             {data?.ticker?.split("")[0]}
  //                           </span>
  //                         </div>
  //                       )
  //                     ) : type === "nft" && data?.image ? (
  //                       <img
  //                         style={{ borderRadius: "50%" }}
  //                         src={data?.image}
  //                         className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px] logo"
  //                         alt="riskWise"
  //                       />
  //                     ) : (
  //                       <div
  //                         className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px]"
  //                         style={{
  //                           width: "40px",
  //                           height: "40px",
  //                           borderRadius: "50%",
  //                           backgroundColor: "#00008B",
  //                           display: "flex",
  //                           alignItems: "center",
  //                           justifyContent: "center",
  //                         }}
  //                       >
  //                         <span className="text-white font-medium">
  //                           {data?.name?.split("")[0]}
  //                         </span>
  //                       </div>
  //                     )}
  //                   </div>
  //                   <div className="cardNameAndPriceDiv">
  //                     <div className="cardPrice">
  //                       <div className="ml-2">
  //                         {/* <p className="text-white text-xl  font-normal max-2xl:max-w-[80px] truncate float-left">
  //                           {data?.name?.length > 18
  //                             ? data?.name.slice(0, 17) + "..."
  //                             : data?.name}
  //                         </p> */}
  //                         {type === "nft" ? (
  //                           <p className="text-white lg:text-xl  font-normal max-2xl:max-w-[80px] truncate float-left ">
  //                             {data?.name?.length > 18
  //                               ? data?.name.slice(0, 17) + "..."
  //                               : data?.name}
  //                           </p>
  //                         ) : (
  //                           <p className="text-white lg:text-xl  font-normal max-2xl:max-w-[80px] truncate float-left ">
  //                             {data?.ticker?.length > 18
  //                               ? data?.ticker.slice(0, 17) + "..."
  //                               : data?.ticker}
  //                           </p>
  //                         )}
  //                         {type === "nft" ? (
  //                           <p className="text-[#FFFFFF] lg:text-3xl font-normal ">
  //                             {data?.price} ₳
  //                           </p>
  //                         ) : (
  //                           <p className="text-[#FFFFFF] lg:text-3xl font-normal ">
  //                             {/* {(
  //                               parseFloat(data?.price) /
  //                               parseFloat(adaLive?.split(" ")[1])
  //                             )?.toFixed(5)} */}
  //                             {formatPriceWithCustomSubscript(
  //                               parseFloat(data?.price)
  //                             )}

  //                             {/* {(
  //                               parseFloat(data?.price?.replace(/[$,]/g, "")) /
  //                               parseFloat(adaLive?.split(" ")[1])
  //                             )?.toFixed(5)}{" "} */}
  //                           </p>
  //                         )}
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div className="cardSymbol"></div>
  //                 </div>
  //                 <div className="cardChart">
  //                   <div className="flex items-center justify-start">
  //                     {type === "nft" ? (
  //                       <p className="text-[#939393] text-sm font-normal">
  //                         {/* {" "}
  //                         {convertMillion(
  //                           parseFloat(
  //                             String(data?.volume)?.replace(/[$,]/g, "")
  //                           ) / parseFloat(adaLive?.split(" ")[1])
  //                         )}{" "} */}
  //                         {data?.volume}₳
  //                       </p>
  //                     ) : (
  //                       <p className="text-[#939393] text-sm font-normal">
  //                         {" "}
  //                         {/* {convertMillion(
  //                           parseFloat(
  //                             String(data?.mcap)?.replace(/[$,]/g, "")
  //                           ) / parseFloat(adaLive?.split(" ")[1])
  //                         )} */}
  //                         {data?.mcap?.toFixed(2)}₳
  //                       </p>
  //                     )}
  //                   </div>
  //                   {/* <div className="flex items-center justify-end">
  //                     {type === "nft" ? (
  //                       <p>
  //                         {data?.price24hChg > 0 ? (
  //                           <SVG.GoUp />
  //                         ) : (
  //                           <SVG.GoDown />
  //                         )}{" "}
  //                       </p>
  //                     ) : (
  //                       <p>
  //                         {" "}
  //                         {parseFloat(data?.twofourhr?.split("%")[0]) > 0 ? (
  //                           <SVG.GoUp />
  //                         ) : (
  //                           <SVG.GoDown />
  //                         )}
  //                       </p>
  //                     )}
  //                     {type === "nft" ? (
  //                       <p
  //                         className={
  //                           data?.price24hChg > 0
  //                             ? `text-[#20eb7a] sm:text-sm text-xs`
  //                             : `text-[#ff422b] sm:text-sm text-xs`
  //                         }
  //                       >
  //                         &nbsp;{" "}
  //                         {(data?.price24hChg > 0
  //                           ? data?.price24hChg * 100
  //                           : data?.price24hChg * -100
  //                         )?.toFixed(2)}
  //                         %
  //                       </p>
  //                     ) : (
  //                       <p
  //                         className={
  //                           parseFloat(data?.twofourhr?.split("%")[0]) > 0
  //                             ? `text-[#20eb7a] text-sm font-normal ml-1`
  //                             : `text-[#ff422b] text-sm font-normal ml-1`
  //                         }
  //                       >
  //                         {data?.twofourhr?.split(" ")[0] === "--"
  //                           ? "-0%"
  //                           : parseFloat(data?.twofourhr?.split("%")[0]) < 0
  //                           ? parseFloat(data?.twofourhr?.split("%")[0]) * -1 +
  //                             "%"
  //                           : data?.twofourhr}
  //                       </p>
  //                     )}
  //                   </div> */}
  //                 </div>
  //               </div>
  //             </Link>
  //           </div>
  //         );
  //       })}
  //       <div className="card p-4 flex justify-center items-center">
  //         <div className="p-2 border rounded-full">
  //           <h2
  //             onClick={() => {
  //               navigate("/viewAllAssets");
  //             }}
  //             style={{ cursor: "pointer" }}
  //           >
  //             View All Assets
  //           </h2>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  const RenderCardsForTab = () => {
    console.log("renderCardsFor tab running");

    if (!data || data.length === 0) {
      return <div style={{color:"white", fontSize:"2rem"}}>No Data Available</div>; 
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data?.map((data, index) => {
          return (
            <div key={index}>
              <Link
                to={
                  data?.unit || data?.policy
                    ? `/charts?token=${
                        type === "nft" ? data?.name : data?.ticker
                      }&unit=${
                        type === "nft" ? data?.policy : data?.unit
                      }&pairID=${data?.policy}&type=${type}`
                    : "#"
                }
                key={index}
              >
                <div className="card">
                  <div className="cardInfo">
                    <div className="cardImg">
                      {type === "token" && data?.unit ? (
                        <>
                          <img
                            style={{ borderRadius: "50%" }}
                            src={data?.image}
                            className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px] logo"
                            alt="riskWise"
                            onError={(e) => {
                              e.target.style.display = "none"; // Hide the broken image
                              e.target.nextSibling.style.display = "flex"; // Show the fallback div
                            }}
                          />
                          <div
                            className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px]"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#00008B",
                              display: "none", // Initially hidden
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span className="text-white font-medium">
                              {data?.ticker?.split("")[0] ||
                                data?.name?.split("")[0]}
                            </span>
                          </div>
                        </>
                      ) : type === "nft" && data?.image ? (
                        <>
                          <img
                            style={{ borderRadius: "50%" }}
                            src={data?.image}
                            className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px] logo"
                            alt="riskWise"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                          <div
                            className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px]"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#00008B",
                              display: "none",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span className="text-white font-medium">
                              {data?.name?.split("")[0]}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div
                          className="ml-2 w-10 h-10 md:w-[100px] md:h-[100px]"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#00008B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span className="text-white font-medium">
                            {data?.ticker?.split("")[0] ||
                              data?.name?.split("")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="cardNameAndPriceDiv">
                      <div className="cardPrice">
                        <div className="ml-2">
                          {type === "nft" ? (
                            <p className="text-white lg:text-xl font-normal max-2xl:max-w-[80px] truncate float-left">
                              {data?.name?.length > 18
                                ? data?.name.slice(0, 17) + "..."
                                : data?.name}
                            </p>
                          ) : (
                            <p className="text-white lg:text-xl font-normal max-2xl:max-w-[80px] truncate float-left">
                              {data?.ticker?.length > 18
                                ? data?.ticker.slice(0, 17) + "..."
                                : data?.ticker}
                            </p>
                          )}
                          {type === "nft" ? (
                            <p className="text-[#FFFFFF] lg:text-3xl font-normal ">
                              {data?.price} ₳
                            </p>
                          ) : (
                            <p className="text-[#FFFFFF] lg:text-3xl font-normal ">
                              {formatPriceWithCustomSubscript(
                                parseFloat(data?.price)
                              )}
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
                          {data?.volume}₳
                        </p>
                      ) : (
                        <p className="text-[#939393] text-sm font-normal">
                          {data?.mcap?.toFixed(2)}₳
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        <div className="card p-4 flex justify-center items-center">
          <div className="p-2 border rounded-full">
            <h2
              onClick={() => {
                navigate("/viewAllAssets");
              }}
              style={{ cursor: "pointer" }}
            >
              View All Assets
            </h2>
          </div>
        </div>
      </div>
    );
  };

  const { nftTableData } = useSelector((state) => state.tableREducer);

  /*get tab status for home token/nft*/

  const trendingNfts = useSelector((state) => state.tableREducer.trendingNftt);

  // const isLoading = useSelector((state) => state.tableREducer.loading)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTableDataForHome());
    dispatch(tableAction.getTrendingNft(trendingNfts));
  }, []);

  // Memoized banner slides
  const MemoizedBannerSlides = React.memo(() => (
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
                loading="lazy"
              />
            </div>
          </a>
          <div className="advertisingCaption">{slide?.title}</div>
          <div className="advertisingCaption2">{slide?.description}</div>
        </div>
      ))}
    </div>
  ));
  const fetchTopTenTokens = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading to true before the request
      console.log("Fetching top 10 tokens...");
      const response = await axios.get(topTenTokens);
      console.log("Response for Fetching top 10 tokens:", response);
      const result = decryption(response?.data);
      console.log("Decrypted Fetching top 10 tokens", result);
      setTenTokenData((prev) => ({ ...prev, topMarketCap: result }));
    } catch (error) {
      console.error("Error fetching tokens with top market cap:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  });

  const fetchTopTenNFts = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading to true before the request
      console.log("Fetching top 10 NFTs...");
      const response = await axios.get(topTenNfts);
      const result = decryption(response?.data);
      console.log("", result);
      setTenNftData((prev) => ({ ...prev, topMarketCap: result }));
    } catch (error) {
      console.error("Error fetching NFTs with top market cap:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  });

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching top ten tokens and NFTs");

      await fetchTopTenTokens();
      await fetchTopTenNFts();

      setIsDataFetched(true);
    };

    fetchData();
  }, [type, navigate]);

  useEffect(() => {
    if (isDataFetched) {
      console.log("Final data setting useEffect triggered");

      if (type === "nft") {
        console.log("Final updation for nft calling", type);
        setData(nftTenData?.topMarketCap?.data?.slice(0, 8));
      } else if (type === "token") {
        console.log("Final updation for token calling", type);
        setData(tokensTenData?.topMarketCap?.data?.slice(0, 8));
      }
    }
  }, [isDataFetched, type, navigate]);

  const swapperHandler = (path) => {
    navigate(path);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="HeadingDiv">
          <h3>Welcome</h3>
          <h1 className="text-6xl text-center lg:text-8xl font-extrabold text-yellow-400 tracking-wide my-2">
            RiskWise Pro
          </h1>
          <button
            className="headingSwapperBtn"
            onClick={() => {
              swapperHandler("/charts"); // Pass the path string here instead of the event
            }}
          >
            Swap Token
          </button>
        </div>

        {/* <div className="advertisingDiv">
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
      </div> */}
        {/* Advertising Banner Section */}
        <div className="advertisingDiv">
          <h2 style={{ color: "white" }}>Advertisements</h2>
          <MemoizedBannerSlides />
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
                setActiveTab("nft");
                setTypeBool(true);
              }}
              id="pro"
              className={`flex items-center duration-300 cursor-pointer  lg:px-4 px-2 lg:py-1 py-1 text-[#939393]   lg:text-sm text-xs justify-center  hover:text-[#fff] ${
                typeBool ? "text-white rounded-lg bg-[#3a4956]" : ""
              }`}
            >
              NFTs
            </span>
            <span
              onClick={() => {
                setActiveTab("token");
                setTypeBool(false);
              }}
              id="market"
              className={`flex items-center duration-300 cursor-pointer lg:px-4 px-2 lg:py-1 py-1  text-[#939393] lg:text-sm text-xs  lg:h-8 hover:text-[#fff] ${
                !typeBool ? "text-white rounded-lg bg-[#3a4956]" : ""
              } `}
            >
              Tokens
            </span>
          </div>
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <RenderCardsForTab></RenderCardsForTab>
          )}
        </div>

        <div className="h-auto flex flex-col gap-y-10 items-center p-4">
          <h1 className="text-2xl text-center lg:text-5xl w-full  md:w-1/2 text-white font-extrabold">
            Swap for $RISK – Powering the Core of the Risk Ecosystem!
          </h1>
          <div className="swapDecBg h-[22rem] md:h-auto" id="swapId">
            <SwapDex></SwapDex>
          </div>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
