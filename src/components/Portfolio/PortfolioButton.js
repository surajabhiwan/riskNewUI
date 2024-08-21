import { useState } from "react";
import * as SVG from "../../common/Icons";

const PortfolioButton = (props) => {
  const data = props.data
  const [size, setSize] = useState("24")
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`flex items-center p-3 mt-2 rounded-2xl ${data.active ? "blueBg" : "bg-gradient-to-r from-[#142028] to-[#121212]"} cursor-pointer relative`}>
      <div className="flex gap-4 w-full">
        <div className="flex justify-center items-center">
          {data.svg === "Portfolio" ? <SVG.Portfolio size={size} /> : ""}
          {data.svg === "Yoroi" ? <SVG.WalletProfiler size={size} /> : ""}

        </div>
        <div className="flex flex-col items-start gap-2 max-w-[70%]">
          <p className={`w-full ${data?.id === 0 ? 'text-black' : 'text-white'}  font-normal whitespace-nowrap inline-block  overflow-hidden text-ellipsis`}>{data.value}</p>
          <p className={`${data?.id === 0 ? 'text-black' : 'text-white'} font-normal`}>{data?.price ? data?.price : '0'} ₳</p>
        </div>
      </div>

      {/* {isActive ?
        <div
          className="bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full w-3 h-3 absolute right-4"></div>
        : ""} */}
        
    </div>
  )
}

export default PortfolioButton