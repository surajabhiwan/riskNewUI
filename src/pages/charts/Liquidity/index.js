import ChartSmallHeader from "../../../components/Charts/ChartSmallHeader";
import ChartHeader from "../../../components/Charts/ChartHeader";
import useMedia from "../../../common/mediaQuery";
import ChartSlick from "../../../components/Charts/ChartSick";
import ProLanding from "../../../components/Pro/ProLanding";
import ChartLiquidity from "../../../components/Charts/Liquidity";
import { useSelector } from "react-redux";
import ChartSmallHeaderDirect from "../../../components/Charts/ChartSmallHeaderDirect";
const Liquidity = () => {
  const { isWalletConnected } = useSelector((state) => state.auth);
  const usemedia = useMedia();
  const IsLarge = usemedia.useIsLarge;
  
  return (
    <div className="h-full w-full relative pt-10" >
      <div className="bg-[#121218] flex justify-center items-center rounded-lg w-fit  lg:gap-4 gap-1 cursor-pointer">
        { IsLarge ? (<ChartSmallHeaderDirect />) : (<ChartSmallHeader />)}
      </div>
      {isWalletConnected ? ( <ChartLiquidity />
      ) : ( <ProLanding /> )}
    </div>
  )
}

export default Liquidity;