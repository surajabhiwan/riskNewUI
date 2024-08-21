import Slider from "react-slick";
import useMedia from "../../common/mediaQuery";
import {
  DEXTFORCE,
  DEXTFORCE2,
  DEXTFORCE3,
  DEXTFORCE4,
  DEXTFORCE5,
  DEXTFORCE6,
  DEXTFORCE7,
  DEXTFORCE8,
  jpgStore,
  cnft,
  coinFlipGame,
  cardanoCube,
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
} from "../../common/IMG/Images";
import { useEffect, useState } from "react";
import { getAdsPortfolio, viewBannerImage } from "../../baseurl/baseurl";
import { decryption } from "../../functions/crypto";
import axios from "axios";

const datas = [
  {
    id: 0,
    img: banner1,
    // txt1: "JPG.STORE",
    // tx2: "The #1 Cardano NFT marketplace",
    link: "https://www.snek.com/",
  },

  {
    id: 1,
    img: banner2,
    link: "https://www.thepiggyverse.com/",
  },

  {
    id: 2,
    img: banner3,
    link: "https://bankercoinada.com/",
  },
  {
    id: 3,
    img: banner4,
    link: "https://hopsoncardano.io/",
  },

  {
    id: 4,
    img: banner5,
    link: "https://inmatesotwt.io/",
  },

  {
    id: 5,
    img: banner6,
    link: "https://walkerscardano.xyz/",
  },

  {
    id: 6,
    img: banner7,
    link: "https://twitter.com/SportsAlphaClub",
  },
  {
    id: 7,
    img: banner8,
    link: "https://snekkies.com/",
  },
];

const PortfolioSlick = () => {
  const [bannerData, setBannerData] = useState([]);

  const media = useMedia();
  const isLarge = media.useIsLarge;
  const isXLarge = media.useXlLarge;
  const isSmall = media.useIsSmall;
  const isMedium = media.useIsMedium;
  const [showNumber, setShowNumber] = useState(5);
  useEffect(() => {
    {
      isXLarge
        ? setShowNumber(3)
        : isLarge
        ? setShowNumber(3)
        : isMedium
        ? setShowNumber(3)
        : isSmall
        ? setShowNumber(2)
        : setShowNumber(1);
    }
  }, [isXLarge, isLarge, isSmall, isMedium]);
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
      const response = await axios.get(getAdsPortfolio);
      const result = decryption(response?.data);
      console.log("resultAds", result);
      setBannerData(result?.searchedAds);
    } catch (e) {
      console.log("Error fetching ads:", e);
    }
  };
  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <div className="w-full overflow-auto mb-4">
        <Slider arrows={false} {...settings}>
          {bannerData?.map((item, idx) => {
            return (
              <div key={idx} className=" cursor-pointer">
                <a href={item?.url} target="_blank" rel="noreferrer">
                  <div className="xl:w-80 min-[1440px]:w-80 lg:w-48 w-full sm:px-4 px-10 xl:h-30">
                    <img
                      src={viewBannerImage + `${item?.mediaUrl}`}
                      width={400}
                      height={400}
                      className="xl:w-52 min-[1440px]:w-80 w-32 md:w-32 lg:w-48 w-full xl:h-30 rounded-xl"
                      style={{ objectFit: "cover" }}
                      alt="pic"
                    />
                  </div>
                  {/* <div className="flex flex-col items-start pt-2 sm:px-4 px-10">
                  <p className="sm:text-sm text-xs text-[#818ea3]">
                    {item.txt1}
                  </p>
                  <p className="sm:text-sm text-xs text-white whitespace-nowrap text-ellipsis overflow-hidden inline-block">
                    {item.tx2}
                  </p>
                </div> */}
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
export default PortfolioSlick;
