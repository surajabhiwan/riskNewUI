/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
// import * as IMG from "../common/IMG/Images";
import ContentHeader from "../../components/ContentHeader";
import Homebody from "../../components/Home/HomeBody";
import HomeTab from "../../components/Home/HomeTab";
import HomeMarketButton from "../../components/Home/HomeMarketButton";
// import HomeWalletButton from "../components/Home/HomeWalletButton";
import HomeViewAll from "../../components/Home/HomeViewAll";
// import HomeTableHeader from "../../components/Home/HomeTableHeader";
import HomeTableContent from "../../components/Home/HomeTableContent";

// import useMedia from "../common/mediaQuery";

import HomeHeaderSlick from "../../components/Home/HomeHeaderSlick";
import { useDispatch, useSelector } from "react-redux";
import NftDataTable from "../../components/AddedComponents/NftDataTable";
import { getTableDataForHome, tableAction } from "../../store/slices/TableData";
import {
  getNftImage,
  getNftTimeseries,
  topNftAPi,
} from "../../baseurl/baseurl";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";
import HomeTableHeader from "../../components/Home/HomeTableHeader";
import useMedia from "../../common/mediaQuery";

const TableDataNftAndToken = () => {
  const [menu, setMenu] = useState("");
  const { nftTableData } = useSelector((state) => state.tableREducer);
  const [isLoading, setIsLoading] = useState(false);
  const isSmall = useMedia();
  const isActive = isSmall.useIsSmall;
  useEffect(() => {
    var current = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    setMenu(current);
  }, [
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/" + 1)
    ),
  ]);

  /*get tab status for home token/nft*/
  const tab = useSelector((state) => state.tableREducer.tokenScreen);
  const trendingNfts = useSelector((state) => state.tableREducer.trendingNftt);
  console.log("list of treding NFTs iamsun", trendingNfts);
  const tableDataForTrendingToken = useSelector(
    (state) => state.tableREducer.trendingToken
  );
  console.log("tableDataForTrendingToken", tableDataForTrendingToken);
  // const isLoading = useSelector((state) => state.tableREducer.loading)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTableDataForHome());
    dispatch(tableAction.getTrendingNft(trendingNfts));
  }, []);

  const fetchTableDataNft = async () => {
    setIsLoading(true);
    try {
      // Check if data is available in local storage
      const cachedData = sessionStorage.getItem("cachedNftTableData");
      if (cachedData) {
        // setNftTableData(JSON.parse(cachedData));
        // dispatch(tableAction.setNftTableData(JSON.parse(cachedData)))
        dispatch(tableAction.getTrendingNft(JSON.parse(cachedData)));
      } else {
        // If not available in local storage, fetch from API
        const encryptedData = {
          key: encryption({ ranking: "marketCap", items: 7 }),
        };
        const response = await axios.post(topNftAPi, encryptedData);
        console.log("response from topNft iamsun", response);
        const result = decryption(response?.data);
        let nftData = result?.NFTTopRankers.filter(
          (nft) => nft.name !== "[Deprecated] Budz"
        );
        // let nftData = result?.NFTTopRankers;
        const maxVolume24 = Math.max(...nftData.map((item) => item?.volume24h));

        // Fetch time series and image for each NFT concurrently
        const nftsWithTimeSeriesAndImages = await Promise.all(
          nftData.map(async (nft) => {
            const data = { policyId: nft?.policy };
            const encData = {
              key: encryption(data),
            };
            const timeSeriesResponse = await axios.post(
              getNftTimeseries,
              encData
            );
            const res = decryption(timeSeriesResponse?.data);
            const timeseries = res?.timeseries;
            const encryptedData = encryption({ policyId: nft?.policy });
            const imageResponse = await axios.post(getNftImage, {
              key: encryptedData,
            });

            const result = decryption(imageResponse?.data);
            const image = result?.NFTMetaData?.image;

            const percentagevolume24 = (nft?.volume24h / maxVolume24) * 100;
            return { ...nft, timeseries, image, percentagevolume24 };
          })
        );

        // Set state with fetched data
        // setNftTableData(nftsWithTimeSeriesAndImages);
        // dispatch(tableAction.setNftTableData(nftsWithTimeSeriesAndImages))
        dispatch(tableAction.getTrendingNft(nftsWithTimeSeriesAndImages));
        // Cache the fetched data in local storage
        // sessionStorage.setItem('cachedNftTableData', JSON.stringify(nftsWithTimeSeriesAndImages));
      }
    } catch (error) {
      console.error("Error", error);
    }
    setIsLoading(false);
  };

  // Function to fetch table data for NFTs
  const fetchTableDataNftt = async () => {
    dispatch(tableAction.setNftTableLOading(true));
    try {
      // Check if data is available in local storage
      const cachedData = sessionStorage.getItem("cachedNftTableData");
      if (cachedData) {
        // setNftTableData(JSON.parse(cachedData));
        dispatch(tableAction.setNftTableData(JSON.parse(cachedData)));
        dispatch(tableAction.getTrendingNft(JSON.parse(cachedData)));
      } else {
        // If not available in local storage, fetch from API
        const encryptedData = {
          key: encryption({ ranking: "marketCap", items: 51 }),
        };
        const response = await axios.post(topNftAPi, encryptedData);
        const result = decryption(response?.data);
        let nftData = result?.NFTTopRankers.filter(
          (nft) => nft.name !== "[Deprecated] Budz"
        );
        // let nftData = result?.NFTTopRankers;
        const maxVolume24 = Math.max(...nftData.map((item) => item?.volume24h));

        // Fetch time series and image for each NFT concurrently
        const nftsWithTimeSeriesAndImages = await Promise.all(
          nftData.map(async (nft) => {
            const data = { policyId: nft?.policy };
            const encData = {
              key: encryption(data),
            };
            const timeSeriesResponse = await axios.post(
              getNftTimeseries,
              encData
            );
            const res = decryption(timeSeriesResponse?.data);
            const timeseries = res?.timeseries;
            const encryptedData = encryption({ policyId: nft?.policy });
            const imageResponse = await axios.post(getNftImage, {
              key: encryptedData,
            });

            const result = decryption(imageResponse?.data);
            const image = result?.NFTMetaData?.image;

            const percentagevolume24 = (nft?.volume24h / maxVolume24) * 100;
            return { ...nft, timeseries, image, percentagevolume24 };
          })
        );

        // Set state with fetched data
        // setNftTableData(nftsWithTimeSeriesAndImages);
        dispatch(tableAction.setNftTableData(nftsWithTimeSeriesAndImages));
        dispatch(tableAction.getTrendingNft(nftsWithTimeSeriesAndImages));
        // Cache the fetched data in local storage
        sessionStorage.setItem(
          "cachedNftTableData",
          JSON.stringify(nftsWithTimeSeriesAndImages)
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
    dispatch(tableAction.setNftTableLOading(false));
  };
  useEffect(() => {
    fetchTableDataNftt();
    // nftTableLoading
  }, []);

  useEffect(() => {
    fetchTableDataNft();
  }, []);

  console.log("homePage ka trending nft", nftTableData);
  return (
    <div className="w-full px-0 pb-4 lg:px-4">
      {/* <ContentHeader menu={menu} /> */}
      {/* <HomeHeaderSlick /> */}
      <div className="w-full">
        <div className="space-y-4">
          {isActive ? <HomeTab /> : ""}
          {/* <Homebody
            isLoading={isLoading}
            isNftLoading={isLoading}
            trendingNft={trendingNfts}
            trendingToken={tableDataForTrendingToken}
          /> */}
        </div>
        <div className=" xl:flex justify-between w-full sm:mt-2 mt-7 mb-4">
          <div className="flex ">
            <HomeMarketButton />
            {/* <HomeWalletButton /> */}
          </div>
          <div className="">
            <HomeViewAll />
          </div>
        </div>
        <div className="bg-[#142028] rounded-2xl px-1 py-2">
          <HomeTableHeader tab={tab} />
          {tab ? <HomeTableContent /> : <NftDataTable />}
        </div>
      </div>
    </div>
  );
};

export default TableDataNftAndToken;
