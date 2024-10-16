import { useState, useEffect } from "react";
import * as SVG from "../../common/Icons";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAddress,
  getImage,
  search_api,
  staketoad,
  tickerDataAll,
} from "../../baseurl/baseurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";
import {
  setStakeAddress,
  setWalletAddress,
} from "../../store/slices/walltProfiler";
import toast from "react-hot-toast";
import useMedia from "../../common/mediaQuery";
import { setwalletprofilermenuitems } from "../../store/slices/wallet";

const MobileHeaderSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickerData, setTickerData] = useState([]);
  const IsLarge = useMedia();
  const isActive = IsLarge.useXlLarge;
console.log("ticker data", tickerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPro } = useSelector((state) => state.walletProfilerReducer);

  // API search function
  const searchApiFetch = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(search_api + `${searchValue}`);
      const result = decryption(response?.data);
      if (result?.success && result?.type === "NFT") {
        navigate(
          `/charts?token=${result?.searchData?.name}&unit=${searchValue}&pairID=${searchValue}&type=nft`
        );
        setShowSearch(false);
        setSearchValue("");
      } else if (result?.success && result?.type === "TOKEN") {
        navigate(
          `/charts?token=${result?.searchData?.ticker}&unit=${searchValue}&pairID=${searchValue}&type=token`
        );
        setShowSearch(false);
        setSearchValue("");
      } else {
        toast.error("Not found");
        setShowSearch(false);
        setSearchValue("");
      }
    } catch (err) {
      toast.error("Not found");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle address input
  const handleAddresses = async (inputValue) => {
    setIsSearching(true);
    if (inputValue?.startsWith("addr") && inputValue?.length > 10) {
      dispatch(setWalletAddress(inputValue));
      const data = { address: inputValue };
      const encryptedData = { key: encryption(data) };
      try {
        const response = await axios.post(getAddress, encryptedData);
        const result = decryption(response?.data);
        if (result?.success) {
          dispatch(setStakeAddress(result?.stakeAddress));
          dispatch(setwalletprofilermenuitems(0));
          navigate("/profiler");
        } else {
          toast.error("Failed to convert wallet to stake address");
        }
      } catch (error) {
        toast.error("Error converting wallet to stake address");
      } finally {
        setIsSearching(false);
      }
    } else if (inputValue?.startsWith("stake") && inputValue?.length > 8) {
      dispatch(setStakeAddress(inputValue));
      const data = { StackAddress: inputValue };
      const enc = { key: encryption(data) };
      try {
        const response = await axios.post(staketoad, enc);
        const result = decryption(response?.data);
        const walletAdd = result?.addresses[0]?.address;
        if (result?.success) {
          dispatch(setWalletAddress(walletAdd));
          dispatch(setwalletprofilermenuitems(0));
          navigate("/profiler");
        } else {
          toast.error("Failed to convert stake to wallet address");
        }
      } catch (error) {
        toast.error("Error converting stake to wallet address");
      } finally {
        setIsSearching(false);
      }
    } else {
      setIsSearching(false);
      toast.error("Enter a valid address");
    }
  };

  // Redirect based on search input
  const redirectWalletWatch = async () => {
    if (searchValue?.includes("addr") || searchValue?.includes("stake")) {
      if (isPro) {
        await handleAddresses(searchValue);
        setShowSearch(false);
        setSearchValue("");
      } else {
        navigate("/profiler-search");
        setShowSearch(false);
        setSearchValue("");
      }
    } else {
      await searchApiFetch();
    }
  };

  // Function to handle the search button click
  const handleSearchClick = async () => {
    if (searchValue) {
      // Fetch ticker data
      await getTickerData(searchValue);
    }
  };

  async function getTickerData(tickerVal) {
    try {
      const encryptedData = {
        key: encryption({
          query: tickerVal,
          page: "1",
        }),
      };
      const encryptedDataFinal = JSON.stringify(encryptedData);
      const response = await axios.post(tickerDataAll, encryptedDataFinal, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const decryptedData = decryption(response?.data);
      setTickerData(decryptedData?.data);
    } catch (error) {
      setTickerData([]);
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    const fetchAndFilterData = async () => {
      if (!searchValue) {
        setFilteredData([]);
        setTickerData([]);
        return;
      }
    };
    fetchAndFilterData();
  }, [searchValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  const tokens = tickerData
    .filter((data) => data?.type === "token")
    .slice(0, 5);
  const nfts = tickerData.filter((data) => data?.type === "nft").slice(0, 5);
  const truncateAddress = (address) => {
    if (!address) return "";
    const start = address.slice(0, 6);
    const end = address.slice(-6);
    return `${start}...${end}`;
  };

  return (
    <div>
      <div
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center bg-[#142028] rounded-full p-2 cursor-pointer"
      >
        <div className="text-white hover:text-yellow-400">
          <SVG.Search active={!showSearch} />
        </div>
      </div>
      {showSearch && (
        <div className="fixed top-20 right-0 md:right-8 w-full md:w-1/2 lg:w-1/3 z-50 bg-[#142028] border-2 border-opacity-50 border-yellow-500 rounded-md shadow-lg">
          <div className="flex justify-between items-center h-16 px-4 border-b border-gray-700">
            <input
              name="search"
              autoComplete="off"
              placeholder={isActive ? "Search tokens" : "Search here"}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="py-1 px-3 text-yellow-500 hover:text-white"
              onClick={handleSearchClick}
            >
              Search
            </button>
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchValue("");
              }}
              className="text-yellow-500 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
            {searchValue && tickerData?.length > 0 && !isSearching && (
          <div className="p-4 bg-black text-white space-y-2">
              <div>
                {tickerData?.map((data, idx) => (
                  <Link
                    key={idx}
                    // to={
                    //   data?.type === "token" && data?.unit
                    //     ? `/charts?token=${data?.ticker}&unit=${data?.unit}&pairID=${data?.pairId}&type=token`
                    //     : data?.type === "nft"
                    //     ? `/nft-details?policy=${data?.policy}&name=${data?.name}`
                    //     : "#"
                    // }
                    to={
                      data?.unit || data?.policy
                        ? `/charts?token=${
                            data?.type === "nft" ? data?.name : data?.ticker
                          }&unit=${
                            data?.type === "nft" ? data?.policy : data?.unit
                          }&pairID=${data?.policy}&type=${data?.type}`
                        : "#"
                    }
                    onClick={() => setShowSearch(false)}
                    className="flex items-center p-2 hover:bg-[#3a4956] rounded-lg cursor-pointer"
                  >
                    {data?.image ? (
                      <img
                        width={40}
                        height={40}
                        src={`${data?.image}`}
                        alt={data?.ticker || data?.name}
                        className="mr-2 rounded-full"
                      />
                    ) : (
                      <div
                        className="mr-2 flex items-center justify-center rounded-full"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#00008B",
                        }}
                      >
                        <span className="text-white font-medium">
                          {data?.type === "token"
                            ? data?.ticker?.charAt(0)
                            : data?.name?.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="font-medium">
                        {data?.type === "token" ? data?.ticker : data?.name}
                      </span>
                      <div className="text-sm text-gray-400">
                        {data?.type === "token"
                          ? data?.name
                          : truncateAddress(data?.policy)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderSearch;
