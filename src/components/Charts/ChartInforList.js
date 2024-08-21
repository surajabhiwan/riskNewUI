import { useSelector } from "react-redux";
import { Tappy } from "../../common/IMG/Images"
import * as SVG from "../../common/Icons";
import { convertMillion } from "../../functions/functions";
// import UpdateInfor from "../../common/UpdateInfor";
const ChartInforList = () => {
  const isLoading = useSelector((state)=> state.chartsReducer.loading)
  const depthData = useSelector((state)=> state.chartsReducer.depthData)
  
  // const handleUpdateInfo =() =>{
  //   window.open("https://docs.google.com/forms/d/e/1FAIpQLSc2OMvnrzTwIXxSMsw8RHV_qphw4NhazR27qrGw8oOna7GMvA/viewform", "_blank")

  // }
  const handleCardanoscan = () =>{
    window.open(`https://cardanoscan.io/token/${depthData?.tokenPolicy}`,"_blank")
  }
  const handleEarth = () =>{
    window.open("https://singularitynet.io/","_blank")
  }



console.log('depthData', depthData)
  return (
    <div
      className=" h-full rounded-xl z-99">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex justify-start items-center gap-1 cursor-pointer">
          {/* <div 
          onClick={handleUpdateInfo}
          className=" flex items-center rounded-xl  bg-[#0b1217] cursor-pointer">
            <p className="text-[12px] font-bold text-[#7b7b7b] py-1 px-2">Update Info</p>
          </div> */}
          <img
          onClick={handleCardanoscan}
            src={Tappy}
            alt="riskwise"
            className="w-5 h-5 cursor-pointer"
          />
          <div 
          onClick={handleEarth}
          className="cursor-pointer">
            <SVG.Earth />
          </div>
        </div>
        {/* <div className="flex justify-center items-center cursor-pointer"> <SVG.Share /></div> */}
      </div>
      {/* Content */}

      <div className="flex px-1 mt-4">
        <p className="text-white text-base font-semibol w-1/2" >Daily volume:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{convertMillion(depthData?.dailyVolume)} ₳</p>
      </div>
        
      {/* Pooled EUR */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Pooled ADA:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.pooledTokenB}</p>
      </div>
      {/* Pooled LENFI  */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Pooled {depthData?.tokenA}:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{convertMillion(depthData?.pooledTokenA)} {depthData?.tokenA}</p>
      </div>
          {/* holders  */}
          <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Holders:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.holders}</p>
      </div>
      {/* Total Tx */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Total Tx:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.numTransactions}</p>
      </div>
      {/* Market Cap */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Market Cap:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{convertMillion(depthData?.marketCap)} ₳</p>
      </div>
      {/* Dilutaed Market Cap */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Dilutaed Market Cap:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{convertMillion(depthData?.dilutedMarketCap)} ₳</p>
      </div>
      {/* Circulating Supply */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Circulating Supply:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{convertMillion(depthData?.circulatingSupply)}</p>
      </div>
      {/* Total Supply */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >Total Supply:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.maxSupply}</p>
      </div>
      {/* PooledPercent */}
      <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >% Pooled {depthData?.tokenA}:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.percentSupplyInPool}</p>
      </div>
   
         {/* 1 ADA */}
         <div className="flex px-1 mt-2">
        <p className="text-white text-base font-semibol w-1/2" >1 ADA:</p>
        <p className="text-white text-sm font-semibold w-1/2" >{depthData?.price?.toFixed(2)} {depthData?.tokenA}</p>
      </div>
      </div>

  )
}
export default ChartInforList