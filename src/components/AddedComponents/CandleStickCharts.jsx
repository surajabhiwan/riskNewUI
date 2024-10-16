import { useRef, useEffect, useState } from "react";
import { createChart, ColorType } from "lightweight-charts";
import { getImage, ip } from "../../baseurl/baseurl";
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

import axios from "axios";

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
  const [imageSrc, setImageSrc] = useState(""); // State for the image source
  const showChartsModal = useSelector(
    (state) => state.chartsReducer.showChartsModal
  );
console.log("chartData, and unit", chartData, unit);
  const handleShowModal = () => {
    dispatch(chartsModalAction.getModalOpen(true));
  };

  const depthData = useSelector((state) => state.chartsReducer.depthData);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${ip}/api/assets-image/${unit}?hash=${unit}`  // Using `unit` as `hash`
        );
        if (response.status === 200) {
          console.log("Image API response:", response);
          setImageSrc(response?.data?.image);  // Assuming `imageUrl` in response
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageSrc("");  // Set a fallback image on error
      }
    };
  
    if (unit) {
      fetchImage();  // Call the fetch function if `unit` is available
    }
  }, [unit]);
  

  return (
    <>
      <div
        className="header flex gap-2 items-center px-4 p-4 h-1"
        style={{ width: "auto" }}
      >
        <img
          src={imageSrc}
          style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          alt="token"
        />
        <h1
          className="title text-white text-[1.5rem]"
          style={{ color: "white" }}
        >
          <div className="flex flex-col ">
            <div className="flex">
              <p className="text-white text-sm font-medium">
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
      </div>

      <div className="h-[50vh]">
        {isChartLoading ? (
          <div className="flex justify-center items-center rounded-lg h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="relative">
            {token ? (
              <TradingViewChart
                data={chartData}
                token={token}
                onIntervalChange={onIntervalChange}
                interval={interval}
              />
            ) : (
              <TradingViewChart
                data={chartData}
                token={"AGIX"}
                onIntervalChange={onIntervalChange}
                interval={interval}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CandleStickChart;
