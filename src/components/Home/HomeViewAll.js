/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import * as SVG from "../../common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { tableAction } from "../../store/slices/TableData";
import { decryption } from "../../functions/crypto";
import axios from "axios";
import {
  recentAddedAPi,
  topGainersApi,
  topLosersApi,
  trendingApi,
} from "../../baseurl/baseurl";
import "./HomeViewAll.css"; // Import the CSS file

const HomeViewAll = () => {
  const [menu, setMenu] = useState("");
  const [activeTab, setActiveTab] = useState("market");
  const [stroke, setStroke] = useState(true);
  const tabsRef = useRef(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.tableREducer);
  const tab = useSelector((state) => state.tableREducer.tokenScreen);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "market":
        dispatch(tableAction.getTokenTabs(data));
        break;
      case "pro":
        trendingTokenTable();
        break;
      case "gainer":
        getTopGainers();
        break;
      case "loser":
        getTopLoser();
        break;
      case "view":
        // Implement view all functionality if needed
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    var current = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    setMenu(current);
  }, [
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    ),
  ]);

  const fetchTokenTabs = async (api_Mode) => {
    dispatch(tableAction.setLoadingTokenTab(true));
    try {
      const response = await axios.get(api_Mode);
      const result = decryption(response?.data);
      const maxVolumeADA = Math.max(
        ...result?.pageProps?.top25Tokens?.map((item) => item.volumeADA)
      );
      const maxTotalLiquidityADA = Math.max(
        ...result?.pageProps?.top25Tokens?.map((item) => item.totalLiquidityADA)
      );
      const dataWithPercentage = result?.pageProps?.top25Tokens?.map(
        (item) => ({
          ...item,
          percentagevolumeADA: (item.volumeADA / maxVolumeADA) * 100,
          percentagetotalLiquidityADA:
            (item.totalLiquidityADA / maxTotalLiquidityADA) * 100,
        })
      );

      dispatch(tableAction.getTokenTabs(dataWithPercentage));
      dispatch(tableAction.setLoadingTokenTab(false));
    } catch (error) {
      console.error("Error", error);
      dispatch(tableAction.setLoadingTokenTab(false));
    }
  };

  const getTopGainers = async () => {
    if (tab) {
      fetchTokenTabs(topGainersApi);
    }
  };

  const getTopLoser = async () => {
    if (tab) {
      fetchTokenTabs(topLosersApi);
    }
  };

  const getrecentlyAdded = async () => {
    if (tab) {
      fetchTokenTabs(recentAddedAPi);
    }
  };

  const trendingTokenTable = async () => {
    if (tab) {
      fetchTokenTabs(trendingApi);
    }
  };

  useEffect(() => {
    const updateIndicator = () => {
      const tabs = tabsRef.current.querySelectorAll(".tab");
      const activeTabElement = tabsRef.current.querySelector(
        `.tab.${activeTab}`
      );
      const indicator = tabsRef.current.querySelector(".indicator");

      if (activeTabElement && indicator) {
        indicator.style.width = `${activeTabElement.offsetWidth}px`;
        indicator.style.height = `${activeTabElement.offsetHeight}px`;
        indicator.style.left = `${activeTabElement.offsetLeft}px`;
        indicator.style.top = `${activeTabElement.offsetTop}px`;
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeTab]);

  return (
    <>
      <div className="tabs-container" ref={tabsRef}>
        <div className="indicator"></div>
        <div
          className={`tab market ${activeTab === "market" ? "active-tab" : ""}`}
          onClick={() => handleTabChange("market")}
        >
          <div className="icon">
            <SVG.Top />
          </div>
          <p>Top 50</p>
        </div>
        <div
          className={`tab pro ${activeTab === "pro" ? "active-tab" : ""}`}
          onClick={() => handleTabChange("pro")}
        >
          <div className="icon">
            <SVG.HotWallets />
          </div>
          <p>Trending</p>
        </div>
        <div
          className={`tab gainer ${activeTab === "gainer" ? "active-tab" : ""}`}
          onClick={() => handleTabChange("gainer")}
        >
          <div className="icon">
            <SVG.GoUp stroke={stroke} />
          </div>
          <p>Top Gainers</p>
        </div>
        <div
          className={`tab loser ${activeTab === "loser" ? "active-tab" : ""}`}
          onClick={() => handleTabChange("loser")}
        >
          <div className="icon">
            <SVG.GoDown stroke={stroke} />
          </div>
          <p>Top Losers</p>
        </div>
        <div
          className={`tab view ${activeTab === "view" ? "active-tab" : ""}`}
          onClick={() => handleTabChange("view")}
        >
          <div className="icon">→</div>
          <p>View All</p>
        </div>
      </div>
    </>
  );
};

export default HomeViewAll;
