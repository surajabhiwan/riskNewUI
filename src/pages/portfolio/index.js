import { useEffect } from "react";
import PortfolioContentPart1 from "../../components/Portfolio/PortfolioContentPart1";
// import PortfolioContentPart2 from "../../components/Portfolio/PortfolioContentPart2";
// import PortfolioContentPart3 from "../../components/Portfolio/PortfolioContentPart3";
// import ChartSwapHeader from "../../components/Charts/ChaerSwapHeader";
import * as SVG from "../../common/Icons";
// import PortfolioChartHeader from "../../components/Portfolio/PortfolioChartHeader";
import { decryption, encryption } from "../../functions/crypto";
import axios from "axios";
import { walletPositionApi } from "../../baseurl/baseurl";
import { useDispatch } from "react-redux";
import {  setWalletPosition } from "../../store/slices/wallet";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

const Portfolio = () => {


  const { 
    isConnected,
    stakeAddress,
} = useCardano();


const dispatch = useDispatch()
   

const walletPosition = async () =>{
  const data = {
    address: stakeAddress,
  }
  const encryptedData = {
    key : encryption(data)
  }

  try{
    const response = await axios.post( walletPositionApi, encryptedData );
    const result = decryption(response?.data)
    console.log('wallet-position', result)
    dispatch(setWalletPosition(result)); 
  }
  catch(error){
    console.log("error", error)
  }
}


useEffect(()=>{

  walletPosition()
},[stakeAddress])


useEffect(()=>{
  dispatch(setWalletPosition([]));
},[!isConnected])

  return (
    <div className="block gap-2 w-full h-full pb-8 pt-10">
      {/* 
      <div className="xl:flex block">
        <div className="xl:w-[65%]  w-full text-white">
          <PortfolioContentPart2 />
        </div>
        <PortfolioContentPart3 />
      </div> */}
      <PortfolioContentPart1 /> 
      {/* <div
        onClick={() => setIsSelected(!isSelected)}
        className="fixed bottom-4 flex justify-center items-center left-4 bg-yellow-300 bg-opacity-80 w-[100px] h-[30px] rounded-2xl cursor-pointer"
      >
        <p className="text-black hover:text-white">Swap</p>
      </div> */}

      {/* {isSelected ? (
        <div className=" fixed bottom-4 left-4 bg-[#142028] p-4 rounded-2xl lg:w-[340px] w-[300px] z-20 bg-opacity-80">
          <div
            onClick={() => setIsSelected(false)}
            className="absolute right-4"
          >
            <SVG.Close />
          </div>
          <ChartSwapHeader />
        </div>
      ) : ("")} */}
    </div>
  );
};

export default Portfolio;
