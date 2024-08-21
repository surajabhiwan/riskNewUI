import * as SVG from "../../common/Icons";
import * as IMG from "../../common/IMG/Images";
import { useState } from "react";
import { PuffLoader } from 'react-spinners';
import useMedia from "../../common/mediaQuery";
import Logo1 from "../../common/Logo/logo1";
import {useDispatch} from 'react-redux'
import { chartsAction } from "../../store/slices/chartsData";

const ChartTableHeader = ({tradeHistory}) => {
  const [rotation, setRotation] = useState(false);
  const [rotationMarket, setRotationMarket] = useState(false);
  const [rotationVolume, setRotationVolume] = useState(false);
  const [rotationLiquidity, setRotationLiquidity] = useState(false);
  const [isActiveWalletProfiler, setIsActiceWalletProfiler] = useState(false)

const dispatch = useDispatch()

  const handleMouseEnter = () => {  
    setIsActiceWalletProfiler(true)
  }
  const handleMouseLeave = () => {
    setIsActiceWalletProfiler(false)
  }
  const rotateComponent = () => setRotation(!rotation);
  const rotateMarketComponent = () => setRotationMarket(!rotationMarket)
  const rotateVloumeComponent = () => setRotationVolume(!rotationVolume)
  const rotateLiquidityComponent = () => setRotationLiquidity(!rotationLiquidity);
  const usemedia = useMedia();
  const xsmall = usemedia.useXSmall;


  const handleSortDate = (sortType) =>{
      if (tradeHistory) {
        const sortData = tradeHistory?.slice()?.sort((a, b) => {
          if (sortType === 'asc') {
            return a.time - b.time;
          } else {
            return b.time - a.time;
          }
        });
        dispatch(chartsAction.setTradeHIstoryData(sortData))
      }
    }
  

    const handleSortTokenA = (sortType) =>{
      if (tradeHistory) {
        const sortData = tradeHistory?.slice()?.sort((a, b) => {
          if (sortType === 'asc') {
            return a.tokenAAmount - b.tokenAAmount;
          } else {
            return b.tokenAAmount - a.tokenAAmount;
          }
        });
        dispatch(chartsAction.setTradeHIstoryData(sortData))
      }
    }


    const handleSortTokenB = (sortType) =>{
      if (tradeHistory) {
        const sortData = tradeHistory?.slice()?.sort((a, b) => {
          if (sortType === 'asc') {
            return a.tokenBAmount - b.tokenBAmount;
          } else {
            return b.tokenBAmount - a.tokenBAmount;
          }
        });
        dispatch(chartsAction.setTradeHIstoryData(sortData))
      }
    }

  return (
    <div>
      <div className="flex justify-between items-center w-full pe-32">
        <div className="flex">
          <div className="flex text-white lg:text-lg sm:text-base text-sm font-medium">Trade History</div>
          <div className="flex relative items-center px-2 justify-center gap-1 bg-[#142028] rounded-xl ml-4">
            <div className="flex  relative ">
              <PuffLoader
                size={18}
                color="yellow"
              />
            </div>
            <p className="text-white text-[14px]">LIVE</p>
          </div>
        </div>
        <div>
          <p className="max-sm:hidden text-white lg:text-base xs:text-sm font-normal">{tradeHistory[0]?.tokenAName}<span>{"(last trades)"}</span></p>
        </div>

      </div>
      <div className="flex mt-6 px-2  w-full">
        {/* Date */}
        <div
          id="24h"
    
          onClick={() => {rotateComponent();handleSortDate(rotation ? 'asc' : 'dsc')}}
          className={`flex items-center  justify-start lg:w-[80px] w-1/5 cursor-pointer transition-all duration-300 hover:mt-[-8px] `}>
          <div className="sm:text-sm text-xs text-white font-normal ">Date </div>
          <div
            className={`text-white font-normal ml-1 transition-all duration-300 ${rotation ? " rotate-180" : ""}`}><SVG.Arrow /> </div>
        </div>
        {/* Type */}
        <div className="lg:flex items-center justify-end lg:w-[6%] hidden">
        &nbsp;&nbsp;<div className="sm:text-sm text-white font-normal flex justify-center items-center ml-4">Type</div>
        </div>
        {/* Price */}
        <div className="flex items-center justify-end lg:w-[12%] w-1/5">
          <div className="sm:text-sm text-xs text-white font-normal flex justify-center items-center ml-4">Price </div>
        </div>
        {/* Total LENFI && Total EUR*/}
        {xsmall ?
          (
            <>
              <div
            
                onClick={() => {rotateMarketComponent();handleSortTokenA(rotationMarket ? 'asc' : 'dsc')}}
                className={`flex items-center justify-end transition-all duration-300 cursor-pointer  lg:w-[20%] w-1/5  gap-2 hover:mt-[-8px]`}>
                <div className="sm:text-sm text-xs text-white font-normal flex justify-center items-center ">Total {tradeHistory[0]?.tokenAName}</div>
                <div className={`text-white font-normal lg:flex lg:justify-center lg:items-center hidden ml-1 transition-all duration-300 ${rotationMarket ? " rotate-180" : ""}`}><SVG.Arrow /> </div>
              </div>
              <div
            
                onClick={() => {rotateVloumeComponent();handleSortTokenB(rotationVolume ? 'asc' : 'dsc')}}
                id="volume"
                className={`flex items-center justify-end  cursor-pointer transition-all duration-300  lg:w-[20%] w-1/5 gap-2 hover:mt-[-8px]`}>
                <div className="sm:text-sm text-xs text-white font-normal flex justify-center items-center ">Total {tradeHistory[0]?.tokenBName} </div>
                <div className={`text-white font-normal lg:flex lg:justify-center lg:items-center hidden ml-1 transition-all duration-300  ${rotationVolume ? " rotate-180" : ""}`}><SVG.Arrow /> </div>
              </div>
            </>

          ) : (
            <div
              onClick={rotateMarketComponent}
              className={`flex items-center justify-end transition-all duration-300 cursor-pointer  lg:w-[29%] w-[30%]  gap-2 hover:mt-[-8px]`}>
              <div className="sm:text-sm text-xs text-white font-normal flex justify-center items-center ">{tradeHistory[0]?.tokenAName} / {tradeHistory[0]?.tokenBName} </div>
              <div className={`text-white font-normal lg:flex lg:justify-center lg:items-center hidden ml-1 transition-all duration-300 ${rotationMarket ? " rotate-180" : ""}`}><SVG.Arrow /> </div>
            </div>)}
        {/* Wallet Profiler */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={rotateLiquidityComponent}
          id="liquididy"
          className={`flex items-center  justify-end cursor-pointer  transition-all duration-300 lg:w-[20%] xs:w-1/5 w-[30%] gap-2 relative `}>
          <div className="sm:text-sm text-xs text-white font-normal inline-block items-center ">Wallet Watch </div>
          <div className="text-white font-normal lg:flex lg:justify-center lg:items-center hidden"><SVG.Alert /> </div>
          {isActiveWalletProfiler ? (<div
            className={`absolute transition-all duration-300 transform top-7 z-50 w-[220px]  flex flex-col gap-1 p-2 rounded-lg bg-[#142028]`}>
            <div className="flex justify-start  items-center px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.OverM />
              <span className="text-white text-sm ">0 - 5K₳</span>
            </div>
            <span className="flex justify-start px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.Price2 />
              <span className="text-white text-sm ">5K ₳ - 25K₳</span>
            </span>
            <span className="flex justify-start px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.Price3 />
              <span className="text-white text-sm ">25K ₳ - 100K₳</span>
            </span>
            <span className="flex justify-start px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.Price4 />
              <span className="text-white text-sm ">100K ₳ - 250K₳</span>
            </span>
            <span className="flex justify-start px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.Price5 />
              <span className="text-white text-sm ">250K ₳ - 1M₳</span>
            </span>
            <span className="flex justify-start px-5 gap-4 py-1  w-full bg-[#3a4956] rounded-lg">
              <SVG.Price6 />
              <span className="text-white text-sm ">1M₳+ ₳</span>
            </span>
          </div>) : ("")}
        </div>
      </div>
      <div className="w-full h-[1px] mt-2 bg-[#232323]"></div>
    </div>
  )
}
export default ChartTableHeader;