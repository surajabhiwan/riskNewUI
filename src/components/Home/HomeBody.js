import HomeBodyLarge from "./HomeBodyLarge";
import HomeBodySmall from "./HomeBodySmall";
import  useMedia from "../../common/mediaQuery"
const Homebody = ({ isLoading, isNftLoading, trendingNft, trendingToken }) => {
  const isSmall = useMedia();
  const isActive = isSmall.useIsSmall;
  return (
    <>
      {isActive ?
        (<HomeBodyLarge isLoading={isLoading} isNftLoading={isNftLoading} trendingNft={trendingNft} trendingToken={trendingToken}/>) : (<HomeBodySmall  isLoading={isLoading} isNftLoading={isNftLoading} trendingNft={trendingNft} trendingToken={trendingToken}/>)
      }
    </>
  );
};
export default Homebody; 