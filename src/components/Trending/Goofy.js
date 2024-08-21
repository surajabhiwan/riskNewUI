import * as SVG from "../../common/Icons";
import { data } from "../../common/IMG/Images";

const Goofy = () => {

  return (
    <>
      <div
        id="goofy"
        className={`flex items-center justify-between w-full cursor-pointer p-2 transition-all duration-300 transform hover:bg-[#3a4956] hover:bg-opacity-60 hover:rounded-lg`} >
        <div className="flex items-center">
          <p className="text-[#939393]">{data[10].id}</p>
          <img 
          width="10px"
          height="10px"
          src={data[10].image} className="w-10 h-10 ml-2 rounded-full" alt="riskwise" />
          <div className="ml-2">
            <p className="text-white text-sm font-normal max-2xl:max-w-[80px] truncate">{data[10].name}</p>
            <p className="text-[#939393] text-sm font-normal">{data[10].price1}</p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-end">
            <SVG.GoDown />
            <p className="text-[#ff422b] text-sm font-normal ml-1">{data[10].percent}</p>
          </div>
          <p className="text-[#939393] text-sm font-normal">{data[10].price2}</p>
        </div>
      </div>
    </>
  )
}
export default Goofy;