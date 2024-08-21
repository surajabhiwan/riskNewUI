import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import NavbarHeaderLarge from "./NavbarHeaderLarge";
import NavbarAccountLarge from "./NavbarAccountLarge";
import { showWalletConnectModalDesk } from "../../store/slices/wallet";
import WalletConnectModalDesk from "../../components/header/WalletConnectModal/Desk";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

// import HomeIcon from '@mui/icons-material/Home';
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import StoreIcon from "@mui/icons-material/Store";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
// import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
// import BuildIcon from '@mui/icons-material/Build';
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Link, useLocation } from "react-router-dom";
import MobileHeaderSearch from "../header/MobileHeaderSearch";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";

const TopNavbar = () => {
  const [menu, setMenu] = useState("");
  const [walletName, setWalletName] = useState("");
  const [isActive, setIsActive] = useState("");
  const { enabledWallet } = useCardano();
  const dispatch = useDispatch();
  const location = useLocation();
  const { showwalletconnectmodaldesk, signedMessage } = useSelector(
    (state) => state.wallet
  );
  const handleShowModal = () => {
    dispatch(showWalletConnectModalDesk());
  };
  useEffect(() => {
    const walletName = localStorage.getItem("cf-last-connected-wallet");
    console.log("walletName>>", walletName);
    setWalletName(walletName);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsActive("Home");
    } else if (
      location.pathname === "/charts" ||
      location.pathname === "/multi" ||
      location.pathname === "/cryptoMultiCharts"
    ) {
      setIsActive("Charts");
    } else if (location.pathname === "/Cryptocurrencies") {
      setIsActive("Cryptocurrencies");
    } else if (location.pathname === "/portfolio") {
      setIsActive("Portfolio");
    } else if (location.pathname === "/bubbles") {
      setIsActive("bubbles");
    } else if (
      location.pathname === "/bms" ||
      location.pathname === "/goofy" ||
      location.pathname === "/block-miners" ||
      location.pathname === "/neo-viking"
    ) {
      setIsActive("Mining");
    } else if (
      location.pathname === "/nftmarketplace" ||
      location.pathname === "/lending" ||
      location.pathname === "/bubbles" ||
      location.pathname === "/market-overview"
    ) {
      setIsActive("Marketplace");
    } else {
      setIsActive("none");
    }
  }, [location.pathname]);

  return (
    <div
      className={`fixed top-0  z-[99999] pt-3 opacity-90   flex w-full h-[70px] drop-shadow-lg bg-transparent`}
      id="Navbar"
      style={{ filter: "drop-shadow(0px 10px 10px #000010)" }}
    >
      {/* Navbar header */}
      <NavbarHeaderLarge />
      {/* Navbar Body */}
      <div className="flex justify-between items-ceter w-full px-4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ textWrap: "no-wrap" }}
        >
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 xl:space-x-2">
                  <Link
                    to={"/"}
                    className={` ${
                      isActive === "Home" ? "bg-gray-700" : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    {" "}
                    <StoreIcon fontSize="small" /> Home{" "}
                  </Link>
                  <div className="relative group">
                    <button
                      className={` ${
                        isActive === "Charts" ? "bg-gray-700" : ""
                      } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium  focus:text-white mb-2`}
                      aria-expanded="false"
                    >
                      <TroubleshootIcon fontSize="small" />
                      Charts <i className="fa-solid fa-caret-down" />
                    </button>
                    <div
                      className=" absolute z-10 hidden bg-gray-800 rounded-md mt-0 group-hover:block"
                      style={{ width: "10rem" }}
                    >
                      <Link
                        to={"/charts"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 text-nowrap"
                      >
                        Charts Home{" "}
                      </Link>
                      <Link
                        to={"/multi"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Cardano Multichart
                      </Link>
                      <Link
                        to={"/cryptoMultiCharts"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Crypto Multichart
                      </Link>
                    </div>
                  </div>

                  {/* <Link to={'/Cryptocurrencies'} className={` ${isActive === 'Cryptocurrencies' ? 'bg-gray-700' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}><CurrencyBitcoinIcon fontSize="small"/> Cryptocurrencies</Link> */}
                  <Link
                    to={"/bubbles"}
                    className={` ${
                      isActive === "bubbles" ? "bg-gray-700" : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <SportsVolleyballIcon fontSize="small" />
                    &nbsp;Bubbles
                  </Link>

                  <div className="relative group">
                    <button
                      className={` ${
                        isActive === "Marketplace" ? "bg-gray-700" : ""
                      } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium  focus:text-white  mb-2`}
                      aria-expanded="false"
                    >
                      {" "}
                      <PriceChangeIcon fontSize="small" /> Marketplace{" "}
                      <i className="fa-solid fa-caret-down" />
                    </button>
                    <div
                      className="absolute z-10 hidden bg-gray-800 rounded-md mt-0 group-hover:block"
                      style={{ width: "10rem" }}
                    >
                      <Link
                        to={"/nftmarketplace"}
                        className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
                      >
                        NFT Marketplace
                      </Link>
                      <Link
                        to={"/lending"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Lending
                      </Link>
                      {/* <Link to={'/bubbles'} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Bubbles</Link> */}
                      <Link
                        to={"/market-overview"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Market Data
                      </Link>
                      <Link to={"/gaming"}>
                        {" "}
                        <span
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
                          style={{ textWrap: "no-wrap !important" }}
                        >
                          Gaming
                        </span>
                      </Link>
                    </div>
                  </div>
                  <Link
                    to={"/portfolio"}
                    className={` ${
                      isActive === "Portfolio" ? "bg-gray-700" : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <RoomPreferencesIcon fontSize="small" /> Portfolio
                  </Link>
                  {/* <Link to={'/market-overview'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"> <StackedBarChartIcon fontSize="small"/> Market Data</Link> */}
                  {/* <Link to={'/nftmarketplace'} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Nft Marketplace</Link> */}

                  <div className="relative group">
                    <button
                      className={` ${
                        isActive === "Mining" ? "bg-gray-700" : ""
                      } text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none  focus:text-white  mb-2`}
                      aria-expanded="false"
                    >
                      {" "}
                      <BeachAccessIcon fontSize="small" /> Mining{" "}
                      <i className="fa-solid fa-caret-down" />
                    </button>
                    <div
                      className="absolute z-10 hidden bg-gray-800 rounded-md mt-0 group-hover:block"
                      style={{ width: "10rem" }}
                    >
                      <Link
                        to={"/bms"}
                        className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
                      >
                        BMS
                      </Link>
                      <Link
                        to={"/block-miners"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Block Miners
                      </Link>
                      <Link
                        to={"/neo-viking"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Neo Vikings
                      </Link>
                      <Link
                        to={"/goofy"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Goofy Gophers
                      </Link>
                    </div>
                  </div>

                  <div className="relative group">
                    <button
                      className="button text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:bg-gray-700 focus:text-white  mb-2"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 24"
                      >
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                      </svg>{" "}
                      Pro features
                    </button>
                    <div
                      className="absolute z-10 hidden bg-gray-800 rounded-md mt-0 group-hover:block"
                      style={{ width: "12rem" }}
                    >
                      <Link to={"/profiler-search"}>
                        {" "}
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                          WalletWatch{" "}
                          <sup className="text-yellow-400 text-[10px]">pro</sup>
                        </span>{" "}
                      </Link>
                      {/* <Link to={'/profit-leaderboard'}> <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Profit Leaderboard <sup className="text-yellow-400 text-[10px]">pro</sup></span></Link>
              <Link to={'/hotwallet'}>  <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Hot wallets <sup className="text-yellow-400 text-[10px]">pro</sup></span> </Link>
              <Link to={'/moneyflow'}> <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">Money Flow <sup className="text-yellow-400 text-[10px]">pro</sup></span> </Link> */}
                      <Link to={"/chatpro"}>
                        {" "}
                        <span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                          Chat{" "}
                          <sup className="text-yellow-400 text-[10px]">pro</sup>
                        </span>
                      </Link>
                      <Link to={"/partner"}>
                        {" "}
                        <span
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
                          style={{ textWrap: "no-wrap !important" }}
                        >
                          Education{" "}
                          <sup className="text-yellow-400 text-[10px]">pro</sup>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="relative group">
                    {/* <Link
                      to={"/bms"}
                      className="button text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:bg-gray-700 focus:text-white  mb-2"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 24"
                      >
                        <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                      </svg>{" "}
                      Crow Score
                    </Link> */}
                    <Link to={"/crowScore"}>
                      <button
                        className="glowScoreBtn text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:bg-gray-700 focus:text-white  mb-2"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 36 24"
                        >
                          <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                        </svg>{" "}
                        Crow Score
                      </button>
                    </Link>
                  </div>
                  <MobileHeaderSearch />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div style={{borderLeft: '2px solid yellow'}} className="pe-4 block navline"></div> */}
        <div className="flex items-center justify-end gap-6">
          <div
            className="flex flex-col justify-end items-center cursor-pointer text-white hover:text-yellow-300"
            onClick={handleShowModal}
          >
            {/* <MonetizationOnIcon /> */}
            <svg
              viewBox="0 0 51 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2  h-auto w-8 "
            >
              <g clip-path="url(#clip0_6219_266767)">
                <path
                  d="M3.85936 0.877849L47.9757 0.833532C49.2692 0.832232 50.4731 2.13709 50.4749 3.95711L50.504 32.9236C50.5058 34.7436 49.3046 36.0509 48.0111 36.0522L3.89474 36.0965C2.60126 36.0978 1.39736 34.7929 1.39553 32.9729L1.36644 4.00644C1.36461 2.18642 2.56588 0.879149 3.85936 0.877849Z"
                  fill="#804D33"
                  stroke="black"
                ></path>
                <path
                  d="M41.727 0.387855L4.27009 0.425483C2.49562 0.427266 1.05857 1.86719 1.06036 3.64167L1.09004 33.1946C1.09183 34.9691 2.53177 36.4061 4.30624 36.4044L41.7632 36.3667C43.5376 36.365 44.9747 34.925 44.9729 33.1505L44.9432 3.59758C44.9414 1.82311 43.5015 0.386073 41.727 0.387855Z"
                  fill="#BE7D5B"
                  stroke="black"
                ></path>
                <path
                  d="M50.8715 24.4159L40.4361 24.5425C37.9914 24.5722 35.9855 22.6144 35.9559 20.1697C35.9262 17.725 37.884 15.7192 40.3287 15.6895L50.764 15.5628L50.8715 24.4159Z"
                  fill="#CC9A7F"
                  stroke="black"
                  stroke-width="0.5"
                ></path>
                <circle
                  cx="40.6064"
                  cy="20.1134"
                  r="2.90379"
                  transform="rotate(15.5724 40.6064 20.1134)"
                  fill="#FFDB24"
                  stroke="black"
                  stroke-width="0.5"
                ></circle>
              </g>
            </svg>
            <p
              className={`text-xs capitalize ${
                enabledWallet ? "text-[#B5991B]" : ""
              } font-bold`}
            >
              {signedMessage
                ? "Connected"
                : enabledWallet
                ? `${enabledWallet}`
                : "connect"}{" "}
            </p>
          </div>
          <NavbarAccountLarge menu={menu} />
        </div>
        <Modal
          isOpen={showwalletconnectmodaldesk}
          onRequestClose={handleShowModal}
          className="custom-modalcontent"
          overlayClassName="custom-modaloverlay"
        >
          <WalletConnectModalDesk />
        </Modal>
      </div>
    </div>
  );
};

export default TopNavbar;
