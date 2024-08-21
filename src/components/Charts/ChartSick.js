/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import * as IMG from "../../common/IMG/Images";
import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMedia from "../../common/mediaQuery";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImage, getImageNft } from "../../baseurl/baseurl";

const ChartSlick = () => {
  const [price, setPrice] = useState("0.236€");
  const [percentFirst, setPercentFirst] = useState("+8.71%");
  const [wid, setWid] = useState(12);
  const slick = document.getElementById("slick");
  const [isActive, setIsActive] = useState(true);
  // const [isVerticalActive, setIsVerticalActive] = useState(true);
  const useMediaQuery = useMedia();
  const { useIsLarge, useIsMedium, use3XlLarge, useXlLarge, use2XlLarge } =
    useMediaQuery;
  const [pro, setPro] = useState(10);

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

  const [data, setData] = useState([]);

  const dataTable = useSelector((state) => state.tableREducer.data);
  const nftData = useSelector((state) => state.tableREducer.nftTableData);

  const localData = JSON.parse(sessionStorage.getItem("tokenModalData"));
  const localDataNft = JSON.parse(sessionStorage.getItem("cachedNftTableData"));
  useEffect(() => {
    if (!type || type === "token") {
      if (localData) {
        setData(localData);
      } else {
        setData(dataTable);
      }
    } else if (type === "nft") {
      if (localDataNft) {
        setData(localDataNft);
      } else {
        setData(nftData);
      }
    }
  }, []);

  // }, [dataTable, localData]);
  // console.log('slick', dataTable)

  return (
    <>
      <div className="rounded-sm pt-4 2xl:w-[100%] lg:w-[100%] ">
        {/* Slick */}
        <div id="slick" className="cursor-pointer">
          {type === "nft" ? (
            <Slider {...settings} className="h-[30%]">
              {data?.map((item, index) => {
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
                            {item?.image ? (
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
                            )}
                          </div>
                          <div className="2xl:flex items-center justify-around  w-full">
                            <div className="flex flex-col justify-center items-start text-[10px] ml-2">
                              <p className="text-[12px]" title={item?.name}>
                                {" "}
                                {item?.name?.slice(0, 5)}..
                              </p>
                              <div className="flex items-center">
                                {item?.price24hChg > 0 ? (
                                  <SVG.GoUp />
                                ) : (
                                  <SVG.GoDown />
                                )}
                                &nbsp;
                                <p
                                  className={
                                    item?.price24hChg > 0
                                      ? "text-[#20eb7a] text-[12px]"
                                      : "text-[#ff422b] text-[12px]"
                                  }
                                >
                                  {(item?.price30dChg > 0
                                    ? item?.price30dChg * 100
                                    : item?.price30dChg * -100
                                  )?.toFixed(2)}
                                  %
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
              {data?.map((item, index) => {
                return (
                  <Link
                    to={
                      item?.unit
                        ? `/charts?token=${item?.name}&unit=${
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
                            {item?.unit ? (
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
                            )}
                          </div>
                          <div className="2xl:flex items-center justify-around  w-full">
                            <div className="flex flex-col justify-center items-start text-[10px] ml-2">
                              <p className="text-[12px]"> {item?.name}</p>
                              <div className="flex items-center">
                                {parseInt(item?.twofourhr?.split("%")[0]) >
                                0 ? (
                                  <SVG.GoUp />
                                ) : (
                                  <SVG.GoDown />
                                )}{" "}
                                &nbsp;
                                <p
                                  className={
                                    parseInt(item?.twofourhr?.split("%")[0]) > 0
                                      ? "text-[#20eb7a] text-[12px]"
                                      : "text-[#ff422b] text-[12px]"
                                  }
                                >
                                  {item?.twofourhr}
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
