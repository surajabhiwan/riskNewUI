import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decryption } from "../../functions/crypto";
import axios from "axios";
import { cryptoCurrenciesList, cryptoIcon } from "../../baseurl/baseurl";
import MultiHeader from "./multiHeaders";
// import MultiSearch from "./multiSearch";
import * as SVG from "../../common/Icons";
import TradingViewWidget from "react-tradingview-widget";
import Table from "./../../components/AddedComponents/cryptocurrencies/Table";
import Modal from "react-modal";
import ChartsModalCrypto from "../../components/AddedComponents/ChartsModalCrypto";
import { chartsModalAction } from "../../store/slices/chartsData";
const CryptoMulti = () => {
  const dispatch = useDispatch();

  const [number, setNumber] = useState(0);
  const [remainNumber, setRemainNumber] = useState(10);
  const [data, setData] = useState([]);
  const [dataCrypto, setDataCrypto] = useState([]);

  // const handleClick = () => {
  //   setNumber(number + 1);
  //   const _data = [...data];
  //   if (number < 10) {
  //     _data.push({
  //       id: number,
  //       active: false,
  //     });
  //     setData(_data);
  //   }
  //   console.log(data);
  //   if (number >= 10) setNumber(10);
  // };

  const handleClick = (symbol) => {
    console.log("data symbol coming from modal iamsun", symbol);
    setNumber(number + 1);
    const _data = [...data];
    if (number < 10) {
      _data.push({
        id: number,
        active: false,
        crypto: symbol, // Assign a cryptocurrency to the chart
      });
      setData(_data);
    }
    if (number >= 10) setNumber(10);
  };

  const handleDelete = (_idx) => {
    const filterData = data.filter((item) => {
      console.log("id", item.id);
      console.log("_idx", _idx);
      setNumber(number - 1);
      return item.id !== _idx;
    });
    setData(filterData);
    console.log("data from crypto multi chart iamsun", filterData);
  };

  useEffect(() => {
    setRemainNumber(10 - number);
  }, [number]);

  const showChartsModal = useSelector(
    (state) => state.chartsReducer.showChartsModal
  );
  const handleShowModal = () => {
    dispatch(chartsModalAction.getModalOpen(false));
    // fetchCandleChartsData();
  };
  const handleTrueModal = () => {
    dispatch(chartsModalAction.getModalOpen(true));
  };

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.post(cryptoCurrenciesList);
      const result = decryption(response?.data);
      console.log("resultXX", result);
      const finalData = result?.walletTrend?.data;
      setDataCrypto(finalData);

      const cryptoDataWithIcons = await Promise.all(
        finalData?.map(async (crypto) => {
          const logoIconResponse = await axios.get(cryptoIcon, {
            params: {
              id: `${crypto?.id}`,
            },
          });
          const res = decryption(logoIconResponse?.data);
          const icon = res?.cryptoInfo?.logo;
          return { ...crypto, icon: icon };
        })
      );
      setDataCrypto(cryptoDataWithIcons);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data final to show iamsun", data);

  console.log("data crypto iamsun", dataCrypto);
  return (
    <div className="flex flex-col overflow-y-hidden gap-6 items-center justify-center w-full h-full pb-10 lg:px-0 px-6">
      <MultiHeader />
      {/* <Table></Table> */}
      {/* <MultiSearch /> */}
      <div className="flex flex-wrap gap-10 w-full justify-center">
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              style={{ background: "#142028", borderRadius: "10px" }}
              className="bg-[#142028] h-[660px] lg:w-[30%] w-full rounded-xl p-3"
            >
              <div className="flex justify-between">
                <p className="flex justify-center text-white text-sm font-medium"></p>
                <div
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center pb-2"
                >
                  <SVG.Close />
                </div>
              </div>
              {/* <TradingViewWidget
                theme="Dark"
                symbol="BITSTAMP:ETHUSD"
                width="100%"
                backgroundColor="#000"
              /> */}
              <TradingViewWidget
                theme="Dark"
                symbol={`BITSTAMP:${item?.crypto}USD`}
                width="100%"
                backgroundColor="#000"
                hide_side_toolbar={false}
              />
            </div>
          );
        })}
        <div className="flex justify-center items-center lg:w-[30%] w-full bg-[#142028] rounded-xl h-[650px]">
          <div className="flex flex-col justify-center items-center">
            <div
              // onClick={handleClick}
              onClick={handleTrueModal}
              className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer"
            >
              <div className="flex justify-center items-center w-6 h-6">
                <SVG.Plus />
              </div>
            </div>
            <p className="text-white text-lg font-normal"> Add new chart </p>
            <p className="text-[#9f9fa8] text-sm font-normal">
              {remainNumber} of 10 slots remaining
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showChartsModal}
        onRequestClose={handleShowModal}
        className="custom-modalcontent"
        overlayClassName="custom-modaloverlay"
      >
        <ChartsModalCrypto
          type={"multi"}
          handleClick={handleClick}
          dataCrypto={dataCrypto}
        />
      </Modal>
    </div>
  );
};

export default CryptoMulti;
