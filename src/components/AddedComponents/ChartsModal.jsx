/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import * as SVG from "../../common/Icons";
import { chartsModalAction } from "../../store/slices/chartsData";
import { getImage } from "../../baseurl/baseurl";
import { Link } from "react-router-dom";

import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useState } from "react";

const ChartsModal = ({ type, handleClick }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const handleShowModalDesk = () => {
    dispatch(chartsModalAction.getModalOpen(false));
  };
  const handleShowModalMobile = (token, unit) => {
    dispatch(chartsModalAction.getModalOpen());
    if (type === "multi") {
      handleClick(token, unit);
    }
  };
  const tableData = useSelector((state) => state.tableREducer.nftData);
  const localData = JSON.parse(sessionStorage.getItem("tokenModalData"));
  //Get token data on page refresh
  useEffect(() => {
    if (localData) {
      setData(localData);
    } else {
      setData(tableData);
    }
  }, []);

  const final_data = data?.filter(
    (d) =>
      d?.name !== "iBTC" &&
      d?.name !== "iETH" &&
      d?.unit !== null &&
      d?.unit !== "" &&
      d?.unit !== undefined
  );
  function stringToFixedNumber(inputString, decimalPlaces) {
    // Attempt to convert inputString to a number
    let number = parseFloat(inputString);

    // Check if conversion was successful
    if (isNaN(number)) {
      throw new Error("Input is not a valid number.");
    }

    // Use toFixed() to format the number to specified decimal places
    let fixedNumber = number.toFixed(decimalPlaces);

    // Return the formatted number as a string
    return fixedNumber;
  }
  return (
    <div className="">
      <div className="relative flex flex-col items-center gap-2 md:w-[400px] overflow-x-auto md:h-fit w-full h-full bg-[#142028] bg-opacity-100 shadow-lg rounded-xl p-8">
        <div
          onClick={handleShowModalDesk}
          className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full"
        >
          <SVG.Close />
        </div>
        <div className="w-full mb-4">
          <span className="text-white text-lg font-semibold">Tokens</span>
        </div>
        <SimpleBarReact className="h-[400px]">
          <div className=" -modal space-y-2 ">
            {final_data?.map((data, idx) => (
              <>
                <Link
                  to={
                    type === "multi" && data?.unit
                      ? `/multi?token=${data?.name}&unit=${data?.unit}`
                      : `/charts?token=${data?.name}&unit=${
                          data?.unit ? data?.unit : "no-policy"
                        }&pairID=${data?.pairId}&type=token`
                  }
                >
                  <div
                    className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer mb-2"
                    onClick={() =>
                      handleShowModalMobile(data?.name, data?.unit)
                    }
                  >
                    {data?.unit ? (
                      <img
                        width={40}
                        height={40}
                        style={{ borderRadius: "50%" }}
                        src={
                          data?.name === "SNEK"
                            ? `${getImage}/image?unit=279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f534e454b`
                            : data?.unit
                            ? `${getImage}/image?unit=${data?.unit}`
                            : data?.imgSrc
                        }
                        className="ml-2 logo"
                        alt="riskWise"
                      />
                    ) : (
                      <div
                        className="xl:w-10 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 ml-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#00008B" }}
                      >
                        <span className="text-white font-medium">
                          {data?.name?.split("")[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-white ml-6">{data?.name}</span>{" "}
                      <br />
                      <span className="text-zinc-400 text-[.8rem] ml-6">
                        {/* {data?.price} ₳ */}
                        {stringToFixedNumber(data?.price, 2)}₳
                      </span>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </SimpleBarReact>
      </div>
    </div>
  );
};

export default ChartsModal;
