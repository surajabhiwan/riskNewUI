import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
class MyCustomDatafeed {
  constructor(data, token) {
    this.data = data;
    this.token = token;
    this.onReady = this.onReady.bind(this);
    this.resolveSymbol = this.resolveSymbol.bind(this);
    this.getBars = this.getBars.bind(this);
    this.subscribeBars = this.subscribeBars.bind(this);
    console.log("data from main component iamsun", data);
  }

  subscribeBars(symbolInfo, resolution, onRealtimeCallback, listenerGuid) {
    console.log("Subscribed to bars:", symbolInfo, resolution);
    // Implement real-time bar subscription logic here
  }

  onReady(callback) {
    setTimeout(() => {
      callback({
        supports_search: true,
        supports_group_request: false,
        // supported_resolutions: ["60"],
        supported_resolutions: [
          "60",
          "D",
          // "2D",
          // "3D",
          "W",
          // "3W",
          // "M",
          // "6M",
          // "Y",
        ],

        supports_marks: false,
        supports_timescale_marks: false,
      });
    }, 0);
  }

  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    const finalToken = this.token;
    setTimeout(() => {
      if (symbolName === finalToken) {
        onSymbolResolvedCallback({
          name: finalToken,
          session: "24x7",
          timezone: "Etc/UTC",
          // session: "0930-1600",
          // timezone: "America/New_York",
          minmov: 1,
          minmov2: 0,
          pointvalue: 1,
          has_intraday: true,
          visible_plots_set: "ohlcv",
          description: finalToken,
          type: "stock",
          supported_resolutions: [
            "60",
            "D",
            // "2D",
            // "3D",
            "W",
            // "3W",
            // "M",
            // "6M",
            // "Y",
          ],
          pricescale: 100,
          ticker: finalToken,
          // exchange: "NASDAQ",
          has_daily: true,
          format: "price",
        });
      } else {
        onResolveErrorCallback("unknown_symbol");
      }
    });
  }

  getBars(
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) {
    const { from, to, countBack } = periodParams;
    const finalToken = this.token;
    console.log("getBars periodParamss:", periodParams);
    console.log(
      `from${new Date(from)} to ${new Date(to)} countBack ${countBack}`
    );

    setTimeout(() => {
      if (symbolInfo.ticker === finalToken) {
        try {
          const data = this.data;
          if (data.length === 0) {
            // "noData" should be set if there is no data in the requested period
            onHistoryCallback([], { noData: true });
            return;
          }
          let bars = [];
          data.forEach((bar) => {
            if (bar.time >= from && bar.time < to) {
              bars = [
                ...bars,
                {
                  time: bar.time * 1000,
                  low: bar.low,
                  high: bar.high,
                  open: bar.open,
                  close: bar.close,
                  volume: bar.volume,
                },
              ];
            }
          });
          console.log(`[getBars]: returned ${bars.length} bar(s)`);
          onHistoryCallback(bars, { noData: false });
        } catch (error) {
          console.log("[getBars]: Get error", error);
          onErrorCallback(error);
        }
      } else {
        onHistoryCallback([], { noData: true });
      }
    }, 0);
  }
}

const TradingViewChart = ({ data, token, onIntervalChange, interval }) => {
  console.log("interval received from parent iamsunn", interval);
  // const containerId = "tv_chart_container";
  // const containerId = useRef(uuidv4());
  // console.log("container id iamsun",containerId);
  // const containerId = token;
  const uniqueId = useRef(uuidv4()); // Generate a unique ID for each instance
  const containerId = `tv_chart_container_${uniqueId.current}`;
  console.log("token type", typeof token);
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  useEffect(() => {
    const loadTradingView = () => {
      if (!window.TradingView) {
        // TradingView library script not loaded yet, retry after a short delay
        setTimeout(loadTradingView, 100);
        return;
      }

      initOnReady();
    };

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src = "charting_library/charting_library.standalone.js";

    //   const script2 = document.createElement('script');
    //   script2.type = 'text/javascript';
    //   script2.src = 'datafeeds/udf/dist/bundle.js';

    document.body.appendChild(script1);
    //   document.body.appendChild(script2);

    //   script1.onload = script2.onload = loadTradingView;
    script1.onload = loadTradingView;

    return () => {
      document.body.removeChild(script1);
      // document.body.removeChild(script2);
    };
  }, [containerId, token]);

  const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  // useEffect(() => {
  //   if (containerRef?.current) {
  //     initOnReady();
  //   }
  // }, [containerRef, token]);

  const initOnReady = () => {
    if (!containerRef.current || !window.TradingView) {
      return;
    }
    const datafeedUrl = "https://demo-feed-data.tradingview.com";
    const customDataUrl = getParameterByName("dataUrl");

    const widget = new window.TradingView.widget({
      // fullscreen: true,
      symbol: token,
      interval: interval || "1H",
      container: containerId,
      datafeed: new MyCustomDatafeed(data, token),
      library_path: "/charting_library/",
      locale: getParameterByName("lang") || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "header_widget",
        // "timeframes_toolbar",
        "adaptive_logo",
      ],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      theme: "dark",
      autosize: true,
      adaptive_logo: "off",
      // disabled_features: ["header_widget"],
    });
    window.tvWidget = widget;
    widgetRef.current = widget;

    widget.onChartReady(() => {
      widget
        .activeChart()
        .onIntervalChanged()
        .subscribe(null, (interval) => {
          console.log("Interval changed to iamsun", interval);
          if (onIntervalChange) {
            onIntervalChange(interval);
          }
          // Fetch new data for the new interval
          // const newDatafeed = new MyCustomDatafeed(data, token);
          // widget.setSymbol(token, interval, () => {
          //   widget.setDatafeed(newDatafeed, {
          //     onDataLoaded: () => {
          //       console.log("Data loaded for new interval:", interval);
          //     },
          //   });
          // });
        });
    });
  };

  return <div ref={containerRef} id={containerId} style={{ height: "50vh" }} />;
};

export default TradingViewChart;
