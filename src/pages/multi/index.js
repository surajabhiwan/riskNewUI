import { useEffect, useState } from "react";
import MultiHeader from "./multiHeader";
import * as SVG from "../../common/Icons";
// import MultiSearch from "./multiSearch";
// import TradingViewWidget from "react-tradingview-widget";
// import { Cornucopias } from "../../common/IMG/Images";
import Modal from "react-modal";
import ChartsModal from "../../components/AddedComponents/ChartsModal";
import { useDispatch, useSelector } from "react-redux";
import { chartsModalAction } from "../../store/slices/chartsData";
import { useSearchParams } from "react-router-dom";
import { candleStickApi } from "../../baseurl/baseurl";
import axios from "axios";
import MultiCharts from "./MultiCharts";
import { decryption, encryption } from "../../functions/crypto";
import SignalLoader from "../../components/AddedComponents/Loader/SignalLoader";
import SwapDex from "../../components/AddedComponents/Swap";
import Swap from "@dexhunterio/swaps";

const Multi = () => {
  const [number, setNumber] = useState(0);
  const [remainNumber, setRemainNumber] = useState(10);
  const [data, setData] = useState([]);

  const [chartData, setChartData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const showChartsModal = useSelector(
    (state) => state.chartsReducer.showChartsModal
  );
  const handleShowModal = () => {
    dispatch(chartsModalAction.getModalOpen(false));
    fetchCandleChartsData();
  };
  const token = searchParams.get("token");
  const unit = searchParams.get("unit");

  // Define a cache object to store fetched data
  const dataCache = {};

  const fetchCandleChartsData = async (unit) => {
    console.log("unit", typeof unit);
    const cacheKey = `${unit}_30m`;
    if (dataCache[cacheKey]) {
      // If data exists in cache, return cached data
      setChartData(dataCache[cacheKey]);
      setIsChartLoading(false);
      return dataCache[cacheKey];
    }

    const requestData = {
      unit: unit,
      interval: "30m",
    };
    const encryptedData = {
      key: encryption(requestData),
    };
    setIsChartLoading(true);
    try {
      const response = await axios.post(candleStickApi, encryptedData);
      const result = decryption(response?.data);
      console.log("resultMulti", result);
      setChartData(result?.tokenOHLCV);

      // Cache the fetched data
      dataCache[cacheKey] = result?.tokenOHLCV;

      setIsChartLoading(false);
      return result?.tokenOHLCV;
    } catch (error) {
      console.error("chartsapi", error);
      setIsChartLoading(false);
    }
  };

  const handleClick = async (token, unit) => {
    // console.log("token",token)

    if (unit && token) {
      setNumber((prev) => prev + 1);
      fetchCandleChartsData(unit)
        .then((chartData) => {
          console.log("chartData>>>", chartData);
          const newData = {
            id: number,
            active: false,
            token: token,
            chartData: chartData,
            unit: unit, // Storing unit information with data
          };
          const updatedData = [...data, newData];
          console.log("updatedData>>>", updatedData);
          setData(updatedData?.slice(0, 6));
        })
        .catch((err) => {
          console.log("error****", err);
        });
    }
    // Limiting the data to 6 items
  };

  const handleDelete = (deletedId) => {
    const updatedData = data?.filter((item) => item?.id !== deletedId);
    setData(updatedData);
    setNumber((prevNumber) => Math.max(prevNumber - 1, 0));
  };

  useEffect(() => {
    setRemainNumber(6 - number);
  }, [number]);

  const handleTrueModal = () => {
    dispatch(chartsModalAction.getModalOpen(true));
  };

  return (
    <div className="flex flex-col overflow-y-hidden gap-6 items-center justify-center w-full h-full pb-10 lg:px-0 px-6">
      <MultiHeader />
      {/* <MultiSearch /> */}
      <div className="flex flex-wrap gap-10 w-full justify-center">
        {data?.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{ background: "#142028", borderRadius: "10px" }}
              className="bg-[#142028] h-[590px] lg:h-[690px] lg:w-[30%] w-full rounded-xl p-3"
            >
              <div className="flex justify-between">
                <p className="flex justify-center text-white text-sm font-medium"></p>
                <div
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center"
                >
                  <SVG.Close />
                </div>
              </div>
              {/* <TradingViewWidget
                theme="Dark"
                symbol="BITSTAMP:ETHUSD"
                width="80%"
                backgroundColor="#000"
              /> */}
              <MultiCharts
                chartData={item?.chartData}
                token={item?.token}
                unit={item?.unit}
              />
              {/* <Swap partnerCode="riskwisepro6164647231717939337676676a3732353376647467717661726375663775667434397971356834327565777763667538757865703935326668646a6e747074377835727673797236676c66686d716b75327035667678786d6e72397266676a63737a6463743678da39a3ee5e6b4b0d3255bfef95601890afd80709"
                  partnerName="RiskWisePro"
                // displayType="FULL" width={useXlLarge ? `25rem` : `20rem`}
                supportedTokens={[`${item?.unit}`]}
            /> */}
            </div>
          );
        })}

        <div
          className={`flex justify-center items-center lg:w-[30%] w-full bg-[#142028] rounded-xl h-[590px] lg:h-[690px]${
            remainNumber === 0 ? "hidden" : ""
          }`}
        >
          {isChartLoading ? (
            <SignalLoader />
          ) : (
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <div
                onClick={handleTrueModal}
                className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer"
              >
                <div className="flex justify-center items-center w-6 h-6 cursor-pointer">
                  <SVG.Plus />
                </div>
              </div>
              <p className="text-white text-lg font-normal">Add new chart</p>
              <p className="text-[#9f9fa8] text-sm font-normal">
                {remainNumber} of 6 slots remaining
              </p>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={showChartsModal}
        onRequestClose={handleShowModal}
        className="custom-modalcontent"
        overlayClassName="custom-modaloverlay"
      >
        <ChartsModal type={"multi"} handleClick={handleClick} />
      </Modal>
    </div>
  );
};

export default Multi;
