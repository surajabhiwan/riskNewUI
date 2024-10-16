import { useDispatch } from "react-redux";
import * as SVG from "../../common/Icons";
import { chartsModalAction } from "../../store/slices/chartsData";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useState } from "react";

const ChartsModalCrypto = ({ type, handleClick, dataCrypto }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // Add search state
  const [data, setData] = useState(dataCrypto); // Initialize with dataCrypto

  const handleShowModalDesk = () => {
    dispatch(chartsModalAction.getModalOpen(false));
  };

  const handleShowModalMobile = (token) => {
    dispatch(chartsModalAction.getModalOpen());
    if (type === "multi") {
      handleClick(token);
    }
  };

  // Handle search filtering
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredData = dataCrypto?.filter((crypto) =>
      crypto?.name?.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex flex-col items-center gap-2 md:w-[400px] w-full h-full md:h-fit bg-[#142028] bg-opacity-100 shadow-lg rounded-xl p-8 md:p-8">
        {/* Close Button */}
        <div
          onClick={handleShowModalDesk}
          className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full cursor-pointer"
        >
          <SVG.Close />
        </div>

        {/* Title */}
        <div className="w-full mb-4">
          <span className="text-white text-lg font-semibold">Crypto</span>
        </div>

        {/* Search Bar */}
        <div className="mb-4 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search crypto..."
            className="w-full p-2 rounded-md bg-[#1c2a34] text-white outline-none text-sm md:text-base"
          />
        </div>

        {/* Scrollable List */}
        <SimpleBarReact className="h-[400px] w-full md:w-auto">
          <div className="modal space-y-2">
            {data?.map((data, idx) => (
              <div
                key={idx}
                className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer mb-2 md:w-[335px] h-[70px] p-2"
                onClick={() => handleShowModalMobile(data?.symbol)}
              >
                {/* Icon or Initial */}
                {data?.icon ? (
                  <img
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                    src={data?.icon}
                    className="ml-2 logo"
                    alt={data?.name}
                  />
                ) : (
                  <div
                    className="xl:w-10 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 ml-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#00008B" }}
                  >
                    <span className="text-white font-medium">
                      {data?.name?.[0]}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-white ml-6">{data?.name}</span> <br />
                </div>
              </div>
            ))}
          </div>
        </SimpleBarReact>
      </div>
    </div>
  );
};

export default ChartsModalCrypto;
