import { useEffect, useState } from "react";
import "./stakeInput.css";
import * as SVG from "../../../../common/Icons";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import {
  setHoldingNft,
  setInputOutputData,
  setTransactions,
  setWalletProfilerBalance,
  setWalletTradeHistory,
} from "../../../../store/slices/walltProfiler";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAddressHandler from "../../../../customHook/adressConvert";
import axios from "axios"; // Ensure axios is imported

const StakeInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stakeParamsData = searchParams.get("stake");
  const { isSearching, handleAddresses } = useAddressHandler();

  // Reset state when component mounts
  useEffect(() => {
    dispatch(setInputOutputData([]));
    dispatch(setWalletTradeHistory([]));
    dispatch(setHoldingNft([]));
    dispatch(setTransactions([]));
    dispatch(setWalletProfilerBalance([]));
  }, []);

 
  const fetchAddress = async (handleName) => {
    const policyID = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a";
    
 
    const encodeToHex = (str) => {
      return new TextEncoder()
        .encode(str)
        .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    };
  
    const assetName = encodeToHex(handleName); 
  
    try {
      const response = await axios.get(
        `https://cardano-mainnet.blockfrost.io/api/v0/assets/${policyID}${assetName}/addresses`,
        {
          headers: {
            project_id: "mainnetFUHqj4mQM7jEVbY1wEYlW0nAJ2t04Sr9",
            "Content-Type": "application/json",
          },
        }
      );
      const [{ address }] = response.data; // Destructure to get the address
      return address;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };
  

  const handleSubmit = async () => {
    if (inputValue?.length > 0) {
      if (inputValue.startsWith("$")) {
        const handleName = inputValue.slice(1);
        const walletAddress = await fetchAddress(handleName);
        console.log("handle details", walletAddress);
        if (walletAddress) {
          handleAddresses(walletAddress);
        } else {
          console.error("Invalid handle or no address found.");
        }
      } else {
        handleAddresses(inputValue);
      }
    }
  };

  useEffect(() => {
    if (stakeParamsData) {
      navigate("/profiler");
    }
  }, []);

  const handleShow = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="p-2 lg:p-32 pt-40 md:pt-28 2xl:pt-40">
        <div className="input-container flex flax-col w-full justify-center items-center gap-4 p-0 md:p-28 pb-32 px-2 ">
          <div className="relative hidden sm:block">
            <div
              className="absolute -bottom-[2px] px-2 cursor-pointer"
              onMouseEnter={handleShow}
              onMouseLeave={handleShow}
            >
              <SVG.Notification />
            </div>
            <div
              className={`${
                visible ? "block" : "hidden"
              } absolute -top-14 p-[6px] rounded-[10px] bg-[rgba(92,94,105,.3)] backdrop-blur-[10px] text-sm text-[#fff] whitespace-nowrap z-[100] `}
            >
              <span className="">$Handles are not supported at this time.</span>
            </div>
          </div>
          &nbsp;
          <p className="text-white font-bold text-lg">Enter wallet address :</p>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Enter here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button className="text-black" onClick={handleSubmit}>
              {isSearching ? "Searching" : <SearchIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeInput;
