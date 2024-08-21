import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { chartsModalAction } from "../../store/slices/chartsData";
import NftMoreinfo from "./NftMoreinfoModal";
import { useState } from "react";
import { nftCollectionBase } from "../../baseurl/baseurl";

const NftCollection = ({ data, type, pairID }) => {
  const [selectedNft, setSelectedNft] = useState(null);
  const dispatch = useDispatch();
  const handleShowModal = (id) => {
    dispatch(chartsModalAction.getModalNftinfoOpen(true));
    setSelectedNft(id);
  };
  const showNftInfoModal = useSelector(
    (state) => state.chartsReducer.showNftInfoModal
  );
  console.log("showNftInfoModal", showNftInfoModal);
  return (
    <div
      className={` ${
        type === "nft" ? "block" : "hidden"
      }  pt-2 rounded-lg mt-8 mb-2 pb-4`}
    >
      <SimpleBarReact className="h-[1000px]">
        <div className="flex flex-wrap justify-center">
          {data?.map((data, idx) => (
            <div
              key={idx}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 p-4"
            >
              <div className="bg-gray-800 p-2 flex flex-col gap-1 rounded-xl">
                <div className="w-full m-auto">
                  {" "}
                  <img
                    className="rounded-lg"
                    src={`${nftCollectionBase}/api/get/nft/image?unit=${
                      data?.image?.split("//")[1]
                    }`}
                    alt="logo"
                  />
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
                    onClick={() => handleShowModal(data?.name)}
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
        onRequestClose={handleShowModal}
        className="custom-modalcontent-nftinfo"
        overlayClassName="custom-modaloverlay"
      >
        <NftMoreinfo
          nftData={data?.find((d) => d?.name === selectedNft)}
          pairId={pairID}
        />
      </Modal>
    </div>
  );
};

export default NftCollection;
