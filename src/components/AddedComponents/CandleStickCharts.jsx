import { useRef, useEffect, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { getImage } from "../../baseurl/baseurl";
import Loader from "./Loader/Loader";
import ChartsModal from "./ChartsModal";
import "simplebar-react/dist/simplebar.min.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { chartsModalAction } from "../../store/slices/chartsData";
import Carousel from "./Slide";
import * as SVG from "../../common/Icons";
import { tradingViewLogo } from "../../common/IMG/Images";
import NftModal from "./NftModal";
import TradingViewChart from "../../pages/advancedChart";

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "#00FFFFFF", //Dark background color
      lineColor = "black",
      textColor = "white", //White text color
      areaTopColor = "black",
      areaBottomColor = "black",
    } = {},
  } = props;

  console.log("data by iamsun", data);

  const chartContainerRef = useRef();
  // console.log('Chartdata', data)

  // useEffect(() => {
  //   const handleResize = () => {
  //     chart.applyOptions({ width: chartContainerRef.current.clientWidth });
  //   };
  //   const chart = createChart(chartContainerRef.current, {
  //     layout: {
  //       background: { color: "#0E0F12" },
  //       textColor,
  //     },

  //     width: chartContainerRef.current.clientWidth,
  //     grid: {
  //       vertLines: {
  //         visible: false,
  //       },
  //       horzLines: {
  //         visible: false,
  //       },
  //     },
  //     height: 400,
  //   });
  //   chart.timeScale().fitContent();

  //   const newSeries = chart.addCandlestickSeries({ data: data });
  //   newSeries.setData(data);

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     chart.remove();
  //   };
  // }, [
  //   data,
  //   backgroundColor,
  //   lineColor,
  //   textColor,
  //   areaTopColor,
  //   areaBottomColor,
  // ]);

  return <TradingViewChart data={data}></TradingViewChart>;
  // return <div ref={chartContainerRef} />;
};

function CandleStickChart({
  chartData,
  token,
  type,
  unit,
  isChartLoading,
  onIntervalChange,
  interval,
}) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const showChartsModal = useSelector(
    (state) => state.chartsReducer.showChartsModal
  );
  const handleShowModal = () => {
    dispatch(chartsModalAction.getModalOpen(true));
  };

  const depthData = useSelector((state) => state.chartsReducer.depthData);

  console.log("chartData>>", chartData);

  console.log("unit iamsun", token);
  return (
    <>
      <div
        className="header flex gap-2 items-center px-4 p-4 h-1"
        style={{ width: "auto" }}
      >
        <img
          src={
            unit
              ? getImage + `/image?unit=${unit}`
              : getImage +
                `/image?unit=f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958`
          }
          style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          alt="token"
        />
        <h1
          className="title text-white text-[1.5rem]"
          style={{ color: "white" }}
        >
          {/* {token ? token : 'AGIX'} */}
          {/* <div className="flex items-center ">
            <img
              width={12}
              height={12}
              src={ getImage + `/image?unit=${unit}&w=32`}
              className="2xl:w-0 w-10 2xl:h-0 h-10 lg:ml-2 rounded-full"
              alt="riskwise"
            />
          </div> */}
          <div className="flex flex-col ">
            <div className="flex">
              <p className="text-white  text-sm font-medium">
                {token?.length > 9
                  ? token?.slice(0, 5) + ".."
                  : token
                  ? token
                  : "AGIX"}
              </p>
              <p className="text-[#7b7b7b] text-sm font-medium">/ADA</p>
              <div className="flex items-center ml-1">
                <SVG.WatchList wid={"12"} />
              </div>
            </div>
            {/* <div className="2xl:flex lg:hidden flex">
              <p className="text-white text-sm font-medium">hh</p>
              <div className="flex items-center ml-2">
                <p className="text-[#000] bg-gradient-to-br rounded-xl px-2 py-1 from-yellow-400 via-yellow-300 to-yellow-50 text-xs font-medium">
                  hhgh
                </p>
              </div>
            </div> */}
          </div>
        </h1>

        <i
          className="fa-solid fa-plus text-white text-[1rem] hover:text-yellow-500 cursor-pointer"
          onClick={handleShowModal}
        />
        <Carousel depthData={depthData} />
        <Modal
          isOpen={showChartsModal}
          onRequestClose={handleShowModal}
          className="custom-modalcontent"
          overlayClassName="custom-modaloverlay"
        >
          {type === "token" || !type ? <ChartsModal /> : <NftModal />}
        </Modal>
        {/*   */}
      </div>

      <div className="h-[50vh]">
        {isChartLoading ? (
          <div className="flex justify-center items-center rounded-lg h-[50vh]">
            <Loader /> 
          </div>
        ) : (
          <div className="relative">
            {/* <ChartComponent
            data={chartData}
            colors={{ backgroundColor: "#1e1e1e", textColor: "white" }}
          /> */}
            {token ? (
              <TradingViewChart
                data={chartData}
                token={token}
                onIntervalChange={onIntervalChange}
                interval={interval}
              ></TradingViewChart>
            ) : (
              <TradingViewChart
                data={chartData}
                token={"AGIX"}
                onIntervalChange={onIntervalChange}
                interval={interval}
              ></TradingViewChart>
            )}
            {/* <a
            href="https://www.tradingview.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="flex items-center gap-2 absolute bottom-5 left-5 rounded-full w-66 cursor-pointer bg-gray-900"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={tradingViewLogo}
                alt="tradingView"
                // title="TradingView charts"
                className="rounded-full w-8 "
                style={{ zIndex: "1" }}
              />
              <span
                className={`text-white text-sm font-bold ${
                  isHovered ? "reveal-text" : "hidden-text"
                }`}
              >
                <span>Chart&nbsp;</span>
                <span>by&nbsp;</span>
                <span className="pe-4">TradingView</span>
              </span>
            </div>
          </a> */}
          </div>
        )}
      </div>
    </>
  );
}

export default CandleStickChart;
