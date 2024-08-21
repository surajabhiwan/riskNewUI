import useMedia from "../../common/mediaQuery";
import ChartSlick from "../../components/Charts/ChartSick";
import ChartContent from "../../components/Charts/ChartContent";
import ChartPoolInfo from "../../components/Charts/ChartPoolInfo";
import * as SVG from "../../common/Icons";
import {  useState } from "react";
import ChartsTrendingToken from "../../components/AddedComponents/ChartsTrendingToken";
import SelectComp from "../../components/AddedComponents/Select";
import SwapDex from "../../components/AddedComponents/Swap";
import TopHoldersNft from "../../components/AddedComponents/TopHoldersNft";
import { useSearchParams  } from "react-router-dom";
import ChartsNFTTrending from "../../components/AddedComponents/ChartsNFTTrending";


const ChartInfoHeader = [
  { id: 0, value: "Swap", active: false, isSVG: true },
  // { id: 1, value: "PoolInfo", active: false, isSVG: false},
  // { id: 2, value: "Order", active: false, isSVG: false }
];

const Charts = () => {
  const usemedia = useMedia();
  const IsLarge = usemedia.useIsLarge;
  const [chartItem, setChartItem] = useState(ChartInfoHeader);
  const [isSelected, setIsSelected] = useState("")
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const unit = searchParams.get('unit');


  const handleItem = (_idx) => {
    const newChartInfoHeader = ChartInfoHeader.map((item, idx) => {
      if (_idx === idx) {
        item.active = true;
        setIsSelected(item.value);
      }
      else {
        item.active = false
      }
      return item;
    });
    setChartItem(newChartInfoHeader);
  }


  return (
    <div id="chartTop">
      <ChartSlick/>
    <div className="flex w-full">
    <div className="w-full h-full lg:px-4 px-0 overflow-x-hidden overflow-y-hidden " >
      {/* {IsLarge ? (<ChartSmallHeaderDirect />) : (<ChartSmallHeader />)} */}
      <div className="w-full pt-4 gap-3 overflow-x-hidden" >
     
        {/* Left Side */}
        <ChartContent /> 
        {
          (type === 'token' || !type) &&
      
        <div className={`swap_button flex lg:hidden ${isSelected === "" ? "h-[40px] w-[200px]" : " "}  rounded-2xl  bg-[#142028] fixed z-10 bottom-4`}>
          <div className="flex justify-between items-center w-full ">
            {chartItem.map((item, idx) => (
              <div
                onClick={() => handleItem(idx)}
                key={idx}
                className={`flex items-center justify-center w-full cursor-pointer py-2  gap-2 ${item.active ? "bg-[#3a4956] text-white rounded-xl " : ""}`} >
                <p className={`${isSelected === "" ? "" : "hidden"} text-base font-medium hover:text-[#fff]  ${item.active ? " text-white " : "text-[#9f9fa8]"}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      }
        {/* Right Side */}
        <div className={`flex  ${isSelected === "" ? "hidden" : "sm:w-[400px] w-[340px]"} h-fit lg:mt-0 mt-3 gap-5 fixed sm:bottom-10 bottom-4  p-4 rounded-2xl bg-opacity-80 `}>
          <div
            onClick={() => setIsSelected("")}
            className="absolute right-4 text-red-500 cursor-pointer">
            {/* <SVG.Close /> */}
            Close
          </div>
          {isSelected === "PoolInfo" ? <ChartPoolInfo /> : ("")} 
          {/* {isSelected === "Swap" ? <ChartSwap /> : ("")} */}
          {isSelected === "Swap" ?<div className="pt-8 pr-8"><SwapDex /></div>  : ("")}
          {/* {isSelected === "Order" ? <ChartOrders /> : ("")} */}
            
        </div>
      </div>
    </div>
  
    <div className="flex flex-col pt-2  mt-2 hidden lg:block xl:block xxl:block">
      <div className={type === "nft" ? 'hidden' : 'block'}>

    <SwapDex/>
      </div>
    {
      type === 'nft' ? '' :  <SelectComp unit={unit}/>
    }
        { type === 'nft' ?
       <div className="flex flex-col">
         <TopHoldersNft/> 
         <ChartsNFTTrending/>
         <div className="invisible" >
         <SwapDex/>
         </div>
        </div> :
        <ChartsTrendingToken/>  }
        </div>
    </div>
    </div>
  )
}

export default Charts;