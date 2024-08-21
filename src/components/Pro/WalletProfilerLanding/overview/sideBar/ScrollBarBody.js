import { useState, useEffect, forwardRef } from "react";
import Slider from "react-slick";

import { sideBarData1 as data1 } from "./fakeData";
import { sideBarData2 as data2 } from "./fakeData";
import { sideBarData3 as data3 } from "./fakeData";
import { useSelector } from "react-redux";
import { getImage, getImageNft } from "../../../../../baseurl/baseurl";
import { convertMillion } from "../../../../../functions/functions";

const ScrollBarBody = forwardRef((props, ref) => {
  const [total1, setTotal1] = useState(0);

  const { walletProfilerBalance, holdingNft } = useSelector((state) => state.walletProfilerReducer);
  

  useEffect(() => {
    var total1 = 0;
    for (var i = 0; i <= data1.length - 1; i++) {
      total1 += data1[i].holdings;
      setTotal1(total1);
    }
  
  }, [data1]);


////current holding risk
  return (
    <div className="w-full h-[250px] rounded-xl p-2 lg:bg-gradient-to-b lg:from-[#142028] lg:to-[#0b1217] bg-[#142028]">
      {/* <Slider ref={ref} className="static" arrows={false} {...settings}> */}
        <div className="space-y-2 h-[250px] overflow-y-scroll dropdownScrollbar">
          {holdingNft?.map((item, id) => (
            <div key={id} className="flex items-center w-full space-x-2 px-1">
              <div className="rounded-full w-8">
              {
                item?.image ?
                <img src={getImageNft + `/${item?.image}`} alt="img" className="w-full rounded-full" /> :
                (<div className="xl:w-8 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 xl:h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#00008B'}}>
                  <span className="text-white font-medium">{item?.name?.split('')[0]}</span>
                 </div>)
              }
        
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-between w-full">
                  <span className="whitespace-nowrap text-white text-sm">
                  {item?.name}
                  </span>
                  <span className="whitespace-nowrap text-white text-sm">
                    {item?.adaValue} ₳
                  </span>
                </div>
                <div className="w-full">
                  <div className="w-full h-1 rounded-full bg-[#3a4956]">
                    <div
                      className="h-1 rounded-full bg-green-500"
                      // style={{ width: `${(item?.holdings * 100) / total1}%` }}
                      
                      style={{ width: `${( item?.adaValue / item?.maxPrice) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
            {walletProfilerBalance?.walletPosition?.positionsFt?.map((item, id) => (
            <div key={id} className="flex items-center w-full space-x-2 px-1">
              <div className="rounded-full w-8">
                {/* <img src={`https://ipfs.io/ipfs/${item?.res?.detail?.onchain_metadata?.files[0]?.src?.split('//')?.[1]}`} alt="img" className="w-full rounded-full" /> */}



                { item?.unit && item?.unit?.length > 5 ?
                      <img 
                      width={40}
                      height={40}
                      style={{borderRadius: '50%'}}
                      src={  `${getImage}/image?unit=${item?.unit}&w=32`} className="w-full rounded-full logo" 
                      alt="riskWise" 
                  /> 
                  :  (<div className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: '#00008B'}}>
                  <span className="text-white font-medium">{item?.ticker?.split('')[0]}</span>
                 </div>)
          }



                {/* <img src={getImage + `/image?unit=${item?.unit}&w=32`} alt="img" className="w-full rounded-full" /> */}
                {/* <img src={getImage + `/image?unit=${data?.unit}&w=32`} */}
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-between w-full">
                  <span className="whitespace-nowrap text-white text-sm">
                  {item?.ticker}
                  </span>
                  <span className="whitespace-nowrap text-white text-sm">
                    {convertMillion(item?.adaValue)} ₳
                  </span>
                </div>
                <div className="w-full">
                  <div className="w-full h-1 rounded-full bg-[#3a4956]">
                    <div
                      className="h-1 rounded-full bg-green-500"
                      // style={{ width: `${(item?.holdings * 100) / total1}%` }}
                      // style={{ width: `${pricePercentage(item?.adaValue)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="space-y-2 h-[250px] overflow-y-scroll dropdownScrollbar">{changeContent()}</div> */}
      {/* </Slider> */}
    </div>
  );
});

export default ScrollBarBody;
