import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tableAction } from "../../store/slices/TableData";

const HomeMarketButton = () => {
  const [tabSelected, setTabSelected] = useState(true);
  const dispatch = useDispatch();

  const handleShowToken = () => {
    setTabSelected(true);
  };
  const handleShowNft = () => {
    setTabSelected(false);
  };
  useEffect(() => {
    dispatch(tableAction.setTokenTab(tabSelected));
  }, [tabSelected, dispatch]);

  return (
    <>
      <div className="flex justify-center items-center bg-[#142028] rounded-xl  h-fit mt-2">
        <span
          onClick={() => handleShowToken()}
          id="market"
          className={`flex items-center duration-300 cursor-pointer lg:px-4 px-2 lg:py-1 py-1  text-[#939393] lg:text-sm text-xs  lg:h-8 hover:text-[#fff] ${
            tabSelected ? "text-white rounded-lg bg-[#3a4956]" : ""
          } `}
        >
          Tokens
        </span>
        <span
          onClick={() => handleShowNft()}
          id="pro"
          className={`flex items-center duration-300 cursor-pointer  lg:px-4 px-2 lg:py-1 py-1 text-[#939393]   lg:text-sm text-xs justify-center  hover:text-[#fff] ${
            !tabSelected ? "text-white rounded-lg bg-[#3a4956]" : ""
          }`}
        >
          NFTs
        </span>
      </div>
    </>
  );
};
export default HomeMarketButton;
