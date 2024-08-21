import { useState } from "react";
import * as SVG from "../../common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setHideBalance } from "../../store/slices/wallet";

const PortfolioChartHeader = ({portfolioType}) => {
  const [color, setColor] = useState("white");
  const { walletPosition } = useSelector((state) => state.wallet);

  const { walletProfilerBalance } = useSelector((state) => state.walletProfilerReducer);
  
  return (
    <div className="w-full">
      <div className="sm:flex sm:flex-col w-full gap-4 sm:space-y-0 space-y-4">
{
  portfolioType === 'portfolio' && 
        <div className="flex h-[90px]  blueBg px-3 py-2 rounded-xl">
          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col ">
              <span className="flex gap-2 items-center text-black text-[30px] ">
              {walletPosition?.walletPosition?.adaBalance ? walletPosition?.walletPosition?.adaBalance?.toFixed() : '0'}₳
                <p className="text-xl">{"/0"}₳</p>
              </span>
              <span className="text-black text-xl">{0.00}₳</span>
            </div>
            {/* <div className="flex justify-center items-center w-11 h-7 rounded-xl bg-[#2f3737] hover:bg-yellow-900 p-3 cursor-pointer" onClick={handleHide}> 
              <SVG.Visibility color={color} />
            </div> */}
          </div>
        </div>
}

        <div className="flex flex-auto  relative  justify-evenly gap-6 h-[90px]  bg-[#142028] px-4 py-2 rounded-xl">
          <div className="flex justify-center gap-4">
            <div className="flex flex-col justify-center items-center ">
              <span className="flex gap-2 items-center text-[#9f9fa8] text-lg font-medium ">
                Token Value
              </span>
              {
                portfolioType === 'portfolio' ?
              <span className="text-white text-xl">{walletPosition?.walletPosition?.adaBalance ? walletPosition?.walletPosition?.adaBalance.toFixed(2) :'0'} ₳</span> :
              <span className="text-white text-xl">{walletProfilerBalance?.walletPosition?.adaBalance ? walletProfilerBalance?.walletPosition?.adaBalance?.toFixed() : '0'} ₳</span>
              }
            </div>
          </div>
          <div className="bg-[#121212] h-full w-[2px]"></div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center ">
              <span className="flex gap-2 items-center text-[#9f9fa8] text-lg font-medium ">
                LP Value
              </span>
             {
              portfolioType === 'portfolio' ?
              <span className="text-white text-xl">{walletPosition?.walletPosition?.positionsLp?.length ? walletPosition?.walletPosition?.positionsLp[0]?.adaValue?.toFixed() : '0'}₳</span> :
              <span className="text-white text-xl">{walletProfilerBalance?.walletPosition?.positionsLp?.length ? walletProfilerBalance?.walletPosition?.positionsLp[0]?.adaValue?.toFixed() : '0'}₳</span>
             }
            </div>
          </div>
          <div className="bg-[#121212] h-full w-[2px]"></div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center ">
              <span className="flex gap-2 items-center text-[#9f9fa8] text-lg font-medium">
                NFT Value
              </span>
              {
                portfolioType === 'portfolio' ?
                <span className="text-white text-xl">{walletPosition?.walletPosition ?((walletPosition?.walletPosition?.adaValue) - (walletPosition?.walletPosition?.adaBalance))?.toFixed() : '0'}₳</span> :
                <span className="text-white text-xl">{walletProfilerBalance?.walletPosition ? ((walletProfilerBalance?.walletPosition?.adaValue) - (walletProfilerBalance?.walletPosition?.adaBalance))?.toFixed() : '0'} ₳</span> 
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChartHeader;
