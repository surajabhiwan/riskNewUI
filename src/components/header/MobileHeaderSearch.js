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

  const IsLarge = useMedia();
  const isActive = IsLarge.useXlLarge;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPro } = useSelector((state) => state.walletProfilerReducer);

  // Fetch and set data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const localData = sessionStorage.getItem("tokenModalData");
      if (localData) {
        setData(JSON.parse(localData));
      }
      setLoading(false);
    };

    fetchData();
  }, [searchValue]);

  // Update filteredData whenever searchValue or data changes
  useEffect(() => {
    if (!loading) {
      const final_data = data?.filter(
        (d) =>
          d?.name !== "iBTC" &&
          d?.name !== "iETH" &&
          d?.unit !== null &&
          d?.unit !== "" &&
          d?.unit !== undefined
      );
      setFilteredData(
        final_data?.filter((item) =>
          item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
        )
      );
    }
  }, [searchValue, data, loading]);

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

  function stringToFixedNumber(inputString, decimalPlaces) {
    let number = parseFloat(inputString);
    if (isNaN(number)) {
      throw new Error("Input is not a valid number.");
    }
    return number.toFixed(decimalPlaces);
  }

  return (
    <div>
      <div
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center bg-[#142028] rounded-full"
      >
        <div className="text-white hover:text-yellow-400 cursor-pointer px-4 p-2 xl:p-0">
          <SVG.Search active={showSearch ? false : true} />
        </div>
      </div>
      {showSearch && (
        <div className="fixed me-2 w-full md:w-[50%] h-[60px] z-[99999] bg-[#142028] top-20 right-0 md:right-8 md:top-20 border-[2px] border-opacity-50 border-yellow-500 rounded-md">
          <div className="flex justify-between w-full h-full px-4">
            <input
              name="search"
              autoComplete="off"
              placeholder={isActive ? "Search tokens" : "Search here"}
              className="w-full bg-transparent focus:outline-none text-white truncate"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="flex items-center text-sm gap-2">
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchValue("");
                }}
                className="py-1 px-0 xl:px-3 hover:text-white text-yellow-500"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="space-y-2 flex items-center mt-1 bg-black">
            {searchValue && filteredData?.length > 0 && !isSearching && (
              <div className="text-white p-4">
                {filteredData.map((data, idx) => (
                  <Link
                    key={idx}
                    to={
                      data.unit
                        ? `/charts?token=${data?.name}&unit=${data?.unit}&pairID=${data?.pairId}&type=token`
                        : "#"
                    }
                    onClick={() => setShowSearch(false)}
                  >
                    <div className="flex items-center p-2 hover:bg-[#3a4956] rounded-lg cursor-pointer">
                      {data.unit ? (
                        <img
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%" }}
                          src={`${getImage}/image?unit=${data?.unit}`}
                          alt={data.name}
                          className="mr-2"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg text-white">
                          {data?.name[0]}
                        </div>
                      )}
                      <div>
                        <span className="text-white">{data?.name}</span>
                        <br />
                        <span className="text-zinc-400 text-sm">
                          {stringToFixedNumber(data.price, 2)} ₳
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeaderSearch;
