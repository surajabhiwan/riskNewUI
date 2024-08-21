import ChartTableHeader from "./ChartTableHeader"
// import * as IMG from "../../common/IMG/Images";
import ChartTableContent from "./ChartTableContent";
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState } from "react";
import { tokenHistoryApi, walletPositionApi } from "../../baseurl/baseurl";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { decryption, encryption } from "../../functions/crypto";
import { chartsAction } from "../../store/slices/chartsData";

const ChartTable = (props) => {
  const [tradeHistory, setTradeHistory] = useState([])
  const [tradeLoading, setTradeLoading] = useState(false)
  const [fishIconLoading, setFishIconLoading] = useState(false)
  const { unit, type } = props;

const dispatch = useDispatch()
const { tradeHistoryData } = useSelector((state)=>state.chartsReducer)

const fetchTradeData = async () => {
  setTradeLoading(true);
  const data = {
    unit: unit || 'f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958',
    timeFrame: "24h",
  };
  const encryptedData = {
    key: encryption(data),
  };

  try {
    const response = await axios.post(tokenHistoryApi, encryptedData);
    const result = decryption(response?.data);
    const tradeData = result?.tokenTrades;

    console.log('tradeDataChart', tradeData);
    setTradeHistory(tradeData);
    dispatch(chartsAction.setTradeHIstoryData(tradeData));

    const maxPriceA = Math.max(...tradeData?.map(item => item?.tokenAAmount));
    const maxPriceB = Math.max(...tradeData?.map(item => item?.tokenBAmount));

    const dataWithPercentage = tradeData?.map(item => ({
      ...item,
      percentageA: (item?.tokenAAmount / maxPriceA) * 100,
      percentageB: (item?.tokenBAmount / maxPriceB) * 100,
    }));
    setTradeHistory(dataWithPercentage);
    dispatch(chartsAction.setTradeHIstoryData(dataWithPercentage));
    setTradeLoading(false);
    setFishIconLoading(true)

    const dataWithFish = await Promise.all(
      dataWithPercentage?.map(async (d) => {
        const encryptedAddress = encryption({ address: d?.address });
        const fishResponse = await axios.post(walletPositionApi, { key: encryptedAddress });
        const fishResult = decryption(fishResponse?.data);
        const fish = fishResult?.walletPosition?.adaValue
        return { ...d, fish };
      })
    );
    console.log('tradeDataChart2', dataWithFish);
    setTradeHistory(dataWithFish);
    dispatch(chartsAction.setTradeHIstoryData(dataWithFish));
    setFishIconLoading(false)
  } catch (error) {
    console.log('Error fetching trade history', error);
    setTradeLoading(false);
    setFishIconLoading(false)
  } 
};

  
  useEffect(()=>{
    fetchTradeData()
  },[unit])



  return (
    <div
      style={{ background: "#0b1217", borderRadius: "10px" }}
      className={`bg-[#0b1217] h-full rounded-xl mt-8 p-4 ${type === 'nft' ? 'hidden' : 'block'}`}>
      
      {/* Table Header */}
      <ChartTableHeader tradeHistory={tradeHistory} />
        {/* Chart Table Content */}
        <SimpleBarReact className='h-[550px] '>
            <ChartTableContent tradeHistory={tradeHistoryData} tradeLoading={tradeLoading} fishIconLoading={fishIconLoading} />
      </SimpleBarReact>
    </div>
  )
}

export default ChartTable
