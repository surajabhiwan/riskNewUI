import { useState, useEffect } from "react";
import * as SVG from "../../../../../common/Icons";
import { useSelector } from "react-redux";
import { convertMillion } from "../../../../../functions/functions";

const Liquid = () => {
  const [visible, setVisible] = useState(false);
  const [handleClass, setHandleClass] = useState("hidden");

  const { walletProfilerBalance } = useSelector(
    (state) => state.walletProfilerReducer
  );

  const handleShow = () => {
    setVisible(!visible);
  };

  console.log("walletProfilerBalance", walletProfilerBalance);

  useEffect(() => {
    if (visible === true) {
      setHandleClass("flex justify-center");
    } else setHandleClass("hidden");
  }, [visible]);

  return (
    <div className="lg:space-y-2">
      <div className="lg:flex lg:items-baseline lg:space-x-2 lg:space-y-0 space-x-0 space-y-2">
        <span className="whitespace-nowrap text-white text-3xl pr-2">
          {walletProfilerBalance?.walletPosition
            ? convertMillion(walletProfilerBalance?.walletPosition?.adaValue)
            : "0"}{" "}
          ₳
        </span>
        <span className="lg:block hidden text-[#9f9fa8]">/</span>
        <div className="flex items-baseline space-x-2 text-[#9f9fa8]">
          <span className="">
            {walletProfilerBalance?.walletPosition
              ? convertMillion(
                  walletProfilerBalance?.walletPosition?.liquidValue
                )
              : "0"}{" "}
            ₳ liquid
          </span>
          <div className="relative">
            <div
              className="absolute -bottom-[2px]"
              onMouseEnter={handleShow}
              onMouseLeave={handleShow}
            >
              <SVG.Notification />
            </div>
            <div className={handleClass}>
              <div className="absolute -top-14 p-[6px] rounded-[10px] bg-[rgba(92,94,105,.3)] backdrop-blur-[10px] text-sm text-[#fff] whitespace-nowrap z-[100]">
                <span className="max-lg:hidden">
                  Value that can be instantly converted into ADA at this point
                  in time
                </span>
                <span className="lg:hidden">Value of available liquidity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-[#9f9fa8] text-xl">$ 0</div> */}
    </div>
  );
};

export default Liquid;
