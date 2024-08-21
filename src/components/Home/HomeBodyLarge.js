//Iusd -> token/nft row component
import Iusd from "../Trending/Iusd";

// import * as SVG from "../../common/Icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const HomeBodyLarge = ({
  isLoading,
  isNftLoading,
  trendingNft,
  trendingToken,
}) => {
  const trendingTokenLoading = useSelector(
    (state) => state.tableREducer.loading
  );
  return (
    <>
      <div className="flex justify-between w-full gap-6 bg-[#142028] rounded-2xl">
        <div className="p-3 grid lg:grid-cols-2 flex-col h-full w-full ">
          <div className="flex flex-col ">
            {trendingTokenLoading ? (
              <SkeletonTheme baseColor="#142028" highlightColor="#444">
                <p>
                  <Skeleton count={3} height={50} />
                </p>
              </SkeletonTheme>
            ) : (
              <Iusd
                trendingToken={trendingToken}
                type={"token"}
                part={"first"}
              />
            )}
          </div>
          <div className="sm:flex sm:flex-col hidden">
            {trendingTokenLoading ? (
              <SkeletonTheme baseColor="#142028" highlightColor="#444">
                <p>
                  <Skeleton count={3} height={50} />
                </p>
              </SkeletonTheme>
            ) : (
              <Iusd
                trendingToken={trendingToken}
                type={"token"}
                part={"second"}
              />
            )}
          </div>
          <div className=""></div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center lg:w-[2px] w-0 h-[150px] bg-[#3a4956]"></div>
        </div>
        <div className="p-3  grid lg:grid-cols-2 flex-col h-full  w-full ">
          <div className="flex flex-col ">
            {isNftLoading ? (
              <SkeletonTheme baseColor="#142028" highlightColor="#444">
                <p>
                  <Skeleton count={3} height={50} />
                </p>
              </SkeletonTheme>
            ) : (
              <Iusd trendingNfts={trendingNft} type={"nft"} part={"first"} />
            )}
          </div>
          <div className="flex flex-col ">
            {isNftLoading ? (
              <SkeletonTheme baseColor="#142028" highlightColor="#444">
                <p>
                  <Skeleton count={3} height={50} />
                </p>
              </SkeletonTheme>
            ) : (
              <Iusd trendingNfts={trendingNft} type={"nft"} part={"second"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBodyLarge;
