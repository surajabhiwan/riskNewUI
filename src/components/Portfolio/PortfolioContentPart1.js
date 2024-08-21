import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import PortfolioButton from "./PortfolioButton";
import AddNewWallet from "./AddNewWallet";
import PortfolioChart from "./PortfolioChart";
import PortfolioChartHeader from "./PortfolioChartHeader";
import PortfolioContentPart2 from "../../components/Portfolio/PortfolioContentPart2";
import PortfolioContentPart3 from "./PortfolioContentPart3";
import { useSelector } from "react-redux";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import Liquid from "../Pro/WalletProfilerLanding/overview/sideBar/Liquid";
import { useLocation } from "react-router-dom";
import CopyToken from "../Pro/WalletProfilerLanding/overview/sideBar/CopyToken";
// import { walletAppName } from "../../store/slices/wallet";


const PortfolioContentPart1 = () => {
  const [ portfolioType, setPortfolioType ] = useState('')

const { walletPosition } = useSelector((state)=> state.wallet)
const location = useLocation()


useEffect(()=>{
  if(location.pathname === '/profiler'){
    setPortfolioType('profiler');
  }else if(location.pathname === '/portfolio'){
    setPortfolioType('portfolio');
  }
},[location])

const PortfolioButtonData = [
  {
    id: 0,
    svg: "Portfolio",
    value: "Total Portfolio Value",
    price: walletPosition?.walletPosition?.adaBalance?.toFixed(2),
    active: true,
  },
  {
    id: 1,
    svg: "Yoroi",
    value: localStorage.getItem('cf-last-connected-wallet') ? localStorage.getItem('cf-last-connected-wallet') : 'No wallet connected',
    price: walletPosition?.walletPosition?.adaBalance ? walletPosition?.walletPosition?.adaBalance?.toFixed(2) : '0',
    active: false,
  },
];
const [menuItem, setMenuItem] = useState(PortfolioButtonData);

  const handleBackground = ( _idx ) => {
    const newMenuItem = PortfolioButtonData.map((item, idx) => {
      if (idx === _idx) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setMenuItem(newMenuItem);
  };

  const { 
    // isEnabled,
    isConnected,
    // enabledWallet,
    // stakeAddress,
    // signMessage,
    // connect,
    disconnect 
} = useCardano();

  return (
    <div className="lg:flex w-full">
      <div className="flex flex-col gap-3 lg:w-[40%] w-full p-4">
        <div className="flex justify-between ">
          <div className="bg-gradient-to-r blueBg px-4 py-1 rounded-lg">
            <p className="text-black text-lg font-normal">Portfolio</p>
          </div>
          {/* <div className="flex justify-center items-center p-2 rounded-full cursor-pointer bg-[#142028] transition-all duration-300 transform origin-center hover:rotate-180">
            <SVG.Setting />
          </div> */}

{
          portfolioType ===  'portfolio' &&
<div className={`flex justify-center items-center px-4 rounded-lg cursor-pointer bg-[#142028] text-white gap-2 hover:bg-yellow-700 ${isConnected ? "flex" : "hidden"}`} onClick={disconnect}>
          <div className="">Disconnect wallet</div>
</div>
}

        </div>
        {

portfolioType ===  'portfolio' ? 
        <div className="flex flex-col h-[250px] mb-8">
          {PortfolioButtonData?.map((item, idx) => {
            return (
              <div key={idx} onClick={() => handleBackground(idx)} className="">
                <PortfolioButton data={item} />
              </div>
            );
          })}
        </div> :
        <div>
          <CopyToken/>
          <Liquid />
          </div>
        }
        {
          portfolioType ===  'portfolio' &&  <AddNewWallet />
        }
        <PortfolioChartHeader portfolioType={portfolioType}/>
        <PortfolioContentPart3 portfolioType={portfolioType} />
      </div>
      <div className="lg:w-[60%] w-full flex flex-col gap-10">
        {/* portfolio>>>>investment>>>Charts/table */}
        <PortfolioChart />
        <PortfolioContentPart2 />
      </div>
    </div>
  );
};

export default PortfolioContentPart1;
