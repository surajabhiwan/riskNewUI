import Iusd from "../Trending/Iusd";
import Wmt from "../Trending/Wmt";
import Lenfi from "../Trending/Lenfi";
import Snek from "../Trending/Snek";
import Lag from "../Trending/Lag";
import Agix from "../Trending/Agix";
import Hungry from "../Trending/Hungry";
import ToolHeads from "../Trending/ToolHeads";
import ApeSociety from "../Trending/ApeSociety";
import Tappy from "../Trending/Tappy";
import Goofy from "../Trending/Goofy";
import Book from "../Trending/Book";
import Slider from "react-slick";
import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots) => (
    <ul style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
      {dots}
    </ul>
  ),
  customPaging: (i) => (
    <div
      className="hover:bg-yellow-400 bg-[#9f9fa8] rounded-full "
      style={{
        width: "15px",
        color: "blue",
        height: "15px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    ></div>
  ),
};

const HomeBodySmall = ({ isLoading, isNftLoading, trendingNft, trendingToken }) => {
console.log('trending77', trendingNft)
  return (
    <>
      <div className="w-full">
        <Slider arrows={false} {...settings}>
          <div className="p-3 grid lg:grid-cols-2 flex-col h-full w-full ">
            <div className="flex flex-col ">
              <div className="w-full flex justify-between">
                <div className="flex">
                  <SVG.HotWallets />
                  <p className="text-white sm:text-base text-sm font-medium ml-3">
                    Trending Tokens
                  </p>
                </div>
                <p className="text-[#9f9fa8] sm:text-base text-sm">Last 24H</p>
              </div>
              { isLoading ? 
      <SkeletonTheme baseColor="#142028" highlightColor="#444">
      <p>
      <Skeleton count={3} height={50} />  
      </p>
    </SkeletonTheme>
    : <Iusd trendingToken={trendingToken} type={'token'} part={'first'}/> 
        }
            </div>
            <div className=""></div>
          </div>
          <div className="p-3  grid lg:grid-cols-2 flex-col h-full  w-full">
            <div className="flex flex-col ">
              <div className="w-full flex justify-between">
                <div className="flex">
                  <SVG.HotWallets />
                  <p className="text-white sm:text-base text-sm font-medium ml-3">
                    Trending NFTs
                  </p>
                </div>
                <p className="text-[#9f9fa8] sm:text-base text-sm">Last 24H</p>
              </div>
            </div>
            {
            isNftLoading ? <SkeletonTheme baseColor="#142028" highlightColor="#444">
            <p>
            <Skeleton count={3} height={50} />  
            </p>
          </SkeletonTheme> :<Iusd trendingNfts={trendingNft} type={'nft'} part={'first'}/>}
            
          </div>
        </Slider>
      </div>
    </>
  );
};
export default HomeBodySmall;
