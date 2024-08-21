/* eslint-disable react-hooks/exhaustive-deps */
// import TradingViewWidget from "react-tradingview-widget";
import ChartTable from "./ChartTable";
import ProLanding from "../Pro/ProLanding";
import { useEffect, useState } from "react";
import CandleStickChart from "../AddedComponents/CandleStickCharts";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import {
  candleStickApi,
  candleStickNftApi,
  getNftCollectionAPi,
  tokenDepthDetails,
  nftDepthDetails,
} from "../../baseurl/baseurl";
import { useDispatch, useSelector } from "react-redux";
// import chartsData, { chartsAction } from "../../store/slices/chartsData";
// import ChartsTrendingToken from "../AddedComponents/ChartsTrendingToken";

// import SelectComp from "../AddedComponents/Select";
import { decryption, encryption } from "../../functions/crypto";
import NftCollection from "../AddedComponents/NftCollection";
import { chartsAction } from "../../store/slices/chartsData";
import { useSearchParams } from "react-router-dom";

const ChartContent = () => {
  const [getInterval, setInterval] = useState("1h");
  const [isRisk, setIsRisk] = useState(false);
  const handleButtonClick = () => {
    setIsRisk(!isRisk);
  };
  const [searchParams] = useSearchParams();

  // Extracting values from search params
  const token = searchParams.get("token");
  const unit = searchParams.get("unit");
  const pairID = searchParams.get("pairID");
  const type = searchParams.get("type");

  const [chartData, setChartData] = useState([]);

  const [isChartLoading, setIsChartLoading] = useState(false);

  // const [depthDetails, setDepthDetails] = useState([])

  const [nftCollection, setNftCollection] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCandleChartsData = async (interval) => {
    setInterval(interval);
    setIsChartLoading(true);
    const data = {
      unit: unit
        ? unit
        : "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958",
      interval: interval || "1h",
      counts: "2000",
    };
    const encData = {
      key: encryption(data),
    };
    try {
      console.log("unit", unit);
      const response = await axios.post(candleStickApi, encData);
      const result = decryption(response?.data);
      setChartData(result?.tokenOHLCV);
      console.log("setChartDataToken", result);
      setIsChartLoading(false);
    } catch (error) {
      console.error("chartsapi", error);
      setIsChartLoading(false);
    }
    setIsChartLoading(false);
  };

  const fetchCandleChartsDataNft = async (interval) => {
    setInterval(interval);
    const data = {
      policyId: pairID
        ? pairID
        : "afe2e7cdf682ce7b604d2ad30b1171a3eb5867126f066f0eb6a498ef",
      interval: interval || "1h",
      counts: "2000",
    };

    const encData = {
      key: encryption(data),
    };
    setIsChartLoading(true);
    try {
      const response = await axios.post(candleStickNftApi, encData);
      const result = decryption(response?.data);
      setChartData(result?.NFTOHLCV);
      console.log("resultChh", result);
      console.log("setChartData", result);
      setIsChartLoading(false);
    } catch (error) {
      console.error("chartsapi", error);
      setIsChartLoading(false);
    }
    setIsChartLoading(false);
  };

  const getNftCollection = async () => {
    setIsCollectionLoading(true);
    const data = {
      policyId: pairID,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      const response = await axios.post(getNftCollectionAPi, encryptedData);
      const result = decryption(response?.data);
      console.log("getNftCollection", result);
      setNftCollection(result?.NFTCollection);
      setIsCollectionLoading(false);
    } catch (error) {
      console.log(error);
      setIsCollectionLoading(false);
    }
  };

  useEffect(() => {
    if (type === "nft") {
      fetchCandleChartsDataNft();
      getNftCollection();
    } else {
      fetchCandleChartsData();
    }
  }, [unit]);

  const handleIntervalChange = (newInterval) => {
    console.log("handlerIntervalChange Run Hogya iamsun");
    if (type === "nft") {
      fetchCandleChartsDataNft(newInterval);
    } else {
      fetchCandleChartsData(newInterval);
    }
  };

  return (
    <div className="flex w-full h-full justify-between p-0 md:p-4 lg:p-2 xl:p-2 ">
      {/* chart */}
      <div className="w-full h-full rounded-xl">
        <div
          style={{
            boxShadow: "0px 0px 20px 1px #ffbb763f",
            borderRadius: "10px",
          }}
          className="h-full w-full rounded-xl p-2"
        >
          <CandleStickChart
            chartData={chartData}
            token={token}
            unit={unit}
            type={type}
            pairID={pairID}
            isChartLoading={isChartLoading}
            onIntervalChange={handleIntervalChange}
            interval={getInterval}
          />
        </div>
        <ChartTable
          isRisk={isRisk}
          handleButtonClick={handleButtonClick}
          type={type}
          pairID={pairID}
          unit={unit}
        />
        {isCollectionLoading ? (
          <div>
            <SkeletonTheme baseColor="#142028" highlightColor="#444">
              <p>
                <Skeleton count={10} height={50} />
                <Skeleton count={10} height={50} />
                <Skeleton count={10} height={50} />
                <Skeleton count={10} height={50} />
              </p>
            </SkeletonTheme>
          </div>
        ) : (
          <NftCollection type={type} pairID={pairID} data={nftCollection} />
        )}

        {isRisk && <ProLanding />}
      </div>
    </div>
  );
};

export default ChartContent;
