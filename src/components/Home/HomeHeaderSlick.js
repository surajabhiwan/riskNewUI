import Slider from "react-slick";
import useMedia from "../../common/mediaQuery";
import {
  jpgStore,
  cnft,
  coinFlipGame,
  cardanoCube,
  needGame,
} from "../../common/IMG/Images";
import { useEffect, useState } from "react";
import { getAdsHome, viewBannerImage } from "../../baseurl/baseurl";
import { decryption } from "../../functions/crypto";
import axios from "axios";

const datas = [
  {
    id: 0,
    img: jpgStore,
    txt1: "Maximize liquidity & earnings",
    tx2: "Start lending and borrowing now!",
    link: "https://levvy.fi/",
  },

  {
    id: 1,
    img: cardanoCube,
    txt1: "Explore Projects on Cardano",
    tx2: "Discover, Follow and Trade projects",
    link: " https://www.cardanocube.com",
  },

  {
    id: 2,
    img: coinFlipGame,
    txt1: "We make the phygital possible!",
    tx2: "Ask us how!",
    link: "https://riskwisepro.io/charts?token=BOX&unit=f9a491442678bb2f90a3be676d1f888ce87330003ab7151f9efb3b68424f58&pairID=f9a491442678bb2f90a3be676d1f888ce87330003ab7151f9efb3b68424f58&type=token",
  },
  {
    id: 3,
    img: cnft,
    txt1: "An Advanced Hybrid Multi-Asset Dex",
    tx2: "DEX marketplace for everything crypto!",
    link: "https://app.cswap.fi/",
  },

  {
    id: 4,
    img: needGame,
    txt1: "Over 60 Expert Game Developers!",
    tx2: "Gaming & Software, Request Quote Today",
    link: "https://riskgaming.io/",
  },
];

const HomeHeaderSlick = () => {
  const [bannerData, setBannerData] = useState([]);
  const media = useMedia();
  const isLarge = media.useIsLarge;
  const isXLarge = media.useXlLarge;
  const isSmall = media.useIsSmall;
  const [showNumber, setShowNumber] = useState(5);
  useEffect(() => {
    {
      isXLarge
        ? setShowNumber(4)
        : isLarge
        ? setShowNumber(4)
        : isSmall
        ? setShowNumber(2)
        : setShowNumber(1);
    }
  }, [isXLarge, isLarge, isSmall]);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: showNumber,
    slidesToScroll: 1,
  };

  const fetchAds = async () => {
    try {
      const response = await axios.get(getAdsHome);
      const result = decryption(response?.data);
      console.log("resultAds", result);
      setBannerData(result?.searchedAds);
      // localStorage.setItem("bannerData", JSON.stringify(result?.searchedAds));
      // localStorage.setItem("bannerDataExpiry", Date.now() + 300000);
    } catch (e) {
      console.log("Error fetching ads:", e);
    }
  };
  useEffect(() => {
    fetchAds();
  }, []);

  // useEffect(() => {
  //   const cachedBannerData = localStorage.getItem("bannerData");
  //   const cachedBannerDataExpiry = localStorage.getItem("bannerDataExpiry");

  //   if (cachedBannerData && cachedBannerDataExpiry && Date.now() < cachedBannerDataExpiry) {
  //     setBannerData(JSON.parse(cachedBannerData));
  //   } else {
  //     fetchAds();
  //   }
  // }, []);

  return (
    <>
      <div className="w-full overflow-auto mb-4">
        <Slider arrows={false} {...settings}>
          {bannerData?.map((item, idx) => {
            return (
              <div key={idx} className="cursor-pointer ">
                <a href={item?.url} target="_blank" rel="noreferrer">
                  <div className="xl:w-52 min-[1440px]:w-80 lg:w-48 w-full sm:px-4 px-10 xl:h-30 ">
                    <img
                      style={{ boxShadow: "10px 10px 5px 0px black " }}
                      src={viewBannerImage + `${item?.mediaUrl}`}
                      width={200}
                      height={200}
                      className="xl:w-52 min-[1440px]:w-80 lg:w-48 w-full xl:h-30 rounded-xl"
                      alt="pic"
                    />
                  </div>
                  <div className="flex flex-col items-start pt-2 sm:px-4 px-10">
                    <p className="sm:text-sm text-xs text-[#818ea3]">
                      {item?.title}
                    </p>
                    <p className="sm:text-sm text-xs text-white whitespace-nowrap text-ellipsis overflow-hidden inline-block">
                      {item?.description}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
export default HomeHeaderSlick;
