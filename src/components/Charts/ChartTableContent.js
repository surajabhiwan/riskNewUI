import { useState } from "react";
import * as SVG from "../../common/Icons";
import * as IMG from "../../common/IMG/Images";
import useMedia from "../../common/mediaQuery";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { timestampToUTC } from "../../functions/functions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ProLanding from "../Pro/ProLanding";
import { setStakeAddress, setWalletAddress } from "../../store/slices/walltProfiler";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, staketoad } from "../../baseurl/baseurl";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";
import { toast } from "react-toastify";
import Spinner from "../AddedComponents/Loader/Spinner";
const ChartTableContent = ({tradeHistory, tradeLoading, fishIconLoading}) => {

  const usemedia = useMedia();
  const xsmall = usemedia.useXSmall;

  const { isPro } = useSelector((state) => state.walletProfilerReducer);
  const [isSearching, setIsSearching]  = useState('')
  const [clickID, setClickID] = useState(null)

  const [forPro, setForPro] = useState(true)
  console.log('tokenBName', tradeHistory)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const proDisplay = () =>{
    setForPro(!forPro)
  }



  const handleAddresses = async (inputValue, idx) => {
    setIsSearching(true);
    setClickID(idx)
    if (inputValue?.startsWith("addr") && inputValue?.length > 10) {
        dispatch(setWalletAddress(inputValue));
        
        // Api to convert wallet to stake
        const data = {
            address: inputValue
        };
        const encryptedData = {
            key: encryption(data)
        };

        try {
            const response = await axios.post(getAddress, encryptedData);
            const result = decryption(response?.data);
            if (result?.success) {
                dispatch(setStakeAddress(result?.stakeAddress));
                navigate('/profiler');
            } else {
                toast.error('Failed to convert wallet to stake address');
            }
        } catch (error) {
            console.error('Error converting wallet to stake:', error);
            toast.error('Error converting wallet to stake address');
        } finally {
            setIsSearching(false);
        }
    } else if (inputValue?.startsWith("stake") && inputValue?.length > 8) {
        dispatch(setStakeAddress(inputValue));
        
        // Api to convert stake to wallet
        try {
          const data = {
            StackAddress : inputValue
        }
        const enc = {
            key : encryption(data)
        }
        const response = await axios.post(staketoad, enc);
        const result = decryption(response?.data);
        const walletAdd = result?.addresses[0]?.address
            if (result?.success) {
                dispatch(setWalletAddress(walletAdd));
                navigate('/profiler');
            } else {
                toast.error('Failed to convert stake to wallet address');
            }
        } catch (error) {
            console.error('Error converting stake to wallet:', error);
            toast.error('Error converting stake to wallet address');
        } finally {
            setIsSearching(false);
            setClickID(null)
        }
    } else {
        setIsSearching(false);
        setClickID(null)
        toast.error('Enter a valid address');
    }
};

  const redirectWalletWatch = async (add)=>{
    if(isPro){
      // dispatch(setWalletAddress(add))
      // navigate('/profiler')
     await handleAddresses(add)
    }else{
      proDisplay()
    }
}

  const fishIconDisplay = (value) =>{
    if(value <= 5000 ){
        return <SVG.OverM />
      }
      else if(value > 5000 && value <=25000 ){
        return <SVG.Price2 />
      }
      else if(value > 25000 && value <=100000){
        return <SVG.Price3 />
      }
      else if(value > 100000 && value <=250000){
        return <SVG.Price4 />
      }
      else if(value > 250000 && value <=1000000){
        return <SVG.Price5 />
      }
      else if(value > 1000000){
        return <SVG.Price6 />
      }
  }

  function shortenNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toFixed(2).toString();
    }
}


  return (
    <div>
{
forPro ?
    <div>
    {
      tradeLoading ? <SkeletonTheme baseColor="#142028" highlightColor="#444">
      <p>
      <Skeleton count={10} height={50} />
      </p>
    </SkeletonTheme> :
      <>
    {  tradeHistory?.map((data,idx) =>(
        <div className="hover:bg-[#3a4956] hover:bg-opacity-70 transition-all duration-300 transform" key={idx}>
              <div
                className="flex pt-5 px-2  w-full ">
                {/* Date */}
                <div
                  className={`flex items-center  justify-start lg:w-[80px] w-1/5  cursor-pointer transition-all duration-300  `}>
                  <div className="text-[#9f9fa8] font-normal text-sm">{moment(timestampToUTC(data?.time)).fromNow()} </div>
                </div>
                {/* Type */}
                <div className="lg:flex lg:items-center lg:justify-end hidden w-[7%] cursor-pointer ">
                &nbsp;&nbsp;<div className="flex justify-center items-center rounded-lg bg-[#3a4956] border-[1px] border-zinc-300 border-opacity-70 font-normal  ml-4 px-2 py-1 ">
                    <p className={` text-sm font-normal ${data?.action === "buy" ? "text-green-400" : data?.action === "sell" ? "text-red-600" : "text-red-600"} `}>{data?.action === 'buy'? 'Buy' : "Sell"}</p>
                  </div>
                </div>
                {/* Price */}
                <div className="flex items-center justify-end lg:w-[12%] w-1/5">
                  <div className="sm:text-sm text-xs text-white font-normal flex justify-center items-center ml-4">{data?.price?.toFixed(2)} </div>
                </div>
                {xsmall ?
                  (
                    <>
                      <div
                        className={`flex  items-center justify-end transition-all duration-300 cursor-pointer  lg:w-[20%] w-1/5  gap-2 `}>
                        <div className="flex w-full justify-end items-center lg:gap-8 gap-0">
                          <p className="text-white flex justify-end sm:text-sm text-xs font-medium"> {shortenNumber(data?.tokenAAmount)} </p>
                          <div className="lg:w-[50%] w-0">
                            <SVG.ChartProgress data={data?.percentageA} color={data}/>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-end  cursor-pointer transition-all duration-300  lg:w-[25%] w-1/5 gap-2`}>
                        <div className="flex w-full justify-end items-center lg:gap-8 gap-0">
                          <p className="text-white sm:text-sm text-xs font-medium"> {shortenNumber(data?.tokenBAmount)}  </p>
                          <div className="lg:w-[50%] w-0">
                            <SVG.ChartProgress data={data?.percentageB} color={data}/>
                          </div>
                        </div>
                      </div>
                    </>
        
                  ) : (
                    <div
                      className={`flex items-center justify-end transition-all duration-300 cursor-pointer  lg:w-[35%] w-[30%]  gap-2 hover:mt-[-8px]`}>
                      <div className="sm:text-sm text-xs text-white font-normal flex flex-col  justify-center items-center">
                        <p className="text-xs">{data?.tokenAAmount?.toFixed(3)}</p>
                        <p className="text-xs text-[#9f9fa8]">{data?.tokenBAmount?.toFixed(3)}</p>
                      </div>
                    </div>
                  )}
                {/* Wallet Profiler */}
                <div
                  className={`flex items-center  justify-between pr-4 pl-10 cursor-pointer  transition-all duration-300 lg:w-[20%] xs:w-1/5 w-[30%] lg:gap-2 gap-0 `}>
                  <div className="lg:w-6 w-0">
                    <a href={`https://cardanoscan.io/transaction/${data?.hash}`} target = '_blank' rel="noreferrer"> 
                    <img
                      src={IMG.Tappy}
                      alt="riskwise"
                      className="lg:w-6 w-0"
                    />
                    </a>
                    
                  </div>
                  {/* <Link to={`/profiler-search?stake=${data?.address}`}> */}

                  <div
                    // onClick={() => handleButtonClick(isRisk)}
                    onClick={() => redirectWalletWatch(data?.address, idx)}

                    className={`flex justify-between items-center bg-[#142028] gap-1 rounded-lg pr-3 pl-1 py-[3px] transition-all duration-100  hover:border-yellow-300 border-[#121218] border-[2px] text-white`}>
                 {fishIconLoading || clickID === idx ?  <Spinner/> : fishIconDisplay(data?.fish)}
                    <span className="text-[#9f9fa8]">{`❯`}</span>
                  </div>
                  {/* </Link> */}
                </div>
              </div>
              <div className="w-full h-[1px] mt-5 bg-[#232323]"></div>
            </div>
              ))
            }
      </>
    }
    </div> : 
    <div className="flex flex-col">
      <span className="text-red-700 hover:text-red-400 text-center pt-8 cursor-pointer" onClick={() => proDisplay()}>Close X</span>
      <ProLanding/>
      </div>
}
    </div>
    
  
    
    
  )
}
export default ChartTableContent;