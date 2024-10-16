import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { chartsModalAction } from "../../store/slices/chartsData";
import NftMoreinfo from "./NftMoreinfoModal";
import { useEffect, useState } from "react";
import { ip } from "../../baseurl/baseurl";
import axios from "axios";
import { useLocation } from "react-router-dom";

const NftCollection = ({ type }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const unit = searchParams.get("unit");
  const pairIdFromQuery = searchParams.get("pairID");

  const [nftData, setNftData] = useState([]);
  const [selectedNft, setSelectedNft] = useState(null);
  const [nftDetails, setNftDetails] = useState(null);
  const [imageFailed, setImageFailed] = useState({}); // Track failed images

  const dispatch = useDispatch();
  const showNftInfoModal = useSelector(
    (state) => state.chartsReducer.showNftInfoModal
  );

  const handleShowModal = (data) => {
    dispatch(chartsModalAction.getModalNftinfoOpen(true));
    setSelectedNft(data._id);
    setNftDetails(data);
  };

  // useEffect to fetch NFT data
  useEffect(() => {
    const fetchNftData = async () => {
      try {
        const response = await axios.get(
          `${ip}/api/nft/collection/assets?policy=${unit}&page=1&perPage=100`
        );
        setNftData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchNftData();
  }, [unit]);

  // Handle image error and track which image failed
  const handleImageError = (idx) => {
    setImageFailed((prevState) => ({ ...prevState, [idx]: true }));
  };

  return (
    <div
      className={` ${
        type === "nft" ? "block" : "hidden"
      }  pt-2 rounded-lg mt-8 mb-2 pb-4`}
    >
      <SimpleBarReact className="h-[1000px]">
        <div className="flex flex-wrap justify-center">
          {nftData?.map((data, idx) => (
            <div
              key={idx}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 p-4"
            >
              <div className="bg-gray-800 p-2 flex flex-col gap-1 rounded-xl">
                <div className="w-full m-auto">
                  {imageFailed[idx] || !data?.image ? (
                    <div
                      className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#00008B" }}
                    >
                      <span className="text-white font-medium">
                        {data?.name?.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={`https://ipfs.io/ipfs/${data.image.split("ipfs://")[1]}`}
                      className="xl:w-8 sm:w-7 w-6 xl:h-8 sm:h-7 h-6 ml-5 rounded-full"
                      alt="unit"
                      onError={() => handleImageError(idx)} // Handle image error
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-base sm:text-lg text-gray-50 font-bold">
                        {data?.name?.length > 5
                          ? data?.name?.slice(0, 5) + ".."
                          : data?.name}
                      </span>
                      <p className="text-xs text-gray-400">
                        Rank: #{data?.rank}
                      </p>
                    </div>
                    <span className="font-bold text-yellow-600">
                      {data?.price}₳
                    </span>
                  </div>
                  <button
                    className="hover:bg-yellow-600 text-sm py-0 bg-yellow-500 text-black-50 bg-sky-800 sm:py-2 rounded-xl"
                    onClick={() => handleShowModal(data)}
                  >
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBarReact>
      <Modal
        isOpen={showNftInfoModal}
        onRequestClose={() =>
          dispatch(chartsModalAction.getModalNftinfoOpen(false))
        }
        className="custom-modalcontent-nftinfo"
        overlayClassName="custom-modaloverlay"
      >
        <NftMoreinfo
          nftData={nftData?.find((d) => d?.name === selectedNft)}
          pairId={pairIdFromQuery}
          nftDetails={nftDetails}
          unit={unit}
        />
      </Modal>
    </div>
  );
};

export default NftCollection;
