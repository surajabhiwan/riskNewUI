import * as echarts from "echarts/core";

export const series = [
  {
    name: "Minswap",
    type: "line",
    data: [
      "43129.8700",
      "11287.1000",
      "68123.0600",
      "33873.0200",
      "14110.0600",
      "73451.5300",
      "39560.2500",
      "69953.8000",
      "10688.0200",
      "48113.8000",
      "33873.0200",
      "14110.0600"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  },
  {
    name: "WingRiders",
    type: "line",
    data: [
      "23129.8700",
      "51287.1000",
      "38123.0600",
      "73873.0200",
      "24110.0600",
      "43451.5300",
      "19560.2500",
      "59953.8000",
      "20688.0200",
      "78113.8000",
      "43451.5300",
      "19560.2500"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  },
  {
    name: "MuesliSwap",
    type: "line",
    data: [
      "13129.8700",
      "41287.1000",
      "78123.0600",
      "33873.0200",
      "24110.0600",
      "63451.5300",
      "19560.2500",
      "49953.8000",
      "70688.0200",
      "28113.8000",
      "13129.8700",
      "41287.1000"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  },
  {
    name: "VyFinance",
    type: "line",
    data: [
      "23129.8700",
      "51287.1000",
      "18123.0600",
      "83873.0200",
      "34110.0600",
      "63451.5300",
      "19560.2500",
      "59953.8000",
      "20688.0200",
      "78113.8000",
      "19560.2500",
      "59953.8000"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  },
  {
    name: "Spectrum",
    type: "line",
    data: [
      "465060.1600",
      "522378.2100",
      "348193.7500",
      "557336.6800",
      "570430.7300",
      "435428.7800",
      "581757.7500",
      "421526.3500",
      "521364.7200",
      "501346.1500",
      "570430.7300",
      "435428.7800"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  },
  {
    name: "SundaeSwap",
    type: "line",
    data: [
      "63129.8700",
      "21287.1000",
      "68123.0600",
      "63873.0200",
      "74110.0600",
      "23451.5300",
      "59560.2500",
      "19953.8000",
      "30688.0200",
      "68113.8000",
      "74110.0600",
      "23451.5300"
    ],
    smooth: true,
    lineStyle: {
      width: 2
    },
    emphasis: {
      focus: "series"
    },
    showSymbol: false
  }
];

export const dataVolume = [
  {
    type: "line",
    smooth: "true",
    emphasis: {
      focus: "series"
    },
    showSymbol: false,
    data: [
     30,300,3,
    ],
    areaStyle: {
      color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "green" },
              { offset: 0.05, color: "green" },
              { offset: 1, color: "#142028" }
            ])
    }
  },
];