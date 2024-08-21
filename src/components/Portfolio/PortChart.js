import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";

import { dataVolume } from "./FakeData";
import { useSelector } from "react-redux";
import { timestampToUTC } from "../../functions/functions";
import { useEffect } from "react";

const PortChart = () => {
  echarts.use([LineChart]);


  useEffect(()=>{

  },[])
  const { walletData } = useSelector((state) => state.wallet);
  console.log('walletData>>>', walletData)

  const optionBar = {
    // backgroundColor:"white",
    color: "green",
    tooltip: {
      padding: [16, 16, 8, 16],
      backgroundColor: "#121218",
      extraCssText:
        "pointer-events: all; overflow: auto; max-width: 400px;white-space: normal; boxShadow: 0px 4px 12px 0px rgba(0, 0, 0, .1);border-radius: 4px; max-height: 200px;",
      textStyle: {
        color: "#fff",
        fontSize: 12,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, "PingFang SC", "Helvetica Neue",Helvetica, Arial, "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;'
      },
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      show: false
    },
    grid: {
      top: "20%",
      left: "4%",
      right: "4%",
      bottom: "5%",
      containLabel: true
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#9f9fa8"
        }
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisTick: { show: false },
     
      // data:[
      //   "12/03/2024",
      //   "12/03/2024",
      //   "12/03/2024",
      //   "12/03/2024",
      //   "12/03/2024",
      // ],
      data: walletData?.walletTrend?.map((data)=>timestampToUTC(data?.time)?.split(' ')?.[0])
    },
    // series: dataVolume
    series: [
      {
        type: "line",
        smooth: "true",
        emphasis: {
          focus: "series"
        },
        showSymbol: false,
        data: walletData?.walletTrend?.map((data)=>data?.value),
        areaStyle: {
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "green" },
                  { offset: 0.05, color: "green" },
                  { offset: 1, color: "#142028" }
                ])
        }
      },
    ]
  };

  return (
    <div className="w-full right-0 top-0 h-96 rounded-2xl">
      <div className="">
        <ReactEChartsCore
          echarts={echarts}
          option={optionBar}
          style={{ height: 350 }}
        />
      </div>
    </div>
  );
};

export default PortChart;
