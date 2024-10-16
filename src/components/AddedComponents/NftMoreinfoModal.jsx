/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import * as SVG from "../../common/Icons";
import { chartsModalAction } from "../../store/slices/chartsData";
import {
  getNftSalesHistoryApi,
  nftCollectionBase,
  getNftAssetInfoApi,
  ip, // Assuming you have this defined in your baseurl file
} from "../../baseurl/baseurl";

import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useState } from "react";
import { decryption, encryption } from "../../functions/crypto";
import axios from "axios";
import moment from "moment";
import { timestampToUTC } from "../../functions/functions";
import { Buffer } from "buffer";

const NftMoreinfo = ({ nftData, pairId, nftDetails, unit }) => {
  console.log("nftDetails iamsun", nftDetails);
  console.log("unit iamsun", unit);
  const dispatch = useDispatch();
  const [salesData, setSalesData] = useState([]);
  const [assetInfo, setAssetInfo] = useState(null);
  console.log("assetInfo iamsun", assetInfo);

  const handleShowModalDesk = () => {
    dispatch(chartsModalAction.getModalNftinfoOpen(false));
  };
  const handleShowModalMobile = () => {
    dispatch(chartsModalAction.getModalNftinfoOpen());
  };

  const getNftSalesHistory = async () => {
    const data = {
      policyId: pairId,
      name: nftData?.name,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      const response = await axios.post(getNftSalesHistoryApi, encryptedData);
      const result = decryption(response?.data);
      console.log("getNftSalesHistory", result);
      setSalesData(result?.NFTSale);
    } catch (error) {
      console.log(error);
    }
  };

  const getNftAssetInfo = async () => {
    try {
      const response = await axios.get(
        `${ip}/api/nft/asset/info?policy=${unit}&name=${nftDetails.name}`
      );
      console.log("response for assets collection particular", response);
      setAssetInfo(response.data.data); // Assuming the response contains the asset info you need
    } catch (error) {
      console.log("Error fetching asset info:", error);
    }
  };

  useEffect(() => {
    // if (nftData?.name && pairId) {
    //   getNftSalesHistory();
      getNftAssetInfo(); // Fetch asset info when nftData.name and pairId are available
    // }
  }, []);

  const convertAssetNameToHash = (name) => {
    return Buffer.from(name, "utf8").toString("hex");
  };

  return (
    <div className="w-full relative flex flex-col items-center gap-2 md:w-[900px] overflow-x-auto md:h-fit h-full bg-[#142028] bg-opacity-100 shadow-lg rounded-xl p-8">
      <div
        onClick={handleShowModalDesk}
        className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full"
      >
        <SVG.Close />
      </div>
      <div className="w-full mb-4">
        <span className="text-white text-lg font-semibold">NFT Info</span>
      </div>

      <div>
        <div className="flex justify-between pb-4">
          <span className="text-base sm:text-lg text-gray-50 font-bold">
           {nftDetails?.name}
          </span>
          <div>
            <a
              href={`https://www.jpg.store/asset/${pairId}${convertAssetNameToHash(
                nftDetails?.name
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="hover:bg-yellow-600 text-sm py-0 bg-yellow-500 text-black-500 font-bold px-2 bg-sky-800 sm:py-2 rounded-xl">
                BUY
              </button>
            </a>
          </div>
        </div>

        <div className="text-white flex flex-col sm:flex-row sm:gap-4">
          <div className="mb-2">
          <img
                    className="rounded-lg"
                    src={
                        nftDetails?.image
                        ? `https://ipfs.io/ipfs/${
                            nftDetails?.image.split("ipfs://")[1]
                          }`
                        : ""
                    }
                    alt="logo"
                  />
          </div>
          <div className="mb-2 bg-gray-800 flex flex-col justify-center items-center gap-1 rounded-xl w-full sm:w-40">
            <span className="color-light font-bold text-xl">Rank</span>
            <span className="text-yellow-600 font-bold text-xl">
              #{nftDetails?.rank}
            </span>
          </div>
          <div className="mb-2 bg-gray-800 flex flex-col justify-center items-center gap-1 rounded-xl w-full sm:w-40">
            <span className="color-light font-bold text-xl">Last sold for</span>
            <span className="text-yellow-600 font-bold text-xl">
              {assetInfo?.stats?.lastSoldPrice } ₳
            </span>
          </div>
          <div className="bg-gray-800 flex flex-col justify-center items-center gap-1 rounded-xl w-full sm:w-40">
            <span className="color-light font-bold text-xl">Price</span>
            <span className="text-yellow-600 font-bold text-xl">
              {nftDetails?.price || "--"} ₳
            </span>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-white">
            <span>Sales History</span>
          </div>
          <div
            className="flex flex-col "
            style={{ height: "6rem", overflowY: "scroll" }}
          >
            {assetInfo?.salesHistory?.map((data, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between text-white bg-gray-800 p-2 mt-2 rounded-lg"
              >
                <div className="mb-2 sm:mb-2 ">
                  <span>Price: </span>
                  <span className="text-yellow-600">{data?.price}</span>
                </div>
                <div className="mb-2 sm:mb-0">
                  <span>Seller: </span>
                  <span className="text-yellow-600">
                    {data?.sellerStakeAddress?.slice(0, 3)}...
                    {data?.sellerStakeAddress?.slice(-4)}
                  </span>
                </div>
                <div className="mb-2 sm:mb-0">
                  <span>Buyer: </span>
                  <span className="text-yellow-600">
                    {data?.buyerStakeAddress?.slice(0, 3)}...
                    {data?.buyerStakeAddress?.slice(-4)}
                  </span>
                </div>
                <div>
                  <span>Time: </span>
                  <span className="text-yellow-600">
                    {moment(timestampToUTC(data?.time)).fromNow()}
                  </span>
                </div>
              </div>
            ))}
            {assetInfo?.salesHistory?.length <= 0 && (
              <div className="w-full text-center">
                <p className="text-zinc-500">No sales history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftMoreinfo;
