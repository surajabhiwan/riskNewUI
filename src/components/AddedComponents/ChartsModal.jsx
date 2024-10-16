import { useDispatch, useSelector } from "react-redux";
import * as SVG from "../../common/Icons";
import { chartsModalAction } from "../../store/slices/chartsData";
import { getImage, topTenTokens, tickerDataAll } from "../../baseurl/baseurl";
import { Link } from "react-router-dom";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";

const ChartsModal = ({ type, handleClick }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokensTenData, setTenTokenData] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  
  const tableData = useSelector((state) => state.tableREducer.nftData);

  const handleShowModalDesk = () => {
    dispatch(chartsModalAction.getModalOpen(false));
  };

  const handleShowModalMobile = (token, unit) => {
    dispatch(chartsModalAction.getModalOpen());
    if (type === "multi") {
      handleClick(token, unit);
    }
  };

  // Fetch top 10 tokens only on initial mount
  useEffect(() => {
    const fetchTopTenTokens = async () => {
      try {
        const response = await axios.get(topTenTokens);
        const result = decryption(response?.data);
        setTenTokenData(result?.data);
      } catch (error) {
        console.error("Error fetching top 10 tokens:", error);
      }
    };

    fetchTopTenTokens();
  }, []);

  // Function to handle the search button click
  const handleSearchClick = async () => {
    if (searchQuery) {
      await getTickerData(searchQuery);
    }
  };

  // Fetch the ticker data when a search query is entered
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
      setTickerData(decryptedData?.data.slice(0, 5) || []);
    } catch (error) {
      setTickerData([]);
      console.error("Error fetching data:", error.message);
    }
  }

  // Combine top 10 tokens and search results
  const combinedData = searchQuery ? tickerData : tokensTenData;

  function stringToFixedNumber(inputString, decimalPlaces) {
    const number = parseFloat(inputString);
    if (isNaN(number)) return "N/A";
    return number.toFixed(decimalPlaces);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex flex-col items-center gap-2 md:w-[400px] w-full h-full md:h-fit bg-[#142028] shadow-lg rounded-xl p-8 md:p-8">
        {/* Close Button */}
        <div
          onClick={handleShowModalDesk}
          className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full cursor-pointer"
        >
          <SVG.Close />
        </div>

        {/* Title */}
        <div className="w-full mb-4">
          <span className="text-white text-lg font-semibold">Tokens</span>
        </div>

        {/* Search Bar */}
        <div className="w-full mb-4 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="w-full px-2 py-2 rounded-md text-black focus:outline-none text-sm md:text-base"
          />
          <button
            onClick={handleSearchClick}
            className="ml-2 px-2 py-2 text-white bg-grey rounded-md"
          >
            Search
          </button>
        </div>

        {/* Scrollable Token List */}
        <SimpleBarReact className="h-[400px] w-full md:w-auto">
          <div className="modal space-y-2">
            {combinedData?.map((data, idx) => (
              <Link
                key={idx}
                to={
                  type === "multi" && data?.unit
                    ? `/multi?token=${data?.ticker}&unit=${data?.unit}`
                    : `/charts?token=${data?.ticker}&unit=${
                        data?.unit ? data?.unit : "no-policy"
                      }&pairID=${data?.pairId}&type=token`
                }
              >
                <div
                  className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer mb-2 md:w-[335px] h-[70px] p-2"
                  onClick={() =>
                    handleShowModalMobile(data?.ticker, data?.unit)
                  }
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
                    <span className="text-white ml-6">{data?.ticker}</span>{" "}
                    <br />
                    <span className="text-zinc-400 text-[.8rem] ml-6">
                      {stringToFixedNumber(data?.price, 2)}₳
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SimpleBarReact>
      </div>
    </div>
  );
};

export default ChartsModal;
