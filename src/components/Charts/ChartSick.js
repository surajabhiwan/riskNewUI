/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import * as IMG from "../../common/IMG/Images";
import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMedia from "../../common/mediaQuery";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getImage,
  getImageNft,
  topMarketCapTokens,
  topTenTokens,
  topVolumeCollection,
} from "../../baseurl/baseurl";
import { decryption, encryption } from "../../functions/crypto";
import axios from "axios";

const ChartSlick = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("0.236€");
  const [percentFirst, setPercentFirst] = useState("+8.71%");
  const [wid, setWid] = useState(12);
  const slick = document.getElementById("slick");
  const [isActive, setIsActive] = useState(true);
  const [tokensData, setTokenData] = useState();
  const [nftTenData, setTenNftData] = useState(false);
  // const [isVerticalActive, setIsVerticalActive] = useState(true);
  console.log("tokens data to show on top", tokensData);
  const useMediaQuery = useMedia();
  const { useIsLarge, useIsMedium, use3XlLarge, useXlLarge, use2XlLarge } =
    useMediaQuery;
  const [pro, setPro] = useState(10);
  const [nftsData, setNftData] = useState();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    {
      use3XlLarge
        ? setPro(19)
        : use2XlLarge
        ? setPro(14)
        : useXlLarge
        ? setPro(12)
        : useIsLarge
        ? setPro(11)
        : useIsMedium
        ? setPro(8)
        : setPro(3);
    }
  }, [useIsLarge, useIsMedium, use3XlLarge, useXlLarge, use2XlLarge]);

  if (slick) {
    slick.addEventListener("mouseenter", () => {
      setIsActive(true);
    });
    slick.addEventListener("mouseleave", () => {
      setIsActive(false);
    });
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: pro,
    vertical: false,
    slidesToScroll: 1,
    autoplay: { isActive },
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
  };

  const settings1 = {
    dots: false,
    infinite: true,
    slidesToShow: 10,
    vertical: false,
    slidesToScroll: 1,
    autoplay: { isActive },
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
  };

  const [data, setData] = useState([]);

  const dataTable = useSelector((state) => state.tableREducer.data);
  const nftData = useSelector((state) => state.tableREducer.nftTableData);

  const localData = JSON.parse(sessionStorage.getItem("tokenModalData"));
  const localDataNft = JSON.parse(sessionStorage.getItem("cachedNftTableData"));
  // useEffect(() => {
  //   if (!type || type === "token") {
  //     if (localData) {
  //       setData(localData);
  //     } else {
  //       setData(dataTable);
  //     }
  //   } else if (type === "nft") {
  //     if (localDataNft) {
  //       setData(localDataNft);
  //     } else {
  //       setData(nftData);
  //     }
  //   }
  // }, []);

  // }, [dataTable, localData]);
  // console.log('slick', dataTable)

  const fetchTopMarketCapTokens = async () => {
    const data = { type: "mcap", page: 1, perPage: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      console.log("Fetching top market cap tokens...");
      const response = await axios.post(topMarketCapTokens, encryptedData);
      console.log("Response for top market cap tokens:", response);
      const result = decryption(response?.data);
      console.log("Decrypted data for top market cap tokens: from slick", result);
      setTokenData((prev) => ({ ...prev, topMarketCap: result.data }));
    } catch (error) {
      console.error("Error fetching tokens with top market cap: ", error);
    }
  };
  const fetchTopNFTVolume = async () => {
    // setIsLoading(true); // Start loading
    const data = { timeframe: "24h", page: 1, perPage: 20 };
    const encryptedData = { key: encryption(data) };

    try {
      const response = await axios.post(topVolumeCollection, encryptedData);
      const result = decryption(response?.data);
      console.log("Decrypted data for fetchTopNFTVolume: from slick", result);

      setNftData((prev) => ({ ...prev, topVolume: result }));
    } catch (error) {
      console.error(
        "Error fetching top NFT collections by trading volume:",
        error
      );
    } finally {
      // setIsLoading(false); // Stop loading after data is fetched
    }
  };
  // const fetchTopTenNFts = async () => {
  //   try {
  //     console.log("Fetching top 10 Nfts...");
  //     const response = await axios.get(topTenNfts);
  //     console.log("Response for Fetching top 10 Nfts:", response);
  //     const result = decryption(response?.data);
  //     console.log("Decrypted Fetching top 10 Nfts", result);
  //     setTenNftData((prev) => ({ ...prev, topMarketCap: result }));
  //   } catch (error) {
  //     console.error("Error fetching Nfts with top market cap:", error);
  //   }
  // };
  // useEffect(() => {
  //   // fetchTableDataNftt();
  //   fetchTopTenTokens();
  //   // nftTableLoading
  // }, [type, navigate]);

  useEffect(() => {
    fetchTopMarketCapTokens();
    fetchTopNFTVolume();
  }, [navigate]);
  console.log("nft data", nftsData?.topVolume?.data);
  console.log("tokens data", tokensData?.topMarketCap);
  return (
    <>
      <div className="rounded-sm pt-4 2xl:w-[100%] lg:w-[100%] ">
        {/* Slick */}
        <div id="slick" className="cursor-pointer">
          {type === "nft" ? (
            <Slider {...settings} className="h-[30%]">
              {nftsData?.topVolume?.data?.map((item, index) => {
                return (
                  <Link
                    to={
                      item?.policy
                        ? `/charts?token=${item?.name}&unit=${item?.policy}&pairID=${item?.policy}&type=nft`
                        : "#"
                    }
                  >
                    <div key={index} className="flex py-4 ">
                      <div className="flex flex-col">
                        <div className="flex items-top justify-start w-full">
                          <p className="text-[#7b7b7b] text-sm ">
                            #{index + 1}
                          </p>
                        </div>
                        <div className="flex w-32 justify-around text-white">
                          <div className="flex items-center justify-center w-full">
                            {/* {item?.image ? (
                              <img
                                width={40}
                                height={40}
                                style={{ borderRadius: "50%" }}
                                src={getImageNft + `/${item?.image}`}
                                className="ml-2 logo"
                                alt="unit"
                              />
                            ) : (
                              <div
                                className="xl:w-10 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 ml-3 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#00008B" }}
                              >
                                <span className="text-white font-medium">
                                  {item?.name?.split("")[0]}
                                </span>
                              </div>
                            )} */}
                            {type === "nft" && item?.policy ? (
                              <img
                                style={{ borderRadius: "50%" }}
                                src={item?.image}
                                className="ml-2 w-10 h-10 md:w-[50px] md:h-[50px] logo"
                                alt="riskWise"
                              />
                            ) : (
                              <div
                                className="ml-2 w-10 h-10 md:w-[50px] md:h-[50px]"
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
                                  {item?.name?.split("")[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="2xl:flex items-center justify-around  w-full">
                            <div className="flex flex-col justify-center items-start text-[10px] ml-2">
                              <p className="text-[12px]" title={item?.name}>
                                {" "}
                                {item?.name?.slice(0, 5)}..
                              </p>
                              <div className="flex items-center">
                                {/* {parseInt(item?.twofourhr?.split("%")[0]) >
                                0 ? (
                                  <SVG.GoUp />
                                ) : (
                                  <SVG.GoDown />
                                )}{" "} */}
                                &nbsp;
                                <p
                                  className={
                                    parseInt(item?.price) > 0
                                      ? "text-[#20eb7a] text-[12px]"
                                      : "text-[#ff422b] text-[12px]"
                                  }
                                >
                                  {item?.price?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          ) : (
            <Slider {...settings} className="h-[30%]">
              {tokensData?.topMarketCap?.map((item, index) => {
                return (
                  <Link
                    to={
                      item?.unit
                        ? `/charts?token=${item?.ticker}&unit=${
                            item?.unit
                              ? item?.unit
                              : "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958"
                          }&pairID=${item?.pairID}&type=token`
                        : "#"
                    }
                  >
                    <div key={index} className="flex py-4 ">
                      <div className="flex flex-col">
                        <div className="flex items-top justify-start w-full">
                          <p className="text-[#7b7b7b] text-sm ">
                            #{index + 1}
                          </p>
                        </div>
                        <div className="flex w-32 justify-around text-white">
                          <div className="flex items-center justify-center w-full">
                            {/* {item?.unit ? (
                              <img
                                width={40}
                                height={40}
                                style={{ borderRadius: "50%" }}
                                src={
                                  item?.name === "SNEK"
                                    ? `${getImage}/image?unit=279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b`
                                    : item?.unit
                                    ? `${getImage}/image?unit=${item?.unit}`
                                    : item?.imgSrc
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
                                  {item?.name?.split("")[0]}
                                </span>
                              </div>
                            )} */}
                            {type === "nft" && item?.image ? (
                              <img
                                style={{ borderRadius: "50%" }}
                                src={item?.image}
                                className="ml-2 logo"
                                alt="riskWise"
                              />
                            ) : item?.unit ? (
                              <img
                                style={{ borderRadius: "50%" }}
                                src={item?.image}
                                className="ml-2 w-10 h-10 md:w-[50px] md:h-[50px] logo"
                                alt="riskWise"
                              />
                            ) : (
                              <div
                                className="ml-2 w-10 h-10 md:w-[50px] md:h-[50px]"
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
                                  {data?.ticker?.split("")[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="2xl:flex items-center justify-around  w-full">
                            <div className="flex flex-col justify-center items-start text-[10px] ml-2">
                              <p className="text-[12px]"> {item?.ticker}</p>
                              <div className="flex items-center">
                                {/* {parseInt(item?.twofourhr?.split("%")[0]) >
                                0 ? (
                                  <SVG.GoUp />
                                ) : (
                                  <SVG.GoDown />
                                )}{" "} */}
                                &nbsp;
                                <p
                                  className={
                                    parseInt(item?.price) > 0
                                      ? "text-[#20eb7a] text-[12px]"
                                      : "text-[#ff422b] text-[12px]"
                                  }
                                >
                                {item?.price?.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};
export default ChartSlick;
