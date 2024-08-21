import { useRef, useEffect, useState } from "react";
import { createChart } from "lightweight-charts";
import { getImage } from "../../baseurl/baseurl";
import "simplebar-react/dist/simplebar.min.css";
import Loader from "../../components/AddedComponents/Loader/Loader";
import { tradingViewLogo } from "../../common/IMG/Images";
import TradingViewChart from "../advancedChart";

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "#142028", //Dark background color
      lineColor = "black",
      textColor = "white", //White text color
      areaTopColor = "black",
      areaBottomColor = "black",
    } = {},
  } = props;

  const chartContainerRef = useRef();
  console.log("Chartdata", data);
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#" },
        textColor,
      },

      width: chartContainerRef.current.clientWidth,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      height: 500,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({ data: data });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

function MultiCharts({ chartData, token, unit, isChartLoading }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="header flex gap-2 items-center px-4 p-4 h-1.5 pb-[30px]">
        <img
          src={getImage + `/image?unit=${unit}`}
          style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          alt="token"
        />
        <h1
          className="title text-white text-[1.5rem]"
          style={{ color: "white" }}
        >
          {token}
        </h1>
      </div>
      {isChartLoading ? (
        <div className="flex justify-center items-center p-28 ">
          <Loader />
        </div>
      ) : (
        <div className="relative">
          {/* <ChartComponent data={chartData} colors={{ backgroundColor: '#1e1e1e', textColor: 'white' }} /> */}
          <TradingViewChart data={chartData} token={token}></TradingViewChart>
          {/* <a
            href="https://www.tradingview.com/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <div
              className=" flex items-center gap-2 absolute bottom-5 left-5 rounded-full w-66 cursor-pointer bg-gray-900"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={tradingViewLogo}
                alt="tradingView"
                // title="TradingView charts"
                className="rounded-full w-10 "
                style={{ zIndex: "1" }}
              />
              <span
                className={`text-white text-sm pe-4 font-bold ${
                  isHovered ? "block" : "hidden"
                }`}
              >
                Chart by TradingView
              </span>
            </div>
          </a> */}
        </div>
      )}
    </>
  );
}
export default MultiCharts;
